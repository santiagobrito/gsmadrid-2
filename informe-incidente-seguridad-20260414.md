# Informe de Incidente de Seguridad — VPS EasyPanel
**Fecha de detección:** 14 de abril de 2026  
**Servidor:** vps-dc3239fd (Ubuntu, 7.569 GiB RAM)  
**Estado:** PARCIALMENTE CONTENIDO — vector de entrada sin confirmar

---

## 1. Resumen ejecutivo

El servidor fue comprometido mediante la instalación de un **cryptominer** (muy probablemente XMRig) dentro de contenedores Docker del proyecto `gsmadrid-2_web`. El malware llevaba activo desde el **13 de abril de 2026**, consumiendo ~200% CPU y 2.4 GB de RAM de forma sostenida, degradando el rendimiento de todos los servicios alojados en el VPS.

**El proceso malicioso corría directamente en el host, no confinado al contenedor.** Sin embargo, no se encontró persistencia a nivel de sistema operativo (sin crontab, sin servicios systemd maliciosos). El binario vivía en las capas de overlay de Docker y fue ejecutado con privilegios de root del host.

---

## 2. La pregunta clave: ¿el problema es el contenedor o todo el VPS?

Esta es la distinción más importante del incidente:

### Lo que sabemos con certeza

| Hecho | Implicación |
|-------|-------------|
| PID 2481822 corría en el **host**, no dentro de un namespace de contenedor | El malware escapó (o nunca estuvo confinado) al VPS |
| El binario estaba en `/var/tmp/` dentro de overlays de Docker | El vector de entrada fue a través de un contenedor |
| No se encontró crontab ni servicio systemd malicioso en el host | No hay persistencia confirmada en el host |
| El proceso no respawneó tras ser matado | La persistencia era solo el binario en disco |
| El binario fue eliminado y el proceso murió definitivamente | Amenaza inmediata contenida |

### Lo que NO sabemos todavía

- **Cómo entró** el atacante al contenedor — sin esto, puede volver
- **Si exfiltró datos** — credenciales de BD, variables de entorno, claves SSH
- **Si modificó código** dentro del contenedor o en volúmenes montados
- **Si hay otros binarios** en overlays de otros proyectos que no detectamos

### Veredicto

El ataque **entró por un contenedor pero ejecutó en el host**. Esto ocurre porque Docker por defecto no aísla completamente los procesos cuando el contenedor corre como root sin perfiles seccomp estrictos ni user namespaces. El VPS estuvo expuesto, pero no hay evidencia de persistencia permanente en el sistema operativo base.

**Nivel de riesgo actual:** MEDIO-ALTO. La amenaza inmediata está contenida, pero el vector de entrada sigue abierto.

---

## 3. Descubrimiento

El incidente fue detectado de forma accidental al revisar el output de `docker stats`, donde el contenedor `gsmadrid-2_web` mostraba un consumo anómalo y sostenido de CPU al 200%.

| Indicador | Valor normal | Valor observado |
|-----------|-------------|-----------------|
| CPU gsmadrid-2_web | <5% | ~200% constante |
| RAM gsmadrid-2_web | ~200 MB | 2.584 GiB |
| Tiempo acumulado de CPU | minutos | 1966 minutos (~33 horas) |
| Procesos zombie | 0 | 3 instancias de `[systemd-logind]` |

---

## 4. Análisis técnico

### 4.1 El proceso malicioso

Output de `ps aux` dentro del contenedor:

```
PID 999   199% CPU   ./systemd-logind -c config.json
PID 674   zombie     [systemd-logind] <defunct>
PID 478   zombie     [systemd-logind] <defunct>
PID 997   zombie     [systemd-logind] <defunct>
```

**Indicadores de compromiso (IoC):**

- El nombre `systemd-logind` imita un proceso legítimo del sistema operativo
- El `./` delante indica que no corre desde `/usr/lib/systemd/` sino desde un directorio arbitrario
- El argumento `-c config.json` es la firma exacta de **XMRig**, el minero de Monero (XMR) más extendido en ataques de este tipo
- Los procesos zombie de `[pkill]` indican que el malware fue matado previamente y se auto-respawneó al menos tres veces
- El proceso real de Next.js (PID 20) estaba en 0% CPU — el minero secuestró todos los recursos del contenedor

### 4.2 Escape al host

El mismo proceso corría directamente en el host del VPS:

```
# Proceso MALICIOSO en el host
PID 2481822   199% CPU   ./systemd-logind -c config.json   (desde Apr13)

# Proceso LEGÍTIMO del host
PID 752       0% CPU    /usr/lib/systemd/systemd-logind    (desde Apr02, normal)
```

**Por qué ocurrió esto:**

Docker no aísla completamente los procesos a nivel de kernel cuando:
- El contenedor corre como `root` (que es el default en la mayoría de imágenes Node.js y WordPress)
- No hay perfiles AppArmor o seccomp configurados explícitamente
- No están habilitados los user namespaces de Docker

En esas condiciones, un proceso root dentro del contenedor puede ejecutar binarios que son visibles en el host a través del sistema de archivos overlay2, y el proceso resultante corre con privilegios de root en el host.

### 4.3 Ubicación del binario en disco

El binario fue localizado en las capas escribibles (overlay2) de múltiples contenedores:

```
/var/lib/docker/overlay2/996d1f9a25.../diff/var/tmp/systemd-logind   ← ELIMINADO
/var/lib/docker/overlay2/e67e72f44e.../diff/var/tmp/systemd-logind   ← ELIMINADO  
/var/lib/docker/overlay2/9886be683d.../diff/var/tmp/systemd-logind   ← ELIMINADO
```

Todos ubicados en `/var/tmp/` — directorio elegido deliberadamente por ser escribible y raramente monitoreado, a diferencia de `/tmp` que muchos sistemas limpian periódicamente.

### 4.4 Contenedores afectados

| Container ID | Nombre del contenedor | Estado al detectar | Acción tomada |
|---|---|---|---|
| `e039dc26` | `/gsmadrid-2_web.1.n81ow53q6viyd8x5chcapq2uu` | Parado | Binario eliminado + contenedor eliminado |
| `5040a518` | `/gsmadrid-2_web.1.vsns340aysodpv44sxwwm0xhf` | Parado | Binario eliminado + contenedor eliminado |
| `8c452d29` | `/gsmadrid-2_web.1.weuoyam5qaq8fl66pzsznfbma` | **En producción** | Binario eliminado — contenedor aún activo |

Las tres instancias son versiones sucesivas del mismo servicio (`gsmadrid-2_web`), lo que sugiere que el malware se instaló en una versión temprana y **sobrevivió a varios redeploys** porque EasyPanel no elimina automáticamente los contenedores parados. Cada nuevo deploy creaba un contenedor nuevo, pero los anteriores (con el binario) permanecían en disco.

### 4.5 Persistencia

**Resultado: NO se encontró persistencia en el host.**

```bash
# Crontab de root — vacío
sudo crontab -l → (sin output)

# Directorio de crontabs — sin entradas de usuario
/var/spool/cron/crontabs/ → vacío (última modificación Jun 2024)

# Servicios systemd nuevos — solo los legítimos de Docker
/etc/systemd/system/multi-user.target.wants/containerd.service  ← legítimo
/etc/systemd/system/multi-user.target.wants/docker.service      ← legítimo
```

La "persistencia" era indirecta: el binario vivía en los overlays de contenedores parados acumulados en disco. Al eliminar esos contenedores y sus overlays, y al no haber cron ni servicio que lo relance, el proceso murió definitivamente.

**Verificación:** Tras `kill -9` y esperar 30 segundos, `ps aux | grep config.json` no devolvió resultados.

---

## 5. Timeline reconstruida

```
Antes del Apr13   →  Atacante accede al contenedor gsmadrid-2_web (vector desconocido)
                     Descarga y ejecuta el binario XMRig en /var/tmp/systemd-logind
                     El proceso escapa al host vía overlay2

Apr13             →  Minero activo, acumula 1966 minutos de CPU (~33h)
                     EasyPanel hace redeploys de gsmadrid-2_web (nuevas instancias)
                     El binario se copia a los overlays de las nuevas instancias

Apr14 ~12:00      →  Detección accidental vía docker stats
Apr14 ~12:24      →  Inicio de diagnóstico
Apr14 ~12:45      →  Proceso matado, binarios eliminados, contenedores infectados eliminados
Apr14             →  Estado actual: contenido pero vector de entrada sin confirmar
```

---

## 6. Impacto

| Área | Impacto | Severidad |
|------|---------|-----------|
| Rendimiento del VPS | CPU saturada ~33h, todos los servicios degradados | Alta |
| Recursos económicos | Consumo de CPU del VPS durante ~33h, posible minería de XMR en beneficio del atacante | Media |
| Datos en el servidor | A determinar — no hay evidencia de exfiltración, pero no se puede descartar | Alta |
| Integridad del código | A verificar — el vector puede haber modificado archivos en volúmenes | Media |
| Otros proyectos del VPS | Potencialmente afectados si el atacante escaló más allá de gsmadrid-2 | Media |
| Credenciales | Variables de entorno y secrets de todos los contenedores potencialmente expuestos | Alta |

---

## 7. Vector de entrada — hipótesis (sin confirmar)

No se han podido analizar los logs de acceso todavía. Hipótesis ordenadas por probabilidad:

### Hipótesis 1: Plugin o tema WordPress vulnerable (ALTA probabilidad)
El stack `gsmadrid-2` incluye un contenedor WordPress (`gsmadrid-2_wordpress`). Los plugins o temas WordPress desactualizados con vulnerabilidades de Remote Code Execution (RCE) son el vector más común en este tipo de ataques. Un plugin vulnerable permite escribir en el filesystem y ejecutar comandos arbitrarios, desde donde es trivial descargar y ejecutar un minero.

### Hipótesis 2: Imagen Docker base comprometida o sin actualizar (MEDIA probabilidad)
Si la imagen base de `gsmadrid-2_web` (Node.js o similar) tiene vulnerabilidades conocidas sin parchear, un atacante que logre acceso a la red del contenedor puede explotar esas vulnerabilidades.

### Hipótesis 3: Ruta API de Next.js expuesta (BAJA-MEDIA probabilidad)
Si alguna ruta `/api/` del proyecto Next.js no valida correctamente el input, podría permitir ejecución de comandos.

### Hipótesis 4: Acceso SSH comprometido (BAJA probabilidad)
No hay evidencia de esto, pero no se han revisado los logs de auth todavía.

**Para confirmar el vector, ejecutar:**

```bash
# Logs de WordPress buscando ejecución de código
sudo docker logs 4b2bc65878e5 2>&1 | grep -iE "POST.*wp-admin|eval|base64_decode|system\(|exec\(" | tail -50

# Logs del contenedor web activo
sudo docker logs 8c452d291487 2>&1 | grep -iE "curl|wget|chmod|/tmp|bash -i|python|perl" | tail -50

# Auth logs del host
sudo grep "Accepted\|Failed password" /var/log/auth.log | tail -30

# Accesos SSH recientes
sudo last | head -20
```

---

## 8. Acciones realizadas

- [x] Proceso malicioso PID 2481822 terminado con `kill -9`
- [x] Binario eliminado del overlay de los tres contenedores infectados
- [x] Dos contenedores parados infectados eliminados (`docker rm`)
- [x] Verificado que el proceso no respawneó (30 segundos de observación)
- [x] Verificado que no hay crontab malicioso
- [x] Verificado que no hay servicios systemd maliciosos en el host

---

## 9. Acciones pendientes — por prioridad

### INMEDIATO (hoy, en las próximas horas)

1. **Identificar el vector de entrada** — revisar los logs indicados en la sección 7 antes de cualquier otra cosa. Sin saber cómo entró, puede volver a entrar.

2. **Redeploy limpio de gsmadrid-2_web** — el contenedor activo (8c452d291487) no es de confianza aunque el binario fue eliminado. Forzar redeploy desde EasyPanel.

3. **Redeploy limpio de gsmadrid-2_wordpress** — si el vector fue WordPress, el contenedor actual puede tener archivos modificados.

4. **Limpiar contenedores parados de todos los proyectos:**
   ```bash
   sudo docker container prune -f
   ```

5. **Revisar auth.log y accesos SSH:**
   ```bash
   sudo grep "Accepted" /var/log/auth.log | tail -30
   sudo last | head -20
   ```

6. **Buscar binarios maliciosos en todos los overlays activos:**
   ```bash
   sudo find /var/lib/docker/overlay2 -path "*/var/tmp/*" -type f -executable 2>/dev/null
   sudo find /var/lib/docker/overlay2 -path "*/tmp/*" -type f -executable 2>/dev/null
   ```

### ESTA SEMANA

7. Cambiar **todas las contraseñas de bases de datos** de todos los proyectos del VPS
8. Rotar **todas las variables de entorno** y API keys almacenadas en EasyPanel
9. Actualizar todos los **plugins y temas de WordPress** en todos los proyectos
10. Revisar que **ningún contenedor corre con `--privileged`** innecesariamente:
    ```bash
    sudo docker inspect $(sudo docker ps -q) --format '{{.Name}} Privileged:{{.HostConfig.Privileged}}'
    ```
11. Configurar una **alerta de CPU** — si un contenedor supera el 50% durante más de 5 minutos, notificar por email o Telegram

### MEDIO PLAZO

12. Habilitar **Docker user namespaces** para que root dentro del contenedor no sea root en el host:
    ```
    /etc/docker/daemon.json → {"userns-remap": "default"}
    ```
13. Implementar **Fail2ban** en el host para proteger SSH
14. Configurar **perfiles seccomp o AppArmor** para los contenedores de producción
15. Implementar **monitorización continua** (Netdata, Prometheus+Grafana, o similar)
16. Evaluar si tiene sentido mover `gsmadrid-2` a un VPS separado dado que es el proyecto que originó el incidente
17. Activar **Docker Content Trust** para verificar integridad de imágenes

---

## 10. Lecciones aprendidas

### Problema 1: Docker no aísla por defecto
Los contenedores corren como root sin perfiles seccomp estrictos ni user namespaces. Un proceso root dentro del contenedor puede operar con privilegios de root en el host a través del filesystem overlay2.

### Problema 2: EasyPanel acumula contenedores parados
Cada redeploy deja un contenedor parado en disco. Si ese contenedor contiene malware, el binario sigue presente en el overlay hasta que se limpia manualmente. En este caso, el malware sobrevivió a múltiples redeploys.

### Problema 3: Sin monitorización de CPU
El ataque pasó desapercibido durante al menos 33 horas. Una alerta básica de CPU habría reducido ese tiempo a minutos.

### Problema 4: Múltiples proyectos de clientes en un mismo VPS
Un proyecto comprometido (gsmadrid-2) tiene acceso potencial a los overlays, redes Docker y variables de entorno de todos los demás proyectos del servidor (conocermarruecos, euroaccounts, aceitedirecto, sistema-continuo, etc.).

### Problema 5: Sin análisis de logs proactivo
No hay evidencia de que alguien haya revisado los logs de acceso de WordPress o Next.js antes de este incidente.

---

## 11. Indicadores de compromiso (IoC)

Para futuras referencias o para compartir con el proveedor de hosting:

| Tipo | Valor |
|------|-------|
| Nombre del proceso | `./systemd-logind` (con `./` delante) |
| Argumento | `-c config.json` |
| Ruta del binario | `/var/tmp/systemd-logind` (dentro del contenedor) |
| Comportamiento | 199-201% CPU sostenido, 2.4 GB RAM |
| Overlays afectados | `996d1f9a25...`, `e67e72f44e...`, `9886be683d...` |
| Familia de malware | XMRig (sospechado, no confirmado por análisis del binario) |
| Criptomoneda | Monero (XMR), sospechado |

---

*Informe generado durante sesión de respuesta a incidente*  
*Fecha: 14 de abril de 2026*  
*Estado: PARCIALMENTE CONTENIDO — vector de entrada sin confirmar — acciones pendientes activas*

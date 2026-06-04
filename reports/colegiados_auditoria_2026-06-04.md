# Auditoría del censo de colegiados — 2026-06-04

**Fuente:** `data/raw/colegiados_2026-06.csv` (export Excel "COLEGIADOS ACTUALIZADO JUNIO 2026").
**Total colegiados:** 1.138.

## Salidas generadas

| Archivo | Filas | Uso |
|---|---|---|
| `data/clean/colegiados_clean.csv` | 1.138 | Listo para import a WordPress |
| `data/clean/colegiados_accion_manual.csv` | 98 | Casos a revisar/contactar offline |

## Decisiones aplicadas

1. **Scope mínimo de campos.** Se importa `numero_colegiado`, `apellidos`, `nombres`, `display_name`, `modalidad`, `email`. **Se descartan** `DNI`, `TELEFONO`, `MOVIL` — datos sensibles que no necesita el frontend; quedan en la BD del Colegio. Los aportará el colegiado en su onboarding si los quiere mostrar en su ficha pública.
2. **Sin acentos.** El CSV original no trae tildes; se importan tal cual ("Jose Maria"). El colegiado corrige al actualizar perfil. No añadimos tildes heurísticas para evitar falsos positivos en apellidos vascos/catalanes/extranjeros.
3. **Title case español.** Partículas en minúscula (`de`, `del`, `la`, `los`, `y`, etc.). `San/Santa/Santo` en mayúscula como apellido legítimo. Apellidos compuestos con guión: cada parte capitalizada (`Lopez-Hevia`).
4. **Emails inválidos / vacíos → placeholder.** Se asigna `col-{numero}@gsmadrid.local` como email técnico para que WordPress pueda crear la cuenta. La cuenta queda marcada `email_estado = placeholder_*` y aparece en `colegiados_accion_manual.csv`.
5. **Emails corporativos compartidos** (2 casos: Grupo Gaycon, Ibersyde). El colegiado con número más bajo (más antiguo) conserva el email real; el otro recibe placeholder. Acción de seguimiento: pedir email personal al segundo.

## Calidad del dato

### Estado colegial (`modalidad`)

| Código | Conteo | Hipótesis |
|---|---|---|
| EL | 324 | Ejerciente Libre (?) |
| NU | 296 | (sin confirmar) |
| NE | 278 | No Ejerciente (?) |
| EE | 239 | Ejerciente Empresa (?) |
| **UN** | **1** | **Anomalía — único registro: nº 1720 Francisco Javier Agreda Abanades. Probable typo de `NU`. Confirmar con CGSM.** |

> **Acción pendiente:** pedir a IM/CGSM la decodificación oficial de los códigos `EL`, `NU`, `NE`, `EE` y confirmar el caso `UN`.

### Email

| Estado | Conteo | % |
|---|---|---|
| Válido | 1.040 | 91,4% |
| Placeholder por email inválido (texto basura) | 19 | 1,7% |
| Placeholder por email vacío | 77 | 6,8% |
| Placeholder por duplicado corporativo | 2 | 0,2% |

98 colegiados (8,6%) no son contactables por email hasta que se obtenga uno real.

### Datos no importados (referencia)

- **DNI:** 914 con formato válido, 207 con formato antiguo (sin letra, pre-1990), 17 "NO CONSTA". No bloquea nada pero CGSM debería normalizar en su BD.
- **Móvil:** 363 colegiados sin móvil (32%).
- **Teléfono fijo:** 5 colegiados sin ningún teléfono (fijo ni móvil).

### Integridad

- 0 duplicados por nº colegiado (PK natural).
- 0 duplicados por DNI real.
- 4 emails repetidos: 2 corporativos legítimos (gestionados arriba), 2 textos basura ("no tiene", "no lo facilita") tratados como inválidos.

## Próximos pasos

1. **Confirmación de IM/CGSM** sobre códigos `MODALID.` y caso `UN` antes de empezar el import.
2. **Validación del CSV curado** por Santi (revisión manual de muestra).
3. **Script de import a WordPress** — cuentas latentes, password aleatorio sin notificación email (la campaña va aparte, tras lanzamiento). Estado `pendiente_verificacion`.
4. **Política de privacidad + checkbox** para futuro flow de onboarding/activación.

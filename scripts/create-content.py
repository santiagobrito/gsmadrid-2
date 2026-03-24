#!/usr/bin/env python3
"""
GS Madrid 2 — Create Real Content in WordPress
================================================
Uploads images and creates/updates blog posts, formaciones, and eventos
via the WordPress REST API.

Prerequisites:
  1. Create an Application Password in WP Admin:
     Users > admin > Application Passwords > name: "content-script" > Add New
  2. pip install requests

Usage:
  python scripts/create-content.py --user admin --password "XXXX XXXX XXXX XXXX XXXX XXXX"

  # Clean existing seed data first, then create with images:
  python scripts/create-content.py --user admin --password "XXXX..." --clean

  # Only upload images:
  python scripts/create-content.py --user admin --password "XXXX..." --only images

Or set environment variables:
  WP_USER=admin WP_APP_PASSWORD="XXXX XXXX XXXX XXXX XXXX XXXX" python scripts/create-content.py
"""

import argparse
import base64
import json
import os
import sys
import time
import mimetypes
from pathlib import Path

try:
    import requests
except ImportError:
    print("ERROR: 'requests' not installed. Run: pip install requests")
    sys.exit(1)

# ── Config ────────────────────────────────────────────────────────────────────

WP_BASE = "https://gsmadrid-2-wordpress.a7lflv.easypanel.host"
WP_API = f"{WP_BASE}/wp-json/wp/v2"
PROJECT_ROOT = Path(__file__).resolve().parent.parent
PHOTOS_DIR = PROJECT_ROOT / "fotos-santi-mock"

# ── Session ───────────────────────────────────────────────────────────────────

session = requests.Session()
session.verify = True  # set False if SSL issues on staging


def setup_auth(user: str, password: str):
    """Set Basic auth header with Application Password."""
    token = base64.b64encode(f"{user}:{password}".encode()).decode()
    session.headers.update({"Authorization": f"Basic {token}"})


def test_auth():
    """Verify credentials work."""
    r = session.get(f"{WP_API}/users/me")
    if r.status_code == 200:
        data = r.json()
        print(f"  Authenticated as: {data['name']} (ID: {data['id']})")
        return True
    else:
        print(f"  AUTH FAILED: {r.status_code} -- {r.text[:200]}")
        return False


# ── Helpers ───────────────────────────────────────────────────────────────────

def upload_image(filepath: Path, alt_text: str = "") -> dict | None:
    """Upload an image to the WP Media Library. Returns media object or None."""
    if not filepath.exists():
        print(f"  WARNING: File not found: {filepath}")
        return None

    mime = mimetypes.guess_type(str(filepath))[0] or "image/jpeg"
    filename = filepath.name

    with open(filepath, "rb") as f:
        r = session.post(
            f"{WP_API}/media",
            headers={
                "Content-Disposition": f'attachment; filename="{filename}"',
                "Content-Type": mime,
            },
            data=f.read(),
        )

    if r.status_code == 201:
        media = r.json()
        print(f"  Uploaded: {filename} -> ID {media['id']}")
        if alt_text:
            session.post(f"{WP_API}/media/{media['id']}", json={"alt_text": alt_text})
        return media
    else:
        print(f"  UPLOAD FAILED for {filename}: {r.status_code} -- {r.text[:200]}")
        return None


def find_existing_posts(post_type: str) -> dict:
    """Get all existing posts of a type, keyed by title."""
    endpoint = f"{WP_API}/{post_type}"
    existing = {}
    page = 1
    while True:
        r = session.get(endpoint, params={"per_page": 100, "page": page, "status": "publish,draft"})
        if r.status_code != 200:
            break
        posts = r.json()
        if not posts:
            break
        for p in posts:
            title = p.get("title", {}).get("rendered", "")
            existing[title] = p
        page += 1
    return existing


def delete_posts(post_type: str, post_ids: list):
    """Delete posts by ID (move to trash then force delete)."""
    endpoint = f"{WP_API}/{post_type}"
    for pid in post_ids:
        r = session.delete(f"{endpoint}/{pid}", params={"force": True})
        if r.status_code == 200:
            print(f"  Deleted {post_type} ID {pid}")
        else:
            print(f"  DELETE FAILED {post_type} ID {pid}: {r.status_code}")


def create_or_update_post(post_type: str, data: dict, existing_id: int = None) -> dict | None:
    """Create or update a post. Returns post object or None."""
    endpoint = f"{WP_API}/{post_type}"

    if existing_id:
        r = session.post(f"{endpoint}/{existing_id}", json=data)
        action = "Updated"
    else:
        r = session.post(endpoint, json=data)
        action = "Created"

    if r.status_code in (200, 201):
        post = r.json()
        title = post.get("title", {}).get("rendered", data.get("title", "?"))
        print(f"  {action} {post_type}: '{title}' (ID: {post['id']})")
        return post
    else:
        print(f"  {action.upper()} FAILED for {post_type}: {r.status_code} -- {r.text[:300]}")
        return None


def set_taxonomy_terms(post_id: int, post_type: str, taxonomy: str, term_names: list):
    """Set taxonomy terms on a post. Creates terms if they don't exist."""
    r = session.get(f"{WP_API}/{taxonomy}", params={"per_page": 100})
    existing = {}
    if r.status_code == 200:
        for t in r.json():
            existing[t["name"].lower()] = t["id"]

    term_ids = []
    for name in term_names:
        if name.lower() in existing:
            term_ids.append(existing[name.lower()])
        else:
            r2 = session.post(f"{WP_API}/{taxonomy}", json={"name": name})
            if r2.status_code == 201:
                term_ids.append(r2.json()["id"])
                print(f"  Created term '{name}' in {taxonomy}")

    if term_ids:
        r = session.post(f"{WP_API}/{post_type}/{post_id}", json={taxonomy: term_ids})
        if r.status_code == 200:
            print(f"  Set {taxonomy} on {post_type} ID {post_id}")


# ── Content Definitions ──────────────────────────────────────────────────────

BLOG_POSTS = [
    {
        "title": "Principales novedades de la reforma laboral 2026",
        "content": (
            "<p>El primer trimestre de 2026 trae consigo cambios significativos en la legislaci\u00f3n "
            "laboral espa\u00f1ola. La reducci\u00f3n de la jornada laboral a 37,5 horas semanales, la implantaci\u00f3n "
            "del registro horario digital obligatorio y la actualizaci\u00f3n del Salario M\u00ednimo Interprofesional "
            "son las medidas m\u00e1s destacadas que afectan directamente al ejercicio profesional del graduado social.</p>"
            "<p>Desde el Colegio Oficial de Graduados Sociales de Madrid analizamos el impacto de estas reformas "
            "en la pr\u00e1ctica profesional y ofrecemos las claves para su correcta aplicaci\u00f3n. La nueva jornada "
            "m\u00e1xima de 37,5 horas semanales entrar\u00e1 en vigor de forma progresiva, y los graduados sociales "
            "juegan un papel fundamental en la adaptaci\u00f3n de los convenios colectivos y contratos individuales.</p>"
            "<p>Adem\u00e1s, se elimina definitivamente el registro en papel: todas las empresas deber\u00e1n contar "
            "con un sistema digital homologado antes del 30 de junio de 2026. Desde el Colegio ponemos a "
            "disposici\u00f3n de los colegiados una gu\u00eda pr\u00e1ctica con los requisitos t\u00e9cnicos y legales del "
            "nuevo sistema.</p>"
        ),
        "excerpt": "Analizamos los cambios m\u00e1s significativos de la nueva normativa laboral que entra en vigor este trimestre: jornada de 37,5 horas, registro digital y nuevo SMI.",
        "image_file": "blog y noticias/noticia-01.jpg",
        "image_alt": "Reforma laboral 2026 - an\u00e1lisis de cambios legislativos",
    },
    {
        "title": "Novedades en Seguridad Social para aut\u00f3nomos en 2026",
        "content": (
            "<p>El sistema de cotizaci\u00f3n por ingresos reales para trabajadores aut\u00f3nomos consolida su "
            "segundo a\u00f1o de aplicaci\u00f3n en 2026 con ajustes significativos. Las nuevas tablas de cotizaci\u00f3n "
            "incluyen 15 tramos de rendimientos netos, y el tipo de cotizaci\u00f3n general asciende al 31,30%. "
            "Estos cambios exigen una revisi\u00f3n exhaustiva de la situaci\u00f3n de cada cliente aut\u00f3nomo.</p>"
            "<p>Entre las novedades m\u00e1s relevantes destaca la ampliaci\u00f3n de la prestaci\u00f3n por cese de "
            "actividad, que ahora cubre situaciones de reducci\u00f3n involuntaria de ingresos superiores al 30%. "
            "Tambi\u00e9n se ha introducido una nueva bonificaci\u00f3n para aut\u00f3nomos colaboradores familiares "
            "menores de 30 a\u00f1os.</p>"
            "<p>El Colegio organiza un webinar gratuito el pr\u00f3ximo 2 de abril para analizar en detalle "
            "todas estas novedades y resolver las dudas m\u00e1s frecuentes de los colegiados.</p>"
        ),
        "excerpt": "Las nuevas tablas de cotizaci\u00f3n por ingresos reales, ampliaci\u00f3n de la prestaci\u00f3n por cese y bonificaciones para aut\u00f3nomos j\u00f3venes.",
        "image_file": "blog y noticias/noticia-02.jpg",
        "image_alt": "Novedades Seguridad Social aut\u00f3nomos 2026",
    },
    {
        "title": "Teletrabajo: nueva regulaci\u00f3n y obligaciones para empresas",
        "content": (
            "<p>La Ley de Trabajo a Distancia se actualiza en 2026 con nuevas obligaciones para las empresas "
            "que mantengan esquemas de teletrabajo. La norma refuerza el derecho a la desconexi\u00f3n digital, "
            "establece l\u00edmites claros a la monitorizaci\u00f3n del empleado en remoto y obliga a compensar "
            "los gastos derivados del trabajo desde casa con un m\u00ednimo de 50 euros mensuales.</p>"
            "<p>Para los graduados sociales, estas modificaciones suponen una oportunidad de asesoramiento "
            "especializado. La redacci\u00f3n de acuerdos de teletrabajo individuales, la adaptaci\u00f3n de pol\u00edticas "
            "internas y la revisi\u00f3n de convenios colectivos son tareas que requieren un conocimiento "
            "t\u00e9cnico que solo un profesional colegiado puede garantizar.</p>"
            "<p>Desde la Comisi\u00f3n de Formaci\u00f3n del Colegio hemos elaborado un modelo de acuerdo de "
            "teletrabajo actualizado, disponible para todos los colegiados en el \u00c1rea Privada de la web.</p>"
        ),
        "excerpt": "La actualizaci\u00f3n de la Ley de Trabajo a Distancia refuerza la desconexi\u00f3n digital y establece compensaci\u00f3n m\u00ednima de gastos.",
        "image_file": "blog y noticias/noticia-03.jpg",
        "image_alt": "Regulaci\u00f3n del teletrabajo en Espa\u00f1a 2026",
    },
    {
        "title": "Inteligencia artificial en el \u00e1mbito laboral: retos y oportunidades",
        "content": (
            "<p>La irrupci\u00f3n de la inteligencia artificial en los departamentos de recursos humanos "
            "plantea nuevos retos para los profesionales del derecho laboral. Desde la selecci\u00f3n "
            "automatizada de candidatos hasta la monitorizaci\u00f3n del rendimiento, la IA est\u00e1 "
            "transformando la relaci\u00f3n entre empresas y trabajadores de forma acelerada.</p>"
            "<p>El Reglamento Europeo de Inteligencia Artificial (AI Act), en vigor desde agosto de 2025, "
            "clasifica los sistemas de IA utilizados en el \u00e1mbito laboral como de \u00abalto riesgo\u00bb, lo que "
            "impone requisitos estrictos de transparencia, auditor\u00eda y supervisi\u00f3n humana. Los graduados "
            "sociales deben conocer estas obligaciones para asesorar correctamente a sus clientes.</p>"
            "<p>El Colegio organiza un ciclo de conferencias sobre IA y derecho laboral durante el mes "
            "de abril, con ponentes del \u00e1mbito acad\u00e9mico, empresarial y judicial. Las inscripciones "
            "est\u00e1n abiertas para todos los colegiados.</p>"
        ),
        "excerpt": "El AI Act europeo impone nuevas obligaciones en el uso de IA para selecci\u00f3n de personal y gesti\u00f3n laboral. Analizamos las claves.",
        "image_file": "blog y noticias/noticia-04.jpg",
        "image_alt": "Inteligencia artificial y derecho laboral",
    },
    {
        "title": "Nuevo convenio de colaboraci\u00f3n con la Universidad Complutense",
        "content": (
            "<p>El Colegio Oficial de Graduados Sociales de Madrid ha firmado un acuerdo marco de "
            "colaboraci\u00f3n con la Universidad Complutense de Madrid para el desarrollo de programas "
            "de pr\u00e1cticas, formaci\u00f3n continua e investigaci\u00f3n conjunta en el \u00e1mbito de las relaciones "
            "laborales y la protecci\u00f3n social.</p>"
            "<p>El convenio, firmado por la presidenta Teresa Silleras y el decano de la Facultad de "
            "Ciencias Pol\u00edticas y Sociolog\u00eda, permitir\u00e1 a los estudiantes del Grado en Relaciones "
            "Laborales y Recursos Humanos realizar pr\u00e1cticas tuteladas en despachos de graduados "
            "sociales colegiados, acercando la universidad al ejercicio profesional real.</p>"
            "<p>Adem\u00e1s, se crear\u00e1 una c\u00e1tedra de Pr\u00e1ctica Profesional del Graduado Social que "
            "organizar\u00e1 seminarios, jornadas y publicaciones acad\u00e9micas. Los colegiados interesados "
            "en recibir alumnos en pr\u00e1cticas pueden inscribirse a trav\u00e9s del \u00c1rea Privada.</p>"
        ),
        "excerpt": "Firmamos un acuerdo con la UCM para pr\u00e1cticas en despachos, formaci\u00f3n continua y una c\u00e1tedra de pr\u00e1ctica profesional.",
        "image_file": "blog y noticias/noticia-05.jpg",
        "image_alt": "Convenio Universidad Complutense y Colegio de Graduados Sociales",
    },
    {
        "title": "Jornada de puertas abiertas: conoce tu Colegio",
        "content": (
            "<p>El pr\u00f3ximo 12 de abril, el Colegio Oficial de Graduados Sociales de Madrid celebra "
            "una jornada de puertas abiertas en su sede de la Calle Jos\u00e9 Abascal, 44. Una oportunidad "
            "\u00fanica para que estudiantes, precolegiados y profesionales interesados en la colegiaci\u00f3n "
            "conozcan de primera mano las instalaciones, los servicios y las ventajas de pertenecer "
            "al Colegio.</p>"
            "<p>El programa incluye visitas guiadas a la nueva sede, que cuenta con salas de formaci\u00f3n "
            "con equipamiento audiovisual de \u00faltima generaci\u00f3n, una sala de simulaci\u00f3n de juicios "
            "\u00fanica en Madrid, espacios de coworking y biblioteca especializada. Tambi\u00e9n habr\u00e1 "
            "charlas informativas sobre las diferentes modalidades de colegiaci\u00f3n, servicios "
            "disponibles y la bolsa de empleo.</p>"
            "<p>La asistencia es gratuita, pero se requiere inscripci\u00f3n previa a trav\u00e9s de la web. "
            "Los asistentes que se colegien durante la jornada disfrutar\u00e1n de una bonificaci\u00f3n "
            "del 50% en la cuota de alta.</p>"
        ),
        "excerpt": "Ven a conocer la nueva sede del Colegio, sus servicios y las ventajas de colegiarte. Bonificaci\u00f3n del 50% en alta para asistentes.",
        "image_file": "blog y noticias/noticia-06.jpg",
        "image_alt": "Jornada de puertas abiertas Colegio Graduados Sociales Madrid",
    },
]

FORMACIONES = [
    {
        "title": "Jornada de Actualizaci\u00f3n Laboral 2026",
        "content": (
            "<p>Jornada intensiva de actualizaci\u00f3n sobre las principales novedades legislativas "
            "en materia laboral y de Seguridad Social para el ejercicio 2026. Dirigida a graduados "
            "sociales en activo que necesitan estar al d\u00eda de los cambios normativos.</p>"
            "<h2>Programa</h2>"
            "<ul>"
            "<li>09:30 -- Registro y bienvenida</li>"
            "<li>10:00 -- Reducci\u00f3n de jornada: impacto en convenios colectivos</li>"
            "<li>11:30 -- Pausa caf\u00e9</li>"
            "<li>12:00 -- Registro horario digital obligatorio</li>"
            "<li>13:00 -- Actualizaci\u00f3n SMI y cotizaciones 2026</li>"
            "<li>14:00 -- Clausura y networking</li>"
            "</ul>"
        ),
        "excerpt": "Cambios clave en legislaci\u00f3n laboral y Seguridad Social para el ejercicio profesional 2026.",
        "image_file": "Formaciones y Eventos/formacion-01.jpg",
        "image_alt": "Jornada de Actualizaci\u00f3n Laboral 2026",
        "acf": {
            "fecha_inicio": "2026-03-28",
            "horario": "09:30 - 14:00",
            "lugar": "Sede del Colegio, C/ Jos\u00e9 Abascal 44, Madrid",
            "plazas": 80,
            "es_gratuito": True,
            "estado": "abierta",
            "horas_lectivas": 4,
        },
        "modalidad": ["Presencial"],
        "area_formativa": ["Laboral"],
    },
    {
        "title": "Webinar: Novedades en Seguridad Social 2026",
        "content": (
            "<p>Seminario online de 2 horas sobre las \u00faltimas reformas en materia de Seguridad Social. "
            "Analizaremos los cambios en bases de cotizaci\u00f3n, prestaciones y el nuevo sistema de "
            "cotizaci\u00f3n por ingresos reales para aut\u00f3nomos.</p>"
            "<p>El webinar estar\u00e1 impartido por Dra. Carmen L\u00f3pez Mart\u00edn, catedr\u00e1tica de Derecho del "
            "Trabajo de la Universidad Complutense, y D. Miguel \u00c1ngel Fern\u00e1ndez, inspector de Trabajo "
            "y Seguridad Social. Se entregar\u00e1 material complementario y grabaci\u00f3n del webinar a "
            "todos los inscritos.</p>"
        ),
        "excerpt": "Repaso completo a las \u00faltimas reformas de Seguridad Social y su impacto en el \u00e1mbito laboral.",
        "image_file": "Formaciones y Eventos/formacion-02.jpg",
        "image_alt": "Webinar Seguridad Social 2026",
        "acf": {
            "fecha_inicio": "2026-04-02",
            "horario": "17:00 - 19:00",
            "lugar": "Online (Zoom)",
            "plazas": 200,
            "es_gratuito": True,
            "estado": "abierta",
            "horas_lectivas": 2,
        },
        "modalidad": ["Online"],
        "area_formativa": ["Seguridad Social"],
    },
    {
        "title": "Taller de Mediaci\u00f3n y Arbitraje Laboral",
        "content": (
            "<p>Curso presencial de 20 horas lectivas sobre mediaci\u00f3n y arbitraje en el \u00e1mbito laboral. "
            "Habilitante para la inscripci\u00f3n en el Registro de Mediadores del Ministerio de Justicia. "
            "Incluye pr\u00e1cticas con casos reales y simulaci\u00f3n de sesiones de mediaci\u00f3n en nuestra "
            "sala especializada.</p>"
            "<p>El taller se estructura en 5 sesiones de 4 horas cada una, combinando teor\u00eda y pr\u00e1ctica. "
            "Los participantes trabajar\u00e1n con supuestos reales de conflictos laborales individuales y "
            "colectivos, y realizar\u00e1n al menos 3 simulaciones completas de sesiones de mediaci\u00f3n.</p>"
        ),
        "excerpt": "Curso habilitante para mediaci\u00f3n laboral con pr\u00e1cticas y simulaci\u00f3n de casos reales. 20 horas lectivas.",
        "image_file": "Formaciones y Eventos/formacion-03.jpg",
        "image_alt": "Taller de Mediaci\u00f3n y Arbitraje Laboral",
        "acf": {
            "fecha_inicio": "2026-04-07",
            "fecha_fin": "2026-04-25",
            "horario": "16:00 - 20:00 (lunes y viernes)",
            "lugar": "Sede del Colegio, C/ Jos\u00e9 Abascal 44, Madrid",
            "plazas": 25,
            "es_gratuito": False,
            "estado": "abierta",
            "horas_lectivas": 20,
        },
        "modalidad": ["Presencial"],
        "area_formativa": ["Mediaci\u00f3n"],
    },
    {
        "title": "Taller: IA Aplicada al \u00c1mbito Laboral",
        "content": (
            "<p>Taller pr\u00e1ctico de 4 horas sobre el uso de herramientas de inteligencia artificial "
            "en la gesti\u00f3n laboral diaria. Aprende a utilizar IA para redacci\u00f3n de contratos, "
            "an\u00e1lisis de convenios, c\u00e1lculo de indemnizaciones, preparaci\u00f3n de demandas y "
            "automatizaci\u00f3n de tareas administrativas.</p>"
            "<p>No se requieren conocimientos t\u00e9cnicos previos. El taller est\u00e1 dise\u00f1ado para "
            "graduados sociales que quieran incorporar herramientas de IA a su pr\u00e1ctica "
            "profesional de forma responsable y eficiente. Se proporcionar\u00e1 acceso temporal "
            "a las herramientas utilizadas durante el taller.</p>"
        ),
        "excerpt": "Taller pr\u00e1ctico sobre herramientas de IA para la gesti\u00f3n laboral diaria. Sin requisitos t\u00e9cnicos previos.",
        "image_file": "Formaciones y Eventos/formacion-04.jpg",
        "image_alt": "Taller IA Aplicada al \u00c1mbito Laboral",
        "acf": {
            "fecha_inicio": "2026-04-15",
            "horario": "10:00 - 14:00",
            "lugar": "Online (Zoom)",
            "plazas": 50,
            "es_gratuito": True,
            "estado": "abierta",
            "horas_lectivas": 4,
        },
        "modalidad": ["Online"],
        "area_formativa": ["Laboral"],
    },
]

EVENTOS = [
    {
        "title": "Asamblea General Ordinaria 2026",
        "content": (
            "<p>Convocatoria de la Asamblea General Ordinaria del Colegio Oficial de Graduados "
            "Sociales de Madrid. Orden del d\u00eda: aprobaci\u00f3n de cuentas del ejercicio 2025, "
            "presupuestos para 2026, memoria de actividades y ruegos y preguntas.</p>"
            "<p>La asistencia es obligatoria para los miembros de la Junta de Gobierno y abierta "
            "a todos los colegiados. Se podr\u00e1 delegar el voto conforme a los Estatutos del Colegio. "
            "La documentaci\u00f3n (cuentas, presupuestos, memoria) estar\u00e1 disponible en el \u00c1rea Privada "
            "desde el 1 de abril.</p>"
        ),
        "excerpt": "Asamblea General Ordinaria: aprobaci\u00f3n de cuentas 2025, presupuestos 2026 y memoria de actividades.",
        "image_file": "Formaciones y Eventos/evento-01.jpg",
        "image_alt": "Asamblea General Ordinaria del Colegio 2026",
        "acf": {
            "fecha_inicio": "2026-04-15",
            "horario": "17:00 - 20:00",
            "lugar": "Sal\u00f3n de Actos, Sede del Colegio, C/ Jos\u00e9 Abascal 44",
            "tipo_evento": "asamblea",
            "estado": "abierto",
            "plazas": 200,
            "requiere_inscripcion": False,
            "solo_colegiados": True,
            "organizador": "Colegio Oficial de Graduados Sociales de Madrid",
        },
    },
    {
        "title": "Networking: J\u00f3venes Graduados Sociales",
        "content": (
            "<p>Encuentro informal para graduados sociales menores de 35 a\u00f1os y precolegiados. "
            "Un espacio para compartir experiencias, generar contactos profesionales y conocer las "
            "oportunidades que ofrece el Colegio a las nuevas generaciones de profesionales.</p>"
            "<p>El evento incluye una din\u00e1mica de networking estructurado, presentaciones breves "
            "de colegiados j\u00f3venes que compartir\u00e1n su experiencia profesional, y un c\u00f3ctel de "
            "cierre. Es una oportunidad excelente para ampliar la red de contactos profesionales "
            "en un ambiente distendido.</p>"
        ),
        "excerpt": "Encuentro para j\u00f3venes graduados sociales y precolegiados. Networking, experiencias y oportunidades profesionales.",
        "image_file": "Formaciones y Eventos/evento-02.jpg",
        "image_alt": "Networking J\u00f3venes Graduados Sociales",
        "acf": {
            "fecha_inicio": "2026-04-22",
            "horario": "19:00 - 21:30",
            "lugar": "Sede del Colegio, C/ Jos\u00e9 Abascal 44, Madrid",
            "tipo_evento": "networking",
            "estado": "abierto",
            "plazas": 60,
            "requiere_inscripcion": True,
            "solo_colegiados": False,
            "organizador": "Comisi\u00f3n de J\u00f3venes -- CGSM",
        },
    },
    {
        "title": "D\u00eda del Graduado Social 2026",
        "content": (
            "<p>Celebraci\u00f3n del D\u00eda del Graduado Social con un acto institucional solemne que incluye "
            "la entrega de insignias de plata y oro a los colegiados con 25 y 50 a\u00f1os de colegiaci\u00f3n "
            "respectivamente, reconocimiento a colegiados destacados y discurso de la presidenta "
            "Teresa Silleras.</p>"
            "<p>Tras el acto institucional se celebrar\u00e1 un c\u00f3ctel-almuerzo para todos los asistentes. "
            "El evento es abierto a todos los colegiados y sus acompa\u00f1antes. Se ruega confirmaci\u00f3n "
            "de asistencia antes del 25 de abril para la organizaci\u00f3n del c\u00e1tering.</p>"
        ),
        "excerpt": "Acto institucional con entrega de insignias, reconocimientos y celebraci\u00f3n de nuestra profesi\u00f3n.",
        "image_file": "Formaciones y Eventos/evento-03.jpg",
        "image_alt": "D\u00eda del Graduado Social 2026 - acto institucional",
        "acf": {
            "fecha_inicio": "2026-05-03",
            "horario": "12:00 - 15:00",
            "lugar": "Hotel Palace, Plaza de las Cortes 7, Madrid",
            "tipo_evento": "institucional",
            "estado": "abierto",
            "plazas": 300,
            "requiere_inscripcion": True,
            "solo_colegiados": True,
            "organizador": "Colegio Oficial de Graduados Sociales de Madrid",
        },
    },
]


# ── Clean existing content ────────────────────────────────────────────────────

def clean_existing_content():
    """Delete all existing seed content (posts, formaciones, eventos) to start fresh."""
    print("[CLEAN] Removing existing content...")

    for post_type in ("posts", "formacion", "evento"):
        existing = find_existing_posts(post_type)
        if existing:
            ids = [p["id"] for p in existing.values()]
            print(f"  Found {len(ids)} existing {post_type}")
            delete_posts(post_type, ids)
        else:
            print(f"  No existing {post_type} found")

    print()


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Create content in GS Madrid WordPress")
    parser.add_argument("--user", default=os.environ.get("WP_USER", "admin"), help="WP username")
    parser.add_argument("--password", default=os.environ.get("WP_APP_PASSWORD", ""), help="WP Application Password")
    parser.add_argument("--skip-images", action="store_true", help="Skip image uploads")
    parser.add_argument("--dry-run", action="store_true", help="Print what would be done without making API calls")
    parser.add_argument("--only", choices=["blog", "formaciones", "eventos", "images"], help="Only create specific type")
    parser.add_argument("--clean", action="store_true", help="Delete existing content before creating new")
    args = parser.parse_args()

    if not args.password and not args.dry_run:
        print("ERROR: No password provided.")
        print()
        print("  Option 1: python scripts/create-content.py --user admin --password 'XXXX XXXX XXXX'")
        print("  Option 2: export WP_APP_PASSWORD='XXXX XXXX XXXX'")
        print()
        print("To create an Application Password:")
        print(f"  1. Go to {WP_BASE}/wp-admin/profile.php")
        print("  2. Scroll to 'Application Passwords'")
        print("  3. Name: 'content-script' > click 'Add New Application Password'")
        print("  4. Copy the generated password (spaces included)")
        sys.exit(1)

    if args.dry_run:
        print("=== DRY RUN MODE ===")
        if args.clean:
            print("Would delete all existing posts, formaciones, and eventos")
        print(f"Would upload {6 + 4 + 3} images from {PHOTOS_DIR}")
        print(f"Would create {len(BLOG_POSTS)} blog posts")
        print(f"Would create {len(FORMACIONES)} formaciones (with ACF fields)")
        print(f"Would create {len(EVENTOS)} eventos (with ACF fields)")
        return

    # Auth
    print("=" * 60)
    print("  GS Madrid 2 -- Content Creator")
    print("=" * 60)
    print()
    print("[1/6] Testing authentication...")
    setup_auth(args.user, args.password)
    if not test_auth():
        print()
        print("Cannot proceed without valid authentication.")
        print(f"Verify your Application Password at: {WP_BASE}/wp-admin/profile.php")
        sys.exit(1)
    print()

    # Clean if requested
    if args.clean:
        clean_existing_content()

    # Track uploaded media IDs
    media_ids = {}

    # ── Upload images ──
    if not args.skip_images and args.only in (None, "images"):
        print("[2/6] Uploading blog images...")
        for i in range(1, 7):
            filepath = PHOTOS_DIR / f"blog y noticias/noticia-{i:02d}.jpg"
            media = upload_image(filepath, f"Noticia del Colegio de Graduados Sociales de Madrid")
            if media:
                media_ids[f"noticia-{i:02d}.jpg"] = media["id"]

        print()
        print("[3/6] Uploading formacion images...")
        for i in range(1, 5):
            filepath = PHOTOS_DIR / f"Formaciones y Eventos/formacion-{i:02d}.jpg"
            media = upload_image(filepath, f"Formaci\u00f3n del Colegio de Graduados Sociales de Madrid")
            if media:
                media_ids[f"formacion-{i:02d}.jpg"] = media["id"]

        print()
        print("[3/6] Uploading evento images...")
        for i in range(1, 4):
            filepath = PHOTOS_DIR / f"Formaciones y Eventos/evento-{i:02d}.jpg"
            media = upload_image(filepath, f"Evento del Colegio de Graduados Sociales de Madrid")
            if media:
                media_ids[f"evento-{i:02d}.jpg"] = media["id"]

        print(f"  Total uploaded: {len(media_ids)} images")
        print()

    if args.only == "images":
        print("Done (images only).")
        return

    # ── Create blog posts ──
    if args.only in (None, "blog"):
        print("[4/6] Creating blog posts...")
        for post_data in BLOG_POSTS:
            image_filename = Path(post_data["image_file"]).name
            featured_media_id = media_ids.get(image_filename, 0)

            payload = {
                "title": post_data["title"],
                "content": post_data["content"],
                "excerpt": post_data["excerpt"],
                "status": "publish",
            }
            if featured_media_id:
                payload["featured_media"] = featured_media_id

            create_or_update_post("posts", payload)
            time.sleep(0.3)

        print()

    # ── Create formaciones ──
    if args.only in (None, "formaciones"):
        print("[5/6] Creating formaciones...")
        for form_data in FORMACIONES:
            image_filename = Path(form_data["image_file"]).name
            featured_media_id = media_ids.get(image_filename, 0)

            payload = {
                "title": form_data["title"],
                "content": form_data["content"],
                "excerpt": form_data["excerpt"],
                "status": "publish",
                "acf": form_data["acf"],
            }
            if featured_media_id:
                payload["featured_media"] = featured_media_id

            created = create_or_update_post("formacion", payload)
            if created:
                post_id = created["id"]
                for tax_name in ("modalidad", "area_formativa"):
                    if tax_name in form_data:
                        set_taxonomy_terms(post_id, "formacion", tax_name, form_data[tax_name])
            time.sleep(0.3)

        print()

    # ── Create eventos ──
    if args.only in (None, "eventos"):
        print("[6/6] Creating eventos...")
        for evt_data in EVENTOS:
            image_filename = Path(evt_data["image_file"]).name
            featured_media_id = media_ids.get(image_filename, 0)

            payload = {
                "title": evt_data["title"],
                "content": evt_data["content"],
                "excerpt": evt_data["excerpt"],
                "status": "publish",
                "acf": evt_data["acf"],
            }
            if featured_media_id:
                payload["featured_media"] = featured_media_id

            create_or_update_post("evento", payload)
            time.sleep(0.3)

        print()

    # ── Summary ──
    print("=" * 60)
    print("  Content creation complete!")
    print("=" * 60)
    print(f"  Images uploaded: {len(media_ids)}")
    print(f"  Blog posts: {len(BLOG_POSTS)}")
    print(f"  Formaciones: {len(FORMACIONES)}")
    print(f"  Eventos: {len(EVENTOS)}")
    print()
    print(f"  WP Admin:  {WP_BASE}/wp-admin/edit.php")
    print(f"  Frontend:  https://gsmadrid-2-web.a7lflv.easypanel.host")
    print()
    print("  NOTE: ACF fields are set via the 'acf' key in REST API.")
    print("  If ACF fields don't appear, verify that 'show_in_rest' is")
    print("  enabled in the ACF field group settings.")


if __name__ == "__main__":
    main()

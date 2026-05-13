<?php get_header(); ?>

<main class="cgsm-home">

  <!-- ═══ HERO ═══ -->
  <section class="hero">
    <div class="hero__inner container">
      <span class="badge">Colegio Oficial</span>
      <h1 class="hero__title">
        <?= esc_html(cgsm_field('hero_titulo', 'El Colegio de los profesionales del mundo laboral en Madrid')); ?>
      </h1>
      <p class="hero__sub">
        <?= esc_html(cgsm_field('hero_subtitulo', 'Formacion continua, representacion institucional, asistencia juridica gratuita y una comunidad de mas de 2.500 colegiados.')); ?>
      </p>
      <div class="hero__ctas">
        <a href="/colegiacion/" class="btn btn--primary">Colegiarme</a>
        <a href="/colegio/" class="btn btn--outline">Conoce el Colegio</a>
      </div>
    </div>
  </section>

  <!-- ═══ QUE NECESITAS ═══ -->
  <section class="necesitas section--gray">
    <div class="container">
      <h2 class="section__title"><?= esc_html(cgsm_field('necesitas_titulo', '¿Que necesitas?')); ?></h2>
      <p class="section__sub">Elige tu perfil y accede a lo que buscas.</p>
      <div class="cards cards--3">

        <a href="/servicios/colegiado/" class="card">
          <div class="card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <h3 class="card__title">Soy Colegiado</h3>
          <p class="card__desc">Accede a tu area privada, formacion, convenios y todos los servicios colegiales.</p>
          <span class="card__link">Acceder &rarr;</span>
        </a>

        <a href="/servicios/ciudadano/" class="card">
          <div class="card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h3 class="card__title">Soy Ciudadano o Empresa</h3>
          <p class="card__desc">Asistencia juridica gratuita, mediacion laboral y orientacion profesional sin coste.</p>
          <span class="card__link">Ver servicios &rarr;</span>
        </a>

        <a href="/colegiacion/precolegiados/" class="card">
          <div class="card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/></svg>
          </div>
          <h3 class="card__title">Soy Estudiante</h3>
          <p class="card__desc">Precolegiacion desde 30 EUR/ano. Formacion, practicas y networking desde la universidad.</p>
          <span class="card__link">Precolegiacion &rarr;</span>
        </a>

      </div>
    </div>
  </section>

  <!-- ═══ CIFRAS ═══ -->
  <section class="cifras">
    <div class="container">
      <div class="cifras__grid">
        <div class="cifra">
          <span class="cifra__num">+2.500</span>
          <span class="cifra__label">Colegiados</span>
        </div>
        <div class="cifra">
          <span class="cifra__num">+50</span>
          <span class="cifra__label">Anos de historia</span>
        </div>
        <div class="cifra">
          <span class="cifra__num">+120</span>
          <span class="cifra__label">Cursos al ano</span>
        </div>
        <div class="cifra">
          <span class="cifra__num">5</span>
          <span class="cifra__label">Servicios gratuitos al ciudadano</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ SOBRE EL COLEGIO ═══ -->
  <section class="sobre section--gray">
    <div class="container sobre__grid">
      <div class="sobre__img">
        <?php $img = cgsm_img('sobre_imagen'); ?>
        <?php if ($img): ?>
          <img src="<?= esc_url($img); ?>" alt="Colegio Oficial de Graduados Sociales de Madrid" loading="lazy">
        <?php else: ?>
          <div class="sobre__placeholder">
            <img src="https://gsmadrid.uptomarketing.com/wp-content/uploads/2026/02/logo-gsm-png.png" alt="CGSM" class="sobre__logo-fallback">
          </div>
        <?php endif; ?>
      </div>
      <div class="sobre__text">
        <span class="badge">El Colegio</span>
        <h2><?= esc_html(cgsm_field('sobre_titulo', 'Mas de 50 anos al servicio de la profesion')); ?></h2>
        <p><?= esc_html(cgsm_field('sobre_texto', 'El Colegio Oficial de Graduados Sociales de Madrid representa y defiende los intereses de los profesionales del ambito laboral, de la Seguridad Social y de los Recursos Humanos. Ofrecemos formacion continua acreditada, asistencia juridica, mediacion y una red de convenios exclusivos.')); ?></p>
        <a href="/colegio/" class="btn btn--primary">Conocer mas</a>
      </div>
    </div>
  </section>

  <!-- ═══ SERVICIOS DESTACADOS ═══ -->
  <section class="servicios">
    <div class="container">
      <h2 class="section__title">Servicios destacados</h2>
      <p class="section__sub">Acompanamos al profesional, al ciudadano y a la empresa.</p>
      <div class="cards cards--3">

        <div class="card card--icon-left">
          <div class="card__icon card__icon--sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <h3 class="card__title">Asistencia Juridica Gratuita</h3>
            <p class="card__desc">Orientacion y asistencia en materia laboral y de Seguridad Social para todos los ciudadanos.</p>
          </div>
        </div>

        <div class="card card--icon-left">
          <div class="card__icon card__icon--sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </div>
          <div>
            <h3 class="card__title">Formacion Continua</h3>
            <p class="card__desc">Mas de 120 actividades formativas al ano en formato presencial, online e hibrido.</p>
          </div>
        </div>

        <div class="card card--icon-left">
          <div class="card__icon card__icon--sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          </div>
          <div>
            <h3 class="card__title">Mediacion Laboral</h3>
            <p class="card__desc">Resolucion de conflictos laborales de forma agil, confidencial y sin coste para el ciudadano.</p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ═══ CTA FINAL ═══ -->
  <section class="cta-final">
    <div class="container cta-final__inner">
      <h2>¿Quieres formar parte del Colegio?</h2>
      <p>Unete a mas de 2.500 profesionales que ya impulsan su carrera con nosotros.</p>
      <div class="hero__ctas">
        <a href="/colegiacion/" class="btn btn--white">Colegiarme ahora</a>
        <a href="/contacto/" class="btn btn--outline-white">Contactar</a>
      </div>
    </div>
  </section>

</main>

<?php get_footer(); ?>

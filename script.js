// ── COUNTDOWN ─────────────────────────────────────────────────
const weddingDate = new Date("2026-10-24T17:30:00+02:00").getTime();

function updateCountdown() {
  const distance = weddingDate - Date.now();
  const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  if (distance <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach((id) => set(id, "00"));
    return;
  }

  set("days",    pad(Math.floor(distance / 86400000)));
  set("hours",   pad(Math.floor((distance / 3600000) % 24)));
  set("minutes", pad(Math.floor((distance / 60000) % 60)));
  set("seconds", pad(Math.floor((distance / 1000) % 60)));
}

// ── REVEAL OBSERVER ───────────────────────────────────────────
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
    { threshold: 0.08 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
}

// ── SCROLL ────────────────────────────────────────────────────
const progressLine = document.getElementById("progressLine");
const siteTop      = document.getElementById("siteTop");

function onScroll() {
  if (progressLine) {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    progressLine.style.width = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) + "%" : "0%";
  }
  if (siteTop) {
    siteTop.classList.toggle("scrolled", window.scrollY > 60);
  }
}

window.addEventListener("scroll", onScroll, { passive: true });

// ── MOBILE NAV ────────────────────────────────────────────────
const navToggle = document.getElementById("navToggle");
const pageNav   = document.getElementById("pageNav");

function setNavOpen(open) {
  if (!navToggle || !pageNav) return;
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  navToggle.setAttribute(
    "aria-label",
    open
      ? (document.documentElement.lang === "en" ? "Close navigation menu" : "Cerrar menú de navegación")
      : (document.documentElement.lang === "en" ? "Open navigation menu" : "Abrir menú de navegación")
  );
  document.body.classList.toggle("nav-open", open);
}

if (navToggle && pageNav) {
  navToggle.addEventListener("click", () => {
    setNavOpen(navToggle.getAttribute("aria-expanded") !== "true");
  });

  pageNav.querySelectorAll(".page-nav__link").forEach((link) => {
    link.addEventListener("click", () => setNavOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setNavOpen(false);
  });

  window.matchMedia("(min-width: 761px)").addEventListener("change", (e) => {
    if (e.matches) setNavOpen(false);
  });
}

// ── TRANSLATIONS ──────────────────────────────────────────────
const langToggle = document.getElementById("langToggle");

const translations = {
  es: {
    meta_title:        "Mar\u00eda & Jos\u00e9 | 24 Octubre 2026",
    meta_description:  "Invitaci\u00f3n digital de boda. Sevilla, 24 de octubre de 2026.",
    hero_eyebrow:      "SEVILLA \u00b7 24 DE OCTUBRE DE 2026",
    hero_subtitle:     "\u00a1Nos casamos!",
    hero_cta_primary:  "Confirmar asistencia",
    scroll_down:       "Descubrir",
    countdown_title:   "Cuenta atr\u00e1s",
    countdown_days:    "d\u00edas",
    countdown_hours:   "horas",
    countdown_minutes: "min",
    countdown_seconds: "seg",
    countdown_note:    "Iglesia del Salvador \u00b7 17:30h",
    nav_inicio:        "Inicio",
    nav_plan:          "Itinerario",
    nav_preboda:       "Preboda",
    nav_dresscode:     "Etiqueta",
    nav_asistencia:    "Asistencia",
    nav_faq:           "Preguntas",
    nav_regalos:       "Regalo",
    nav_fotos:         "Fotos",
    nav_sevilla:       "Qu\u00e9 visitar",
    nav_comer:         "D\u00f3nde comer",
    about_eyebrow:     "Nuestra historia",
    about_title:       "Una historia de planes improvisados y mucha ilusi\u00f3n",
    about_p1:          "Somos Mar\u00eda y Jos\u00e9. Tras cinco años de noviazgo, nos casamos el 24 de octubre de 2026 en Sevilla. Nos hace much\u00edsima ilusi\u00f3n vivir este d\u00eda contigo y compartir una noche llena de abrazos, brindis y m\u00fasica.",
    about_p2:          "En esta web os dejamos toda la información que pueda ser útil para el día de la boda o la preparación del viaje para los que venís de fuera. Gracias de corazón por acompañarnos.",
    timeline_eyebrow:  "Plan del d\u00eda",
    timeline_title:    "D\u00f3nde y cu\u00e1ndo nos vemos",
    plan_ceremony_title:  "Ceremonia",
    plan_ceremony_area:   "Centro hist\u00f3rico de Sevilla",
    plan_bus_out_title:   "Salida de autobuses",
    plan_bus_out_area:    "Punto de encuentro para el traslado",
    plan_party_title:     "C\u00f3ctel, cena y fiesta",
    plan_party_area:      "Gerena, Sevilla",
    plan_bus_back1_title: "Primera vuelta de autobuses",
    plan_bus_back2_title: "\u00daltima vuelta de autobuses",
    plan_bus_back_area:   "Hasta Plaza Padre Jer\u00f3nimo de C\u00f3rdoba",
    plan_map_link:        "Ver mapa",
    preboda_eyebrow:      "Preboda",
    preboda_title:        "Cena la v\u00edspera",
    preboda_intro:        "El viernes 23 de octubre, quien quiera puede acercarse al Club Cultural Ferroviario para tomar algo. Nada formal: unas cervecitas (sin pasarse, que hay que reservarse para la boda jejeje) y buena compa\u00f1\u00eda.<br><br>No olvides confirmarlo en el formulario de asistencia.",
    preboda_event_title:  "Preboda",
    preboda_event_place:  "Sevilla \u00b7 Club Cultural Ferroviario",
    dress_eyebrow:     "Etiqueta",
    dress_title:       "Elegante, c\u00f3modo y con ganas de celebrar",
    dress_intro:       "Nos encantar\u00e1 veros guap\u00edsimos para una noche especial. Pensad en un look elegante de tarde-noche y en un calzado con el que pod\u00e1is bailar.",
    dress_pill_1:      "Traje.",
    dress_pill_2:      "Vestido largo.",
    dress_pill_3:      "Calzado c\u00f3modo para darlo todo.",
    rsvp_eyebrow:      "Asistencia",
    rsvp_title:        "Confirma tu asistencia",
    rsvp_intro:        "Para organizarlo todo con mimo, completa el formulario de asistencia e indica alergias, intolerancias o cualquier detalle. Fecha l\u00edmite: 31 de agosto de 2026.",
    rsvp_button:       "Abrir formulario de asistencia",
    photos_eyebrow:    "Fotos y v\u00eddeos",
    photos_title:      "Sube tus recuerdos del d\u00eda",
    photos_intro:      "Queremos revivir la boda desde todos los \u00e1ngulos. Sube tus fotos y v\u00eddeos a nuestra carpeta compartida.",
    photos_button:     "Abrir \u00e1lbum compartido",
    gifts_eyebrow:     "Mesa de regalos",
    gifts_title:       "Tu presencia es nuestro mejor regalo",
    gifts_intro:       "Si adem\u00e1s quieres tener un detalle con nosotros, aqu\u00ed os dejamos el número de cuenta:",
    gifts_button:      "ES67 0128 7820 8401 0408 1447",
    faq_eyebrow:       "Dudas",
    faq_title:         "Preguntas frecuentes",
    faq_q_bus:         "\u00bfHay autob\u00fas?",
    faq_a_bus:         "S\u00ed. Sale a las 19:30 desde Plaza Padre Jer\u00f3nimo de C\u00f3rdoba y vuelve a las 02:00 y a las 06:00 hasta la misma plaza.",
    faq_q_menu:        "\u00bfHabr\u00e1 men\u00fa adaptado?",
    faq_a_menu:        "Por supuesto. Indica alergias o intolerancias en el formulario de asistencia.",
    faq_q_deadline:    "\u00bfCu\u00e1ndo es la fecha l\u00edmite para confirmar asistencia?",
    faq_a_deadline:    "El 31 de agosto de 2026. As\u00ed podremos organizarlo todo con tiempo.",
    faq_q_weather:     "\u00bfQu\u00e9 tiempo puede hacer en Sevilla en esas fechas?",
    faq_a_weather:     "A finales de octubre en Sevilla suele hacer un tiempo agradable: d\u00edas soleados con temperaturas de unos 22\u201326\u00a0\u00b0C y noches m\u00e1s frescas, en torno a 14\u201318\u00a0\u00b0C. Lleva algo de abrigo para la noche y calzado c\u00f3modo.",
    faq_q_parking:     "\u00bfD\u00f3nde puedo aparcar?",
    faq_a_parking:     "Cerca de la iglesia hay varios parkings de pago. En el cortijo se puede aparcar, aunque pondremos autobuses de ida y vuelta para que no teng\u00e1is que preocuparos del coche.",
    faq_q_outdoor:     "\u00bfLa boda es al aire libre?",
    faq_a_outdoor:     "La ceremonia ser\u00e1 en el interior. Si el tiempo lo permite, el c\u00f3ctel y la cena ser\u00e1n en el exterior y la fiesta en el interior.",
    faq_q_shoes:       "\u00bfQu\u00e9 zapatos es m\u00e1s conveniente llevar?",
    faq_a_shoes:       "No recomendamos llevar tacones de aguja, ya que hay varias zonas de albero y empedrado y puede no ser lo m\u00e1s c\u00f3modo, as\u00ed que mejor optar por tacones un poco m\u00e1s anchos.<br><br>Aviso: no habr\u00e1 zapatos de recambio, as\u00ed que aseguraos de traer un calzado c\u00f3modo :)",
    gallery_eyebrow:   "Galer\u00eda",
    gallery_title:     "Un poco de nosotros",
    sevilla_eyebrow:   "Qu\u00e9 ver en Sevilla",
    sevilla_title:     "Aprovecha el viaje",
    sevilla_intro:     "Si te quedas unos d\u00edas, aqu\u00ed van algunos imprescindibles para exprimir la ciudad entre baile y baile.",
    visit_1_title:     "La Catedral y la Giralda",
    visit_1_desc:      "El templo g\u00f3tico m\u00e1s grande del mundo, con su antiguo minarete almohade reconvertido en campanario. Sube andando por las rampas y ll\u00e9vate la mejor vista de la ciudad.",
    visit_2_title:     "El Alc\u00e1zar",
    visit_2_desc:      "Un palacio real de mil vidas. Patios mud\u00e9jares, salones nazar\u00edes y jardines con naranjos y pavos reales donde se rod\u00f3 hasta Juego de Tronos.",
    visit_3_title:     "La Plaza de Espa\u00f1a",
    visit_3_desc:      "Joya de la Exposici\u00f3n Iberoamericana de 1929. Puentes, azulejos y un canal semicircular que se puede recorrer en barca al atardecer.",
    visit_4_title:     "Un paseo por el r\u00edo y Triana",
    visit_4_desc:      "Cruza el puente de Isabel II y descubre el barrio marinero: cer\u00e1mica, capillas cofrades y las mejores tapas frente al Guadalquivir.",
    visit_5_title:     "El barrio de Santa Cruz",
    visit_5_desc:      "Antigua juder\u00eda hecha de callejones, patios encalados y plazas escondidas. Pi\u00e9rdete al atardecer entre naranjos, farolas y el eco de una guitarra flamenca.",
    eat_eyebrow:       "D\u00f3nde comer",
    eat_title:         "Sitios que nos encantan",
    eat_intro:         "Para comer bien entre visita y visita. Reserva con antelaci\u00f3n, sobre todo en fin de semana.",
    eat_1_desc:        "El bar m\u00e1s antiguo de Espa\u00f1a. Tapas cl\u00e1sicas, jam\u00f3n en la barra y ambiente de toda la vida en el centro.",
    eat_2_desc:        "Taberna de barrio con solera, famosa por su ambiente aut\u00e9ntico y sin pretensiones.",
    eat_3_desc:        "Referente de la cocina tradicional sevillana. Buen sitio para una comida m\u00e1s tranquila con platos cl\u00e1sicos bien hechos.",
    eat_4_desc:        "Peque\u00f1o bar de tapas muy querido en el centro. Carta sencilla y casera de toda la vida.",
    eat_5_desc:        "Taberna con encanto en pleno centro. Tapas caseras y un rinc\u00f3n perfecto para parar a comer.",
    eat_6_desc:        "Un cl\u00e1sico de Sevilla. Buena comida y buen ambiente.",
    eat_7_desc:        "Conocida sobre todo por sus montaditos. Local con mucha personalidad y ambiente de bar de toda la vida.",
    eat_8_desc:        "Taberna tradicional muy cerca de la catedral. Tapas cl\u00e1sicas en un local con solera.",
    footer_thanks:     "Gracias por acompa\u00f1arnos en este cap\u00edtulo.",
    footer_contact_intro: "Si ten\u00e9is cualquier duda, no dud\u00e9is en contactarnos directamente.",
    footer_contact_maria: "Mar\u00eda: <a href=\"tel:+34633223156\">+34 633 223 156</a>",
    footer_contact_jose:  "Jos\u00e9 Mar\u00eda: <a href=\"tel:+34673534166\">+34 673 534 166</a>",
  },
  en: {
    meta_title:        "Mar\u00eda & Jos\u00e9 | October 24, 2026",
    meta_description:  "Digital wedding invitation. Seville, October 24, 2026.",
    hero_eyebrow:      "SEVILLE \u00b7 OCTOBER 24, 2026",
    hero_subtitle:     "We\u2019re getting married!",
    hero_cta_primary:  "Confirm attendance",
    scroll_down:       "Discover",
    countdown_title:   "Countdown",
    countdown_days:    "days",
    countdown_hours:   "hours",
    countdown_minutes: "min",
    countdown_seconds: "sec",
    countdown_note:    "Church of El Salvador \u00b7 5:30 PM",
    nav_inicio:        "Home",
    nav_plan:          "Itinerary",
    nav_preboda:       "Pre-wedding",
    nav_dresscode:     "Dress code",
    nav_asistencia:    "RSVP",
    nav_faq:           "FAQ",
    nav_regalos:       "Gifts",
    nav_fotos:         "Photos",
    nav_sevilla:       "What to see",
    nav_comer:         "Where to eat",
    about_eyebrow:     "Our story",
    about_title:       "A story of spontaneous plans and real excitement",
    about_p1:          "We are Mar\u00eda and Jos\u00e9. After five years together, we are getting married in Seville on October 24, 2026. We are so excited to share this day with you and spend an evening full of hugs, toasts, and music.",
    about_p2:          "On this website you will find all the information that may be useful for the wedding day or for planning your trip if you are travelling from afar. Thank you from the bottom of our hearts for being with us.",
    timeline_eyebrow:  "The plan",
    timeline_title:    "Where and when to find us",
    plan_ceremony_title:  "Ceremony",
    plan_ceremony_area:   "Historic centre of Seville",
    plan_bus_out_title:   "Buses depart",
    plan_bus_out_area:    "Meeting point for the transfer",
    plan_party_title:     "Cocktail, dinner & party",
    plan_party_area:      "Gerena, Seville",
    plan_bus_back1_title: "First return bus",
    plan_bus_back2_title: "Last return bus",
    plan_bus_back_area:   "To Plaza Padre Jer\u00f3nimo de C\u00f3rdoba",
    plan_map_link:        "Open map",
    preboda_eyebrow:      "Pre-wedding",
    preboda_title:        "Dinner the night before",
    preboda_intro:        "On Friday, October 23, anyone who would like to is welcome to join us at the Club Cultural Ferroviario for a drink. Nothing formal: a few beers (don\u2019t overdo it\u2014we need to save ourselves for the wedding, haha) and good company.<br><br>Don\u2019t forget to confirm on the attendance form.",
    preboda_event_title:  "Pre-wedding",
    preboda_event_place:  "Seville \u00b7 Club Cultural Ferroviario",
    dress_eyebrow:     "Dress code",
    dress_title:       "Elegant, comfortable, and ready to celebrate",
    dress_intro:       "We would love to see you looking your best for a special night. Think elegant afternoon-evening attire and shoes you can dance in.",
    dress_pill_1:      "Suit.",
    dress_pill_2:      "Long dress.",
    dress_pill_3:      "Comfortable shoes to give it your all.",
    rsvp_eyebrow:      "RSVP",
    rsvp_title:        "Confirm your attendance",
    rsvp_intro:        "To help us plan everything with care, please complete the attendance form and let us know about any allergies, intolerances, or other details. Deadline: August 31, 2026.",
    rsvp_button:       "Open attendance form",
    photos_eyebrow:    "Photos & videos",
    photos_title:      "Upload your memories of the day",
    photos_intro:      "We want to relive the wedding from every angle. Upload your photos and videos to our shared folder.",
    photos_button:     "Open shared album",
    gifts_eyebrow:     "Gifts",
    gifts_title:       "Your presence is our greatest gift",
    gifts_intro:       "If you would also like to give us a gift, here is our bank account number:",
    gifts_button:      "ES67 0128 7820 8401 0408 1447",
    faq_eyebrow:       "Questions",
    faq_title:         "Frequently asked questions",
    faq_q_bus:         "Is there a bus?",
    faq_a_bus:         "Yes. It leaves at 7:30 PM from Plaza Padre Jer\u00f3nimo de C\u00f3rdoba and returns at 2:00 AM and at 6:00 AM to the same square.",
    faq_q_menu:        "Will there be dietary options?",
    faq_a_menu:        "Of course. Please indicate any allergies or intolerances on the attendance form.",
    faq_q_deadline:    "What is the deadline to confirm attendance?",
    faq_a_deadline:    "August 31, 2026. That gives us enough time to organise everything properly.",
    faq_q_weather:     "What is the weather usually like in Seville at that time of year?",
    faq_a_weather:     "Late October in Seville is usually pleasant: sunny days around 22\u201326\u00a0\u00b0C and cooler nights around 14\u201318\u00a0\u00b0C. Bring something warm for the evening and comfortable shoes.",
    faq_q_parking:     "Where can I park?",
    faq_a_parking:     "There are several paid car parks near the church. You can also park at the venue, although we will provide return buses so you do not need to worry about driving.",
    faq_q_outdoor:     "Is the wedding outdoors?",
    faq_a_outdoor:     "The ceremony will be indoors. If the weather allows, the cocktail and dinner will be outdoors and the party indoors.",
    faq_q_shoes:       "What shoes are best to wear?",
    faq_a_shoes:       "We do not recommend stiletto heels, as there are several cobbled and gravel areas that may be uncomfortable, so wider heels are a better choice.<br><br>Please note: there will be no spare shoes available, so make sure you bring comfortable footwear :)",
    gallery_eyebrow:   "Gallery",
    gallery_title:     "A little about us",
    sevilla_eyebrow:   "What to see in Seville",
    sevilla_title:     "Make the most of your trip",
    sevilla_intro:     "If you are staying a few days, here are some must-sees to enjoy the city between dances.",
    visit_1_title:     "The Cathedral & the Giralda",
    visit_1_desc:      "The largest Gothic cathedral in the world, with its former Almohad minaret turned bell tower. Walk up the ramps for the best view in the city.",
    visit_2_title:     "The Alc\u00e1zar",
    visit_2_desc:      "A royal palace of many lives. Mud\u00e9jar courtyards, Nasrid halls, and gardens with orange trees and peacocks where Game of Thrones was filmed.",
    visit_3_title:     "Plaza de Espa\u00f1a",
    visit_3_desc:      "A jewel of the 1929 Ibero-American Exposition. Bridges, tiles, and a semicircular canal you can explore by boat at sunset.",
    visit_4_title:     "A walk along the river & Triana",
    visit_4_desc:      "Cross the Isabel II bridge and discover the riverside neighbourhood: ceramics, brotherhood chapels, and the best tapas facing the Guadalquivir.",
    visit_5_title:     "The Santa Cruz quarter",
    visit_5_desc:      "The old Jewish quarter of narrow lanes, whitewashed patios, and hidden squares. Get lost at dusk among orange trees, street lamps, and the echo of a flamenco guitar.",
    eat_eyebrow:       "Where to eat",
    eat_title:         "Places we love",
    eat_intro:         "For a good meal between sights. Book ahead, especially at weekends.",
    eat_1_desc:        "The oldest bar in Spain. Classic tapas, ham at the counter, and an old-school atmosphere in the city centre.",
    eat_2_desc:        "A neighbourhood tavern with real history, famous for its authentic, unpretentious atmosphere.",
    eat_3_desc:        "A benchmark for traditional Seville cooking. A good choice for a relaxed meal with well-made classic dishes.",
    eat_4_desc:        "A small, much-loved tapas bar in the centre. A simple, homely menu that has been the same for years.",
    eat_5_desc:        "A charming tavern in the heart of the city. Home-style tapas and a perfect spot for a bite.",
    eat_6_desc:        "A Seville classic. Good food and a great atmosphere.",
    eat_7_desc:        "Best known for its montaditos. A place full of character with a proper old-school bar feel.",
    eat_8_desc:        "A traditional tavern very close to the cathedral. Classic tapas in a venue with real history.",
    footer_thanks:     "Thank you for being part of this chapter.",
    footer_contact_intro: "If you have any questions, please feel free to contact us directly.",
    footer_contact_maria: "Mar\u00eda: <a href=\"tel:+34633223156\">+34 633 223 156</a>",
    footer_contact_jose:  "Jos\u00e9 Mar\u00eda: <a href=\"tel:+34673534166\">+34 673 534 166</a>",
  },
};

function applyLanguage(lang) {
  const selected = translations[lang] ? lang : "es";
  document.documentElement.lang = selected;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const text = translations[selected][node.dataset.i18n];
    if (text === undefined) return;
    if (node.hasAttribute("data-i18n-html")) {
      node.innerHTML = text;
    } else {
      node.textContent = text;
    }
  });

  const t = translations[selected];
  if (t.meta_title) document.title = t.meta_title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && t.meta_description) metaDesc.content = t.meta_description;

  if (langToggle) {
    langToggle.dataset.lang = selected;
    langToggle.querySelectorAll(".lang-opt").forEach((btn) => {
      btn.setAttribute("aria-pressed", btn.dataset.lang === selected ? "true" : "false");
    });
    langToggle.setAttribute(
      "aria-label",
      selected === "es" ? "Selector de idioma" : "Language selector"
    );
  }

  if (bgMusic) {
    setMusicPlaying(!bgMusic.paused);
  }

  if (navToggle && navToggle.getAttribute("aria-expanded") === "true") {
    navToggle.setAttribute(
      "aria-label",
      selected === "en" ? "Close navigation menu" : "Cerrar menú de navegación"
    );
  } else if (navToggle) {
    navToggle.setAttribute(
      "aria-label",
      selected === "en" ? "Open navigation menu" : "Abrir menú de navegación"
    );
  }

  try { localStorage.setItem("boda_lang", selected); } catch (_) {}
}

document.querySelectorAll(".lang-opt").forEach((btn) => {
  btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
});

// ── BACKGROUND MUSIC ──────────────────────────────────────────
const bgMusic     = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
let userPausedThisSession = false;

function setMusicPlaying(playing) {
  if (!musicToggle) return;
  musicToggle.setAttribute("aria-pressed", playing ? "true" : "false");
  musicToggle.setAttribute(
    "aria-label",
    playing
      ? (document.documentElement.lang === "en" ? "Pause La mujer de verde by Izal" : "Pausar La mujer de verde, de Izal")
      : (document.documentElement.lang === "en" ? "Play La mujer de verde by Izal" : "Reproducir La mujer de verde, de Izal")
  );
}

async function playMusic() {
  if (!bgMusic) return false;
  try {
    await bgMusic.play();
    setMusicPlaying(true);
    userPausedThisSession = false;
    return true;
  } catch (_) {
    setMusicPlaying(false);
    return false;
  }
}

function pauseMusic() {
  if (!bgMusic) return;
  bgMusic.pause();
  setMusicPlaying(false);
  userPausedThisSession = true;
}

async function attemptAutoplay() {
  if (!bgMusic || userPausedThisSession || !bgMusic.paused) return false;
  return playMusic();
}

async function toggleMusic() {
  if (!bgMusic) return;
  if (bgMusic.paused) {
    await playMusic();
  } else {
    pauseMusic();
  }
}

if (musicToggle) {
  musicToggle.addEventListener("click", toggleMusic);
}

if (bgMusic) {
  bgMusic.volume = 0.35;

  try { localStorage.removeItem("boda_music"); } catch (_) {}

  bgMusic.addEventListener("play",  () => setMusicPlaying(true));
  bgMusic.addEventListener("pause", () => setMusicPlaying(false));

  attemptAutoplay();
  bgMusic.addEventListener("canplaythrough", () => { attemptAutoplay(); }, { once: true });
  window.addEventListener("load", () => { attemptAutoplay(); }, { once: true });

  const startOnInteraction = () => { attemptAutoplay(); };
  ["click", "touchstart", "keydown", "scroll", "pointerdown"].forEach((eventName) => {
    document.addEventListener(eventName, startOnInteraction, { passive: true, once: true });
  });
}

// ── INIT ──────────────────────────────────────────────────────
updateCountdown();
setInterval(updateCountdown, 1000);
onScroll();

try { applyLanguage(localStorage.getItem("boda_lang") || "es"); }
catch (_) { applyLanguage("es"); }

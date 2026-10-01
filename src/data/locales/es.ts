import type { Dictionary } from '@/data/locales/types'

/** Neutral Spanish. Mirrors the English source (see en.ts). */
export const es: Dictionary = {
  locale: 'es',
  siteName: 'Video Hunter',
  telegramHandle: '@MyVideoHunterBot',

  nav: {
    home: 'Inicio',
    telegram: 'Bot de Telegram',
    faq: 'FAQ',
    policy: 'Política de privacidad',
    library: 'Tu biblioteca',
    signIn: 'Iniciar sesión',
    signOut: 'Cerrar sesión',
    language: 'Idioma',
    toggleNavigation: 'Alternar navegación',
  },

  footer: {
    copyright: '© {year} Video Hunter. Todos los derechos reservados.',
    telegram: 'Telegram',
  },

  form: {
    placeholder: 'Pega un enlace de video (X, Reddit, Bluesky)',
    videoUrlLabel: 'URL del video',
    download: 'Descargar',
    processing: 'Procesando tu solicitud, espera un momento…',
    linkDetected: 'Enlace de {platform} detectado',
    checkLink: 'Revisa el enlace:',
    sorry: 'Lo sentimos:',
    close: 'Cerrar',
  },

  howTo: {
    fallbackHeading: 'Cómo funciona',
  },

  platformLinks: {
    heading: 'Descarga videos de otras plataformas',
    lead: 'Video Hunter también descarga videos de:',
    note: 'Asegúrate de tener derecho a descargar el contenido que guardas. Video Hunter transmite los videos directamente desde la red de distribución de contenido de la plataforma y no los almacena.',
  },

  platformPage: {
    faqHeading: 'Preguntas frecuentes sobre videos de {platform}',
  },

  errors: {
    invalidLink: 'Ingresa un enlace válido a una publicación de X (Twitter), Reddit o Bluesky.',
    notSupported: 'Ese enlace no es compatible. Pega un enlace de X, Reddit o Bluesky.',
    noVideo:
      'Esa publicación no tiene un video descargable. Puede haber sido eliminada o no ser un video.',
    serviceBusy: 'La plataforma no responde en este momento. Vuelve a intentarlo en un momento.',
    fetchFailed: 'Algo salió mal al obtener el video. Vuelve a intentarlo.',
    unexpectedResponse: 'Respuesta inesperada del servidor. Vuelve a intentarlo.',
    downloadReady: 'Tu descarga está lista: se está abriendo ahora.',
    network: 'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.',
  },

  auth: {
    unavailable: 'El inicio de sesión no está disponible en este momento.',
    unverified: 'No se pudo verificar esa respuesta de inicio de sesión. Vuelve a intentarlo.',
    noToken: 'El servicio de inicio de sesión no devolvió un token.',
    malformedToken: 'El servicio de inicio de sesión devolvió un token con formato incorrecto.',
    rejected: 'El servicio de inicio de sesión rechazó la solicitud.',
    displayNameFallback: 'Tú',
  },

  common: {
    backToDownloader: 'Volver al descargador',
    signInUnavailable: {
      before:
        'El inicio de sesión no está disponible en este momento. Aún puedes descargar videos desde la ',
      link: 'página de inicio',
      after: '.',
    },
  },

  home: {
    seo: {
      title: 'Video Hunter — Descargador de videos gratis para X (Twitter), Reddit y Bluesky',
      description:
        'Descarga videos de X (Twitter), Reddit y Bluesky gratis. Pega un enlace de video y guárdalo en HD en segundos, sin registro y sin marca de agua. También disponible como bot de Telegram.',
    },
    websiteDescription: 'Descargador de videos en línea gratis para X (Twitter), Reddit y Bluesky.',
    appDescription:
      'Descarga videos de X (Twitter), Reddit y Bluesky. Pega un enlace de video y guárdalo en HD en segundos.',
    featureList: [
      'Descargar videos de X (Twitter)',
      'Descargar videos de Reddit',
      'Descargar videos de Bluesky',
      'Descargar videos con un bot de Telegram',
    ],
    heroTitle: 'Descargador de videos gratis para X (Twitter), Reddit y Bluesky',
    heroLead:
      'Guarda videos de X (Twitter), Reddit y Bluesky fácilmente. Pega el enlace, haz clic en descargar y listo.',
    aboutTitle: 'Descargas de video fluidas desde X, Reddit y Bluesky',
    aboutBodyBefore: '¿Te frustra no poder guardar videos de tus plataformas favoritas? ',
    aboutBodyAfter:
      ' ofrece una solución simple y rápida para descargar videos de X (antes Twitter), Reddit y Bluesky (bsky) directamente a tu computadora o dispositivo móvil. Toma el enlace del video, pégalo en nuestro descargador y guarda tu video en unos momentos.',
    legalNote:
      'Nota: Video Hunter respeta a los creadores de contenido. Todos los videos se transmiten directamente desde las respectivas redes de distribución de contenido. Asegúrate de tener derecho a descargar el contenido.',
    stepsTitle: 'Pasos simples para descargar tus videos',
    steps: [
      { name: 'Encuentra tu video', text: 'Ve al video en X, Reddit o Bluesky.' },
      {
        name: 'Copia la URL',
        text: 'Copia la URL del video desde tu navegador o el menú de compartir.',
      },
      { name: 'Pega y descarga', text: 'Pega el enlace en Video Hunter y haz clic en Descargar.' },
      {
        name: 'Guárdalo',
        text: 'Tu video se procesa y queda listo para guardar en unos momentos.',
      },
    ],
    platformsTitle: 'Plataformas compatibles',
    preferChatting: {
      before: '¿Prefieres chatear? Envía los enlaces al ',
      link: 'bot de Telegram de Video Hunter',
      after: ' en su lugar.',
    },
    telegramTitle: '¿Prefieres Telegram? ¡Usa nuestro bot de Video Hunter!',
    telegramLead: {
      before: 'Para mayor comodidad, envía enlaces de video directamente a nuestro ',
      link: 'MyVideoHunterBot',
      after:
        ' en Telegram. Es una forma rápida y sencilla de descargar videos dondequiera que estés, directamente desde tu app de chat.',
    },
    imageAltAbout: 'Ilustración del proceso de descarga de videos de Video Hunter',
    imageAltTelegram: 'Bot de Telegram para descargar videos con Video Hunter',
  },

  platforms: {
    x: {
      name: 'X (Twitter)',
      seo: {
        title: 'Descargador de videos de X (Twitter) — Guarda videos en HD | Video Hunter',
        description:
          'Descarga videos de X (Twitter) gratis. Pega el enlace de la publicación y guarda el video en HD en tu teléfono o computadora: sin registro, sin marca de agua y sin necesidad de instalar una app.',
      },
      heading: 'Descargador de videos de X (Twitter)',
      lead: 'Pega el enlace de una publicación de X y guarda el video en HD. Gratis, sin registro y sin marca de agua.',
      blurb: 'Guarda videos de publicaciones e hilos en x.com y twitter.com.',
      howToHeading: 'Cómo descargar un video de X (Twitter)',
      howTo: [
        {
          name: 'Copia el enlace de la publicación',
          text: 'Abre la publicación con el video en X y copia su enlace (toca Compartir y luego Copiar enlace).',
        },
        {
          name: 'Pega el enlace',
          text: 'Pega el enlace en el cuadro de arriba y haz clic en Descargar.',
        },
        {
          name: 'Elige una calidad',
          text: 'Video Hunter encuentra el video y muestra todas las calidades disponibles.',
        },
        {
          name: 'Guárdalo',
          text: 'Haz clic en la calidad que quieras y el video se guarda en tu dispositivo.',
        },
      ],
      faq: [
        {
          platform: 'x',
          question: '¿Puedo descargar videos de X (Twitter) gratis?',
          answer:
            'Sí. Video Hunter descarga videos de X gratis, sin cuenta y sin marca de agua.',
        },
        {
          platform: 'x',
          question: '¿Necesito la app de X o una cuenta para descargar un video?',
          answer:
            'No. Solo necesitas el enlace de la publicación. Video Hunter obtiene el video por ti, así que no necesitas iniciar sesión en X.',
        },
        {
          platform: 'x',
          question: '¿Qué calidad de video puedo obtener de X?',
          answer:
            'La que X proporcione para ese video, normalmente desde 480p hasta 1080p o la resolución original.',
        },
        {
          platform: 'x',
          question: '¿Por qué no puedo descargar un video específico de X?',
          answer:
            'Puede que la publicación haya sido eliminada, que la cuenta sea privada o que el video esté restringido en tu región. Las imágenes y los GIF no se pueden descargar, solo los videos.',
        },
        {
          platform: 'x',
          question: '¿Cómo guardo un video de X en un iPhone?',
          answer:
            'Mantén presionado el botón de descarga y elige Descargar archivo enlazado, o usa un gestor de archivos como Documents by Readdle para guardar el video.',
        },
      ],
      note: 'Funcionan tanto los enlaces de x.com como los de twitter.com, incluidos los enlaces a publicaciones dentro de un hilo o un tuit citado.',
    },
    reddit: {
      name: 'Reddit',
      seo: {
        title: 'Descargador de videos de Reddit — Guarda videos con sonido | Video Hunter',
        description:
          'Descarga videos de Reddit gratis y con sonido. Pega el enlace de la publicación y guarda el MP4 en tu teléfono o computadora: sin registro y sin marca de agua.',
      },
      heading: 'Descargador de videos de Reddit',
      lead: 'Pega el enlace de una publicación de Reddit y guarda el video con sonido. Gratis, sin registro y sin marca de agua.',
      blurb: 'Descarga videos de Reddit con su audio, desde reddit.com u old.reddit.com.',
      howToHeading: 'Cómo descargar un video de Reddit',
      howTo: [
        {
          name: 'Copia el enlace de la publicación',
          text: 'Abre la publicación de Reddit con el video y copia su enlace (toca Compartir y luego Copiar enlace).',
        },
        {
          name: 'Pega el enlace',
          text: 'Pega el enlace en el cuadro de arriba y haz clic en Descargar.',
        },
        {
          name: 'Espera el archivo',
          text: 'Video Hunter devuelve el archivo de video, con su audio.',
        },
        {
          name: 'Guárdalo',
          text: 'Haz clic en descargar y el video se guarda en tu dispositivo.',
        },
      ],
      faq: [
        {
          platform: 'reddit',
          question: '¿Puedo descargar videos de Reddit con sonido?',
          answer:
            'Sí. Reddit guarda el video y el audio en transmisiones separadas, y Video Hunter las entrega combinadas para que el archivo que descargues se reproduzca con sonido.',
        },
        {
          platform: 'reddit',
          question: '¿Qué enlaces de Reddit son compatibles?',
          answer:
            'Funcionan los enlaces de reddit.com y old.reddit.com, incluidas las publicaciones compartidas desde la app móvil de Reddit. Solo se pueden descargar publicaciones públicas.',
        },
        {
          platform: 'reddit',
          question: '¿Por qué se descargó un video sin audio?',
          answer:
            'Normalmente eso significa que se guardó la lista de reproducción HLS en lugar del MP4 combinado. Usa el botón de descarga de esta página en vez de guardar la transmisión directamente.',
        },
        {
          platform: 'reddit',
          question: '¿Puedo descargar de subreddits privados?',
          answer: 'No, solo se pueden descargar publicaciones públicas.',
        },
      ],
      note: 'Reddit sirve la misma publicación desde reddit.com, old.reddit.com y www.reddit.com; se aceptan las tres, y los enlaces compartidos desde la app se resuelven automáticamente.',
    },
    bluesky: {
      name: 'Bluesky',
      seo: {
        title: 'Descargador de videos de Bluesky — Guarda videos de bsky gratis | Video Hunter',
        description:
          'Descarga videos de Bluesky (bsky) gratis. Pega el enlace de la publicación y guarda el video en tu teléfono o computadora: sin registro, sin marca de agua y sin necesidad de instalar una app.',
      },
      heading: 'Descargador de videos de Bluesky',
      lead: 'Pega el enlace de una publicación de bsky.app y guarda el video. Gratis, sin registro y sin marca de agua.',
      blurb: 'Obtén videos de publicaciones de bsky.app, en computadora o en móvil.',
      howToHeading: 'Cómo descargar un video de Bluesky',
      howTo: [
        {
          name: 'Copia el enlace de la publicación',
          text: 'Abre la publicación de Bluesky con el video y copia su enlace (toca Compartir y luego Copiar enlace).',
        },
        {
          name: 'Pega el enlace',
          text: 'Pega el enlace de bsky.app en el cuadro de arriba y haz clic en Descargar.',
        },
        {
          name: 'Espera el archivo',
          text: 'Video Hunter obtiene el video de Bluesky.',
        },
        {
          name: 'Guárdalo',
          text: 'Haz clic en descargar y el video se guarda en tu dispositivo.',
        },
      ],
      faq: [
        {
          platform: 'bluesky',
          question: '¿Puedo descargar videos de Bluesky gratis?',
          answer:
            'Sí. Video Hunter descarga videos de Bluesky gratis, sin cuenta y sin marca de agua.',
        },
        {
          platform: 'bluesky',
          question: '¿Necesito una cuenta de Bluesky para descargar un video?',
          answer:
            'No. Solo necesitas el enlace de una publicación pública, así que puedes descargar videos sin iniciar sesión en Bluesky.',
        },
        {
          platform: 'bluesky',
          question: '¿Qué enlaces de Bluesky son compatibles?',
          answer:
            'Son compatibles los enlaces con el formato bsky.app/profile/handle/post/id, incluidas las publicaciones de cuentas en dominios personalizados y las compartidas desde la app de Bluesky.',
        },
        {
          platform: 'bluesky',
          question: '¿Por qué falla la descarga de un video de Bluesky?',
          answer:
            'Puede que la publicación haya sido eliminada, que la cuenta haya sido suspendida o que la publicación no contenga un video. Solo se pueden descargar las publicaciones con un video adjunto.',
        },
      ],
      note: 'Los enlaces de Bluesky tienen el formato https://bsky.app/profile/handle/post/id.',
    },
  },

  telegram: {
    seo: {
      title: 'Bot de Telegram de Video Hunter — Descarga videos en el chat | Video Hunter',
      description:
        'Envía un enlace de video a @MyVideoHunterBot en Telegram y recibe un enlace de descarga. Funciona con X (Twitter), Reddit y Bluesky. Gratis, sin registro y directamente en tu app de chat.',
    },
    heading: 'Bot de Telegram de Video Hunter',
    lead: 'Envía un enlace de video en Telegram y recibe un enlace de descarga. Sin apps que instalar y sin registro.',
    openBot: 'Abrir @MyVideoHunterBot',
    howToHeading: 'Cómo descargar videos con el bot',
    howTo: [
      { name: 'Abre el bot', text: 'Abre @MyVideoHunterBot en Telegram y presiona Iniciar.' },
      {
        name: 'Envía un enlace de video',
        text: 'Envía el enlace a una publicación con un video de X (Twitter), Reddit o Bluesky.',
      },
      {
        name: 'Recibe tu enlace de descarga',
        text: 'El bot responde con un enlace de descarga que puedes abrir en cualquier dispositivo.',
      },
    ],
    worksOn: 'Funciona en la app de Telegram para iOS, Android, escritorio y en el cliente web.',
    faqHeading: 'Preguntas frecuentes sobre el bot',
    faq: [
      { question: '¿El bot es gratis?', answer: 'Sí, y no necesita registro.' },
      {
        question: '¿Qué plataformas admite?',
        answer: 'X (Twitter), Reddit y Bluesky: las mismas plataformas que el sitio web.',
      },
      {
        question: '¿Por qué no respondió el bot?',
        answer:
          'Puede estar ocupado o limitado por la plataforma. Espera un momento y vuelve a enviar el enlace, y asegúrate de que la publicación sea pública y contenga un video.',
      },
      {
        question: '¿El bot guarda mis videos?',
        answer:
          'No. Los videos se transmiten directamente desde la red de distribución de contenido de la plataforma y no se almacenan en nuestros servidores.',
      },
    ],
    preferTitle: '¿Prefieres el sitio web?',
    preferLead: {
      before: 'También puedes pegar un enlace directamente en la ',
      link: 'página de inicio de Video Hunter',
      after: ' o usar una página dedicada para tu plataforma:',
    },
  },

  faq: {
    seo: {
      title: 'Preguntas frecuentes del descargador de videos — Video Hunter',
      description:
        'Preguntas frecuentes sobre cómo descargar videos de X (Twitter), Reddit y Bluesky con Video Hunter: plataformas compatibles, calidad de video, cómo guardarlos en iOS, límites y privacidad.',
    },
    heading: 'Preguntas frecuentes',
    lead: {
      before:
        'Todo lo que necesitas saber para descargar videos con Video Hunter. ¿Sigues con dudas? ',
      homeLink: 'Pega un enlace en la página de inicio',
      between: ' o escribe a ',
      after: ' en Telegram.',
    },
    entries: [
      {
        question: '¿Cómo descargo un video de X (Twitter), Reddit o Bluesky?',
        answer:
          'Copia el enlace de la publicación que contiene el video, pégalo en el cuadro de la página de inicio de Video Hunter y haz clic en Descargar. Video Hunter encuentra el video y muestra un botón de descarga para cada calidad que ofrece la plataforma.',
      },
      {
        question: '¿Video Hunter es gratis?',
        answer:
          'Sí. Video Hunter es gratis y no necesitas una cuenta para descargar un video. Los videos se transmiten directamente desde las redes de distribución de contenido de las plataformas y no se almacenan en nuestros servidores.',
      },
      {
        question: '¿Necesito una cuenta para usar Video Hunter?',
        answer:
          'No. La descarga funciona sin cuenta y sin registro, y siempre será así. Una cuenta gratuita opcional solo añade dos cosas: guardar en carpetas los videos que encuentras y publicar en el chat de una página de video. Puedes iniciar sesión con una dirección de correo electrónico o una cuenta de Google, y puedes eliminar la cuenta, y todo lo que contiene, cuando quieras.',
      },
      {
        question: '¿Cómo funciona el chat de una página de video?',
        answer:
          'Cada página de video tiene una sala de chat sobre ese video, y cualquiera puede leerla. Para publicar se necesita una cuenta gratuita, que es lo que evita que la sala se llene de spam. Escribes bajo un apodo que se genera para ti, nunca tu dirección de correo electrónico, y puedes cambiarlo desde tu biblioteca. Puedes eliminar tus propios mensajes, reportar un mensaje o bloquear una cuenta para dejar de ver lo que escribe.',
      },
      {
        question: '¿Puedo descargar videos con un bot de Telegram en su lugar?',
        answer:
          'Sí. Envía el enlace del video a @MyVideoHunterBot en Telegram y el bot responde con un enlace de descarga.',
      },
      {
        question: 'No puedo guardar archivos en mi iPhone o iPad. ¿Qué debería hacer?',
        answer:
          'Safari en iOS a menudo abre el video en un reproductor en lugar de guardarlo. Mantén presionado el botón de descarga y elige Descargar archivo enlazado, o usa un gestor de archivos como Documents by Readdle para guardar el video en tu dispositivo.',
      },
      {
        question: '¿Qué hago si el video se reproduce en lugar de descargarse?',
        answer:
          'En el móvil, mantén presionado el video hasta que aparezcan las opciones de descarga. En la computadora, haz clic derecho en el video y selecciona Guardar enlace como.',
      },
      {
        question: '¿Dónde se guardan los archivos que descargué?',
        answer:
          'Los videos descargados se guardan en la carpeta de descargas predeterminada de tu dispositivo.',
      },
      {
        question: '¿Por qué no puedo descargar un video específico?',
        answer:
          'Puede que la publicación haya sido eliminada, que la cuenta sea privada o que el video esté restringido en tu región. Solo se admiten videos: las imágenes y los GIF no se pueden descargar.',
      },
      {
        question: '¿Hay un límite diario de descargas?',
        answer:
          'No hay límite de descargas en el sitio web. El bot de Telegram y los bots de respuesta de X pueden limitar las respuestas en periodos de mucha actividad.',
      },
      {
        question: '¿Video Hunter guarda los videos que descargo?',
        answer:
          'No. Video Hunter no almacena videos en sus servidores. Es un proxy que transmite el video directamente desde la red de distribución de contenido de la plataforma.',
      },
      {
        question: '¿Qué calidades de video puedo descargar?',
        answer:
          'Las que proporcione la plataforma, normalmente desde 480p hasta 1080p o la resolución original. Video Hunter muestra un botón de descarga por cada calidad disponible.',
      },
    ],
    legalNote:
      'Asegúrate de tener derecho a descargar el contenido que guardas. Video Hunter respeta a los creadores de contenido.',
  },

  policy: {
    seo: {
      title: 'Política de privacidad — Video Hunter',
      description:
        'Cómo maneja Video Hunter la información cuando descargas videos de X (Twitter), Reddit y Bluesky: archivos de registro, cookies, Google Analytics, Google AdSense y los datos opcionales de cuenta y chat si inicias sesión.',
    },
    heading: 'Política de privacidad',
    updated: 'Última actualización: octubre de 2026',
    intro:
      'Video Hunter (myvideohunter.com) es una herramienta gratuita que descarga videos de X (Twitter), Reddit y Bluesky. Esta página explica qué información se procesa cuando la usas.',
    notCollectedHeading: 'Lo que no recopilamos',
    notCollected: [
      'Descargar un video nunca requiere una cuenta: puedes usar el descargador sin darnos ninguna información.',
      'No almacenamos los videos que descargas. Se transmiten desde la propia red de distribución de contenido de la plataforma.',
      'No vendemos información personal y no mostramos tu dirección de correo electrónico a nadie.',
    ],
    processedHeading: 'Lo que se procesa',
    processedServer: {
      term: 'Registros del servidor y la CDN.',
      text: 'Nuestro proveedor de alojamiento y distribución de contenido registra datos estándar de las solicitudes: dirección IP, tipo de navegador, la página solicitada y marcas de tiempo. Esto se usa para operar el servicio y detectar abusos.',
    },
    processedLinks: {
      term: 'Los enlaces que envías.',
      text: 'Cuando pegas un enlace, se envía a nuestra API para poder resolver el video. La página resuelta se almacena para poder servir el mismo enlace de nuevo; contiene el texto de la publicación, la miniatura y las URL de descarga, pero no ninguna información sobre ti.',
    },
    processedAnalytics: {
      term: 'Google Analytics.',
      text: 'Usamos Google Analytics para entender cómo se utiliza el sitio (páginas vistas, ubicación aproximada, tipo de dispositivo). Establece cookies y recibe tu dirección IP. Consulta la ',
      link: 'política de privacidad de Google',
      after: '.',
    },
    processedAdsense: {
      term: 'Google AdSense.',
      text: 'La publicidad de este sitio la sirve Google. Google y sus socios usan cookies (incluida la cookie de DoubleClick) para mostrar anuncios basados en tus visitas a este y otros sitios. Puedes desactivar la publicidad personalizada en la ',
      link: 'Configuración de anuncios de Google',
      between: ' o en ',
      link2: 'aboutads.info',
      after: '.',
    },
    signInHeading: 'Si inicias sesión (opcional)',
    signInIntro:
      'Iniciar sesión es opcional y solo añade dos cosas: guardar videos en carpetas y publicar en el chat de una página de video. Las cuentas las gestiona Amazon Cognito. Si inicias sesión con una dirección de correo electrónico, creas una contraseña allí; si inicias sesión con Google, recibimos tu dirección de correo electrónico y tu nombre de Google. Nunca vemos ni almacenamos tu contraseña.',
    signInLead:
      'Cuando has iniciado sesión, almacenamos, asociado a un identificador interno de cuenta:',
    signInItems: [
      {
        term: 'Tus carpetas y videos guardados.',
        text: 'El nombre de una carpeta y el identificador de cada video que guardaste. El video en sí no se copia.',
      },
      {
        term: 'Tu apodo.',
        text: 'Se genera un apodo para ti y es el único nombre que se muestra en el chat. No se deriva de tu dirección de correo electrónico y puedes cambiarlo en cualquier momento.',
      },
      {
        term: 'Tus mensajes de chat',
        text: ', almacenados con ese apodo y ningún otro nombre.',
      },
      {
        term: 'Tu lista de bloqueados',
        text: ', si bloqueas una cuenta en el chat.',
      },
    ],
    chatHeading: 'Chat',
    chatBody1:
      'La sala de chat de una página de video es pública: cualquiera que visite esa página puede leerla, tenga o no una cuenta. Para publicar es necesario iniciar sesión. Los mensajes se almacenan hasta 30 días y luego se eliminan automáticamente, junto con el apodo asociado. No publiques información personal: todo lo que escribas puede ser leído por cualquiera, y por nosotros cuando se reporta un mensaje.',
    chatBody2:
      'Puedes eliminar tus propios mensajes, reportar un mensaje o bloquear una cuenta. Los mensajes reportados se conservan para su revisión hasta 90 días para que podamos actuar ante abusos, lo cual es necesario para mantener la publicidad en estas páginas. Eliminar tu cuenta elimina los reportes que presentaste con ella.',
    cookiesHeading: 'Cookies y almacenamiento local',
    cookiesBody1:
      'Las cookies de este sitio provienen de Google Analytics y Google AdSense. Puedes bloquearlas o eliminarlas en la configuración de tu navegador; el descargador funciona sin cookies.',
    cookiesBody2:
      'Si inicias sesión, tu sesión se guarda en el almacenamiento local de tu navegador, no en una cookie. Cerrar sesión o borrar los datos del sitio la elimina.',
    rightsHeading: 'Tus derechos',
    rights: {
      before:
        'Si estás en el EEA o el UK (GDPR) o en California (CCPA), puedes solicitar acceso a tus datos personales, su corrección o su eliminación, y puedes oponerte a su procesamiento. Puedes eliminar tu propia cuenta, y todo lo que se guarda con ella, desde la página ',
      link: 'Tu biblioteca',
      after:
        ': las carpetas, los videos guardados, tus mensajes de chat y tu lista de bloqueados se eliminan con ella. Si prefieres que lo hagamos nosotros, contáctanos con los datos que aparecen abajo. Las solicitudes sobre datos de analítica y publicidad se refieren a datos controlados por Google; ayudaremos en lo que podamos.',
    },
    childrenHeading: 'Menores',
    childrenBody:
      'Este servicio no está dirigido a menores de 13 años y no recopilamos deliberadamente su información personal.',
    contactHeading: 'Contacto',
    contact: {
      before: 'Para cualquier solicitud de privacidad, escríbenos por Telegram a ',
      after: '.',
    },
    copyrightHeading: 'Derechos de autor',
    copyrightBody:
      'Video Hunter no aloja videos. Asegúrate de tener derecho a descargar el contenido que guardas y respeta los derechos de los creadores de contenido.',
    backToDownloader: 'Volver al descargador de videos',
  },

  login: {
    seo: {
      title: 'Iniciar sesión — Video Hunter',
      description:
        'Inicia sesión en Video Hunter para guardar en carpetas los videos que encuentras y participar en el chat de una página de video. Descargar videos nunca requiere una cuenta.',
    },
    heading: 'Iniciar sesión',
    lead: 'Una cuenta es opcional. Te permite guardar en carpetas los videos que encuentras y participar en el chat de una página de video. Descargar nunca requiere una.',
    startError: 'No pudimos iniciar el proceso de inicio de sesión. Vuelve a intentarlo en un momento.',
    opening: 'Abriendo la página de inicio de sesión…',
    continueLabel: 'Continuar',
    cognitoNote:
      'Te llevaremos a Amazon Cognito, donde puedes iniciar sesión con una dirección de correo electrónico o una cuenta de Google. Video Hunter nunca ve tu contraseña.',
  },

  library: {
    seo: {
      title: 'Tu biblioteca — Video Hunter',
      description: 'Los videos que guardaste, organizados en las carpetas que elijas.',
    },
    heading: 'Tu biblioteca',
    sessionEnded: 'Tu sesión ha finalizado. Inicia sesión de nuevo.',
    genericError: 'Algo salió mal. Vuelve a intentarlo.',
    deletedTitle: 'Tu cuenta ha sido eliminada',
    deletedBody:
      'Tus carpetas, los videos guardados en ellas y tus mensajes de chat ya no existen. Descargar sigue funcionando sin cuenta, y puedes crear una nueva cuando quieras.',
    signInLead:
      'Inicia sesión para guardar los videos que encuentras, organizados en las carpetas que elijas.',
    loading: 'Cargando tus carpetas…',
    newFolderName: 'Nombre de la nueva carpeta',
    createFolder: 'Crear carpeta',
    emptyFoldersBefore: 'Aún no tienes carpetas. Crea una y luego usa el botón ',
    emptyFoldersStrong: 'Guardar en carpeta',
    emptyFoldersAfter: ' en cualquier página de video.',
    savedCount: '{count} guardados',
    rename: 'Cambiar nombre',
    delete: 'Eliminar',
    save: 'Guardar',
    cancel: 'Cancelar',
    nothingSaved: 'Todavía no hay nada guardado aquí.',
    open: 'Abrir',
    remove: 'Quitar',
    confirmDeleteFolder: '¿Eliminar "{name}" y los videos guardados en ella?',
    nicknameHeading: 'Tu apodo en el chat',
    nicknameHelp:
      'Se generó un apodo para ti y es el único nombre que muestra una sala de chat. No es tu dirección de correo electrónico y nada más de tu cuenta es público.',
    nicknameLabel: 'Apodo',
    nicknamePlaceholder: 'Tu apodo',
    saveNickname: 'Guardar apodo',
    nicknameSaved: 'Guardado. Tu nuevo apodo ya se muestra en el chat.',
    blocksHeading: 'Bloqueados en el chat',
    blocksHelp:
      'Ya no ves los mensajes de estas cuentas en ninguna sala de chat. Bloquear solo afecta lo que tú ves.',
    unblock: 'Desbloquear',
    deleteAccountHeading: 'Eliminar tu cuenta',
    deleteAccountBody:
      'Esto elimina tu cuenta y todo lo que se guarda con ella: tus carpetas, los videos guardados en ellas, tus mensajes de chat y tu lista de bloqueados. Los videos que ya descargaste permanecen en tu dispositivo. No se puede deshacer.',
    deleteAccountButton: 'Eliminar mi cuenta',
    deleteAccountConfirm: '¿Eliminar tu cuenta y todo lo que contiene?',
    deleting: 'Eliminando…',
    deleteAccountYes: 'Sí, eliminar mi cuenta',
    videoFallback: 'Video',
  },

  authCallback: {
    seo: {
      title: 'Iniciando sesión — Video Hunter',
      description: 'Completando el inicio de sesión.',
    },
    signingIn: 'Iniciando tu sesión…',
    failedHeading: 'No se pudo iniciar sesión',
    tryAgain: 'Intentar de nuevo',
    errorFallback: 'El inicio de sesión no se completó. Vuelve a intentarlo.',
  },

  notFound: {
    seo: {
      title: 'Página no encontrada — Video Hunter',
      description:
        'Esta página no existe. Descarga videos de X (Twitter), Reddit y Bluesky desde la página de inicio de Video Hunter.',
    },
    heading: 'Página no encontrada',
    lead: 'La página que buscas no existe. Pega un enlace de video abajo para descargar un video de X (Twitter), Reddit o Bluesky.',
    goHome: 'Ir a la página de inicio de Video Hunter',
    orRead: ' o lee las ',
    faqLink: 'FAQ',
  },
}

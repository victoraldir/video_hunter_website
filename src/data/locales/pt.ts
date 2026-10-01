import type { Dictionary } from '@/data/locales/types'

/** Brazilian Portuguese. Mirrors the English source (see en.ts). */
export const pt: Dictionary = {
  locale: 'pt',
  siteName: 'Video Hunter',
  telegramHandle: '@MyVideoHunterBot',

  nav: {
    home: 'Início',
    telegram: 'Bot do Telegram',
    faq: 'FAQ',
    policy: 'Política de Privacidade',
    library: 'Sua biblioteca',
    signIn: 'Entrar',
    signOut: 'Sair',
    language: 'Idioma',
    toggleNavigation: 'Alternar navegação',
  },

  footer: {
    copyright: '© {year} Video Hunter. Todos os direitos reservados.',
    telegram: 'Telegram',
  },

  form: {
    placeholder: 'Cole o link de um vídeo (X, Reddit, Bluesky)',
    videoUrlLabel: 'URL do vídeo',
    download: 'Baixar',
    processing: 'Processando sua solicitação, aguarde…',
    linkDetected: 'Link do {platform} detectado',
    checkLink: 'Verifique o link:',
    sorry: 'Desculpe:',
    close: 'Fechar',
  },

  howTo: {
    fallbackHeading: 'Como funciona',
  },

  platformLinks: {
    heading: 'Baixe vídeos de outras plataformas',
    lead: 'O Video Hunter também baixa vídeos de:',
    note: 'Certifique-se de que você tem o direito de baixar o conteúdo que salva. O Video Hunter transmite os vídeos diretamente da rede de distribuição de conteúdo da plataforma e não os armazena.',
  },

  platformPage: {
    faqHeading: 'Perguntas frequentes sobre vídeos do {platform}',
  },

  errors: {
    invalidLink: 'Insira um link válido de uma publicação do X (Twitter), Reddit ou Bluesky.',
    notSupported: 'Esse link não é compatível. Cole um link do X, Reddit ou Bluesky.',
    noVideo: 'Essa publicação não tem um vídeo para baixar. Ela pode ter sido excluída ou pode não ser um vídeo.',
    serviceBusy: 'A plataforma não está respondendo no momento. Tente novamente em instantes.',
    fetchFailed: 'Algo deu errado ao buscar o vídeo. Tente novamente.',
    unexpectedResponse: 'Resposta inesperada do servidor. Tente novamente.',
    downloadReady: 'Seu download está pronto — abrindo agora.',
    network: 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.',
  },

  auth: {
    unavailable: 'O login não está disponível no momento.',
    unverified: 'Não foi possível verificar essa resposta de login. Tente novamente.',
    noToken: 'O serviço de login não retornou um token.',
    malformedToken: 'O serviço de login retornou um token inválido.',
    rejected: 'O serviço de login rejeitou a solicitação.',
    displayNameFallback: 'Você',
  },

  common: {
    backToDownloader: 'Voltar para o baixador',
    signInUnavailable: {
      before: 'O login não está disponível no momento. Você ainda pode baixar vídeos na ',
      link: 'página inicial',
      after: '.',
    },
  },

  home: {
    seo: {
      title: 'Video Hunter — Baixador de Vídeos Gratuito para X (Twitter), Reddit e Bluesky',
      description:
        "Baixe vídeos do X (Twitter), Reddit e Bluesky de graça. Cole o link de um vídeo e salve em HD em segundos — sem cadastro e sem marca d'água. Também disponível como bot no Telegram.",
    },
    websiteDescription: 'Baixador de vídeos online e gratuito para X (Twitter), Reddit e Bluesky.',
    appDescription:
      'Baixe vídeos do X (Twitter), Reddit e Bluesky. Cole o link de um vídeo e salve em HD em segundos.',
    featureList: [
      'Baixe vídeos do X (Twitter)',
      'Baixe vídeos do Reddit',
      'Baixe vídeos do Bluesky',
      'Baixe vídeos por meio de um bot no Telegram',
    ],
    heroTitle: 'Baixador de Vídeos Gratuito para X (Twitter), Reddit e Bluesky',
    heroLead: 'Salve vídeos do X (Twitter), Reddit e Bluesky com facilidade. Cole o link, clique em baixar e pronto.',
    aboutTitle: 'Downloads de Vídeos sem Complicação do X, Reddit e Bluesky',
    aboutBodyBefore:
      'Cansado de não conseguir salvar vídeos das suas plataformas favoritas? ',
    aboutBodyAfter:
      ' oferece uma solução simples e rápida para baixar vídeos do X (antigo Twitter), Reddit e Bluesky (bsky) diretamente no seu computador ou celular. Pegue o link do vídeo, cole no nosso baixador e salve seu vídeo em instantes.',
    legalNote:
      'Observação: o Video Hunter respeita os criadores de conteúdo. Todos os vídeos são transmitidos diretamente das respectivas redes de distribuição de conteúdo. Certifique-se de que você tem o direito de baixar o conteúdo.',
    stepsTitle: 'Passos simples para baixar seus vídeos',
    steps: [
      { name: 'Encontre seu vídeo', text: 'Acesse o vídeo no X, Reddit ou Bluesky.' },
      { name: 'Copie a URL', text: 'Copie a URL do vídeo no seu navegador ou no menu de compartilhamento.' },
      { name: 'Cole e baixe', text: 'Cole o link no Video Hunter e clique em Baixar.' },
      { name: 'Salve', text: 'Seu vídeo é processado e fica pronto para salvar em instantes.' },
    ],
    platformsTitle: 'Plataformas compatíveis',
    preferChatting: {
      before: 'Prefere conversar? Envie os links para o ',
      link: 'bot do Video Hunter no Telegram',
      after: ' em vez disso.',
    },
    telegramTitle: 'Prefere o Telegram? Use nosso bot do Video Hunter!',
    telegramLead: {
      before: 'Para máxima praticidade, envie os links dos vídeos diretamente para o nosso ',
      link: 'MyVideoHunterBot',
      after: ' no Telegram. É uma forma rápida e fácil de baixar vídeos em qualquer lugar, direto do seu aplicativo de mensagens.',
    },
    imageAltAbout: 'Ilustração do processo de download de vídeos do Video Hunter',
    imageAltTelegram: 'Bot do Telegram para baixar vídeos com o Video Hunter',
  },

  platforms: {
    x: {
      name: 'X (Twitter)',
      seo: {
        title: 'Baixador de Vídeos do X (Twitter) — Salve Vídeos em HD | Video Hunter',
        description:
          "Baixe vídeos do X (Twitter) de graça. Cole o link da publicação e salve o vídeo em HD no seu celular ou computador — sem cadastro, sem marca d'água e sem precisar de app.",
      },
      heading: 'Baixador de Vídeos do X (Twitter)',
      lead: "Cole o link de uma publicação do X e salve o vídeo em HD. Grátis, sem cadastro e sem marca d'água.",
      blurb: 'Salve vídeos de publicações e threads no x.com e no twitter.com.',
      howToHeading: 'Como baixar um vídeo do X (Twitter)',
      howTo: [
        {
          name: 'Copie o link da publicação',
          text: 'Abra a publicação com o vídeo no X e copie o link (toque em Compartilhar e depois em Copiar link).',
        },
        { name: 'Cole o link', text: 'Cole o link na caixa acima e clique em Baixar.' },
        { name: 'Escolha a qualidade', text: 'O Video Hunter encontra o vídeo e lista todas as qualidades disponíveis.' },
        { name: 'Salve', text: 'Clique na qualidade desejada e o vídeo é salvo no seu dispositivo.' },
      ],
      faq: [
        {
          platform: 'x',
          question: 'Posso baixar vídeos do X (Twitter) de graça?',
          answer: "Sim. O Video Hunter baixa vídeos do X de graça, sem conta e sem marca d'água.",
        },
        {
          platform: 'x',
          question: 'Preciso do app do X ou de uma conta para baixar um vídeo?',
          answer:
            'Não. Você só precisa do link da publicação. O Video Hunter busca o vídeo para você, então não precisa entrar no X.',
        },
        {
          platform: 'x',
          question: 'Qual qualidade de vídeo consigo no X?',
          answer: 'A que o X oferecer para aquele vídeo, normalmente de 480p até 1080p ou a resolução original.',
        },
        {
          platform: 'x',
          question: 'Por que não consigo baixar um vídeo específico do X?',
          answer:
            'A publicação pode ter sido excluída, a conta pode ser privada ou o vídeo pode estar restrito na sua região. Imagens e GIFs não podem ser baixados, apenas vídeos.',
        },
        {
          platform: 'x',
          question: 'Como salvo um vídeo do X no iPhone?',
          answer:
            'Toque e segure o botão de download e escolha Baixar arquivo vinculado, ou use um gerenciador de arquivos como o Documents by Readdle para salvar o vídeo.',
        },
      ],
      note: 'Links do x.com e do twitter.com funcionam, incluindo links de publicações dentro de uma thread ou de um tweet citado.',
    },
    reddit: {
      name: 'Reddit',
      seo: {
        title: 'Baixador de Vídeos do Reddit — Salve Vídeos com Som | Video Hunter',
        description:
          "Baixe vídeos do Reddit de graça e com som. Cole o link da publicação e salve o MP4 no seu celular ou computador — sem cadastro e sem marca d'água.",
      },
      heading: 'Baixador de Vídeos do Reddit',
      lead: "Cole o link de uma publicação do Reddit e salve o vídeo com som. Grátis, sem cadastro e sem marca d'água.",
      blurb: 'Baixe vídeos do Reddit com áudio, do reddit.com ou do old.reddit.com.',
      howToHeading: 'Como baixar um vídeo do Reddit',
      howTo: [
        {
          name: 'Copie o link da publicação',
          text: 'Abra a publicação do Reddit com o vídeo e copie o link (toque em Compartilhar e depois em Copiar link).',
        },
        { name: 'Cole o link', text: 'Cole o link na caixa acima e clique em Baixar.' },
        { name: 'Aguarde o arquivo', text: 'O Video Hunter retorna o arquivo de vídeo, com o áudio.' },
        { name: 'Salve', text: 'Clique em baixar e o vídeo é salvo no seu dispositivo.' },
      ],
      faq: [
        {
          platform: 'reddit',
          question: 'Posso baixar vídeos do Reddit com som?',
          answer:
            'Sim. O Reddit mantém vídeo e áudio em fluxos separados, e o Video Hunter os entrega combinados para que o arquivo baixado seja reproduzido com som.',
        },
        {
          platform: 'reddit',
          question: 'Quais links do Reddit são compatíveis?',
          answer:
            'Links do reddit.com e do old.reddit.com funcionam, incluindo publicações compartilhadas pelo app do Reddit. Apenas publicações públicas podem ser baixadas.',
        },
        {
          platform: 'reddit',
          question: 'Por que um vídeo foi baixado sem áudio?',
          answer:
            'Isso normalmente significa que a playlist HLS foi salva em vez do MP4 combinado. Use o botão de download nesta página em vez de salvar o fluxo diretamente.',
        },
        {
          platform: 'reddit',
          question: 'Posso baixar de subreddits privados?',
          answer: 'Não, apenas publicações públicas podem ser baixadas.',
        },
      ],
      note: 'O Reddit serve a mesma publicação em reddit.com, old.reddit.com e www.reddit.com; os três são aceitos, e links de compartilhamento do app são resolvidos automaticamente.',
    },
    bluesky: {
      name: 'Bluesky',
      seo: {
        title: 'Baixador de Vídeos do Bluesky — Salve Vídeos do bsky de Graça | Video Hunter',
        description:
          "Baixe vídeos do Bluesky (bsky) de graça. Cole o link da publicação e salve o vídeo no seu celular ou computador — sem cadastro, sem marca d'água e sem precisar de app.",
      },
      heading: 'Baixador de Vídeos do Bluesky',
      lead: "Cole o link de uma publicação do bsky.app e salve o vídeo. Grátis, sem cadastro e sem marca d'água.",
      blurb: 'Baixe vídeos de publicações do bsky.app, no computador ou no celular.',
      howToHeading: 'Como baixar um vídeo do Bluesky',
      howTo: [
        {
          name: 'Copie o link da publicação',
          text: 'Abra a publicação do Bluesky com o vídeo e copie o link (toque em Compartilhar e depois em Copiar link).',
        },
        { name: 'Cole o link', text: 'Cole o link do bsky.app na caixa acima e clique em Baixar.' },
        { name: 'Aguarde o arquivo', text: 'O Video Hunter busca o vídeo do Bluesky.' },
        { name: 'Salve', text: 'Clique em baixar e o vídeo é salvo no seu dispositivo.' },
      ],
      faq: [
        {
          platform: 'bluesky',
          question: 'Posso baixar vídeos do Bluesky de graça?',
          answer: "Sim. O Video Hunter baixa vídeos do Bluesky de graça, sem conta e sem marca d'água.",
        },
        {
          platform: 'bluesky',
          question: 'Preciso de uma conta no Bluesky para baixar um vídeo?',
          answer:
            'Não. Você só precisa do link de uma publicação pública, então pode baixar vídeos sem entrar no Bluesky.',
        },
        {
          platform: 'bluesky',
          question: 'Quais links do Bluesky são compatíveis?',
          answer:
            'Links no formato bsky.app/profile/handle/post/id são compatíveis, incluindo publicações de contas em domínios personalizados e publicações compartilhadas pelo app do Bluesky.',
        },
        {
          platform: 'bluesky',
          question: 'Por que um vídeo do Bluesky não baixa?',
          answer:
            'A publicação pode ter sido excluída, a conta pode ter sido removida ou a publicação pode não conter um vídeo. Só publicações com um anexo de vídeo podem ser baixadas.',
        },
      ],
      note: 'Os links do Bluesky se parecem com https://bsky.app/profile/handle/post/id.',
    },
  },

  telegram: {
    seo: {
      title: 'Bot do Video Hunter no Telegram — Baixe Vídeos no Chat | Video Hunter',
      description:
        'Envie um link de vídeo para @MyVideoHunterBot no Telegram e receba um link de download. Funciona com X (Twitter), Reddit e Bluesky. Grátis, sem cadastro, direto no seu aplicativo de mensagens.',
    },
    heading: 'Bot do Video Hunter no Telegram',
    lead: 'Envie um link de vídeo no Telegram e receba um link de download. Sem app para instalar e sem cadastro.',
    openBot: 'Abrir @MyVideoHunterBot',
    howToHeading: 'Como baixar vídeos com o bot',
    howTo: [
      { name: 'Abra o bot', text: 'Abra @MyVideoHunterBot no Telegram e toque em Iniciar.' },
      {
        name: 'Envie um link de vídeo',
        text: 'Envie o link de uma publicação com um vídeo do X (Twitter), Reddit ou Bluesky.',
      },
      {
        name: 'Receba seu link de download',
        text: 'O bot responde com um link de download que você pode abrir em qualquer dispositivo.',
      },
    ],
    worksOn: 'Funciona no aplicativo do Telegram para iOS, Android e desktop, e no cliente web.',
    faqHeading: 'Perguntas frequentes sobre o bot',
    faq: [
      { question: 'O bot é gratuito?', answer: 'Sim, e não precisa de cadastro.' },
      {
        question: 'Quais plataformas ele suporta?',
        answer: 'X (Twitter), Reddit e Bluesky — as mesmas plataformas do site.',
      },
      {
        question: 'Por que o bot não respondeu?',
        answer:
          'Ele pode estar ocupado ou com limite de requisições da plataforma. Aguarde um momento e envie o link de novo, e verifique se a publicação é pública e contém um vídeo.',
      },
      {
        question: 'O bot armazena meus vídeos?',
        answer:
          'Não. Os vídeos são transmitidos diretamente da rede de distribuição de conteúdo da plataforma e não são armazenados nos nossos servidores.',
      },
    ],
    preferTitle: 'Prefere o site?',
    preferLead: {
      before: 'Você também pode colar um link diretamente na ',
      link: 'página inicial do Video Hunter',
      after: ' ou usar uma página dedicada para a sua plataforma:',
    },
  },

  faq: {
    seo: {
      title: 'FAQ do Baixador de Vídeos — Video Hunter',
      description:
        'Perguntas frequentes sobre como baixar vídeos do X (Twitter), Reddit e Bluesky com o Video Hunter: plataformas compatíveis, qualidade de vídeo, como salvar no iOS, limites e privacidade.',
    },
    heading: 'Perguntas frequentes',
    lead: {
      before:
        'Tudo o que você precisa saber sobre baixar vídeos com o Video Hunter. Ainda com dúvidas? ',
      homeLink: 'Cole um link na página inicial',
      between: ' ou envie uma mensagem para ',
      after: ' no Telegram.',
    },
    entries: [
      {
        question: 'Como baixo um vídeo do X (Twitter), Reddit ou Bluesky?',
        answer:
          'Copie o link da publicação que contém o vídeo, cole na caixa da página inicial do Video Hunter e clique em Baixar. O Video Hunter encontra o vídeo e mostra um botão de download para cada qualidade que a plataforma oferece.',
      },
      {
        question: 'O Video Hunter é gratuito?',
        answer:
          'Sim. O Video Hunter é gratuito e você não precisa de conta para baixar um vídeo. Os vídeos são transmitidos diretamente das redes de distribuição de conteúdo das plataformas e não são armazenados nos nossos servidores.',
      },
      {
        question: 'Preciso de uma conta para usar o Video Hunter?',
        answer:
          'Não. O download funciona sem conta e sem cadastro, e sempre será assim. Uma conta gratuita opcional só acrescenta duas coisas: guardar os vídeos que você encontra em pastas e publicar no chat de uma página de vídeo. Você pode entrar com um endereço de e-mail ou uma conta do Google, e pode excluir a conta, e tudo nela, quando quiser.',
      },
      {
        question: 'Como funciona o chat em uma página de vídeo?',
        answer:
          'Toda página de vídeo tem uma sala de chat sobre aquele vídeo, e qualquer pessoa pode lê-la. Publicar exige uma conta gratuita, que é o que evita que a sala se encha de spam. Você escreve com um apelido gerado para você, nunca com seu endereço de e-mail, e pode alterá-lo na sua biblioteca. Você pode excluir suas próprias mensagens, denunciar uma mensagem ou bloquear uma conta para deixar de ver o que ela escreve.',
      },
      {
        question: 'Posso baixar vídeos com um bot do Telegram em vez disso?',
        answer: 'Sim. Envie o link do vídeo para @MyVideoHunterBot no Telegram e o bot responde com um link de download.',
      },
      {
        question: 'Não consigo salvar arquivos no meu iPhone ou iPad. O que devo fazer?',
        answer:
          'O Safari do iOS costuma abrir o vídeo em um player em vez de salvá-lo. Toque e segure o botão de download e escolha Baixar arquivo vinculado, ou use um gerenciador de arquivos como o Documents by Readdle para salvar o vídeo no seu dispositivo.',
      },
      {
        question: 'O que devo fazer se o vídeo for reproduzido em vez de baixado?',
        answer:
          'No celular, toque e segure o vídeo até as opções de download aparecerem. No computador, clique com o botão direito no vídeo e selecione Salvar link como.',
      },
      {
        question: 'Onde ficam os arquivos que baixei?',
        answer: 'Os vídeos baixados ficam na pasta de downloads padrão do seu dispositivo.',
      },
      {
        question: 'Por que não consigo baixar um vídeo específico?',
        answer:
          'A publicação pode ter sido excluída, a conta pode ser privada ou o vídeo pode estar restrito na sua região. Só vídeos são compatíveis: imagens e GIFs não podem ser baixados.',
      },
      {
        question: 'Existe um limite diário de downloads?',
        answer:
          'Não há limite de downloads no site. O bot do Telegram e os bots de resposta no X podem limitar as respostas em períodos de grande demanda.',
      },
      {
        question: 'O Video Hunter armazena os vídeos que eu baixo?',
        answer:
          'Não. O Video Hunter não armazena vídeos nos seus servidores. Ele é um proxy que transmite o vídeo direto da rede de distribuição de conteúdo da plataforma.',
      },
      {
        question: 'Quais qualidades de vídeo posso baixar?',
        answer:
          'As que a plataforma oferecer, normalmente de 480p até 1080p ou a resolução original. O Video Hunter exibe um botão de download para cada qualidade disponível.',
      },
    ],
    legalNote:
      'Certifique-se de que você tem o direito de baixar o conteúdo que salva. O Video Hunter respeita os criadores de conteúdo.',
  },

  policy: {
    seo: {
      title: 'Política de Privacidade — Video Hunter',
      description:
        'Como o Video Hunter trata as informações quando você baixa vídeos do X (Twitter), Reddit e Bluesky: arquivos de log, cookies, Google Analytics, Google AdSense e os dados opcionais de conta e chat caso você entre.',
    },
    heading: 'Política de Privacidade',
    updated: 'Última atualização: outubro de 2026',
    intro:
      'O Video Hunter (myvideohunter.com) é uma ferramenta gratuita que baixa vídeos do X (Twitter), Reddit e Bluesky. Esta página explica quais informações são processadas quando você o utiliza.',
    notCollectedHeading: 'O que não coletamos',
    notCollected: [
      'Baixar um vídeo nunca exige uma conta: você pode usar o baixador sem nos informar nada.',
      'Não armazenamos os vídeos que você baixa. Eles são transmitidos da própria rede de distribuição de conteúdo da plataforma.',
      'Não vendemos informações pessoais e não mostramos seu endereço de e-mail a ninguém.',
    ],
    processedHeading: 'O que é processado',
    processedServer: {
      term: 'Logs do servidor e da CDN.',
      text:
        'Nosso provedor de hospedagem e de distribuição de conteúdo registra dados padrão de requisição: endereço IP, tipo de navegador, a página solicitada e carimbos de data e hora. Isso é usado para operar o serviço e detectar abusos.',
    },
    processedLinks: {
      term: 'Os links que você envia.',
      text:
        'Quando você cola um link, ele é enviado à nossa API para que o vídeo seja resolvido. A página resolvida é armazenada para que o mesmo link possa ser servido novamente; ela contém o texto da publicação, a miniatura e as URLs de download, e não qualquer informação sobre você.',
    },
    processedAnalytics: {
      term: 'Google Analytics.',
      text: 'Usamos o Google Analytics para entender como o site é usado (páginas visualizadas, localização aproximada, tipo de dispositivo). Ele define cookies e recebe seu endereço IP. Consulte ',
      link: 'a política de privacidade do Google',
      after: '.',
    },
    processedAdsense: {
      term: 'Google AdSense.',
      text: 'A publicidade neste site é veiculada pelo Google. O Google e seus parceiros usam cookies (incluindo o cookie DoubleClick) para veicular anúncios com base nas suas visitas a este e a outros sites. Você pode desativar a publicidade personalizada em ',
      link: 'Google Ad Settings',
      between: ' ou em ',
      link2: 'aboutads.info',
      after: '.',
    },
    signInHeading: 'Se você entrar (opcional)',
    signInIntro:
      'Entrar é opcional e só acrescenta duas coisas: guardar vídeos em pastas e publicar no chat de uma página de vídeo. As contas são mantidas pelo Amazon Cognito. Se você entrar com um endereço de e-mail, cria uma senha lá; se entrar com o Google, recebemos seu endereço de e-mail e seu nome do Google. Nunca vemos nem armazenamos sua senha.',
    signInLead: 'Quando você está conectado, armazenamos, vinculados a um identificador interno de conta:',
    signInItems: [
      {
        term: 'Suas pastas e vídeos salvos.',
        text: 'O nome de uma pasta e o identificador de cada vídeo que você salvou. O vídeo em si não é copiado.',
      },
      {
        term: 'Seu apelido.',
        text: 'Um apelido é gerado para você, e é o único nome exibido no chat. Ele não é derivado do seu endereço de e-mail e você pode alterá-lo a qualquer momento.',
      },
      {
        term: 'Suas mensagens de chat',
        text: ', armazenadas com esse apelido e nenhum outro nome.',
      },
      {
        term: 'Sua lista de bloqueio',
        text: ', caso você bloqueie uma conta no chat.',
      },
    ],
    chatHeading: 'Chat',
    chatBody1:
      'A sala de chat de uma página de vídeo é pública: qualquer pessoa que visite essa página pode lê-la, tenha ou não uma conta. Publicar exige estar conectado. As mensagens são armazenadas por até 30 dias e depois excluídas automaticamente, junto com o apelido associado a elas. Não publique informações pessoais: tudo o que você escrever pode ser lido por qualquer pessoa e por nós quando uma mensagem é denunciada.',
    chatBody2:
      'Você pode excluir suas próprias mensagens, denunciar uma mensagem ou bloquear uma conta. As mensagens denunciadas são mantidas para análise por até 90 dias, para que possamos agir em casos de abuso, o que é necessário para manter a publicidade nessas páginas. Excluir sua conta apaga as denúncias que você fez com ela.',
    cookiesHeading: 'Cookies e armazenamento local',
    cookiesBody1:
      'Os cookies deste site vêm do Google Analytics e do Google AdSense. Você pode bloqueá-los ou excluí-los nas configurações do navegador; o baixador em si funciona sem cookies.',
    cookiesBody2:
      'Se você entrar, sua sessão é mantida no armazenamento local do navegador, não em um cookie. Sair ou limpar os dados do site a remove.',
    rightsHeading: 'Seus direitos',
    rights: {
      before:
        'Se você está no EEA ou no UK (GDPR) ou na Califórnia (CCPA), pode solicitar acesso, correção ou exclusão dos seus dados pessoais, e pode se opor ao processamento. Você pode excluir sua própria conta, e tudo vinculado a ela, na página ',
      link: 'Sua biblioteca',
      after:
        ': as pastas, os vídeos salvos, suas mensagens de chat e sua lista de bloqueio são excluídos junto. Se preferir que façamos isso, entre em contato pelos dados abaixo. Pedidos sobre dados de análise e publicidade referem-se a dados controlados pelo Google; ajudaremos no que for possível.',
    },
    childrenHeading: 'Crianças',
    childrenBody:
      'Este serviço não é direcionado a crianças menores de 13 anos e não coletamos intencionalmente informações pessoais delas.',
    contactHeading: 'Contato',
    contact: {
      before: 'Para qualquer solicitação de privacidade, envie uma mensagem para nós no Telegram em ',
      after: '.',
    },
    copyrightHeading: 'Direitos autorais',
    copyrightBody:
      'O Video Hunter não hospeda vídeos. Certifique-se de que você tem o direito de baixar o conteúdo que salva e respeite os direitos dos criadores de conteúdo.',
    backToDownloader: 'Voltar para o baixador de vídeos',
  },

  login: {
    seo: {
      title: 'Entrar — Video Hunter',
      description:
        'Entre no Video Hunter para guardar os vídeos que encontrar em pastas e participar do chat de uma página de vídeo. Baixar vídeos nunca exige uma conta.',
    },
    heading: 'Entrar',
    lead:
      'Uma conta é opcional. Ela permite guardar os vídeos que você encontra em pastas e participar do chat de uma página de vídeo. Baixar nunca exige uma.',
    startError: 'Não foi possível iniciar o login. Tente novamente em instantes.',
    opening: 'Abrindo a página de login…',
    continueLabel: 'Continuar',
    cognitoNote:
      'Você será direcionado ao Amazon Cognito, onde pode entrar com um endereço de e-mail ou uma conta do Google. O Video Hunter nunca vê sua senha.',
  },

  library: {
    seo: {
      title: 'Sua biblioteca — Video Hunter',
      description: 'Os vídeos que você salvou, organizados em pastas que você escolhe.',
    },
    heading: 'Sua biblioteca',
    sessionEnded: 'Sua sessão terminou. Entre novamente.',
    genericError: 'Algo deu errado. Tente novamente.',
    deletedTitle: 'Sua conta foi excluída',
    deletedBody:
      'Suas pastas, os vídeos salvos nelas e suas mensagens de chat foram removidos. O download continua funcionando sem conta, e você pode criar uma nova quando quiser.',
    signInLead: 'Entre para guardar os vídeos que encontrar, organizados em pastas que você escolhe.',
    loading: 'Carregando suas pastas…',
    newFolderName: 'Nome da nova pasta',
    createFolder: 'Criar pasta',
    emptyFoldersBefore: 'Você ainda não tem pastas. Crie uma e depois use o botão ',
    emptyFoldersStrong: 'Salvar na pasta',
    emptyFoldersAfter: ' em qualquer página de vídeo.',
    savedCount: '{count} salvos',
    rename: 'Renomear',
    delete: 'Excluir',
    save: 'Salvar',
    cancel: 'Cancelar',
    nothingSaved: 'Nada salvo aqui ainda.',
    open: 'Abrir',
    remove: 'Remover',
    confirmDeleteFolder: 'Excluir "{name}" e os vídeos salvos nela?',
    nicknameHeading: 'Seu apelido no chat',
    nicknameHelp:
      'Um apelido foi gerado para você, e é o único nome que uma sala de chat exibe. Ele não é seu endereço de e-mail, e nada mais sobre sua conta é público.',
    nicknameLabel: 'Apelido',
    nicknamePlaceholder: 'Seu apelido',
    saveNickname: 'Salvar apelido',
    nicknameSaved: 'Salvo. Seu novo apelido agora aparece no chat.',
    blocksHeading: 'Bloqueados no chat',
    blocksHelp:
      'Você deixa de ver mensagens dessas contas em qualquer sala de chat. O bloqueio afeta apenas o que você vê.',
    unblock: 'Desbloquear',
    deleteAccountHeading: 'Excluir sua conta',
    deleteAccountBody:
      'Isso exclui sua conta e tudo vinculado a ela: suas pastas, os vídeos salvos nelas, suas mensagens de chat e sua lista de bloqueio. Os vídeos que você já baixou permanecem no seu dispositivo. Não é possível desfazer.',
    deleteAccountButton: 'Excluir minha conta',
    deleteAccountConfirm: 'Excluir sua conta e tudo nela?',
    deleting: 'Excluindo…',
    deleteAccountYes: 'Sim, excluir minha conta',
    videoFallback: 'Vídeo',
  },

  authCallback: {
    seo: {
      title: 'Entrando — Video Hunter',
      description: 'Concluindo o login.',
    },
    signingIn: 'Conectando você…',
    failedHeading: 'Falha no login',
    tryAgain: 'Tentar novamente',
    errorFallback: 'O login não foi concluído. Tente novamente.',
  },

  notFound: {
    seo: {
      title: 'Página não encontrada — Video Hunter',
      description:
        'Esta página não existe. Baixe vídeos do X (Twitter), Reddit e Bluesky na página inicial do Video Hunter.',
    },
    heading: 'Página não encontrada',
    lead:
      'A página que você procura não existe. Cole um link de vídeo abaixo para baixar um vídeo do X (Twitter), Reddit ou Bluesky.',
    goHome: 'Ir para a página inicial do Video Hunter',
    orRead: ' ou leia as ',
    faqLink: 'FAQ',
  },
}

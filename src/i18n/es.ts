import type { en } from './en'

export const es = {
  meta: {
    defaultDescription:
      'Portafolio de Ricardo Berrospi, ingeniero senior mobile y fullstack que construye sistemas escalables para fintech, SaaS empresarial y productos moviles en produccion.',
    home: {
      title: 'Inicio',
      description:
        'Ricardo Berrospi Quispe es un ingeniero senior mobile y fullstack que construye aplicaciones escalables para fintech, SaaS empresarial y productos moviles en produccion.',
    },
    projects: {
      title: 'Proyectos',
      description:
        'Explora proyectos de ingenieria seleccionados de Ricardo Berrospi Quispe en plataformas empresariales, productos independientes, fintech, SaaS y aplicaciones moviles.',
    },
    notFound: {
      title: 'No encontrado',
    },
  },
  nav: {
    projects: 'Proyectos',
    skills: 'Habilidades',
    about: 'Acerca de mi',
    contact: 'Contacto',
    toggleMenu: 'Abrir menu',
  },
  footer: {
    rights: 'Todos los derechos reservados.',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    twitter: 'Twitter',
  },
  hero: {
    eyebrow: 'Ingeniero Senior Mobile & Fullstack',
    titlePrefix: 'Construyendo',
    titleEmphasis: 'sistemas en produccion',
    titleSuffix: 'a escala',
    description:
      'Ingeniero senior con amplia experiencia en fintech, plataformas empresariales y aplicaciones moviles modernas. Diseño y construyo sistemas que procesan millones de transacciones, sirven a miles de usuarios y llevan productos decisivos al mercado.',
    enterpriseCta: 'Experiencia empresarial',
    independentCta: 'Trabajo independiente',
    metrics: {
      yearsExperience: 'Años de experiencia',
      projectsShipped: 'Proyectos lanzados',
      industriesServed: 'Industrias atendidas',
    },
  },
  projects: {
    eyebrow: 'Destacados',
    title: 'Proyectos destacados',
    description:
      'Una seleccion curada del trabajo mas impactante y tecnicamente significativo.',
    all: {
      eyebrow: 'Portafolio',
      title: 'Todos los proyectos',
      description:
        'Todos los proyectos que he construido, desde plataformas empresariales hasta productos independientes.',
    },
    detail: {
      back: 'Volver',
      featured: 'Destacado',
      role: 'Rol',
      company: 'Empresa',
      duration: 'Duracion',
      teamSize: 'Tamaño del equipo',
      keyHighlights: 'Puntos clave',
      caseStudy: 'Caso de estudio',
      screenshots: 'Capturas',
      viewSource: 'Ver codigo',
      liveDemo: 'Demo en vivo',
    },
    empty: 'Aun no hay proyectos para mostrar.',
    types: {
      enterprise: 'Empresarial',
      freelance: 'Freelance',
      startup: 'Startup',
      personal: 'Personal',
      landing_page: 'Landing Page',
    },
  },
  skills: {
    eyebrow: 'Especialidad',
    title: 'Habilidades y tecnologias',
    description: 'Herramientas y tecnologias que uso para convertir ideas en productos.',
    categories: {
      language: 'Lenguajes',
      framework: 'Frameworks',
      frontend: 'Frontend',
      backend: 'Backend',
      architecture: 'Arquitectura',
      database: 'Bases de datos',
      mobile: 'Mobile',
      cloud: 'Cloud & DevOps',
      tool: 'Herramientas',
    },
  },
  about: {
    eyebrow: 'Acerca de mi',
    title: 'Ingeniero senior con mentalidad de producto',
    paragraphs: {
      intro:
        'Soy un ingeniero senior mobile y fullstack que ha construido productos para fintech, SaaS empresarial y mobile de consumo. Me enfoco en arquitectura escalable, abstracciones limpias y sistemas que funcionan bajo condiciones reales.',
      work:
        'Mi trabajo va desde liderar arquitectura frontend en fintechs que procesan millones en transacciones, hasta construir aplicaciones mobile fullstack desde cero y asesorar startups en arquitectura y estrategia de producto.',
      belief:
        'Creo que la gran ingenieria nace del ownership: entender el problema a fondo, tomar decisiones pragmaticas y entregar sistemas robustos y adaptables.',
    },
    cards: {
      focus: {
        label: 'Foco',
        value: 'Arquitectura Fullstack',
      },
      domain: {
        label: 'Dominio',
        value: 'Fintech & SaaS',
      },
      platform: {
        label: 'Plataforma',
        value: 'Web & Mobile',
      },
      approach: {
        label: 'Enfoque',
        value: 'Orientado a producto',
      },
    },
    cta: 'Trabajemos juntos',
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Construyamos algo que escale',
    description:
      'Si estas construyendo una plataforma fintech, escalando un producto SaaS o necesitas guia de arquitectura, me encantaria conocer lo que estas creando.',
    github: 'GitHub',
  },
  notFound: {
    message: 'Pagina no encontrada',
    cta: 'Ir al inicio',
  },
} as const satisfies typeof en

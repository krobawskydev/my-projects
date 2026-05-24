export const project = {
  contact: {
    email: 'krobawsky.dev@gmail.com',
    links: {
      github: 'https://github.com/krobawskydev',
      linkedin: 'https://www.linkedin.com/in/rberrospidev',
      twitter: 'https://twitter.com/krobawsky',
    },
  },
} as const

export const contactEmailHref = `mailto:${project.contact.email}`

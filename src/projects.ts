export interface Project {
  id: string
  title: string
  category: string
  summary: string
  artwork: 'thinkpoint' | 'chatbot' | 'experiments'
  image?: { src: string; alt: string }
  url?: string
}

export const projects: Project[] = [
  { id: 'vednav', title: 'VEDNAV', category: 'E-commerce design', summary: 'A skincare storefront concept with product browsing and a light and dark theme.', artwork: 'thinkpoint', url: 'https://github.com/aryanmaan452-bit/VEDNAV' },
  { id: 'redline', title: 'REDLINE', category: 'Entertainment web design', summary: 'A streaming website concept with movie and TV show sections.', artwork: 'chatbot', url: 'https://github.com/aryanmaan452-bit/My-website-' },
  { id: 'creative-experiments', title: 'Pluto', category: 'Creative experiment', summary: 'A webpage experiment.', artwork: 'experiments', url: 'https://github.com/aryanmaan452-bit/pluto-website' },
]

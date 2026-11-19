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
  { id: 'thinkpoint', title: 'ThinkPoint', category: 'Research & analysis', summary: 'A website for research and analysis.', artwork: 'thinkpoint' },
  { id: 'chatbot', title: 'ChatBot.io', category: 'Artificial intelligence', summary: 'An AI chatbot project.', artwork: 'chatbot' },
  { id: 'creative-experiments', title: 'Pluto', category: 'Creative experiment', summary: 'A webpage experiment.', artwork: 'experiments', url: 'https://github.com/aryanmaan452-bit/pluto-website' },
]

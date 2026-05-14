export type Category = 'WordPress Plugins' | 'Client Sites' | 'Open Source' | 'Experiments'

export interface Project {
  title: string
  category: Category
  description: string
  url?: string
  repo?: string
  thumbnail?: string
}

export const categoryOrder: Category[] = [
  'WordPress Plugins',
  'Client Sites',
  'Open Source',
  'Experiments',
]

export const projects: Project[] = [
  {
    title: 'petelower.com',
    category: 'Experiments',
    description: 'This site. Started in Vue 3 + Vite, rebuilt in Astro. Deployed on Cloudflare Pages.',
    url: 'https://petelower.com',
    repo: 'https://github.com/9ete/petelower.com',
  },
]

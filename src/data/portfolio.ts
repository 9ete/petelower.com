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
    title: 'WP Multisite Internal SSO',
    category: 'WordPress Plugins',
    description: 'WordPress Multisite plugin that gives authenticated users seamless access to other sites on the network without re-logging in, as long as they have an active session on the primary site and belong to the secondary.',
    repo: 'https://github.com/9ete/wp-multisite-internal-sso',
  },
  {
    title: 'Bulk User Delete',
    category: 'WordPress Plugins',
    description: 'WordPress admin plugin to bulk delete users by email or ID via list upload or direct paste, processed in safe batches.',
    repo: 'https://github.com/9ete/bulk-user-delete',
  },
  {
    title: 'WP Block Enable Toggle',
    category: 'WordPress Plugins',
    description: 'Gutenberg extension that adds an Enabled toggle to any block. When disabled, the block is hidden on the front end without being deleted from the editor.',
    repo: 'https://github.com/9ete/wp-block-enable-toggle',
  },
  {
    title: 'Sitemap Whitelist for Yoast',
    category: 'WordPress Plugins',
    description: 'WordPress plugin to control exactly which URLs appear in Yoast SEO-generated sitemaps.',
    repo: 'https://github.com/9ete/sitemap-whitelist-for-yoast',
  },
  {
    title: 'Simple Like / Dislike',
    category: 'WordPress Plugins',
    description: 'WordPress plugin that adds lightweight like and dislike tracking to posts.',
    repo: 'https://github.com/9ete/simple-like-dislike-plugin',
  },
  {
    title: 'Available Upon Request',
    category: 'Client Sites'
  },
  {
    title: 'Bring Saved Tab to Front',
    category: 'Open Source',
    description: 'VS Code extension that automatically moves the most recently saved file to the first tab position, keeping your active file front and center.',
    repo: 'https://github.com/9ete/bring-saved-tab-to-front',
  },
  {
    title: 'petelower.com',
    category: 'Experiments',
    description: 'This site. Started in Vue 3 + Vite, rebuilt in Astro 5. Deployed on Cloudflare Pages.',
    url: 'https://petelower.com',
    repo: 'https://github.com/9ete/petelower.com',
  },
]

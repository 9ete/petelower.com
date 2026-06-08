export type Category = 'WordPress Plugins' | 'Client Sites' | 'Open Source' | 'Experiments'

export interface Project {
  title: string
  category: Category
  description: string
  disableLink?: boolean
  url?: string
  repo?: string
  isHidden?: boolean
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
    category: 'Client Sites',
    description: 'Due to the nature of my work with clients, I\'m not able to publicly list all the projects I\'ve worked on. If you\'d like to know more about my experience and see examples of my work, please feel free to reach out via the contact form.',
  },
  {
    title: 'VidStore / TN Marketing',
    category: 'Client Sites',
    description: 'Senior Lead Front End Developer and Accessibility Lead on a large-scale Laravel ecommerce platform. Custom Gutenberg blocks, deep performance optimization, and SEO work across a high-traffic product catalog.',
    disableLink: true,
    isHidden: true,
  },
  {
    title: 'FranklinCovey (via Jhana)',
    category: 'Client Sites',
    description: 'Development, support, and project management on a large-scale WordPress CMS used for blog and content operations. Custom translations pipeline, ongoing feature development, and day-to-day site management.',
    url: 'https://www.franklincovey.com',
    disableLink: true,
    isHidden: true,
  },
  {
    title: "Reese's Book Club",
    category: 'Client Sites',
    description: 'Full WordPress build for Reese Witherspoon\'s book club brand. Custom Gutenberg block development, performance optimization, and front-end implementation.',
    url: 'https://reesesbookclub.com',
    disableLink: true,
    isHidden: true,
  },
  {
    title: 'Hello Sunshine',
    category: 'Client Sites',
    description: 'Full WordPress build for Reese Witherspoon\'s media company. Custom Gutenberg development, performance optimization, and full front-end implementation.',
    url: 'https://hello-sunshine.com',
    disableLink: true,
    isHidden: true,
  },
  {
    title: 'MMDB Solutions',
    category: 'Client Sites',
    description: 'REST API development, custom Gutenberg blocks, and performance optimizations across multiple client projects managed through the MMDB agency.',
    url: 'https://mmdbsolutions.com',
    disableLink: true,
    isHidden: true,
  },
  {
    title: 'UrSource',
    category: 'Client Sites',
    description: 'Showcase-heavy WooCommerce ecommerce build with a strong focus on SEO, accessibility, performance, and custom Gutenberg blocks.',
    isHidden: true,
  },
  {
    title: 'IAFF Local 27',
    category: 'Client Sites',
    description: 'Custom WordPress builds across the Rhizome multisite network, including the International Association of Fire Fighters Local 27 site. Multisite architecture, custom Gutenberg work, and theme development.',
    url: 'https://iaff27.org',
    disableLink: true,
    isHidden: true,
  },
  {
    title: 'Bring Saved Tab to Front',
    category: 'Open Source',
    description: 'VS Code extension that automatically moves the most recently saved file to the first tab position, keeping your active file front and center.',
    repo: 'https://github.com/9ete/bring-saved-tab-to-front',
  },
  {
    title: 'WooCommerce Storefront Theme',
    category: 'Open Source',
    description: 'Contributor to the official WooCommerce Storefront theme — the default theme shipped with WooCommerce installations worldwide.',
    repo: 'https://github.com/woocommerce/storefront',
  },
  {
    title: 'Newspack Theme',
    category: 'Open Source',
    description: 'Contributor to Automattic\'s Newspack theme, built for modern news publishers on WordPress.',
    repo: 'https://github.com/Automattic/newspack-theme',
  },
  {
    title: 'petelower.com',
    category: 'Experiments',
    description: 'This site. Started in Vue 3 + Vite, rebuilt in Astro 5. Deployed on Cloudflare Pages.',
    url: 'https://petelower.com',
    repo: 'https://github.com/9ete/petelower.com',
  },
]


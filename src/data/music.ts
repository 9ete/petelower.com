export interface Band {
  name: string
  status: 'active' | 'former'
  description: string
  url?: string
  socials?: { label: string; href: string }[]
  youtubeIds: string[]
}

export const bands: Band[] = [
  {
    name: 'Kadillac Black',
    status: 'active',
    description: 'Rock band based in Seattle. Originals, live shows, ongoing. Check the site for shows and releases.',
    url: 'https://kadillacblack.com',
    socials: [],
    youtubeIds: [
      // TODO: add YouTube video IDs, e.g. 'dQw4w9WgXcQ'
    ],
  },
  {
    name: 'Item9 and the Mad Hatters',
    status: 'former',
    description: 'A project from before Seattle. We broke up but the recordings are still up on SoundCloud.',
    socials: [
      { label: 'SoundCloud', href: 'https://soundcloud.com/item9andthemadhatters' },
    ],
    youtubeIds: [
      // TODO: add YouTube video IDs
    ],
  },
]

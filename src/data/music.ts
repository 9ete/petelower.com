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
    name: 'Tuesday After Seven',
    status: 'former',
    description: 'Five piece West Seattle jam rock.',
    url: '/',
    youtubeIds: [
      // TODO: add YouTube video IDs
    ],
  },
  {
    name: 'Slyck Willie',
    status: 'former',
    description: 'A short lived but much fun West Seattle rock band.',
    url: '/',
    youtubeIds: [
      // TODO: add YouTube video IDs
    ],
  },
  {
    name: 'Item 9 and the Mad Hatters',
    status: 'former',
    description: 'Iowa City\'s finest vintage rock n roll. We broke up but the recordings are still up on SoundCloud.',
    url: 'https://i9mh.com',
    socials: [
      { label: 'SoundCloud', href: 'https://soundcloud.com/item9andthemadhatters' },
    ],
    youtubeIds: [
      // TODO: add YouTube video IDs
    ],
  },
  {
    name: 'Fail',
    status: 'former',
    description: 'Midwest punk rock.',
    url: '/',
    youtubeIds: [
      // TODO: add YouTube video IDs
    ],
  },
]

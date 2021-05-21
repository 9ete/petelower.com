import { nanoid } from 'nanoid';

// HEAD DATA
export const headData = {
  title: 'Pete Lower | Front End Developer | WordPress, React, Linux', // e.g: 'Name | Developer'
  lang: 'en', // e.g: en, es, fr, jp
  description: 'This is the personal site of front end developer Pete Lower.', // e.g: Welcome to my website
};

// HERO DATA
export const heroData = {
  title: 'Hello World, I\'m ',
  name: 'Pete Lower',
  subtitle: 'I build things!',
  cta: 'Hit Me Up!',
};

// ABOUT DATA
export const aboutData = {
  img: 'profile.jpg',
  paragraphOne: 'Hello World!  Pete here, I enjoy long walks on the beach, playing guitar, and bash scripting.  I spend my days working on engineering web applications and implementing front end experiences',
  paragraphTwo: 'My specialties include: Front End Development, WordPress, React, Javascript, Project Management, Agile/Scrum Methodologies, and business development.',
  paragraphThree: 'Non work interests include Guitar, Travel, Photography, Horticulture, Brewing, and Ornithology.  Tambien, estudio espanol todos los dias. Me gusta mucho viajar a España & Mexico.',
  resume: 'https://www.resumemaker.online/es.php', // if no resume, the button will not show up
};

// PROJECTS DATA
export const projectsData = [
  {
    id: nanoid(),
    img: 'project.jpg',
    title: 'LowerMedia',
    info: 'Consulting & Custom Implementation',
    info2: 'Front End Development & WordPress',
    url: '',
    repo: 'https://github.com/cobidev/react-simplefolio', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'project.jpg',
    title: 'Lower Properties',
    info: 'Property Management and Investing',
    info2: '',
    url: '',
    repo: 'https://github.com/cobidev/react-simplefolio', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'project.jpg',
    title: 'Music',
    info: 'Playing guitar and singing in a band!',
    info2: '',
    url: '',
    repo: 'https://github.com/cobidev/react-simplefolio', // if no repo, the button will not show up
  },
];

// CONTACT DATA
export const contactData = {
  cta: '',
  btn: '',
  email: '',
};

// FOOTER DATA
export const footerData = {
  networks: [
    {
      id: nanoid(),
      name: 'twitter',
      url: 'https://twitter.com/9eteygreen',
    },
    // {
    //   id: nanoid(),
    //   name: 'codepen',
    //   url: '',
    // },
    {
      id: nanoid(),
      name: 'linkedin',
      url: 'https://www.linkedin.com/in/pete-lower-39448a42/',
    },
    {
      id: nanoid(),
      name: 'github',
      url: 'https://github.com/hawkeye126',
    },
  ],
};

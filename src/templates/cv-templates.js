export const sectionTitles = {
  profile: 'Profil',
  experience: 'Expériences Professionnelles',
  education: 'Formation',
  skills: 'Compétences',
  languages: 'Langues',
  interests: 'Centres d\'intérêt',
  references: 'Références',
  hobbies: 'Loisirs',
  awards: 'Récompenses',
  certifications: 'Certifications',
  softwareSkills: 'Logiciels',
  passions: 'Passions',
  strengths: 'Points Forts',
  achievements: 'Réalisations',
  contact: 'Contact',
};

export const templates = [
  {
    id: 'default',
    name: 'Classique Simple',
    previewImage: '/img/Capture/Classique Simple (default).png',
    layout: { type: 'single-column' },
    styles: {
      fontFamily: "'Helvetica Neue', sans-serif",
      backgroundColor: '#FFFFFF',
      textColor: '#333333',
      headerColor: '#333333',
    },
    structure: {
      header: [
        { section: 'header', component: 'Header' },
        { section: 'photo', component: 'Photo' },
      ],
      main: [
        { section: 'contact', component: 'IconContact' },
        { section: 'profile', component: 'Profile' },
        { section: 'experience', component: 'Experience' },
        { section: 'education', component: 'Education' },
        { section: 'skills', component: 'EditableList' },
        { section: 'languages', component: 'EditableList' },
        { section: 'interests', component: 'EditableList' },
      ]
    }
  },
  {
    id: 'dark-sidebar-diamond',
    name: 'CV Colonne Sombre',
    previewImage: '/img/Capture/CV Colonne Sombre (dark-sidebar-diamond).png',
    layout: { type: 'two-column', sidebarWidth: '30%', sidebar: 'left' },
    styles: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: '#FFFFFF',
      textColor: '#333333',
      headerColor: '#0d1e37',
      sidebarColor: '#0d1e37',
      sidebarTextColor: '#FFFFFF'
    },
    structure: {
      sidebar: [
        { section: 'photo', component: 'Photo' },
        { section: 'contact', component: 'IconContact' },
        { section: 'languages', component: 'SidebarSkills' },
        { section: 'skills', component: 'SidebarSkills' },
        { section: 'references', component: 'References' },
      ],
      main: [
        { section: 'profile', component: 'Profile' },
        { section: 'experience', component: 'Experience' },
        { section: 'education', component: 'Education' },
        { section: 'hobbies', component: 'MixedHobbies' },
      ]
    }
  },
  {
    id: 'stylish-teal-orange',
    name: 'CV Elégant Turquoise',
    previewImage: '/img/Capture/CV Elégant Turquoise (stylish-teal-orange).png',
    isNew: true,
    layout: { type: 'two-column', sidebar: 'left', sidebarWidth: '35%' },
    styles: {
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      backgroundColor: '#FFFFFF',
      textColor: '#333333',
      headerColor: '#ff9800',
      sidebarColor: '#3bafab',
      sidebarTextColor: '#FFFFFF'
    },
    structure: {
      sidebar: [
        { section: 'photo', component: 'Photo' },
        { section: 'skills', component: 'EditableList' },
        { section: 'languages', component: 'EditableList' },
        { section: 'interests', component: 'EditableList' },
        { section: 'hobbies', component: 'MixedHobbies' },
      ],
      main: [
        { section: 'header', component: 'Header' },
        { section: 'contact', component: 'IconContact' },
        { section: 'profile', component: 'Profile' },
        { section: 'experience', component: 'Experience' },
        { section: 'education', component: 'Education' },
      ]
    }
  },
  {
    id: 'red-top-banner',
    name: 'CV Bannière Rouge',
    previewImage: '/img/Capture/CV Bannière Rouge (red-top-banner).png',
    isNew: true,
    layout: { type: 'banner' }, // Utilise le nouveau layout générique
    styles: {
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      backgroundColor: '#FFFFFF',
      textColor: '#333333',
      headerColor: '#e53935'
    },
    structure: {
      header: [
        { section: 'header', component: 'Header' },
        { section: 'contact', component: 'IconContact' },
      ],
      photo: [
        { section: 'photo', component: 'Photo' }
      ],
      main: [
        { section: 'profile', component: 'Profile' },
        { section: 'experience', component: 'Experience' },
        { section: 'education', component: 'Education' },
        { section: 'softwareSkills', component: 'StarSkills' },
        { section: 'languages', component: 'EditableList' },
        { section: 'hobbies', component: 'MixedHobbies' },
        { section: 'references', component: 'References' },
      ]
    }
  },
  {
    id: 'cv-elegant-bleu-nuit',
    name: 'CV Elégant Bleu Nuit',
    previewImage: '/img/Capture/CV Elégant Bleu Nuit (cv-elegant-bleu-nuit).png',
    isNew: true,
    layout: { type: 'two-column', sidebar: 'left', sidebarWidth: '35%' },
    styles: {
      fontFamily: "'Open Sans', Arial, sans-serif",
      backgroundColor: '#ffffff',
      textColor: '#333333',
      headerColor: '#0d2a3f',
      sidebarColor: '#0d2a3f',
      sidebarTextColor: '#ffffff'
    },
    structure: {
      sidebar: [
        { section: 'photo', component: 'Photo' },
        { section: 'contact', component: 'Contact' },
        { section: 'languages', component: 'DotLanguages' },
        { section: 'skills', component: 'EditableList' },
        { section: 'references', component: 'References' },
        { section: 'hobbies', component: 'Hobbies' },
      ],
      main: [
        { section: 'header', component: 'Header' },
        { section: 'profile', component: 'Profile' },
        { section: 'education', component: 'Education' },
        { section: 'experience', component: 'Experience' },
        { section: 'awards', component: 'Awards' },
      ]
    }
  },
  {
    id: 'elegant-parisien',
    name: 'CV Contemporain',
    previewImage: '/img/Capture/CV Contemporain (elegant-parisien).png',
    isNew: true,
    layout: { type: 'modern-header' },
    styles: {
      fontFamily: "'Open Sans', Arial, sans-serif",
      backgroundColor: '#FFFFFF',
      textColor: '#333333',
      headerColor: '#4a69bd', // Blue for accents
    },
    structure: {
      header: [
        { section: 'header', component: 'Header' },
        { section: 'infoTags', component: 'InfoTags' },
      ],
      photo: [
        { section: 'photo', component: 'Photo' },
      ],
      left: [
        { section: 'profile', component: 'Profile' },
        { section: 'experience', component: 'Experience' },
        { section: 'education', component: 'Education' },
      ],
      right: [
        { section: 'skills', component: 'CategorizedSkills' },
        { section: 'hobbies', component: 'Hobbies' },
        { section: 'languages', component: 'EditableList' },
      ]
    }
  }
];
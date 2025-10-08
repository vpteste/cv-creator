export const templates = [
  {
    id: 'default',
    name: 'Classique Simple',
    layout: { type: 'single-column' },
    styles: {
      fontFamily: "'Helvetica Neue', sans-serif",
      backgroundColor: '#FFFFFF',
      textColor: '#333333',
      headerColor: '#333333',
    },
    structure: {
      main: ['profile', 'experience', 'education', 'skills', 'languages', 'interests']
    }
  },
  {
    id: 'dark-sidebar-diamond',
    name: 'CV Colonne Sombre',
    previewImage: null,
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
      sidebar: ['photo', 'contact', 'languages', 'skills', 'references'],
      main: ['profile', 'experience', 'education', 'hobbies']
    }
  },
  {
    id: 'stylish-teal-orange',
    name: 'CV Elégant Turquoise',
    isNew: true,
    previewImage: null,
    layout: { type: 'two-column', sidebar: 'left', sidebarWidth: '35%' },
    styles: {
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      backgroundColor: '#FFFFFF',
      textColor: '#333333',
      headerColor: '#ff9800', // Orange for titles and accents
      sidebarColor: '#3bafab', // Teal for the sidebar
      sidebarTextColor: '#FFFFFF'
    },
    structure: {
      sidebar: ['photo', 'contact', 'skills', 'languages', 'interests'],
      main: ['header', 'profile', 'experience', 'education']
    }
  },
  {
    id: 'red-top-banner',
    name: 'CV Bannière Rouge',
    isNew: true,
    previewImage: null,
    layout: { type: 'red-banner' },
    styles: {
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      backgroundColor: '#FFFFFF',
      textColor: '#333333',
      headerColor: '#e53935', // Red for titles and accents
      sidebarColor: '#e53935', // Red for the sidebar
      sidebarTextColor: '#FFFFFF'
    },
    structure: {
      left: ['profile', 'experience', 'softwareSkills', 'references'],
      right: ['education', 'languages', 'contact', 'passions']
    }
  }
];
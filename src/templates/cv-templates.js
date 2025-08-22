
export const templates = [
  {
    id: 'classic',
    name: 'Classic',
    styles: {
      fontFamily: "'Garamond', serif",
      backgroundColor: '#FFFFFF',
      textColor: '#333333',
      headerColor: '#4A90E2',
    }
  },
  {
    id: 'modern',
    name: 'Modern',
    styles: {
      fontFamily: "'Helvetica Neue', sans-serif",
      backgroundColor: '#F5F5F5',
      textColor: '#222222',
      headerColor: '#50E3C2',
    }
  },
  {
    id: 'elegant',
    name: 'Elegant',
    styles: {
      fontFamily: "'Palatino', serif",
      backgroundColor: '#FCFBF8',
      textColor: '#4A4A4A',
      headerColor: '#D0A9F5',
    }
  },
  {
    id: 'modern-bicolor',
    name: 'Modern Bicolor',
    layout: 'two-column', // Propriété pour la nouvelle mise en page
    styles: {
      fontFamily: "'Helvetica Neue', sans-serif",
      // La sidebar aura sa propre couleur
      backgroundColor: '#FFFFFF', // Couleur de la zone principale
      textColor: '#333333',
      headerColor: '#2E7D32', // Vert foncé pour les titres
      sidebarColor: '#1B5E20', // Vert très foncé pour la sidebar
      sidebarTextColor: '#FFFFFF' // Texte blanc dans la sidebar
    }
  }
];

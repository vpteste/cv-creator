
export const templates = [
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
  },
  {
    id: 'bicolor-inversed',
    name: 'Bicolore Inversé',
    layout: 'two-column-reversed',
    styles: {
      fontFamily: "'Helvetica Neue', sans-serif",
      backgroundColor: '#FFFFFF',
      textColor: '#333333',
      headerColor: '#0D47A1', // Bleu marine pour les titres et accents
      sidebarColor: '#1A237E', // Bleu marine très foncé pour la sidebar
      sidebarTextColor: '#FFFFFF'
    }
  },
  {
    id: 'modern-orange',
    name: 'CV Moderne Orange',
    layout: 'modern-orange',
    styles: {
      fontFamily: "'Roboto', sans-serif",
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
      headerColor: '#FFA500', // Orange
      borderColor: '#FFA500' // Orange border
    }
  }
];

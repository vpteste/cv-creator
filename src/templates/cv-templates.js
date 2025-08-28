
export const templates = [
  {
    id: 'modern-bicolor',
    name: 'Modern Bicolor',
    isNew: false,
    previewImage: '/img/Capture/Capture Modern Bicolor.png',
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
    previewImage: '/img/Capture/Capture Bicolore Inverse.png',
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
    previewImage: '/img/Capture/Capture Cv Moderne Orange.png',
    layout: 'modern-orange',
    styles: {
      fontFamily: "'Roboto', sans-serif",
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
      headerColor: '#FFA500', // Orange
      borderColor: '#FFA500' // Orange border
    }
  },
  {
    id: 'modern-bicolor-2',
    name: 'CV Moderne Bicolore 2',
    isNew: false,
    previewImage: null,
    layout: 'two-column-header-photo',
    styles: {
      fontFamily: "'Helvetica Neue', sans-serif",
      backgroundColor: '#FFFFFF',
      textColor: '#333333',
      headerColor: '#0D47A1',
      sidebarColor: '#E3F2FD',
      sidebarTextColor: '#0D47A1'
    }
  },
  {
    id: 'modern-bicolor-3',
    name: 'CV Elégant Bleu Nuit',
    isNew: true,
    previewImage: '/img/Capture/Capture CV Elegant Bleu Nuit.png',
    layout: 'two-column',
    styles: {
      fontFamily: "'Montserrat', sans-serif",
      backgroundColor: '#FFFFFF',
      textColor: '#34495e',
      headerColor: '#2c3e50',
      sidebarColor: '#2c3e50',
      sidebarTextColor: '#FFFFFF'
    }
  },
  {
    id: 'mechanic-cv',
    name: 'CV Mécanicien Automobile',
    isNew: false,
    previewImage: '/img/Capture/CV Mecanicien Automobile.png',
    layout: 'two-column',
    styles: {
      fontFamily: "'Helvetica Neue', sans-serif",
      backgroundColor: '#FFFFFF',
      textColor: '#333333',
      headerColor: '#2D5A3D',
      sidebarColor: '#F5F5F5',
      sidebarTextColor: '#333333'
    }
  },
  {
    id: 'modern-green-gradient',
    name: 'CV Moderne Dégradé Vert',
    isNew: false,
    previewImage: '/img/Capture/CV Moderne Degrade Vert.png',
    layout: 'two-column',
    styles: {
      fontFamily: "'Helvetica Neue', sans-serif",
      backgroundColor: '#FFFFFF',
      textColor: '#333333',
      headerColor: '#0D47A1',
      sidebarColor: '#2E7D32',
      sidebarTextColor: '#FFFFFF'
    }
  }
];

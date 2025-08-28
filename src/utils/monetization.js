const monetagLinks = [
  'https://otieu.com/4/9776271',
  'https://otieu.com/4/9776090',
  'https://otieu.com/4/9770726'
];

export const openMonetagLink = () => {
  const link = monetagLinks[Math.floor(Math.random() * monetagLinks.length)];
  window.open(link, '_blank');
};

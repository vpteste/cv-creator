const ACTION_VERBS = [
  'accéléré', 'accompli', 'achevé', 'acquis', 'adapté', 'administré', 'amélioré', 'analysé', 'animé', 'anticipé', 'appliqué', 'appris', 'assuré', 'atteint', 'augmenté', 'automatisé',
  'bâti', 'budgétisé',
  'calculé', 'changé', 'chiffré', 'clarifié', 'classé', 'codé', 'collaboré', 'collecté', 'compilé', 'complété', 'conçu', 'conceptualisé', 'consolidé', 'construit', 'contribué', 'contrôlé', 'converti', 'coordonné', 'corrigé', 'créé',
  'décidé', 'défini', 'démontré', 'dépassé', 'développé', 'diagnostiqué', 'dirigé', 'documenté', 'doublé',
  'économisé', 'édité', 'élaboré', 'élevé', 'encouragé', 'enseigné', 'entrepris', 'établi', 'évalué', 'examiné', 'exécuté', 'expertisé',
  'facilité', 'finalisé', 'financé', 'formé', 'formalisé', 'fourni',
  'gagné', 'garanti', 'généré', 'géré',
  'identifié', 'illustré', 'implémenté', 'influencé', 'initié', 'innové', 'inspecté', 'installé', 'intégré', 'interprété', 'introduit', 'inventé',
  'lancé', 'localisé',
  'maintenu', 'maîtrisé', 'managé', 'mesuré', 'mis en œuvre', 'mis en place', 'modélisé', 'modifié', 'motivé',
  'négocié', 'normalisé',
  'obtenu', 'optimisé', 'ordonnancé', 'organisé',
  'participé', 'perfectionné', 'persuadé', 'piloté', 'planifié', 'préparé', 'présenté', 'priorisé', 'produit', 'programmé', 'projeté', 'promu',
  'qualifié', 'quantifié',
  'rationalisé', 'réalisé', 'recommandé', 'recruté', 'rédigé', 'réduit', 'renforcé', 'réorganisé', 'réparé', 'résolu', 'restructuré', 'rétabli',
  'sécurisé', 'sélectionné', 'simplifié', 'standardisé', 'structuré', 'supervisé', 'supporté', 'supprimé',
  'testé', 'traduit', 'transformé', 'triplé',
  'utilisé',
  'validé', 'vérifié'
];

const countWords = (text) => {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
};

export const analyzeCv = (cvData) => {
  let score = 0;
  const suggestions = [];

  if (!cvData) {
    return { score: 0, suggestions: ["Commencez à remplir votre CV pour voir l'analyse."] };
  }

  // --- 1. Complétude (Total 30 pts) ---
  let completenessScore = 0;
  if (cvData.name && cvData.email && cvData.phones?.[0]?.number) {
    completenessScore += 10;
  } else {
    suggestions.push("Info de base : Remplissez votre nom, email et téléphone.");
  }
  if (cvData.showProfile && countWords(cvData.profile) > 20) {
    completenessScore += 10;
  } else {
    suggestions.push("Profil : Rédigez un résumé percutant d'au moins 20 mots.");
  }
  if (cvData.experience?.length > 0) {
    completenessScore += 5;
  } else {
    suggestions.push("Expérience : Ajoutez au moins une expérience professionnelle.");
  }
  if (cvData.education?.length > 0) {
    completenessScore += 5;
  } else {
    suggestions.push("Formation : Ajoutez au moins un diplôme ou une formation.");
  }
  score += completenessScore;

  // --- 2. Qualité du Contenu (Total 50 pts) ---
  let qualityScore = 0;
  const totalExperiences = cvData.experience?.length || 0;
  if (totalExperiences > 0) {
    let actionVerbCount = 0;
    let quantifiableCount = 0;
    let totalDescWords = 0;

    cvData.experience.forEach(exp => {
      const desc = exp.description || '';
      totalDescWords += countWords(desc);
      const firstWord = desc.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-zéàâçéèêëîïôûùüÿñæœ]/g, '');
      if (firstWord && ACTION_VERBS.includes(firstWord)) {
        actionVerbCount++;
      }
      if (/\d/.test(desc)) { // Check for any digit
        quantifiableCount++;
      }
    });

    // Action Verbs (15 pts)
    const actionVerbRatio = totalExperiences > 0 ? actionVerbCount / totalExperiences : 0;
    if (actionVerbRatio >= 0.5) {
      qualityScore += 15;
    } else {
      suggestions.push("Verbes d'action : Commencez vos descriptions de missions par des verbes d'action (ex: Géré, Optimisé, Développé).");
    }

    // Quantifiable Results (15 pts)
    const quantifiableRatio = totalExperiences > 0 ? quantifiableCount / totalExperiences : 0;
    if (quantifiableRatio >= 0.5) {
      qualityScore += 15;
    } else {
      suggestions.push("Résultats chiffrés : Ajoutez des chiffres pour quantifier vos réussites (ex: augmenté de 20%, géré 5 projets).");
    }

    // Description Length (10 pts)
    const avgWords = totalExperiences > 0 ? totalDescWords / totalExperiences : 0;
    if (avgWords > 15) {
      qualityScore += 10;
    } else {
      suggestions.push("Description des postes : Détaillez davantage vos missions pour chaque expérience (plus de 15 mots en moyenne).");
    }
  }

  // Skills Density (10 pts)
  if (cvData.skills?.length >= 5) {
    qualityScore += 10;
  } else if (cvData.skills?.length >= 3) {
    qualityScore += 5;
  } else {
    suggestions.push("Compétences : Essayez de lister au moins 5 compétences pertinentes.");
  }
  score += qualityScore;

  // --- 3. Lisibilité (Total 20 pts) ---
  let readabilityScore = 0;
  const totalWords = countWords(JSON.stringify(cvData)); // A rough estimate
  if (totalWords > 150 && totalWords < 600) {
    readabilityScore += 10;
  } else if (totalWords >= 600) {
    suggestions.push("Concision : Votre CV semble long. Visez l'impact et la clarté (entre 250 et 600 mots).");
  } else {
    suggestions.push("Contenu : Votre CV est un peu court. Étoffez les descriptions pour mieux valoriser votre parcours.");
  }

  // Bullet points check (10 pts)
  const hasBulletPoints = cvData.experience?.some(exp => (exp.description || '').includes('•') || (exp.description || '').includes('-'));
  if (hasBulletPoints) {
    readabilityScore += 10;
  } else {
    suggestions.push("Lisibilité : Utilisez des listes à puces (• ou -) pour structurer les descriptions de vos missions.");
  }
  score += readabilityScore;

  return { score: Math.min(Math.round(score), 100), suggestions };
};
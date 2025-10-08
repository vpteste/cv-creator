# Guide d'Intégration pour Nouveaux Modèles de CV

Ce document décrit le processus pour ajouter un nouveau modèle de CV au système de template dynamique.

## Processus d'Intégration

Suivre ces étapes dans l'ordre pour une intégration sans erreur.

### Étape 1 : Mettre à jour la structure des données (`CVBuilderPage.jsx`)

- Si votre nouveau template utilise de nouvelles sections (ex: `hobbies`, `references`) ou de nouveaux champs (ex: `level` pour les compétences), vous devez d'abord les ajouter à l'objet `initialCvData`.
- **IMPORTANT :** Assurez-vous que toutes les nouvelles sections de type "liste" sont initialisées avec un tableau vide (ex: `hobbies: []`).
- Si une nouvelle section peut être ajoutée par l'utilisateur, ajoutez le cas correspondant dans la fonction `handleAddItem`.

### Étape 2 : Créer les composants de section (si nécessaire)

- Si votre template utilise une section qui n'existe pas encore (ex: `references`), créez le composant React correspondant dans le dossier `src/components/cv-sections/`.
- Un composant de section reçoit les `props` du moteur et doit afficher les données correspondantes.

### Étape 3 : Mettre à jour le "Dictionnaire" des composants (`sectionComponentMap.js`)

- Importez tout nouveau composant de section que vous avez créé à l'étape 2.
- Ajoutez l'entrée correspondante dans l'objet `sectionMap`. La clé doit correspondre à l'identifiant de la section (ex: `references: ReferenceSection`).

### Étape 4 : Créer le "Plan de Construction" du Template (`cv-templates.js`)

- Ajoutez un nouvel objet à la liste `templates`.
- Remplissez les propriétés :
    - `id`: Un identifiant unique en minuscules (ex: `cv-moderne-bleu`).
    - `name`: Le nom qui sera affiché à l'utilisateur.
    - `layout`: Un objet décrivant la mise en page (ex: `{ type: 'two-column', sidebar: 'left', sidebarWidth: '35%' }`).
    - `styles`: Les couleurs et polices de base.
    - `structure`: L'objet le plus important. Il définit quelles sections vont dans quelles colonnes (ex: `sidebar: ['photo', 'contact']`, `main: ['profile', 'experience']`).

### Étape 5 : Ajouter le CSS (si nécessaire)

- Si votre template a des styles uniques, ajoutez-les à `src/components/PreviewPanel.css`.
- **TRÈS IMPORTANT :** Préfixez toutes vos nouvelles règles CSS avec l' `id` de votre template pour éviter les conflits (ex: `.cv-container-cv-moderne-bleu .ma-classe-speciale { ... }`).

---

## Leçons Apprises & Erreurs à Anticiper

Cette section documente les bugs rencontrés lors des intégrations précédentes.

1.  **Erreur : `Cannot read properties of undefined (reading 'map')`**
    - **Cause :** Le template essaie d'afficher une section (ex: `hobbies`) qui n'existe pas dans les données du CV, surtout celles chargées depuis la sauvegarde locale (`localStorage`).
    - **Anticipation :** Toujours s'assurer que toute nouvelle section est ajoutée à `initialCvData` (Étape 1) et que la logique de chargement dans `CVBuilderPage.jsx` fusionne les données sauvegardées avec les données par défaut pour garantir que toutes les clés existent.

2.  **Erreur : `Section inconnue : ...`**
    - **Cause :** Le "plan de construction" du template (`cv-templates.js`) demande une section qui n'a pas été déclarée dans le "dictionnaire" des composants (`sectionComponentMap.js`).
    - **Anticipation :** Toujours s'assurer que chaque `id` de section listé dans la `structure` d'un template a une entrée correspondante dans `sectionComponentMap.js` (Étape 3).

3.  **Erreur : `... does not provide an export named 'sectionComponentMap'`**
    - **Cause :** Une erreur de syntaxe (souvent un `import` manquant) dans le fichier `sectionComponentMap.js` l'empêche de s'exécuter correctement.
    - **Anticipation :** Toujours s'assurer que tous les composants listés dans la `map` sont bien importés en haut du fichier.

4.  **Erreur : Avertissements de `key` React**
    - **Cause :** La prop `key` est passée de manière incorrecte lors de la création dynamique des listes.
    - **Anticipation :** La `key` doit toujours être une propriété directe du composant le plus haut dans une boucle `.map()` (ex: `<MaSection key={id} {...autresProps} />`).

5.  **Erreur : `... is not defined`**
    - **Cause :** Une variable ou une fonction est utilisée sans avoir été définie ou importée (ex: `useRef` oublié, faute de frappe comme `onFieldBlur` au lieu de `handleFieldBlur`).
    - **Anticipation :** Vérifier méticuleusement les imports et les noms des variables/fonctions.

6.  **Erreur : Les styles d'un template affectent un autre template.**
    - **Cause :** Les règles CSS d'un template sont trop génériques (ex: `.sidebar h3`) et ne sont pas "scopées" (limitées) à ce template unique.
    - **Anticipation :** Toujours préfixer **toutes** les règles CSS d'un template par une classe unique dérivée de son `id` (ex: `.template-cv-moderne-bleu .sidebar h3`). Le moteur de template ajoute automatiquement cette classe au conteneur principal.

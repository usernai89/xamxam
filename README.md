# XamXam Révisions

Application de révision pour les études de médecine à Dakar (L1 à D2) : cartes en répétition espacée,
cours, annales d'examen corrigées, fiches syndromes, préparation de l'internat.
Tout est dans `index.html`. Aucun serveur, aucune compilation.

- Les données sont enregistrées dans le navigateur de l'appareil (localStorage, IndexedDB pour les fichiers).
- `sw.js` rend l'appli utilisable sans internet.
- Hébergement : GitHub Pages, branche `main`, dossier racine.

## Apparence

Style « Cahier » : papier crème, encre noire, stylo bleu pour les liens, surligneur jaune pour ce qui est choisi
ou important. En mode sombre : tableau noir et craie. Titres en Fraunces, texte en Nunito.
Les autres thèmes, couleurs et polices restent dans **Moi → Apparence**.

## Créer

- **Écrire** : une carte (question / réponse, texte à trous, QCM), ou plusieurs cartes collées
  (`question :: réponse :: astuce`, une par ligne).
- **Importer** : une leçon ou une annale (PDF, Word .docx, PowerPoint .pptx, texte, photos),
  ou un fichier XamXam `.json` (sauvegarde, questions partagées).
  - PDF scannés et photos : lecture automatique du texte sur l'appareil (Tesseract, en français).
    La première fois, environ 4 Mo sont téléchargés, ensuite ça marche hors ligne.
  - Leçon : le texte est rangé dans les notes du chapitre.
  - Annale : les questions numérotées (1., 2.…) et les propositions (A., B.…) deviennent des QCM.
    Le corrigé est repris s'il est dans le document (« Corrigé : 1-AC 2-BD… » ou « Réponse : AC »).
- **Avec Claude** (facultatif) : une consigne à copier dans Claude, puis sa réponse à coller.

Bibliothèques incluses dans `lib/` : pdf.js 4.10.38 (Apache-2.0) et Tesseract.js 5.1.1 (Apache-2.0).

## Cours et examens

- **Cours → un cours** : documents de cours (tout type de fichier, gardé sur l'appareil), notes, cartes.
- **Cours → une matière → Examens**, ou **Accueil → Mes examens** : ajouter une épreuve datée
  (fichier ou photos). Questions et corrigé repérés automatiquement, modifiables.
- **Faire l'examen** : chronomètre (durée limite facultative), liste des questions pour naviguer,
  reprise si l'appli se ferme. Puis correction avec note sur 20.
  - Sans corrigé, on touche les bonnes réponses pendant la correction (gardées pour la fois suivante).
  - « Refaire mes erreurs » repose seulement les questions ratées ; « Les ajouter aux révisions » en fait des cartes.
- Les fichiers ne sont pas dans la sauvegarde `.json` (seulement les questions et les résultats).

## Synchroniser ses appareils et partager

- **Moi → Synchroniser mes appareils** : une clé GitHub (droit « gist » seulement) collée sur chaque appareil.
  Les données (cartes, notes, examens, résultats) sont fusionnées dans un gist secret `xamxam-sync.json`.
  Les fichiers (PDF, photos) restent sur chaque appareil.
- **Partager** (examen, chapitre, ou sélection dans Réviser) : crée un fichier `.json` avec seulement les questions.
  Pour le recevoir : Créer → Importer → Fichier XamXam, ou Partager → XamXam depuis WhatsApp (Android, appli installée).

## Niveaux et matières (7 ans : Licence, Master, Doctorat)

Onglet **Cours** : Niveaux › année › semestre, puis une grille de matières présentées comme des cahiers de couleur.

- 7 années : Licence (L1, L2, L3), Master (M1, M2), Doctorat (D1, D2), 2 semestres chacune (S1 à S14) ; chaque matière a ses sous-matières, chaque sous-matière ses cours.
- La Licence 3, semestre 1, reprend le programme de la faculté. Les années L1 à D1 suivent les dossiers du Drive
  de la promo 103 (FMPOS Dakar, 2018-2023) : 42 matières, 111 sous-matières, plus de 1 000 cours aux titres nettoyés.
  La D2 (stages et thèse) n'est pas dans ce Drive : c'est un programme modèle.
- Le programme est dans `CURR_TXT` (`index.html`) : `=L1 1` (niveau et semestre), `# id | nom | nom court | icône | couleur`
  (matière), `- id | nom | cours|cours|…` (sous-matière).
- **Mon année** (choisie au premier lancement, modifiable dans Moi) : l'accueil, les listes de Réviser et les examens
  suivent les matières de cette année.
- Dans l'appli : ajouter une matière (nom, icône, couleur), une sous-matière, un cours ; masquer une matière qu'on ne suit pas.
  Ces ajouts sont synchronisés et sauvegardés avec le reste.

## Drive de la promo (liens privés)

Les liens vers les fichiers du Drive (cours, QCM, examens, copies modèles d'internat) **ne sont pas dans ce dépôt public**.
Ils arrivent par un fichier à importer (`xamxam-drive-promo103.json`, Moi → Importer une sauvegarde, ou Créer → Importer).
Ensuite :

- chaque cours montre « Sur le Drive de la promo » avec son PDF, Word ou PowerPoint ;
- chaque matière montre ses QCM, examens, TD et autres documents ;
- chaque question d'internat montre ses copies modèles.

Les liens restent sur l'appareil et suivent la synchronisation entre appareils. Moi → Drive de la promo → Retirer les liens.

## Internat des hôpitaux

**Cours → Internat** : le programme officiel du concours d'internat des hôpitaux de Dakar.

- Écrit : 193 questions en 4 épreuves de 2 h (pathologie chirurgicale 39, pathologie médicale 68, anatomie 35, biologie 51).
  « Insuffisance rénale » est séparée en aiguë et chronique (194 fiches).
- Oral : 89 questions en plus (chirurgie et urgences 39, médecine et urgences 50), surtout des urgences.
- Chaque question a une fiche en trois parties :
  **Plan** (à retenir en premier), **Leçon type** à recopier (mots-clés surlignés), **Explications** (schémas, pièges, moyens de retenir).
- **Plans types** : un plan par famille de questions (organe, conduit, artère, nerf, région, articulation, maladie, syndrome,
  urgence médicale, traumatisme, cancer…).
- Sans leçon rédigée, la fiche montre le plan type de sa famille ; on peut écrire sa propre leçon.
- **Épreuve blanche** : chronomètre de 2 h, une question d'écrit tirée au sort, rédaction sur feuille, puis correction en cochant les mots-clés écrits.
- Les cours de toutes les années dont l'intitulé reprend celui d'une question y sont reliés automatiquement
  (« vue en cours en L3 · S5 ») ; la fiche du cours renvoie à la question.

Les leçons rédigées sont des fichiers texte dans `internat/lecons/<id>.md`, avec les repères
`@@plan`, `@@lecon`, `@@explications`, `@@schema Titre` (suivi d'un SVG). Les mots-clés s'écrivent `==mot-clé==`.
Pour ajouter une leçon : créer le fichier, puis ajouter son identifiant à `INT_READY` dans `index.html`.
La liste des questions est dans la constante `INT` de `index.html`.

## Mettre à jour

Changer `VERSION` dans `sw.js` à chaque modification, sinon les appareils gardent l'ancienne version en mémoire.

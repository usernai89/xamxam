# XamXam Révisions

Application de révision pour la L3 de médecine (semestre 5) : cartes en répétition espacée,
cours, annales d'examen corrigées, fiches syndromes.
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

- **Programme → un chapitre** : documents de cours (tout type de fichier, gardé sur l'appareil), notes, cartes.
- **Programme → un module → Examens**, ou **Accueil → Mes examens** : ajouter une épreuve datée
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
- La Licence 3, semestre 1, reprend le programme de la faculté. Les autres années forment un programme modèle,
  défini dans `CURR_TXT` (`index.html`) : `=L1 1` (niveau et semestre), `# id | nom | nom court | icône | couleur`
  (matière), `- id | nom | cours|cours|…` (sous-matière).
- **Mon année** (choisie au premier lancement, modifiable dans Moi) : l'accueil, les listes de Réviser et les examens
  suivent les matières de cette année.
- Dans l'appli : ajouter une matière (nom, icône, couleur), une sous-matière, un cours ; masquer une matière qu'on ne suit pas.
  Ces ajouts sont synchronisés et sauvegardés avec le reste.
- Les cours qui portent le même intitulé qu'une question d'internat y sont reliés automatiquement.

## Internat des hôpitaux

**Programme → Internat** : le programme du concours (4 épreuves écrites de 2 h), relié aux cours de L3.

- 103 questions classées par épreuve. Chaque question a une fiche en trois parties :
  **Plan** (à retenir en premier), **Leçon type** à recopier (mots-clés surlignés), **Explications** (schémas, pièges, moyens de retenir).
- **Plans types** : un plan par famille de questions (organe, conduit, artère, nerf, articulation, maladie, traumatisme, cancer…).
- Sans leçon rédigée, la fiche montre le plan type de sa famille ; on peut écrire sa propre leçon.
- **Épreuve blanche** : chronomètre de 2 h, rédaction sur feuille, puis correction en cochant les mots-clés écrits.
- Les chapitres de L3 liés à une question portent la mention « internat » ; la fiche du chapitre renvoie à la question.

Les leçons rédigées sont des fichiers texte dans `internat/lecons/<id>.md`, avec les repères
`@@plan`, `@@lecon`, `@@explications`, `@@schema Titre` (suivi d'un SVG). Les mots-clés s'écrivent `==mot-clé==`.
Pour ajouter une leçon : créer le fichier, puis ajouter son identifiant à `INT_READY` dans `index.html`.
La liste des questions est dans la constante `INT` de `index.html`.

## Mettre à jour

Changer `VERSION` dans `sw.js` à chaque modification, sinon les appareils gardent l'ancienne version en mémoire.

# XamXam Révisions

Application de révision (répétition espacée, fiches syndromes) pour la L3 de médecine, semestre 5.
Tout est dans `index.html`. Aucun serveur, aucune compilation.

- Les cartes sont enregistrées dans le navigateur du téléphone (localStorage).
- `sw.js` rend l'appli utilisable sans internet.
- Hébergement : GitHub Pages, branche `main`, dossier racine.

## Importer des leçons et des annales

Onglet **Créer → Importer → Leçon ou épreuve d'examen** (ou bouton « Importer » dans les notes d'un chapitre).

- Fichiers acceptés : PDF, Word (.docx), PowerPoint (.pptx), texte, ou photos du sujet papier.
- PDF scannés et photos : lecture automatique du texte sur le téléphone (Tesseract, en français).
  La première fois, environ 4 Mo sont téléchargés, ensuite ça marche hors ligne.
- **Leçon** : le texte est rangé dans les notes du chapitre ; Claude peut en tirer des cartes.
- **Annale** : les questions numérotées (1., 2.…) et les propositions (A., B.…) deviennent des QCM.
  Le corrigé est repris s'il est dans le document (« Corrigé : 1-AC 2-BD… » ou « Réponse : AC »).
  Sinon, on touche les bonnes réponses, ou on demande à Claude.
- Réviser une annale : onglet **Réviser → Quoi réviser → Annales d'examen**.

Bibliothèques incluses dans `lib/` : pdf.js 4.10.38 (Apache-2.0) et Tesseract.js 5.1.1 (Apache-2.0).

## Documents de cours et examens par module

- **Chapitre → Mes documents de cours → Ajouter** : n'importe quel fichier (PDF, Word, PowerPoint, photos…).
  Gardé sur le téléphone (IndexedDB). Lecture dans l'appli pour PDF, photos, Word, PowerPoint et texte ;
  « Ouvrir ailleurs » pour les autres. « Texte → mes notes » copie le contenu dans les notes.
- **Programme → un module → Examens → Ajouter un examen** : nom, date, sujet (fichier ou photos).
  Questions et corrigé repérés automatiquement, modifiables.
- **Faire l'examen** : une question à la fois, puis correction avec note sur 20.
  Sans corrigé, on touche les bonnes réponses pendant la correction (gardées pour la fois suivante).
- Les fichiers ne sont pas dans la sauvegarde .json (seulement les questions et les résultats).

# Pixel Empire

Un jeu incrémental en français consacré à la création, à l’édition et à la vente de jeux vidéo. Le joueur commence avec un développeur et quelques copies, puis construit un véritable empire du divertissement.

## Boucle de jeu

- cliquer sur le développeur pour fabriquer des copies ;
- enchaîner des clics rapprochés pour déclencher un Focus temporaire de ×2 à ×5 ;
- vendre automatiquement les copies contre des crédits `¤` fictifs ;
- acheter 24 consoles fictives réparties en plusieurs familles et générations ;
- profiter de paliers automatiques à 10, 25, 50 et 100 consoles ;
- investir dans la production, le marketing, la distribution et les royalties ;
- publier régulièrement des jeux en choisissant leur genre, l’un des huit budgets et jusqu’à trois plateformes ;
- recruter des spécialistes dans huit branches, composer une équipe active et conserver les autres profils en réserve ;
- faire progresser chaque branche sans sauter d’étape : Junior, Confirmé, Expert, Star puis Légende ;
- annuler un projet en cours contre un remboursement partiel qui diminue avec son avancement ;
- accélérer un développement par le prototypage manuel ou en finançant des renforts coûteux ;
- choisir parmi six campagnes marketing, plus puissantes mais susceptibles de créer une surpromesse ;
- découvrir à chaque sortie les notes de trois critiques, l’avis des joueurs et l’évolution de la réputation du studio ;
- prendre des décisions lors d’événements du studio et exploiter leurs effets temporaires ;
- remporter douze récompenses et activer cinq bonus permanents grâce aux trophées ;
- profiter des affinités de chaque famille de consoles et des kits possédés pour améliorer la qualité ;
- fonder des franchises, développer des suites et surveiller la fatigue du public ;
- faire progresser 18 genres, de la plateforme au MMORPG ;
- adapter les sorties aux tendances changeantes du marché ;
- entretenir un catalogue dont les anciens titres continuent à rapporter ;
- recommencer une génération pour gagner de l’Héritage permanent et autant de points d’archives ;
- développer quatre branches d’archives permanentes sans sacrifier le multiplicateur d’Héritage ;
- couronner les 18 genres avec un double score presse/joueurs d’au moins 90, puis produire le Projet Ultime qui termine le jeu.

Un budget élevé demande plus de temps de développement, mais offre davantage de ventes au lancement, d’expérience de genre et de royalties. Il ne garantit toutefois plus une excellente note : les compétences de l’équipe, l’expérience du genre, les plateformes et la franchise déterminent la maîtrise réelle du jeu. Les spécialistes ont un coût de recrutement et des honoraires par projet ; un seul profil par branche peut être actif, tandis que les remplaçants restent en réserve.

Un portage multiplateforme coûte également plus cher et prend plus de temps, en échange d’un public élargi. Les suites profitent de la notoriété de leur franchise, mais leur coût augmente de 15 %, leur délai de 10 % et une série trop longue peut fatiguer le public.

Le développement manuel reste utile grâce à plusieurs améliorations qui ajoutent progressivement une part de la production automatique à chaque clic. Vingt clics rapprochés déclenchent d’abord un Focus ×2 ; les recherches tardives font évoluer cette cadence jusqu’à ×5. Pendant la création d’un jeu, les clics peuvent aussi supprimer jusqu’à 30 % de sa durée et deux renforts financiers réduisent une partie du temps restant.

Les gains d’Héritage progressent logarithmiquement selon les crédits obtenus pendant la génération, puis leur bonus permanent utilise un rendement décroissant : `×(1 + 0,20 × √Héritage)`. Chaque point d’Héritage gagné accorde parallèlement un point d’archives dépensable dans les branches Industrie, Création, Commerce et Technique. Dépenser une archive ne diminue jamais le total d’Héritage.

## Installation et publication

Le projet n’utilise aucune dépendance ni étape de compilation. Ouvrez `index.html` dans un navigateur moderne ou servez le dossier avec n’importe quel serveur statique.

Pour GitHub Pages :

1. créez un dépôt et placez le contenu de ce dossier à sa racine ;
2. ouvrez **Settings → Pages** ;
3. choisissez **Deploy from a branch**, puis `main` et `/ (root)`.

Le manifeste, le service worker et les icônes PNG sont inclus. Le jeu peut être ajouté à l’écran d’accueil sur iPhone et installé comme application sur Android.

La version complète utilise une sauvegarde `v2` indépendante des prototypes précédents afin que la progression de départ et la carrière des spécialistes puissent être testées proprement.

## Sauvegarde

La partie est enregistrée automatiquement dans le navigateur. Le menu d’aide permet également d’exporter ou d’importer une sauvegarde JSON. Jusqu’à huit heures de production hors ligne sont restituées.

## Fichiers

- `index.html` : structure et dialogues ;
- `styles.css` : interface responsive ;
- `app.js` : économie, projets, sauvegarde et interactions ;
- `manifest.webmanifest` et `service-worker.js` : installation hors ligne ;
- `icon.svg` et les fichiers PNG : icônes de l’application.

## Licence

Ce projet est distribué sous licence MIT.

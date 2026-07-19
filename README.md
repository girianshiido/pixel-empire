# Pixel Empire

Un jeu incrémental en français consacré à la création, à l’édition et à la vente de jeux vidéo. Le joueur commence avec un développeur et quelques copies, puis construit un véritable empire du divertissement.

## Boucle de jeu

- cliquer sur le développeur pour fabriquer des copies ;
- enchaîner des clics rapprochés pour déclencher un Focus temporaire de ×2 à ×5 ;
- vendre automatiquement les copies contre des crédits `¤` fictifs ;
- acheter 24 consoles fictives réparties en plusieurs familles et générations ;
- débloquer puis acheter des optimisations ×2 aux paliers 10, 25, 50 et 100 de chaque console ;
- investir dans la production, le marketing, la distribution et les royalties ;
- publier régulièrement des jeux en choisissant leur genre, l’un des huit budgets et jusqu’à trois plateformes ;
- recruter des spécialistes dans huit branches, composer une équipe active et conserver les autres profils en réserve ;
- faire progresser chaque branche sans sauter d’étape : Junior, Confirmé, Expert, Star puis Légende, tandis que les grades devenus obsolètes quittent le marché ;
- annuler un projet en cours contre un remboursement partiel qui diminue avec son avancement ;
- accélérer un développement par le prototypage manuel ou en finançant des renforts coûteux ;
- débloquer une file de production, payer plusieurs projets à l’avance et les lancer automatiquement dans l’ordre ;
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
- ouvrir le centre Héritage depuis la ressource supérieure et développer quatre branches d’archives permanentes sans sacrifier le multiplicateur d’Héritage ;
- couronner les 18 genres avec un double score presse/joueurs d’au moins 90, puis produire le Projet Ultime qui termine le jeu.

Un budget élevé demande plus de temps de développement, mais offre davantage de ventes au lancement, d’expérience de genre et de royalties. Il ne garantit toutefois plus une excellente note : les compétences de l’équipe, l’expérience du genre, les plateformes et la franchise déterminent la maîtrise réelle du jeu. Les spécialistes ont un coût de recrutement et des honoraires par projet ; un seul profil par branche peut être actif, tandis que les remplaçants restent en réserve.

Un portage multiplateforme coûte également plus cher et prend plus de temps, en échange d’un public élargi. Les suites profitent de la notoriété de leur franchise, mais leur coût augmente de 15 %, leur délai de 10 % et une série trop longue peut fatiguer le public.

Le développement manuel reste utile grâce à plusieurs améliorations qui ajoutent progressivement une part de la production automatique à chaque clic. Une jauge d’élan diminue continuellement dès que les clics s’arrêtent ; vingt clics suffisamment rapides déclenchent d’abord un Focus ×2, puis les recherches tardives font évoluer cette cadence jusqu’à ×5. Pendant la création d’un jeu, les clics peuvent aussi supprimer jusqu’à 30 % de sa durée et deux renforts financiers réduisent une partie du temps restant.

Chaque modèle de console possède quatre optimisations de parc. Atteindre 10, 25, 50 puis 100 exemplaires ne donne plus immédiatement le bonus : cela débloque un achat qui double la production du modèle. Les quatre optimisations offrent ainsi un maximum ×16, réinitialisé avec la génération. Les sauvegardes créées avant ce système conservent les paliers qu’elles avaient déjà franchis.

Le Bureau de production débloque une première place d’attente, puis le Calendrier interstellaire en ajoute une seconde. La Mémoire de production des Archives ajoute une troisième place potentielle, permanente entre les générations. Un projet planifié est payé immédiatement, conserve l’équipe et les bonus choisis, puis son compte à rebours commence uniquement lorsqu’il atteint la tête de la file.

Les gains d’Héritage progressent logarithmiquement selon les crédits obtenus pendant la génération, puis leur bonus permanent utilise un rendement décroissant : `×(1 + 0,20 × √Héritage)`. Le centre Héritage regroupe le total permanent, le multiplicateur, les Archives disponibles et investies, le gain de la prochaine génération et les quatre branches Industrie, Création, Commerce et Technique. Dépenser une archive ne diminue jamais le total d’Héritage.

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

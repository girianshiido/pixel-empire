"use strict";

const SAVE_KEY = "pixel-empire-save-v2";
const COST_GROWTH = 1.15;
const TREND_DURATION = 180000;
const OFFLINE_LIMIT = 8 * 3600;
const MILESTONES = [10, 25, 50, 100];

const consoles = [
  ["pixelbox_1","PixelBox I","PixelBox","Gén. 1","🕹️",15,.25,"Un kit carré, deux boutons, beaucoup d’espoir."],
  ["pocketbit_1","PocketBit","PocketBit","Gén. 1","🎮",100,1.1,"Le premier studio qui tient dans une poche."],
  ["pixelbox_2","PixelBox II","PixelBox","Gén. 2","🕹️",1100,8,"Plus de couleurs, moins de nuits blanches."],
  ["arcadia_8","Arcadia 8","Arcadia","Gén. 1","👾",12000,60,"Une petite reine des salles d’arcade."],
  ["pocketbit_color","PocketBit Color","PocketBit","Gén. 2","🎮",130000,420,"Le catalogue découvre enfin la couleur."],
  ["pixelbox_3","PixelBox III","PixelBox","Gén. 3","🕹️",1.5e6,3000,"Les sprites deviennent presque vivants."],
  ["arcadia_16","Arcadia 16","Arcadia","Gén. 2","👾",2e7,22000,"Seize bits de puissance tapageuse."],
  ["novacube_1","NovaCube","NovaCube","Gén. 1","🟪",3e8,170000,"La 3D entre dans le studio par la grande porte."],
  ["pocketbit_advance","PocketBit Advance","PocketBit","Gén. 3","🎮",5e9,1.3e6,"Une génération entière joue dans le train."],
  ["novacube_2","NovaCube II","NovaCube","Gén. 2","🟪",8e10,1e7,"Des mondes plus vastes et des ventilateurs plus bruyants."],
  ["playsphere_1","PlaySphere","PlaySphere","Gén. 1","🔵",1.5e12,8e7,"Le disque optique transforme la distribution."],
  ["arcadia_64","Arcadia 64","Arcadia","Gén. 3","👾",3e13,6.5e8,"L’arcade revient avec des polygones partout."],
  ["novacube_hd","NovaCube HD","NovaCube","Gén. 3","🟪",7e14,5e9,"Chaque pixel veut désormais sa propre ombre."],
  ["pocketbit_dual","PocketBit Dual","PocketBit","Gén. 4","🎮",1.6e16,4e10,"Deux écrans, deux fois plus d’idées étranges."],
  ["playsphere_2","PlaySphere II","PlaySphere","Gén. 2","🔵",4e17,3.2e11,"Le jeu en ligne devient une habitude."],
  ["novacube_pro","NovaCube Pro","NovaCube","Gén. 4","🟪",1e19,2.6e12,"Le studio calcule des villes entières en temps réel."],
  ["pocketbit_3d","PocketBit 3D","PocketBit","Gén. 5","🎮",3e20,2.2e13,"La profondeur sort de l’écran sans lunettes."],
  ["playsphere_3","PlaySphere III","PlaySphere","Gén. 3","🔵",9e21,1.9e14,"Les mondes ouverts ne ferment plus la nuit."],
  ["novacube_x","NovaCube X","NovaCube","Gén. 5","🟪",3e23,1.7e15,"La console prédit la prochaine image."],
  ["clouddeck","CloudDeck","CloudDeck","Gén. 1","☁️",1.1e25,1.5e16,"Les jeux sont compilés dans le nuage."],
  ["playsphere_4","PlaySphere IV","PlaySphere","Gén. 4","🔵",4e26,1.4e17,"Chaque salon devient un studio mondial."],
  ["quantumbox","QuantumBox","QuantumBox","Gén. 1","⚛️",1.7e28,1.3e18,"Plusieurs versions du jeu existent à la fois."],
  ["holodeck","HoloDeck","HoloDeck","Gén. 1","🔮",8e29,1.2e19,"L’écran disparaît, le jeu reste."],
  ["omniverse","Console Omnivers","Omnivers","Gén. ∞","🌌",4e31,1.1e20,"Elle publie sur des machines qui n’existent pas encore."]
].map(([id,name,family,generation,icon,baseCost,production,description],index)=>({id,name,family,generation,icon,baseCost,production,description,index}));

const genres = [
  ["platformer","Plateforme","🦘",1,0,"Accessible, lisible et toujours agréable à maîtriser."],
  ["sports","Sport","⚽",1.12,0,"Un large public et des suites très régulières."],
  ["rpg","RPG","🐉",1.28,0,"Coûteux à écrire, mais excellent pour fidéliser."],
  ["shmup","Shoot ’em up","🚀",.96,0,"Petit marché, production rapide et fans passionnés."],
  ["puzzle","Puzzle","🧩",.88,0,"Peu coûteux et particulièrement durable."],
  ["racing","Course","🏎️",1.06,1000,"Les nouvelles consoles aiment montrer leur vitesse."],
  ["strategy","Stratégie","♟️",1.2,5000,"Une communauté fidèle et des ventes sur la durée."],
  ["adventure","Aventure","🗺️",1.08,10000,"Les histoires fortes traversent les générations."],
  ["fighting","Combat","🥊",1.16,50000,"Les tournois entretiennent les ventes."],
  ["fps","FPS","🎯",1.32,100000,"Un marché énorme, mais particulièrement concurrentiel."],
  ["management","Gestion","🏗️",1.25,500000,"Les joueurs y consacrent des centaines d’heures."],
  ["horror","Horreur","👻",1.2,1e6,"Les succès inattendus y sont fréquents."],
  ["simulation","Simulation","🛩️",1.17,5e6,"Un public exigeant prêt à investir longtemps."],
  ["rhythm","Rythme","🎵",.92,1e7,"Les bandes-son peuvent transformer un petit jeu en phénomène."],
  ["roguelike","Roguelike","💀",1.12,5e7,"La rejouabilité compense une présentation modeste."],
  ["survival","Survie","🏕️",1.27,1e8,"Les communautés créent leurs propres histoires."],
  ["visualnovel","Visual novel","📖",.98,5e8,"Une production ciblée, portée par l’écriture."],
  ["mmorpg","MMORPG","🌐",1.52,1e9,"Très long à produire, mais capable de financer un empire."]
].map(([id,name,icon,base,unlock,description],index)=>({id,name,icon,base,unlock,description,index}));

const computerPlatform={id:"computer",name:"Ordinateur",family:"Ordinateur",icon:"💻",index:-1};
const familyAffinities={
  Ordinateur:["strategy","management","simulation","mmorpg","roguelike"],
  PixelBox:["platformer","adventure","puzzle"],
  PocketBit:["puzzle","rpg","platformer","rhythm"],
  Arcadia:["shmup","fighting","racing"],
  NovaCube:["racing","strategy","simulation","management"],
  PlaySphere:["sports","fps","rpg","adventure"],
  CloudDeck:["mmorpg","strategy","management","simulation"],
  QuantumBox:["roguelike","puzzle","strategy","rpg"],
  HoloDeck:["horror","simulation","adventure","rhythm"],
  Omnivers:genres.map(genre=>genre.id)
};

const budgetTiers = [
  {id:"micro",name:"Micro-studio",cost:100,duration:12,launchCopies:60,royalty:.35,xp:20,rank:0,unlock:0,expectation:52,description:"Une idée simple, sortie très vite."},
  {id:"indie",name:"Indépendant",cost:2500,duration:30,launchCopies:1800,royalty:8,xp:45,rank:1,unlock:1000,expectation:60,description:"Une petite équipe et une vraie direction artistique."},
  {id:"aa",name:"Production AA",cost:5e4,duration:75,launchCopies:5e4,royalty:220,xp:90,rank:2,unlock:25000,expectation:68,description:"Un jeu ambitieux avec une production structurée."},
  {id:"aaa",name:"Production AAA",cost:2e6,duration:180,launchCopies:3e6,royalty:9000,xp:180,rank:3,unlock:1e6,expectation:78,description:"Plusieurs équipes et une sortie internationale."},
  {id:"blockbuster",name:"Blockbuster",cost:1e8,duration:360,launchCopies:2e8,royalty:350000,xp:350,rank:4,unlock:5e7,expectation:86,description:"Le projet qui mobilise tout un continent."},
  {id:"superproduction",name:"Superproduction",cost:1e11,duration:480,launchCopies:2e11,royalty:4e8,xp:500,rank:5,unlock:5e10,expectation:90,description:"Un événement culturel attendu dans le monde entier."},
  {id:"global_event",name:"Phénomène mondial",cost:1e16,duration:600,launchCopies:3e16,royalty:6e13,xp:700,rank:6,unlock:5e15,expectation:94,description:"Chaque écran de la planète attend cette sortie."},
  {id:"generational",name:"Projet générationnel",cost:1e24,duration:900,launchCopies:5e24,royalty:1e21,xp:1000,rank:7,unlock:5e23,expectation:97,description:"Une œuvre conçue pour traverser les siècles."}
];

const specialistBranches = [
  {id:"programming",name:"Programmation",icon:"💻",description:"Stabilise le code et accélère le développement.",genres:["fps","simulation","management","mmorpg","strategy"]},
  {id:"design",name:"Game design",icon:"🎲",description:"Renforce les mécaniques de tous les jeux.",genres:genres.map(genre=>genre.id)},
  {id:"art",name:"Arts visuels",icon:"🎨",description:"Façonne les univers et la direction artistique.",genres:["platformer","adventure","fighting","horror","rpg"]},
  {id:"writing",name:"Écriture",icon:"✍️",description:"Développe personnages, dialogues et narration.",genres:["rpg","adventure","visualnovel","horror","mmorpg"]},
  {id:"audio",name:"Audio",icon:"🎧",description:"Compose la musique et construit l’univers sonore.",genres:["rhythm","horror","shmup","racing","adventure"]},
  {id:"qa",name:"Assurance qualité",icon:"🔎",description:"Réduit les mauvaises surprises avant la sortie.",genres:genres.map(genre=>genre.id)},
  {id:"production",name:"Production",icon:"📋",description:"Maîtrise les coûts, les délais et les équipes.",genres:genres.map(genre=>genre.id)},
  {id:"ux",name:"UX et accessibilité",icon:"🧭",description:"Rend le jeu plus clair, fluide et accueillant.",genres:["puzzle","sports","management","strategy","simulation","platformer"]}
];
const specialistGrades = [
  {id:"junior",label:"Junior",skill:1,cost:500,unlockRevenue:100,unlockReputation:0,requiredProjects:0},
  {id:"confirmed",label:"Confirmé",skill:2,cost:5e4,unlockRevenue:1e4,unlockReputation:30,requiredProjects:2},
  {id:"expert",label:"Expert",skill:3,cost:5e8,unlockRevenue:1e7,unlockReputation:55,requiredProjects:3},
  {id:"star",label:"Star",skill:4,cost:5e14,unlockRevenue:1e12,unlockReputation:75,requiredProjects:5},
  {id:"legend",label:"Légende",skill:5,cost:5e23,unlockRevenue:1e20,unlockReputation:90,requiredProjects:8}
];
const specialistNames={
  programming:["Noa Script","Maya Kernel","Iris Vector","Sacha Quantum","Ariane Zéro"],design:["Léo Boucle","Nina Système","Samir Tempo","Alix Méta","Charlie Monde"],art:["Zoé Palette","Milo Pixel","Inès Lumière","Yuna Mirage","Oscar Horizon"],writing:["Lina Plume","Nils Chapitre","Aya Récit","Éden Saga","Lou Légende"],audio:["Tom Onde","Mina Accord","Sol Beat","Nora Écho","Orion Harmonie"],qa:["Eva Bug","Yan Test","Rose Stable","Max Zéro-Défaut","Dana Certitude"],production:["Liam Planning","Sara Cadence","Jade Pilotage","Robin Studio","Camille Empire"],ux:["Ana Flux","Hugo Clarté","Lila Parcours","Maël Universel","Soline Interface"]
};
const specialists=specialistBranches.flatMap((branch,branchIndex)=>specialistGrades.map((grade,gradeIndex)=>({id:`${branch.id}_${grade.id}`,branchId:branch.id,gradeId:grade.id,gradeIndex,name:specialistNames[branch.id][gradeIndex],grade:grade.label,skill:grade.skill,cost:grade.cost*(1+branchIndex*.12),unlockRevenue:grade.unlockRevenue,unlockReputation:grade.unlockReputation,requiredProjects:grade.requiredProjects,projectFee:grade.cost*.012*(1+branchIndex*.05)})));

const marketingPlans=[
  {id:"organic",name:"Bouche-à-oreille",icon:"💬",cost:0,unlock:0,audience:1,expectation:0,description:"Aucune dépense, aucune promesse démesurée."},
  {id:"festival",name:"Démo en festival",icon:"🎪",cost:600,unlock:300,audience:1.25,expectation:1,description:"Une première communauté découvre le jeu."},
  {id:"targeted",name:"Campagne ciblée",icon:"🎯",cost:3e4,unlock:1e4,audience:1.55,expectation:3,description:"Le bon public est touché avec précision."},
  {id:"international",name:"Lancement international",icon:"🌍",cost:3e6,unlock:1e6,audience:2.1,expectation:5,description:"La sortie devient un rendez-vous mondial."},
  {id:"saturation",name:"Saturation des réseaux",icon:"📡",cost:3e11,unlock:1e10,audience:3,expectation:8,description:"Impossible d’ignorer le prochain jeu du studio."},
  {id:"omniverse",name:"Campagne omniverselle",icon:"🌌",cost:3e22,unlock:1e21,audience:4.5,expectation:12,description:"La promotion traverse les mondes — et les attentes explosent."}
];

const studioEvents=[
  {id:"festival_invite",icon:"🎪",title:"Invitation surprise",description:"Un festival indépendant offre une scène au studio.",choices:[{id:"demo",label:"Préparer une démo",costRate:.04,minCost:300,result:"Le prochain jeu gagne en visibilité et en finition.",effects:{nextMarketing:1.35,nextQuality:1}},{id:"stream",label:"Diffuser depuis le studio",result:"Une petite communauté suit désormais le projet.",effects:{nextMarketing:1.12}}]},
  {id:"prototype_leak",icon:"🕵️",title:"Le prototype a fuité",description:"Des images incomplètes circulent déjà sur les réseaux.",choices:[{id:"polish",label:"Prendre le temps de peaufiner",result:"Le prochain projet sera plus long, mais mieux maîtrisé.",effects:{nextDuration:1.15,nextQuality:3}},{id:"contain",label:"Organiser la riposte",costRate:.06,minCost:500,result:"La fuite est contenue sans trop ralentir l’équipe.",effects:{nextQuality:1,nextExpectation:-1}}]},
  {id:"viral_creator",icon:"📹",title:"Une vidéo devient virale",description:"Une créatrice célèbre veut parler du prochain jeu.",choices:[{id:"exclusive",label:"Accorder une exclusivité",result:"L’audience bondit, mais la presse attend davantage.",effects:{nextMarketing:1.55,nextExpectation:3}},{id:"measured",label:"Rester mesuré",result:"La curiosité grandit sans transformer le jeu en promesse impossible.",effects:{nextMarketing:1.2}}]},
  {id:"team_fatigue",icon:"☕",title:"L’équipe fatigue",description:"Les nuits de développement commencent à peser.",choices:[{id:"rest",label:"Accorder une semaine créative",result:"Le prochain projet prendra plus de temps et gagnera en qualité.",effects:{nextDuration:1.18,nextQuality:2}},{id:"crunch",label:"Maintenir le rythme",result:"Le prochain jeu arrivera plus vite, au risque de perdre en maîtrise.",effects:{nextDuration:.82,nextQuality:-2}}]},
  {id:"public_grant",icon:"🏛️",title:"Fonds pour la création",description:"Un programme culturel propose de soutenir le studio.",choices:[{id:"accept",label:"Accepter le soutien",grantRate:.03,minGrant:1000,result:"La trésorerie respire, mais le prochain jeu devra rester accessible.",effects:{nextExpectation:1}},{id:"decline",label:"Préserver l’indépendance",result:"La communauté salue la décision.",effects:{nextMarketing:1.15}}]},
  {id:"modding_wave",icon:"🧩",title:"La communauté crée des mods",description:"Des joueuses prolongent spontanément la vie du catalogue.",choices:[{id:"support",label:"Financer les outils communautaires",costRate:.03,minCost:800,result:"Les royalties du catalogue augmentent pendant trois minutes.",effects:{globalRoyalty:1.3,globalRoyaltySeconds:180}},{id:"observe",label:"Laisser faire",result:"Le mouvement continue modestement.",effects:{globalRoyalty:1.1,globalRoyaltySeconds:120}}]}
];

const awards=[
  {id:"first_release",icon:"🎬",name:"Première mondiale",description:"Publier un premier jeu.",trophies:1,check:s=>s.stats.gamesReleased>=1},
  {id:"press_75",icon:"📰",name:"Choix de la presse",description:"Obtenir au moins 75 auprès de la presse.",trophies:1,check:s=>s.catalog.some(game=>(game.criticScore||0)>=75)},
  {id:"players_75",icon:"💖",name:"Prix du public",description:"Obtenir au moins 75 auprès des joueurs.",trophies:1,check:s=>s.catalog.some(game=>(game.playerScore||0)>=75)},
  {id:"double_85",icon:"🏆",name:"Jeu de l’année",description:"Atteindre 85 auprès de la presse et des joueurs.",trophies:2,check:s=>s.catalog.some(game=>(game.criticScore||0)>=85&&(game.playerScore||0)>=85)},
  {id:"masterpiece",icon:"💎",name:"Chef-d’œuvre",description:"Atteindre 90 auprès de la presse et des joueurs.",trophies:3,check:s=>s.catalog.some(game=>(game.criticScore||0)>=90&&(game.playerScore||0)>=90)},
  {id:"perfect",icon:"💯",name:"Note parfaite",description:"Décrocher un 100 auprès de la presse ou des joueurs.",trophies:4,check:s=>s.catalog.some(game=>(game.criticScore||0)>=100||(game.playerScore||0)>=100)},
  {id:"trilogy",icon:"Ⅲ",name:"Trilogie culte",description:"Publier trois épisodes d’une franchise.",trophies:2,check:s=>s.franchises.some(item=>item.episodes>=3)},
  {id:"franchise_ten",icon:"♾️",name:"Saga générationnelle",description:"Élever une franchise au niveau 10.",trophies:4,check:s=>s.franchises.some(item=>franchiseLevel(item)>=10)},
  {id:"catalog_25",icon:"🗄️",name:"Grande bibliothèque",description:"Réunir 25 jeux dans le catalogue.",trophies:3,check:s=>s.catalog.length>=25},
  {id:"all_genres",icon:"🌈",name:"Éditeur universel",description:"Publier au moins un jeu de chaque genre.",trophies:3,check:s=>genres.every(genre=>s.catalog.some(game=>game.genreId===genre.id))},
  {id:"five_legends",icon:"👑",name:"Cinq couronnes",description:"Créer un chef-d’œuvre dans cinq genres.",trophies:5,check:s=>masterpieceGenreCount(s)>=5},
  {id:"all_legends",icon:"🌟",name:"Panthéon complet",description:"Créer un chef-d’œuvre dans les 18 genres.",trophies:12,check:s=>masterpieceGenreCount(s)>=genres.length}
];
const careerRewards=[
  {threshold:3,icon:"📣",name:"Agence interne",description:"Coût des campagnes marketing −10 %",kind:"marketingDiscount",value:.1},
  {threshold:8,icon:"⏱️",name:"Méthodes primées",description:"Durée des projets −8 %",kind:"durationDiscount",value:.08},
  {threshold:15,icon:"💿",name:"Label de confiance",description:"Royalties du catalogue ×1,25",kind:"royaltyMultiplier",value:1.25},
  {threshold:25,icon:"✨",name:"Culture d’excellence",description:"Qualité prévue +2",kind:"qualityBonus",value:2},
  {threshold:40,icon:"🏛️",name:"Institution mondiale",description:"Production de copies ×1,5",kind:"productionMultiplier",value:1.5}
];
const FINAL_PROJECT_COST=1e30,FINAL_PROJECT_DURATION=600;

const criticOutlets=[
  {id:"pixel_hebdo",name:"Pixel Hebdo",icon:"📰",likes:["sports","rpg","adventure","management"]},
  {id:"gazette_8bit",name:"La Gazette 8-bit",icon:"🕹️",likes:["platformer","puzzle","shmup","fighting","roguelike"]},
  {id:"joystick_cosmique",name:"Joystick Cosmique",icon:"🪐",likes:["fps","simulation","racing","mmorpg","strategy"]}
];

const upgrades = [
  {id:"fast_keyboard",name:"Clavier mécanique",icon:"⌨️",cost:50,unlock:0,kind:"click",value:2,description:"Développement manuel ×2"},
  {id:"autocomplete",name:"Autocomplétion",icon:"✨",cost:650,unlock:200,kind:"clickPps",value:.05,description:"Chaque clic ajoute 5 % de la production/s"},
  {id:"digital_store",name:"Boutique numérique",icon:"🛒",cost:350,unlock:100,kind:"price",value:1.25,description:"Prix moyen des copies +25 %"},
  {id:"street_marketing",name:"Marketing de rue",icon:"📣",cost:1200,unlock:400,kind:"sales",value:2,description:"Capacité de distribution ×2"},
  {id:"build_tools",name:"Outils de compilation",icon:"🧰",cost:5000,unlock:2000,kind:"production",value:2,description:"Toutes les consoles ×2"},
  {id:"engine_templates",name:"Modèles de moteur",icon:"🧱",cost:26000,unlock:10000,kind:"clickPps",value:.05,description:"Bonus manuel : +5 % de la production/s"},
  {id:"editorial_team",name:"Équipe éditoriale",icon:"📝",cost:22000,unlock:10000,kind:"royalty",value:1.5,description:"Toutes les royalties ×1,5"},
  {id:"global_launch",name:"Lancement mondial",icon:"🌍",cost:95000,unlock:50000,kind:"sales",value:3,description:"Capacité de distribution ×3"},
  {id:"premium_editions",name:"Éditions premium",icon:"💎",cost:4e5,unlock:2e5,kind:"price",value:2,description:"Prix moyen des copies ×2"},
  {id:"engine_license",name:"Moteur sous licence",icon:"⚙️",cost:1.8e6,unlock:8e5,kind:"production",value:3,description:"Toutes les consoles ×3"},
  {id:"assisted_programming",name:"Programmation assistée",icon:"🤖",cost:4e6,unlock:1e6,kind:"clickPps",value:.15,description:"Bonus manuel : +15 % de la production/s"},
  {id:"remote_studio",name:"Studio à distance",icon:"🌙",cost:7e6,unlock:3e6,kind:"offline",value:2,description:"Revenus hors ligne ×2"},
  {id:"viral_community",name:"Communauté virale",icon:"💬",cost:3e7,unlock:1e7,kind:"royalty",value:2.5,description:"Toutes les royalties ×2,5"},
  {id:"procedural_code",name:"Code procédural",icon:"🧬",cost:1.5e8,unlock:5e7,kind:"clickPps",value:.25,description:"Bonus manuel : +25 % de la production/s"},
  {id:"mega_publish",name:"Réseau d’édition",icon:"📡",cost:9e8,unlock:3e8,kind:"all",value:3,description:"Production, ventes et royalties ×3"},
  {id:"neural_testing",name:"Tests neuronaux",icon:"🧠",cost:6e10,unlock:2e10,kind:"production",value:5,description:"Toutes les consoles ×5"},
  {id:"timeless_catalog",name:"Catalogue intemporel",icon:"♾️",cost:4e12,unlock:1e12,kind:"royalty",value:5,description:"Toutes les royalties ×5"},
  {id:"combo_training",name:"Entraînement de cadence",icon:"🔥",cost:8e12,unlock:2e12,kind:"comboTier",value:1,description:"Focus ×3 après 28 clics · durée 18 s"},
  {id:"parallel_builds",name:"Compilation parallèle",icon:"⏩",cost:4e13,unlock:1e13,kind:"projectDuration",value:.9,description:"Tous les développements sont 10 % plus courts"},
  {id:"support_department",name:"Support longue durée",icon:"🛟",cost:2e14,unlock:5e13,kind:"royalty",value:2,description:"Toutes les royalties ×2"},
  {id:"production_office",name:"Bureau de production",icon:"🗂️",cost:6e14,unlock:1e14,kind:"queueSlots",value:1,description:"Débloque une place dans la file de production"},
  {id:"combo_network",name:"Réseau de postes synchronisés",icon:"⚡",cost:1e15,unlock:2e14,kind:"comboTier",value:2,description:"Focus ×4 après 38 clics · durée 22 s"},
  {id:"rapid_prototyping",name:"Cellule de prototypage",icon:"🧪",cost:8e15,unlock:2e15,kind:"projectClick",value:2,description:"Accélération des projets par clic ×2"},
  {id:"emergency_budget",name:"Fonds de renfort permanent",icon:"🏦",cost:6e16,unlock:1e16,kind:"rushDiscount",value:.7,description:"Renforts de développement 30 % moins chers"},
  {id:"global_localization",name:"Localisation simultanée",icon:"🌐",cost:5e17,unlock:1e17,kind:"all",value:4,description:"Production, ventes et royalties ×4"},
  {id:"combo_overdrive",name:"Cadence survoltée",icon:"💥",cost:4e18,unlock:1e18,kind:"comboTier",value:3,description:"Focus ×5 après 50 clics · durée 25 s"},
  {id:"autonomous_pipeline",name:"Pipeline autonome",icon:"🏭",cost:3e19,unlock:5e18,kind:"projectDuration",value:.85,description:"Tous les développements sont encore 15 % plus courts"},
  {id:"quantum_compiler",name:"Compilateur quantique",icon:"⚛️",cost:2e21,unlock:4e20,kind:"projectClick",value:3,description:"Accélération des projets par clic ×3"},
  {id:"legacy_portfolio",name:"Portefeuille transgénérationnel",icon:"📚",cost:2e23,unlock:4e22,kind:"royalty",value:6,description:"Toutes les royalties ×6"},
  {id:"release_calendar",name:"Calendrier interstellaire",icon:"📅",cost:7e23,unlock:1e23,kind:"queueSlots",value:1,description:"Ajoute une seconde place dans la file de production"},
  {id:"time_dilation",name:"Planification dilatée",icon:"⌛",cost:1e25,unlock:2e24,kind:"rushPower",value:1.25,description:"Les renforts retirent désormais 25 % du temps restant"},
  {id:"omnichannel_release",name:"Diffusion omnicanale",icon:"🛰️",cost:8e27,unlock:1e27,kind:"all",value:5,description:"Production, ventes et royalties ×5"},
  {id:"studio_singularity",name:"Singularité du studio",icon:"🌌",cost:8e29,unlock:1e29,kind:"production",value:10,description:"Toutes les consoles ×10"}
];

const archiveBranches = [
  {id:"industry",name:"Industrie",icon:"🏭",nodes:[
    {id:"archive_workshop",name:"Atelier transmis",cost:1,kind:"production",value:1.4,description:"Production des consoles ×1,4"},
    {id:"archive_chain",name:"Chaîne patrimoniale",cost:8,kind:"production",value:1.5,description:"Production des consoles ×1,5"},
    {id:"archive_empire",name:"Empire industriel",cost:30,kind:"sales",value:2,description:"Capacité de distribution ×2"}
  ]},
  {id:"creative",name:"Création",icon:"🎨",nodes:[
    {id:"archive_notebooks",name:"Carnets de maîtres",cost:1,kind:"qualityBonus",value:4,description:"Qualité prévue +4"},
    {id:"archive_school",name:"École du studio",cost:10,kind:"qualityBonus",value:3,description:"Qualité prévue +3 supplémentaires"},
    {id:"archive_genres",name:"Culture de genre",cost:32,kind:"genreXp",value:1.75,description:"Expérience des genres ×1,75"}
  ]},
  {id:"commercial",name:"Commerce",icon:"📣",nodes:[
    {id:"archive_network",name:"Réseau d’anciens",cost:1,kind:"price",value:1.3,description:"Prix des copies ×1,3"},
    {id:"archive_catalog",name:"Catalogue héritier",cost:12,kind:"royalty",value:1.5,description:"Royalties ×1,5"},
    {id:"archive_brand",name:"Marque éternelle",cost:36,kind:"marketingDiscount",value:.25,description:"Campagnes marketing 25 % moins chères"}
  ]},
  {id:"technical",name:"Technique",icon:"⚙️",nodes:[
    {id:"archive_shortcuts",name:"Raccourcis transmis",cost:1,kind:"projectDuration",value:.88,description:"Développements 12 % plus courts"},
    {id:"archive_prototype",name:"Méthodes de prototypage",cost:10,kind:"projectClick",value:2,description:"Accélération des projets par clic ×2"},
    {id:"archive_pipeline",name:"Pipeline générationnel",cost:28,kind:"projectDuration",value:.8,description:"Développements encore 20 % plus courts"},
    {id:"archive_production_memory",name:"Mémoire de production",cost:65,kind:"queueSlots",value:1,description:"Ajoute une place permanente dans la file"}
  ]},
  {id:"automation",name:"Automatismes",icon:"🤖",nodes:[
    {id:"archive_auto_research",name:"Assistant R&D",cost:12,kind:"autoResearch",value:1,description:"Peut acheter automatiquement la R&D en gardant 20 % des crédits"},
    {id:"archive_auto_milestones",name:"Intendant du parc",cost:28,kind:"autoMilestones",value:1,description:"Peut acheter automatiquement les optimisations de paliers"},
    {id:"archive_staff_memory",name:"Mémoire d’équipe",cost:70,kind:"retainSpecialist",value:1,description:"Conserve le meilleur spécialiste actif entre les générations"}
  ]}
];
const archiveUpgrades=archiveBranches.flatMap(branch=>branch.nodes.map((node,index)=>({...node,branchId:branch.id,index,requires:index?branch.nodes[index-1].id:null})));

const achievements = [
  ["first_click","Première ligne de code",s=>s.stats.clicks>=1],
  ["first_console","Le salon devient studio",s=>s.stats.consolesBought>=1],
  ["first_game","Jour de sortie",s=>s.stats.gamesReleased>=1],
  ["million","Premier million",s=>s.lifetimeRevenue>=1e6],
  ["genre_five","Spécialiste",s=>Object.values(s.genreProgress).some(g=>g.level>=5)],
  ["fleet","Parc de cent consoles",s=>totalConsoles(s)>=100],
  ["catalog_ten","Dix jeux au catalogue",s=>s.catalog.length>=10],
  ["franchise_trilogy","La trilogie",s=>s.franchises.some(franchise=>franchise.episodes>=3)],
  ["first_hire","Premier recrutement",s=>s.roster.length>=1],
  ["full_team","Studio au complet",s=>s.activeTeam.length>=8],
  ["critical_hit","Acclamation critique",s=>s.catalog.some(game=>(game.criticScore||0)>=90)],
  ["aaa","Cour des grands",s=>s.catalog.some(game=>game.tierId==="aaa"||game.tierId==="blockbuster")],
  ["reputation","Nom reconnu",s=>s.reputation>=1],
  ["all_genres","Éditeur universel",s=>genres.every(genre=>genreUnlocked(genre,s))]
].map(([id,name,check])=>({id,name,check}));

const initialGenreProgress = () => Object.fromEntries(genres.map(genre=>[genre.id,{level:1,xp:0}]));
const initialOwned = () => Object.fromEntries(consoles.map(console=>[console.id,0]));
const initialState = () => ({
  money:0,stock:0,runRevenue:0,lifetimeRevenue:0,lifetimeCopies:0,copiesSold:0,
  owned:initialOwned(),upgrades:[],consoleMilestones:{},genreProgress:initialGenreProgress(),catalog:[],franchises:[],activeProject:null,projectQueue:[],
  roster:[],activeTeam:[],staffStats:{},teamCapacity:3,studioReputation:0,reviewHistory:[],bestGenreScores:{},awards:[],
  eventEffects:{nextQuality:0,nextMarketing:1,nextDuration:1,nextExpectation:0,globalRoyalty:1,globalRoyaltyUntil:0},pendingEvent:null,eventHistory:[],nextEventAt:Date.now()+90000,
  nextPitchAt:Date.now()+8000,reputation:0,archivePoints:0,archiveUpgrades:[],automation:{research:true,milestones:true,lastPurchaseAt:0},combo:{count:0,clicks:0,lastUpdatedAt:0,activeUntil:0,cooldownUntil:0},buyMode:"1",achievements:[],gameCompleted:false,completedAt:0,endingSeen:false,savedAt:Date.now(),
  settings:{effects:true,sound:true},stats:{clicks:0,consolesBought:0,gamesReleased:0,playSeconds:0,bestRevenue:0,projectRushClicks:0,cashAccelerations:0}
});

function loadState(){
  try{
    const saved=JSON.parse(localStorage.getItem(SAVE_KEY));
    if(!saved)return initialState();
    const fresh=initialState();
    const loaded={...fresh,...saved,owned:{...fresh.owned,...saved.owned},genreProgress:{...fresh.genreProgress,...saved.genreProgress},settings:{...fresh.settings,...saved.settings},stats:{...fresh.stats,...saved.stats},staffStats:{...fresh.staffStats,...saved.staffStats},eventEffects:{...fresh.eventEffects,...saved.eventEffects},automation:{...fresh.automation,...saved.automation},combo:{...fresh.combo,...saved.combo},bestGenreScores:{...fresh.bestGenreScores,...saved.bestGenreScores},catalog:Array.isArray(saved.catalog)?saved.catalog:[],franchises:Array.isArray(saved.franchises)?saved.franchises:[],projectQueue:Array.isArray(saved.projectQueue)?saved.projectQueue:[],roster:Array.isArray(saved.roster)?saved.roster.filter(id=>specialists.some(item=>item.id===id)):[],activeTeam:Array.isArray(saved.activeTeam)?saved.activeTeam.filter(id=>specialists.some(item=>item.id===id)):[],reviewHistory:Array.isArray(saved.reviewHistory)?saved.reviewHistory:[],eventHistory:Array.isArray(saved.eventHistory)?saved.eventHistory:[],awards:Array.isArray(saved.awards)?saved.awards:[],upgrades:Array.isArray(saved.upgrades)?saved.upgrades:[],archiveUpgrades:Array.isArray(saved.archiveUpgrades)?saved.archiveUpgrades.filter(id=>archiveUpgrades.some(item=>item.id===id)):[],achievements:Array.isArray(saved.achievements)?saved.achievements:[]};
    const hadMilestoneData=saved.consoleMilestones&&typeof saved.consoleMilestones==="object";
    loaded.consoleMilestones=Object.fromEntries(consoles.map(item=>[item.id,hadMilestoneData?(Array.isArray(saved.consoleMilestones[item.id])?saved.consoleMilestones[item.id].filter(mark=>MILESTONES.includes(mark)):[]):MILESTONES.filter(mark=>(loaded.owned[item.id]||0)>=mark)]));
    if(!Number.isFinite(saved.archivePoints))loaded.archivePoints=Math.floor(Math.max(0,saved.reputation||0));
    loaded.combo.count=Math.max(0,Number(loaded.combo.count)||0);loaded.combo.clicks=Math.max(0,Number(loaded.combo.clicks)||0);loaded.combo.lastUpdatedAt=Number(loaded.combo.lastUpdatedAt)||0;
    loaded.activeTeam=loaded.activeTeam.filter(id=>loaded.roster.includes(id));
    loaded.teamCapacity=Math.max(Number(saved.teamCapacity)||3,teamCapacityForReputation(loaded.studioReputation));
    return loaded;
  }catch(error){return initialState()}
}

let state=loadState();
let initialized=false;
let selectedTierId="micro";
let selectedPlatformIds=["computer"];
let selectedFranchiseId=null;
let selectedMarketingId="organic";
let lastFrame=performance.now();
let lastPaint=0;
let lastArchiveRenderKey="";
let toastTimer=0;
let achievementTimer=0;
let audioContext=null;

const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];
const els={
  money:$("#moneyCount"),stock:$("#stockCount"),revenue:$("#revenueRate"),incomeBreakdown:$("#incomeBreakdown"),criticReputation:$("#criticReputation"),reputation:$("#reputationCount"),heritageButton:$("#heritageButton"),trendText:$("#trendText"),trendTimer:$("#trendTimer"),trendBanner:$("#trendBanner"),
  developer:$("#developerButton"),perClick:$("#perClick"),manualShare:$("#manualShare"),comboCard:$("#comboCard"),comboLabel:$("#comboLabel"),comboStatus:$("#comboStatus"),comboFill:$("#comboFill"),comboHint:$("#comboHint"),salesCapacity:$("#salesCapacity"),salesFill:$("#salesFill"),copyPrice:$("#copyPrice"),studioStatus:$("#studioStatus"),
  projectCard:$("#projectCard"),projectTimer:$("#projectTimer"),projectTitle:$("#projectTitle"),projectDescription:$("#projectDescription"),projectFill:$("#projectFill"),projectBoosts:$("#projectBoosts"),projectClickBoost:$("#projectClickBoost"),projectRushButton:$("#projectRushButton"),projectButton:$("#projectButton"),productionQueue:$("#productionQueue"),queueCapacity:$("#queueCapacity"),queueHint:$("#queueHint"),queueList:$("#queueList"),queueAddButton:$("#queueAddButton"),
  lifetimeCopies:$("#lifetimeCopies"),copiesSold:$("#copiesSold"),gamesReleased:$("#gamesReleased"),totalConsoles:$("#totalConsoles"),prestigeButton:$("#prestigeButton"),prestigeTitle:$("#prestigeTitle"),prestigeProgress:$("#prestigeProgress"),prestigeReward:$("#prestigeReward"),
  consoleList:$("#consoleList"),consoleBadge:$("#consoleBadge"),upgradeList:$("#upgradeList"),upgradeBadge:$("#upgradeBadge"),upgradeEmpty:$("#upgradeEmpty"),milestoneUpgradeSection:$("#milestoneUpgradeSection"),milestoneUpgradeList:$("#milestoneUpgradeList"),milestoneUpgradeHint:$("#milestoneUpgradeHint"),archivePoints:$("#archivePoints"),archiveGrid:$("#archiveGrid"),archiveSpent:$("#archiveSpent"),heritageTotal:$("#heritageTotal"),heritageMultiplier:$("#heritageMultiplier"),heritageRunRevenue:$("#heritageRunRevenue"),heritageNextGain:$("#heritageNextGain"),automationControls:$("#automationControls"),autoResearchToggle:$("#autoResearchToggle"),autoMilestonesToggle:$("#autoMilestonesToggle"),teamBadge:$("#teamBadge"),teamCapacity:$("#teamCapacity"),teamUnlockHint:$("#teamUnlockHint"),rosterCapacity:$("#rosterCapacity"),activeTeamList:$("#activeTeamList"),reserveTeamList:$("#reserveTeamList"),recruitList:$("#recruitList"),genreList:$("#genreList"),genreBadge:$("#genreBadge"),catalogList:$("#catalogList"),catalogBadge:$("#catalogBadge"),catalogEmpty:$("#catalogEmpty"),catalogRoyalty:$("#catalogRoyalty"),franchiseSection:$("#franchiseSection"),franchiseList:$("#franchiseList"),careerBadge:$("#careerBadge"),trophyCount:$("#trophyCount"),finalChallenge:$("#finalChallenge"),finalChallengeTitle:$("#finalChallengeTitle"),finalChallengeSubtitle:$("#finalChallengeSubtitle"),finalRequirements:$("#finalRequirements"),startFinalProject:$("#startFinalProject"),legendGrid:$("#legendGrid"),rewardList:$("#rewardList"),awardProgress:$("#awardProgress"),awardGrid:$("#awardGrid"),eventBonusSummary:$("#eventBonusSummary"),eventHistory:$("#eventHistory"),
  projectDialog:$("#projectDialog"),projectDialogEyebrow:$("#projectDialogEyebrow"),projectDialogTitle:$("#projectDialogTitle"),dialogTrend:$("#dialogTrend"),genreSelect:$("#genreSelect"),genrePreview:$("#genrePreview"),projectTeamSummary:$("#projectTeamSummary"),franchiseChoiceGrid:$("#franchiseChoiceGrid"),franchiseHint:$("#franchiseHint"),platformGrid:$("#platformGrid"),platformHint:$("#platformHint"),budgetGrid:$("#budgetGrid"),marketingGrid:$("#marketingGrid"),marketingHint:$("#marketingHint"),estimateCost:$("#estimateCost"),estimateTime:$("#estimateTime"),estimateQuality:$("#estimateQuality"),estimateTeamFee:$("#estimateTeamFee"),estimateCopies:$("#estimateCopies"),estimateRoyalty:$("#estimateRoyalty"),startProject:$("#startProjectButton"),
  prestigeDialog:$("#prestigeDialog"),prestigeNote:$("#prestigeNote"),confirmPrestige:$("#confirmPrestige"),reviewDialog:$("#reviewDialog"),reviewGameTitle:$("#reviewGameTitle"),reviewPressScore:$("#reviewPressScore"),reviewPlayerScore:$("#reviewPlayerScore"),reviewList:$("#reviewList"),reviewReputationChange:$("#reviewReputationChange"),releaseAwards:$("#releaseAwards"),eventDialog:$("#eventDialog"),eventIcon:$("#eventIcon"),eventTitle:$("#eventTitle"),eventDescription:$("#eventDescription"),eventChoices:$("#eventChoices"),endingDialog:$("#endingDialog"),endingSummary:$("#endingSummary"),help:$("#helpDialog"),helpButton:$("#helpButton"),soundButton:$("#soundButton"),effectsButton:$("#effectsButton"),exportSave:$("#exportSave"),importSave:$("#importSave"),importFile:$("#importFile"),resetButton:$("#resetButton"),toast:$("#toast"),achievement:$("#achievement")
};

function format(value){
  if(!Number.isFinite(value))return "∞";
  if(Object.is(value,-0)||Math.abs(value)<1e-9)value=0;
  const sign=value<0?"−":"",n=Math.abs(value);
  if(n<1000)return sign+n.toLocaleString("fr-FR",{maximumFractionDigits:n<10?1:0});
  const suffixes=[[1e33,"Sp"],[1e30,"Sx"],[1e27,"Qi"],[1e24,"Qa"],[1e21,"Td"],[1e18,"Tn"],[1e15,"Bd"],[1e12,"Bn"],[1e9,"Md"],[1e6,"M"],[1e3,"k"]];
  const [scale,suffix]=suffixes.find(([scale])=>n>=scale)||[1,""];
  return `${sign}${(n/scale).toLocaleString("fr-FR",{maximumFractionDigits:n/scale<10?2:1})} ${suffix}`;
}
function formatMoney(value){return `${format(value)} ¤`}
function formatDuration(seconds){const total=Math.max(0,Math.ceil(seconds));if(total<60)return `${total} s`;const minutes=Math.floor(total/60),rest=total%60;return rest?`${minutes} min ${rest} s`:`${minutes} min`}
function formatPreciseDuration(seconds){return seconds<10?`${seconds.toLocaleString("fr-FR",{minimumFractionDigits:seconds>0&&seconds<1?2:0,maximumFractionDigits:2})} s`:formatDuration(seconds)}
function clamp(value,min,max){return Math.max(min,Math.min(max,value))}
function awardTotal(s=state){return awards.filter(item=>s.awards.includes(item.id)).reduce((sum,item)=>sum+item.trophies,0)}
function careerReward(kind,s=state){return careerRewards.find(item=>item.kind===kind&&awardTotal(s)>=item.threshold)}
function marketingById(id){return marketingPlans.find(item=>item.id===id)||marketingPlans[0]}
function marketingUnlocked(plan,s=state){return s.lifetimeRevenue>=plan.unlock}
function marketingCost(plan,s=state){return plan.cost*(1-(careerReward("marketingDiscount",s)?.value||0))*(1-archiveEffect("marketingDiscount",0,(a,b)=>a+b,s))}
function activeGlobalRoyalty(s=state){return s.eventEffects.globalRoyaltyUntil>Date.now()?s.eventEffects.globalRoyalty:1}
function hasUpgrade(id,s=state){return s.upgrades.includes(id)}
function effect(kind,base,combine=(a,b)=>a*b,s=state){return upgrades.filter(upgrade=>upgrade.kind===kind&&hasUpgrade(upgrade.id,s)).reduce((value,upgrade)=>combine(value,upgrade.value),base)}
function hasArchiveUpgrade(id,s=state){return (s.archiveUpgrades||[]).includes(id)}
function archiveEffect(kind,base,combine=(a,b)=>a*b,s=state){return archiveUpgrades.filter(upgrade=>upgrade.kind===kind&&hasArchiveUpgrade(upgrade.id,s)).reduce((value,upgrade)=>combine(value,upgrade.value),base)}
function upgradeMaximum(kind,s=state){return upgrades.filter(upgrade=>upgrade.kind===kind&&hasUpgrade(upgrade.id,s)).reduce((value,upgrade)=>Math.max(value,upgrade.value),0)}
function productionQueueCapacity(s=state){return Math.round(effect("queueSlots",0,(a,b)=>a+b,s)+archiveEffect("queueSlots",0,(a,b)=>a+b,s))}
function canQueueProject(s=state){return Boolean(s.activeProject)&&productionQueueCapacity(s)>0&&(s.projectQueue||[]).length<productionQueueCapacity(s)}
function reputationMultiplier(s=state){return 1+.2*Math.sqrt(Math.max(0,s.archivePoints||0))}
function totalConsoles(s=state){return Object.values(s.owned).reduce((sum,count)=>sum+(Number(count)||0),0)}
function consoleMilestones(console,s=state){return Array.isArray(s.consoleMilestones?.[console.id])?s.consoleMilestones[console.id]:[]}
function hasConsoleMilestone(console,mark,s=state){return consoleMilestones(console,s).includes(mark)}
function milestoneMultiplier(console,s=state){return Math.pow(2,MILESTONES.filter(mark=>hasConsoleMilestone(console,mark,s)).length)}
function baseProduction(s=state){return consoles.reduce((sum,item)=>sum+(s.owned[item.id]||0)*item.production*milestoneMultiplier(item,s),0)}
function production(s=state){return baseProduction(s)*effect("production",1,(a,b)=>a*b,s)*effect("all",1,(a,b)=>a*b,s)*archiveEffect("production",1,(a,b)=>a*b,s)*reputationMultiplier(s)*(careerReward("productionMultiplier",s)?.value||1)}
function comboProfile(s=state){const tier=upgradeMaximum("comboTier",s),profiles=[{multiplier:2,required:20,window:6000,duration:15000,cooldown:30000},{multiplier:3,required:28,window:6500,duration:18000,cooldown:32000},{multiplier:4,required:38,window:7500,duration:22000,cooldown:35000},{multiplier:5,required:50,window:9000,duration:25000,cooldown:40000}],profile={...profiles[Math.min(tier,profiles.length-1)]};profile.duration+=archiveEffect("comboDuration",0,(a,b)=>a+b,s)*1000;return profile}
function comboMultiplier(s=state,at=Date.now()){return s.combo?.activeUntil>at?comboProfile(s).multiplier:1}
function decayCombo(at=Date.now(),s=state){const combo=s.combo,profile=comboProfile(s);if(combo.activeUntil>at||combo.cooldownUntil>at){combo.count=0;combo.clicks=0;combo.lastUpdatedAt=at;return combo.count}const last=combo.lastUpdatedAt||at,elapsed=Math.max(0,at-last),decay=profile.required/profile.window*.25*elapsed;combo.count=Math.max(0,(Number(combo.count)||0)-decay);combo.clicks=Math.min(Number(combo.clicks)||0,Math.floor(combo.count+1e-9));combo.lastUpdatedAt=at;return combo.count}
function registerComboClick(at=Date.now(),s=state){const combo=s.combo,profile=comboProfile(s);if(combo.activeUntil>at||combo.cooldownUntil>at){decayCombo(at,s);return comboMultiplier(s,at)}decayCombo(at,s);combo.count+=1.25;combo.clicks=(combo.clicks||0)+1;if(combo.clicks>=profile.required&&combo.count>=profile.required){combo.count=0;combo.clicks=0;combo.activeUntil=at+profile.duration;combo.cooldownUntil=combo.activeUntil+profile.cooldown;showAchievement(`🔥 Focus ×${profile.multiplier} pendant ${formatDuration(profile.duration/1000)}`);playTone(860,.18)}return comboMultiplier(s,at)}
function clickValue(s=state,at=Date.now()){const base=effect("click",1,(a,b)=>a*b,s)*reputationMultiplier(s)+effect("clickPps",0,(a,b)=>a+b,s)*production(s);return base*comboMultiplier(s,at)}
function copyPrice(s=state){return 3*effect("price",1,(a,b)=>a*b,s)*effect("all",1,(a,b)=>a*b,s)*archiveEffect("price",1,(a,b)=>a*b,s)}
function salesCapacity(s=state){return Math.max(3,production(s)*1.15+s.catalog.length*.5)*effect("sales",1,(a,b)=>a*b,s)*effect("all",1,(a,b)=>a*b,s)*archiveEffect("sales",1,(a,b)=>a*b,s)}
function genreProgress(id,s=state){return s.genreProgress[id]||{level:1,xp:0}}
function genreXpTarget(level){return 100*level*level}
function genreLevelMultiplier(id,s=state){return 1+(genreProgress(id,s).level-1)*.14}
function genreUnlocked(genre,s=state){return genre.unlock===0||s.lifetimeRevenue>=genre.unlock||genreProgress(genre.id,s).xp>0}
function platformById(id){return id==="computer"?computerPlatform:consoles.find(item=>item.id===id)}
function availablePlatforms(s=state){return [computerPlatform,...consoles.filter(item=>(s.owned[item.id]||0)>0)]}
function platformReach(id){const platform=platformById(id);return !platform||id==="computer"?1:1+platform.index*.09}
function platformAffinity(id,genreId){const platform=platformById(id),affinities=familyAffinities[platform?.family]||[];return affinities.includes(genreId)?1.25:1}
function platformFit(ids,genreId){const targets=ids.length?ids:["computer"];return targets.reduce((sum,id)=>sum+platformAffinity(id,genreId),0)/targets.length}
function platformAudienceFactor(ids){const targets=ids.length?ids:["computer"];return .72+.28*targets.reduce((sum,id)=>sum+platformReach(id),0)}
function platformKitBonus(ids,s=state){const consoleIds=ids.filter(id=>id!=="computer");if(!consoleIds.length)return 0;return Math.round(consoleIds.reduce((sum,id)=>sum+Math.min(8,Math.log2((s.owned[id]||0)+1)*2),0)/consoleIds.length)}
function platformNames(ids){return (ids?.length?ids:["computer"]).map(id=>platformById(id)?.name||"Ordinateur").join(", ")}
function franchiseLevel(franchise){return franchise?Math.min(10,1+Math.floor((franchise.xp||0)/150)):0}
function franchiseForGame(game,s=state){return s.franchises.find(franchise=>franchise.id===game.franchiseId)}
function currentFranchise(){return state.franchises.find(franchise=>franchise.id===selectedFranchiseId)||null}
function genreFranchises(genreId,s=state){return s.franchises.filter(franchise=>franchise.genreId===genreId)}
function franchiseModifiers(franchise){if(!franchise)return{audience:1,quality:0,cost:1,duration:1,fatigue:1};const level=franchiseLevel(franchise),fatigue=Math.max(.65,1-Math.max(0,franchise.episodes-3)*.08);return{audience:(1+level*.12)*fatigue,quality:Math.min(8,level*2),cost:1.15,duration:1.1,fatigue}}
function episodeSuffix(number){const roman=["","I","II","III","IV","V","VI","VII","VIII","IX","X"];return roman[number]||String(number)}
function plannedFranchiseProjects(franchiseId,s=state){if(!franchiseId)return 0;return (s.activeProject?.franchiseId===franchiseId?1:0)+(s.projectQueue||[]).filter(project=>project.franchiseId===franchiseId).length}
function planningFranchise(franchise,s=state){return franchise?{...franchise,episodes:franchise.episodes+plannedFranchiseProjects(franchise.id,s)}:null}
function sequelName(franchise,plannedAhead=0){return `${franchise.name} ${episodeSuffix(franchise.episodes+1+plannedAhead)}`}
function specialistById(id){return specialists.find(item=>item.id===id)}
function specialistBranch(id){return specialistBranches.find(branch=>branch.id===id)}
function staffRecord(id,s=state){return s.staffStats[id]||{projects:0}}
function specialistSkill(specialist,s=state){return specialist?specialist.skill+Math.min(1,(staffRecord(specialist.id,s).projects||0)*.1):0}
function specialistCareerReady(specialist,s=state){if(!specialist||specialist.gradeIndex===0)return true;const previousGrade=specialistGrades[specialist.gradeIndex-1],previous=staffRecord(`${specialist.branchId}_${previousGrade.id}`,s);return (previous.projects||0)>=specialist.requiredProjects}
function specialistCareerProgress(specialist,s=state){if(!specialist||specialist.gradeIndex===0)return{current:0,target:0};const previousGrade=specialistGrades[specialist.gradeIndex-1],previous=staffRecord(`${specialist.branchId}_${previousGrade.id}`,s);return{current:Math.min(specialist.requiredProjects,previous.projects||0),target:specialist.requiredProjects,previous:previousGrade.label}}
function activeSpecialists(s=state,teamIds=s.activeTeam){return (teamIds||[]).map(specialistById).filter(Boolean)}
function activeBranchSkill(branchId,s=state,teamIds=s.activeTeam){const member=activeSpecialists(s,teamIds).find(item=>item.branchId===branchId);return specialistSkill(member,s)}
function teamCapacityForReputation(value){return value>=93?8:value>=85?7:value>=75?6:value>=65?5:value>=50?4:3}
function rosterCapacity(s=state){return (s.teamCapacity||3)+4}
function specialistMarketGrade(branchId,s=state){return specialists.filter(item=>item.branchId===branchId&&s.lifetimeRevenue>=item.unlockRevenue&&s.studioReputation>=item.unlockReputation&&specialistCareerReady(item,s)).reduce((highest,item)=>Math.max(highest,item.gradeIndex),0)}
function recruitmentCandidates(s=state){return specialistBranches.map(branch=>{const gradeIndex=specialistMarketGrade(branch.id,s);return specialists.find(item=>item.branchId===branch.id&&item.gradeIndex===gradeIndex&&!s.roster.includes(item.id)&&s.lifetimeRevenue>=item.unlockRevenue&&s.studioReputation>=item.unlockReputation&&specialistCareerReady(item,s))}).filter(Boolean)}
function teamProjectFee(tier,s=state,teamIds=s.activeTeam){return activeSpecialists(s,teamIds).reduce((sum,item)=>sum+item.projectFee*(1+tier.rank*.25),0)}
function teamQualityBonus(genreId,s=state,teamIds=s.activeTeam){const weights={design:1.6,qa:1,production:.35,ux:1.1};const total=activeSpecialists(s,teamIds).reduce((sum,item)=>{const branch=specialistBranch(item.branchId),relevant=branch?.genres.includes(genreId),weight=weights[item.branchId]??(relevant?1.8:.35);return sum+specialistSkill(item,s)*weight},0);return Math.min(30,total)}
function teamCostMultiplier(s=state,teamIds=s.activeTeam){return Math.max(.8,1-activeBranchSkill("production",s,teamIds)*.025)}
function teamDurationMultiplier(s=state,teamIds=s.activeTeam){return Math.max(.68,1-activeBranchSkill("production",s,teamIds)*.025-activeBranchSkill("programming",s,teamIds)*.02)}
function qualityVariance(s=state,teamIds=s.activeTeam){return Math.max(1.5,7-activeBranchSkill("qa",s,teamIds))}
function projectScope(tier,ids,franchise=null,teamIds=state.activeTeam,s=state,marketing=null){const count=Math.max(1,ids.length),series=franchiseModifiers(franchise),fees=teamProjectFee(tier,s,teamIds),campaign=marketing?marketingCost(marketing,s):0,durationReward=1-(careerReward("durationDiscount",s)?.value||0);return{cost:tier.cost*(1+(count-1)*.28)*series.cost*teamCostMultiplier(s,teamIds)+fees+campaign,duration:tier.duration*(1+(count-1)*.18)*series.duration*teamDurationMultiplier(s,teamIds)*durationReward*effect("projectDuration",1,(a,b)=>a*b,s)*archiveEffect("projectDuration",1,(a,b)=>a*b,s),teamFee:fees,marketingCost:campaign}}

function trendSnapshot(at=Date.now()){
  const slot=Math.floor(at/TREND_DURATION);
  const count=genres.length;
  const first=(slot*7+3)%count,second=(slot*11+8)%count,third=(slot*13+14)%count;
  const hot=[first,second,third].filter((value,index,array)=>array.indexOf(value)===index);
  let cursor=0;
  while(hot.length<3){const candidate=(first+5+cursor++)%count;if(!hot.includes(candidate))hot.push(candidate)}
  let cold=(slot*17+1)%count;while(hot.includes(cold))cold=(cold+1)%count;
  return{slot,hot:hot.map(index=>genres[index].id),cold:genres[cold].id,endsAt:(slot+1)*TREND_DURATION};
}
function demandStatus(id,at=Date.now()){const trend=trendSnapshot(at);return trend.hot.includes(id)?"hot":trend.cold===id?"cold":"normal"}
function demandMultiplier(id,at=Date.now()){const status=demandStatus(id,at);return status==="hot"?1.6:status==="cold"?.75:1}
function demandLabel(id){const status=demandStatus(id);return status==="hot"?"En hausse":status==="cold"?"En baisse":"Stable"}
function gameRoyalty(game,s=state){const franchise=franchiseForGame(game,s),catalogBonus=franchise?1+(franchiseLevel(franchise)-1)*.03:1;return game.baseRoyalty*genreLevelMultiplier(game.genreId,s)*demandMultiplier(game.genreId)*catalogBonus*effect("royalty",1,(a,b)=>a*b,s)*effect("all",1,(a,b)=>a*b,s)*archiveEffect("royalty",1,(a,b)=>a*b,s)*(careerReward("royaltyMultiplier",s)?.value||1)*activeGlobalRoyalty(s)}
function catalogRoyalties(s=state){return s.catalog.reduce((sum,game)=>sum+gameRoyalty(game,s),0)}
function estimatedSalesRevenue(s=state){const copyFlow=Math.min(salesCapacity(s),s.stock>1?salesCapacity(s):production(s));return copyFlow*copyPrice(s)}
function estimatedRevenue(s=state){return estimatedSalesRevenue(s)+catalogRoyalties(s)}

function unitCost(console,count=1,owned=state.owned[console.id]||0){
  if(count<=0)return console.baseCost*Math.pow(COST_GROWTH,owned);
  const first=console.baseCost*Math.pow(COST_GROWTH,owned);
  return first*(Math.pow(COST_GROWTH,count)-1)/(COST_GROWTH-1);
}
function milestoneUpgradeCost(console,mark){const index=MILESTONES.indexOf(mark),rates=[.35,.55,.8,1.1];return unitCost(console,mark,0)*rates[Math.max(0,index)]}
function nextConsoleMilestone(console,s=state){return MILESTONES.find(mark=>!hasConsoleMilestone(console,mark,s))||null}
function availableConsoleMilestones(s=state){return consoles.map(console=>{const mark=nextConsoleMilestone(console,s);return mark&&(s.owned[console.id]||0)>=mark?{console,mark,cost:milestoneUpgradeCost(console,mark)}:null}).filter(Boolean)}
function maxAffordable(console,money=state.money,owned=state.owned[console.id]||0){
  const first=console.baseCost*Math.pow(COST_GROWTH,owned);
  if(money<first)return 0;
  return Math.max(0,Math.floor(Math.log(1+money*(COST_GROWTH-1)/first)/Math.log(COST_GROWTH)+1e-9));
}
function purchaseQuote(console,s=state){
  const owned=s.owned[console.id]||0;
  const count=s.buyMode==="max"?maxAffordable(console,s.money,owned):Number(s.buyMode)||1;
  return{count,cost:unitCost(console,Math.max(1,count),owned)};
}
function consoleUnlocked(console,s=state){return console.index<4||s.lifetimeRevenue>=console.baseCost/12}
function nextMilestone(console,s=state){return nextConsoleMilestone(console,s)}
function availableUpgrades(s=state){return upgrades.filter(upgrade=>!hasUpgrade(upgrade.id,s)&&s.lifetimeRevenue>=upgrade.unlock)}
function prestigeGain(s=state){if(s.runRevenue<1e6)return 0;const raw=1+Math.floor(4*Math.log10(s.runRevenue/1e6)),slowdown=1+Math.max(0,(s.reputation||0)-3)/10;return Math.max(1,Math.floor(raw/slowdown))}

function currentGenre(){return genres.find(genre=>genre.id===els.genreSelect.value)||genres[0]}
function currentTier(){return budgetTiers.find(tier=>tier.id===selectedTierId)||budgetTiers[0]}
function currentMarketing(){return marketingById(selectedMarketingId)}
function tierUnlocked(tier,s=state){return s.lifetimeRevenue>=tier.unlock}
function projectQualityBaseline(genre,tier,platformIds=selectedPlatformIds,franchise=currentFranchise(),teamIds=state.activeTeam,s=state,eventBonus=0){const levelBonus=Math.min(12,(genreProgress(genre.id,s).level-1)*1.4),fitBonus=(platformFit(platformIds,genre.id)-1)*24,kitBonus=platformKitBonus(platformIds,s),series=franchiseModifiers(franchise),reward=careerReward("qualityBonus",s)?.value||0,archive=archiveEffect("qualityBonus",0,(a,b)=>a+b,s);return clamp(48+tier.rank*2+levelBonus+fitBonus+kitBonus+series.quality+teamQualityBonus(genre.id,s,teamIds)+reward+archive+eventBonus,35,100)}
function projectQualityRange(genre,tier,platformIds=selectedPlatformIds,franchise=currentFranchise(),teamIds=state.activeTeam,s=state,eventBonus=0){const baseline=projectQualityBaseline(genre,tier,platformIds,franchise,teamIds,s,eventBonus),variance=qualityVariance(s,teamIds);return{low:clamp(Math.round(baseline-variance),30,100),high:clamp(Math.round(baseline+variance),30,100),baseline}}
function projectQuality(genre,tier,platformIds=selectedPlatformIds,franchise=currentFranchise(),teamIds=state.activeTeam,s=state,eventBonus=0){const range=projectQualityRange(genre,tier,platformIds,franchise,teamIds,s,eventBonus);return clamp(Math.round(range.baseline+(Math.random()*2-1)*qualityVariance(s,teamIds)),30,100)}
function projectEstimate(genre=currentGenre(),tier=currentTier(),quality=65,platformIds=selectedPlatformIds,franchise=currentFranchise(),marketing=null,marketingBoost=1){const qualityFactor=quality/60,market=demandMultiplier(genre.id),fit=platformFit(platformIds,genre.id),audience=platformAudienceFactor(platformIds)*franchiseModifiers(franchise).audience*(marketing?.audience||1)*marketingBoost;return{copies:tier.launchCopies*genre.base*qualityFactor*market*fit*audience,royalty:tier.royalty*genre.base*qualityFactor*fit*audience}}
function reviewVerdict(score){return score>=98?"Un classique instantané.":score>=92?"Une œuvre majeure du média.":score>=85?"Une réussite remarquable.":score>=75?"Solide, généreux et maîtrisé.":score>=65?"Des qualités, malgré des limites visibles.":score>=50?"Une production inégale.":"Un projet dépassé par ses ambitions."}
function reviewProject(project,genre,tier,franchise=null){if(project.isFinal){const reviews=criticOutlets.map(outlet=>({id:outlet.id,name:outlet.name,icon:outlet.icon,score:100,verdict:"Une œuvre qui redéfinit le jeu vidéo."}));return{reviews,criticScore:100,playerScore:100}}const originality=project.franchiseId?0:2,expectation=(marketingById(project.marketingId).expectation||0)+(project.marketingExpectationBonus||0),expectationEffect=clamp((project.quality-tier.expectation-expectation)*.2,-9,3),base=project.quality+originality+expectationEffect;const reviews=criticOutlets.map(outlet=>{const affinity=outlet.likes.includes(genre.id)?2:0,score=clamp(Math.round(base+affinity+(Math.random()*7-3.5)),20,100);return{id:outlet.id,name:outlet.name,icon:outlet.icon,score,verdict:reviewVerdict(score)}});const criticScore=Math.round(reviews.reduce((sum,item)=>sum+item.score,0)/reviews.length),series=franchiseModifiers(franchise),playerScore=clamp(Math.round(project.quality+(series.audience-1)*7+(Math.random()*7-3.5)),20,100);return{reviews,criticScore,playerScore}}
function reputationLabel(value){return value>=95?"Studio légendaire":value>=85?"Référence mondiale":value>=75?"Studio acclamé":value>=65?"Valeur sûre":value>=50?"Studio reconnu":value>=35?"Promesse remarquée":"Studio inconnu"}
function updateStudioReputation(score){state.reviewHistory.unshift(score);state.reviewHistory=state.reviewHistory.slice(0,10);state.studioReputation=state.reviewHistory.reduce((sum,value)=>sum+value,0)/state.reviewHistory.length;state.teamCapacity=Math.max(state.teamCapacity||3,teamCapacityForReputation(state.studioReputation))}
function updateBestGenreScore(game,s=state){const previous=s.bestGenreScores[game.genreId]||{critic:0,player:0,mastered:false,name:""},previousMin=Math.min(previous.critic||0,previous.player||0),currentMin=Math.min(game.criticScore||0,game.playerScore||0);if(currentMin>=previousMin)s.bestGenreScores[game.genreId]={critic:game.criticScore,player:game.playerScore,mastered:game.criticScore>=90&&game.playerScore>=90,name:game.name}}
function masterpieceGenreCount(s=state){return genres.filter(genre=>s.bestGenreScores[genre.id]?.mastered).length}
function unlockAwards(silent=false){const unlocked=awards.filter(item=>!state.awards.includes(item.id)&&item.check(state));if(!unlocked.length)return[];state.awards.push(...unlocked.map(item=>item.id));if(!silent)showAchievement(unlocked.length===1?`${unlocked[0].icon} ${unlocked[0].name}`:`🏆 ${unlocked.length} nouvelles récompenses`);return unlocked}
function eventChoiceCost(choice,s=state){const baseMoney=s.pendingEvent?.baseMoney??s.money;return Math.max(choice.minCost||0,(choice.costRate||0)*baseMoney)}
function eventChoiceGrant(choice,s=state){const baseMoney=s.pendingEvent?.baseMoney??s.money,baseRevenue=s.pendingEvent?.baseRevenue??s.lifetimeRevenue;return Math.max(choice.minGrant||0,(choice.grantRate||0)*Math.max(baseRevenue,baseMoney))}
function applyEventEffects(choice){const effects=choice.effects||{},current=state.eventEffects;current.nextQuality+=(effects.nextQuality||0);current.nextMarketing*=effects.nextMarketing||1;current.nextDuration*=effects.nextDuration||1;current.nextExpectation+=(effects.nextExpectation||0);if(effects.globalRoyalty){current.globalRoyalty=Math.max(current.globalRoyalty,effects.globalRoyalty);current.globalRoyaltyUntil=Math.max(current.globalRoyaltyUntil,Date.now()+(effects.globalRoyaltySeconds||120)*1000)}}
function scheduleNextEvent(){state.nextEventAt=Date.now()+90000+Math.random()*90000}
function triggerStudioEvent(){if(state.pendingEvent||state.stats.gamesReleased<1||state.activeProject||Date.now()<state.nextEventAt||document.querySelector("dialog[open]"))return;const last=state.eventHistory[0]?.eventId,pool=studioEvents.filter(item=>item.id!==last),event=pool[Math.floor(Math.random()*pool.length)];state.pendingEvent={id:event.id,baseMoney:state.money,baseRevenue:state.lifetimeRevenue};renderEventDialog(event);els.eventDialog.showModal();save()}
function renderEventDialog(event){els.eventIcon.textContent=event.icon;els.eventTitle.textContent=event.title;els.eventDescription.textContent=event.description;els.eventChoices.innerHTML=event.choices.map(choice=>{const cost=eventChoiceCost(choice),grant=eventChoiceGrant(choice),disabled=cost>state.money;return `<button type="button" data-event-choice="${choice.id}" ${disabled?"disabled":""}><strong>${choice.label}${cost?` · ${formatMoney(cost)}`:grant?` · +${formatMoney(grant)}`:""}</strong><small>${choice.result}</small></button>`}).join("")}
function resolveStudioEvent(choiceId){const event=studioEvents.find(item=>item.id===state.pendingEvent?.id),choice=event?.choices.find(item=>item.id===choiceId);if(!event||!choice)return;const cost=eventChoiceCost(choice),grant=eventChoiceGrant(choice);if(cost>state.money)return;state.money-=cost;state.money+=grant;applyEventEffects(choice);state.eventHistory.unshift({eventId:event.id,choiceId:choice.id,title:event.title,result:choice.result,at:Date.now()});state.eventHistory=state.eventHistory.slice(0,12);state.pendingEvent=null;scheduleNextEvent();els.eventDialog.close();toast(choice.result);renderAll();save()}
function eventEffectSummary(s=state){const effects=s.eventEffects,items=[];if(effects.nextQuality)items.push(`qualité ${effects.nextQuality>0?"+":""}${effects.nextQuality}`);if(effects.nextMarketing!==1)items.push(`audience ×${effects.nextMarketing.toFixed(2).replace(".",",")}`);if(effects.nextDuration!==1)items.push(`durée ${Math.round((effects.nextDuration-1)*100)>0?"+":""}${Math.round((effects.nextDuration-1)*100)} %`);if(effects.nextExpectation)items.push(`attentes ${effects.nextExpectation>0?"+":""}${effects.nextExpectation}`);if(effects.globalRoyaltyUntil>Date.now())items.push(`royalties ×${effects.globalRoyalty.toFixed(2).replace(".",",")} (${formatDuration((effects.globalRoyaltyUntil-Date.now())/1000)})`);return items}
function finalRequirements(s=state){const legendaryFranchises=s.franchises.filter(item=>franchiseLevel(item)>=10).length,team=activeSpecialists(s);return[
  {id:"genres",label:"18 chefs-d’œuvre de genre",value:`${masterpieceGenreCount(s)} / ${genres.length}`,complete:masterpieceGenreCount(s)>=genres.length},
  {id:"reputation",label:"Réputation légendaire",value:`${Math.round(s.studioReputation)} / 93`,complete:s.studioReputation>=93},
  {id:"team",label:"8 Stars ou Légendes actives",value:`${team.filter(item=>specialistSkill(item,s)>=4).length} / 8`,complete:team.length>=8&&team.every(item=>specialistSkill(item,s)>=4)},
  {id:"franchises",label:"3 franchises niveau 10",value:`${legendaryFranchises} / 3`,complete:legendaryFranchises>=3},
  {id:"trophies",label:"30 trophées",value:`${awardTotal(s)} / 30`,complete:awardTotal(s)>=30}
]}
function canStartFinalProject(s=state){return !s.gameCompleted&&!s.activeProject&&!(s.projectQueue||[]).length&&finalRequirements(s).every(item=>item.complete)&&s.money>=FINAL_PROJECT_COST}
function startFinalProject(){if(!canStartFinalProject())return;const startedAt=Date.now(),teamIds=[...state.activeTeam],duration=FINAL_PROJECT_DURATION*effect("projectDuration",1)*archiveEffect("projectDuration",1);state.money-=FINAL_PROJECT_COST;state.activeProject={genreId:"platformer",tierId:"generational",platformIds:["computer"],franchiseId:null,teamIds,invested:FINAL_PROJECT_COST,name:"L’Ultime Pixel",quality:100,marketingId:"omniverse",marketingBoost:1,isFinal:true,startedAt,baseDurationMs:duration*1000,manualAccelerationMs:0,rushesUsed:0,completesAt:startedAt+duration*1000};toast("Le projet ultime est lancé. Toute l’histoire du studio y converge.");playTone(920,.35);renderAll();save()}
function makeGameName(genre){
  const starts=["Neon","Pixel","Hyper","Tiny","Shadow","Cosmic","Turbo","Crystal","Iron","Mystic","Infinite","Pocket"];
  const endings={platformer:["Jump","Islands","Quest"],sports:["Arena","League","Champions"],rpg:["Chronicles","Legends","Realms"],shmup:["Squadron","Blaster","Nova"],puzzle:["Blocks","Logic","Mosaic"],racing:["Velocity","Circuit","Rush"],strategy:["Empire","Frontiers","Tactics"],adventure:["Journey","Secrets","Odyssey"],fighting:["Clash","Fighters","Dojo"],fps:["Strike","Protocol","Warzone"],management:["Tycoon","Factory","Director"],horror:["Night","Below","Whispers"],simulation:["Simulator","Control","World"],rhythm:["Beat","Pulse","Encore"],roguelike:["Depths","Again","Dungeon"],survival:["Last Camp","Wilds","Aftermath"],visualnovel:["Memories","Letters","Promise"],mmorpg:["Online","Eternal","Nations"]};
  const pool=endings[genre.id]||["Game"];
  return `${starts[Math.floor(Math.random()*starts.length)]} ${pool[Math.floor(Math.random()*pool.length)]}`;
}
function addGenreXp(id,amount){
  const progress=genreProgress(id);progress.xp+=amount*archiveEffect("genreXp",1);
  let leveled=false;
  while(progress.xp>=genreXpTarget(progress.level)){progress.xp-=genreXpTarget(progress.level);progress.level++;leveled=true}
  state.genreProgress[id]=progress;
  if(leveled)showAchievement(`${genres.find(g=>g.id===id).name} atteint le niveau ${progress.level}`);
}

function save(){if(!initialized)return;state.savedAt=Date.now();localStorage.setItem(SAVE_KEY,JSON.stringify(state))}
function addCopies(amount){if(!Number.isFinite(amount)||amount<=0)return;state.stock+=amount;state.lifetimeCopies+=amount}
function addRevenue(amount){if(!Number.isFinite(amount)||amount<=0)return;state.money+=amount;state.runRevenue+=amount;state.lifetimeRevenue+=amount}

function startNextQueuedProject(at=Date.now(),s=state){
  const next=(s.projectQueue||[]).shift();if(!next)return null;const duration=Math.max(100,next.baseDurationMs||1000);s.activeProject={...next,startedAt:at,completesAt:at+duration,manualAccelerationMs:0,rushesUsed:0};s.nextPitchAt=at;return s.activeProject;
}

function finishProject(silent=false){
  const project=state.activeProject;if(!project)return;
  const genre=genres.find(item=>item.id===project.genreId),tier=budgetTiers.find(item=>item.id===project.tierId);
  const platformIds=project.platformIds?.length?project.platformIds:["computer"],existingFranchise=state.franchises.find(item=>item.id===project.franchiseId)||null,marketing=marketingById(project.marketingId),estimate=projectEstimate(genre,tier,project.quality,platformIds,existingFranchise,marketing,project.marketingBoost||1),oldReputation=state.studioReputation,review=reviewProject(project,genre,tier,existingFranchise);
  const franchise=existingFranchise||{id:`franchise_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,name:project.name,genreId:genre.id,episodes:0,xp:0,lastQuality:0};
  franchise.episodes++;franchise.xp=(franchise.xp||0)+review.criticScore+tier.rank*20;franchise.lastQuality=project.quality;if(!existingFranchise)state.franchises.unshift(franchise);
  const game={id:`game_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,name:project.name,genreId:genre.id,tierId:tier.id,platformIds,franchiseId:franchise.id,episodeNumber:franchise.episodes,quality:project.quality,criticScore:review.criticScore,playerScore:review.playerScore,reviews:review.reviews,marketingId:marketing.id,baseRoyalty:estimate.royalty,releasedAt:Date.now()};
  state.catalog.unshift(game);updateStudioReputation(review.criticScore);(project.teamIds||[]).forEach(id=>{const record=staffRecord(id);state.staffStats[id]={...record,projects:(record.projects||0)+1}});addCopies(estimate.copies);addGenreXp(genre.id,tier.xp);state.stats.gamesReleased++;updateBestGenreScore(game);state.activeProject=null;const continued=!project.isFinal&&startNextQueuedProject(project.completesAt||Date.now());state.nextPitchAt=continued?state.nextPitchAt:Date.now()+30000;if(state.stats.gamesReleased===1)state.nextEventAt=Math.min(state.nextEventAt,Date.now()+60000);if(project.isFinal){state.gameCompleted=true;state.completedAt=Date.now()}const newAwards=unlockAwards(true);
  if(!silent){showAchievement(`${project.name} est sorti !`);toast(`${format(estimate.copies)} copies de lancement ajoutées au stock.`);if(project.isFinal)showEnding(game);else showReview(game,oldReputation,newAwards);playTone(project.isFinal?980:740,project.isFinal ? .45 : .2)}
}

function restoreOffline(){
  const elapsed=Math.min(OFFLINE_LIMIT,Math.max(0,(Date.now()-(state.savedAt||Date.now()))/1000));
  if(elapsed<5)return;
  let completed=0;while(state.activeProject&&state.activeProject.completesAt<=Date.now()&&completed<20){finishProject(true);completed++}
  const offlineMultiplier=effect("offline",1);
  const made=production()*elapsed*offlineMultiplier;addCopies(made);
  const sold=Math.min(state.stock,salesCapacity()*elapsed*offlineMultiplier);state.stock-=sold;state.copiesSold+=sold;
  const revenue=sold*copyPrice()+catalogRoyalties()*elapsed*offlineMultiplier;addRevenue(revenue);
  setTimeout(()=>toast(`Pendant ton absence : ${format(made)} copies produites et ${formatMoney(revenue)} gagnés.`),400);
}

function update(dt){
  if(state.activeProject&&state.activeProject.completesAt<=Date.now())finishProject();
  const made=production()*dt;addCopies(made);
  const sold=Math.min(state.stock,salesCapacity()*dt);state.stock-=sold;state.copiesSold+=sold;
  addRevenue(sold*copyPrice()+catalogRoyalties()*dt);runAutomation();
  state.stats.playSeconds+=dt;state.stats.bestRevenue=Math.max(state.stats.bestRevenue,estimatedRevenue());triggerStudioEvent();
}

function runAutomation(at=Date.now(),s=state){
  if(at-(s.automation.lastPurchaseAt||0)<1000)return null;s.automation.lastPurchaseAt=at;const budget=s.money*.8;
  if(hasArchiveUpgrade("archive_auto_research",s)&&s.automation.research){const upgrade=availableUpgrades(s).filter(item=>item.cost<=budget).sort((a,b)=>a.cost-b.cost)[0];if(upgrade){s.money-=upgrade.cost;s.upgrades.push(upgrade.id);if(s===state)toast(`Assistant R&D : ${upgrade.name} installé.`);return upgrade.id}}
  if(hasArchiveUpgrade("archive_auto_milestones",s)&&s.automation.milestones){const milestone=availableConsoleMilestones(s).filter(item=>item.cost<=budget).sort((a,b)=>a.cost-b.cost)[0];if(milestone){s.money-=milestone.cost;s.consoleMilestones[milestone.console.id]=[...consoleMilestones(milestone.console,s),milestone.mark];if(s===state)toast(`Intendant : ${milestone.console.name} optimisée au palier ${milestone.mark}.`);return `${milestone.console.id}_${milestone.mark}`}}
  return null;
}

function buyConsole(id){
  const console=consoles.find(item=>item.id===id);if(!console||!consoleUnlocked(console))return;
  const quote=purchaseQuote(console);if(quote.count<=0||state.money+1e-8<quote.cost)return;
  state.money-=quote.cost;state.owned[id]=(state.owned[id]||0)+quote.count;state.stats.consolesBought+=quote.count;
  toast(`${quote.count} × ${console.name} installé${quote.count>1?"s":""}.`);playTone(420+console.index*11,.08);renderAll();save();
}
function buyUpgrade(id){
  const upgrade=upgrades.find(item=>item.id===id);if(!upgrade||hasUpgrade(id)||state.lifetimeRevenue<upgrade.unlock||state.money<upgrade.cost)return;
  state.money-=upgrade.cost;state.upgrades.push(id);toast(`${upgrade.name} installé.`);playTone(620,.12);renderAll();save();
}
function buyConsoleMilestone(id,mark){
  const console=consoles.find(item=>item.id===id),target=Number(mark);if(!console||!MILESTONES.includes(target)||nextConsoleMilestone(console)!==target||(state.owned[id]||0)<target)return;
  const cost=milestoneUpgradeCost(console,target);if(state.money<cost)return;state.money-=cost;state.consoleMilestones[id]=[...consoleMilestones(console),target];toast(`${console.name} optimisée : production du modèle ×2.`);playTone(700,.14);renderAll();save();
}
function buyArchiveUpgrade(id){
  const upgrade=archiveUpgrades.find(item=>item.id===id);if(!upgrade||hasArchiveUpgrade(id)||(upgrade.requires&&!hasArchiveUpgrade(upgrade.requires))||state.archivePoints<upgrade.cost)return;
  const before=reputationMultiplier(),after=reputationMultiplier({...state,archivePoints:state.archivePoints-upgrade.cost});if(!confirm(`${upgrade.name} coûtera ${upgrade.cost} héritage actif.\nMultiplicateur général : ×${before.toFixed(2).replace(".",",")} → ×${after.toFixed(2).replace(".",",")}\n\nConfirmer cet investissement permanent ?`))return;
  state.archivePoints-=upgrade.cost;state.archiveUpgrades.push(id);toast(`${upgrade.name} inscrit dans les archives. Il reste ${format(state.archivePoints)} héritage actif.`);playTone(760,.16);renderAll();save();
}

function recruitSpecialist(id){
  const specialist=specialistById(id),available=recruitmentCandidates().some(item=>item.id===id);if(!specialist||!available||state.roster.length>=rosterCapacity()||state.money<specialist.cost)return;
  state.money-=specialist.cost;state.roster.push(id);state.staffStats[id]=state.staffStats[id]||{projects:0};
  if(state.activeTeam.length<state.teamCapacity&&!state.activeTeam.some(memberId=>specialistById(memberId)?.branchId===specialist.branchId))state.activeTeam.push(id);
  toast(`${specialist.name} rejoint le studio.`);playTone(660,.14);renderAll();save();
}
function activateSpecialist(id){
  const specialist=specialistById(id);if(!specialist||!state.roster.includes(id)||state.activeTeam.includes(id))return;
  const branchIndex=state.activeTeam.findIndex(memberId=>specialistById(memberId)?.branchId===specialist.branchId);
  if(branchIndex>=0)state.activeTeam.splice(branchIndex,1,id);else if(state.activeTeam.length<state.teamCapacity)state.activeTeam.push(id);else{toast("Toutes les places actives sont occupées.");return}
  toast(`${specialist.name} rejoint l’équipe active.`);renderAll();save();
}
function reserveSpecialist(id){
  if(!state.activeTeam.includes(id))return;state.activeTeam=state.activeTeam.filter(memberId=>memberId!==id);toast(`${specialistById(id)?.name||"Ce spécialiste"} passe en réserve.`);renderAll();save();
}
function fireSpecialist(id){
  const specialist=specialistById(id);if(!specialist||!state.roster.includes(id))return;const refund=specialist.cost*.2;
  if(!confirm(`Rompre le contrat de ${specialist.name} ? Le studio récupérera ${formatMoney(refund)}.`))return;
  state.roster=state.roster.filter(memberId=>memberId!==id);state.activeTeam=state.activeTeam.filter(memberId=>memberId!==id);state.money+=refund;toast(`${specialist.name} quitte le studio.`);renderAll();save();
}

function openProjectDialog(){
  const queueing=Boolean(state.activeProject);if(queueing?!canQueueProject():Date.now()<state.nextPitchAt)return;
  const unlocked=genres.filter(genre=>genreUnlocked(genre));
  els.genreSelect.innerHTML=unlocked.map(genre=>`<option value="${genre.id}">${genre.icon} ${genre.name} · niveau ${genreProgress(genre.id).level}</option>`).join("");
  selectedPlatformIds=["computer"];
  selectedFranchiseId=null;
  selectedMarketingId="organic";
  const firstAffordable=budgetTiers.filter(tier=>tierUnlocked(tier)&&state.money>=projectScope(tier,["computer"],null).cost).at(-1);selectedTierId=(firstAffordable||budgetTiers[0]).id;
  els.projectDialogEyebrow.textContent=queueing?"Planification":"Nouveau projet";els.projectDialogTitle.textContent=queueing?"Quel sera le prochain jeu ?":"Quel jeu allons-nous créer ?";
  renderProjectDialog();els.projectDialog.showModal();
}
function renderProjectDialog(){
  const genre=currentGenre(),tier=currentTier(),progress=genreProgress(genre.id),marketing=currentMarketing(),effects=state.eventEffects;if(currentFranchise()?.genreId!==genre.id)selectedFranchiseId=null;const baseFranchise=currentFranchise(),franchise=planningFranchise(baseFranchise),series=franchiseModifiers(franchise),scope=projectScope(tier,selectedPlatformIds,franchise,state.activeTeam,state,marketing),qualityRange=projectQualityRange(genre,tier,selectedPlatformIds,franchise,state.activeTeam,state,effects.nextQuality),previewQuality=qualityRange.baseline,estimate=projectEstimate(genre,tier,previewQuality,selectedPlatformIds,franchise,marketing,effects.nextMarketing),trend=demandStatus(genre.id),teamBonus=teamQualityBonus(genre.id),queueing=Boolean(state.activeProject);
  els.dialogTrend.textContent=trend==="hot"?`${genre.name} est très demandé : revenus ×1,6`:trend==="cold"?`${genre.name} ralentit : revenus ×0,75`:`${genre.name} est stable`;
  els.genrePreview.textContent=`${genre.description} Niveau ${progress.level} : tous les revenus de ce genre sont multipliés par ${genreLevelMultiplier(genre.id).toFixed(2).replace(".",",")}.`;
  const active=activeSpecialists();els.projectTeamSummary.innerHTML=active.length?`<span>${active.map(item=>item.icon||specialistBranch(item.branchId)?.icon).join(" ")}</span><p><strong>${active.length} spécialiste${active.length>1?"s":""} actif${active.length>1?"s":""}</strong><small>+${teamBonus.toFixed(1).replace(".",",")} qualité · honoraires ${formatMoney(scope.teamFee)} · durée ${Math.round((1-teamDurationMultiplier())*100)} % plus courte</small></p>`:`<span>👤</span><p><strong>Aucun spécialiste actif</strong><small>Le budget finance l’ambition, mais une équipe détermine la maîtrise.</small></p>`;
  const compatible=genreFranchises(genre.id);els.franchiseChoiceGrid.innerHTML=`<button type="button" class="franchise-choice" data-franchise="" aria-pressed="${!baseFranchise}"><strong>✨ Nouvelle licence</strong><small>Une création originale sans bonus ni fatigue.</small></button>${compatible.map(item=>{const planned=planningFranchise(item),modifiers=franchiseModifiers(planned),level=franchiseLevel(item),fatigueLoss=Math.round((1-modifiers.fatigue)*100);return `<button type="button" class="franchise-choice" data-franchise="${item.id}" aria-pressed="${item.id===selectedFranchiseId}"><strong>↻ ${sequelName(item,plannedFranchiseProjects(item.id))}</strong><small>Niv. ${level} · audience ${modifiers.audience>=1?"+":""}${Math.round((modifiers.audience-1)*100)} %${fatigueLoss?` · fatigue −${fatigueLoss} %`:""}</small></button>`}).join("")}`;
  els.franchiseHint.textContent=franchise?`Suite : +15 % au budget, +10 % au délai et +${series.quality} en qualité prévue. Les épisodes déjà planifiés comptent dans la fatigue.`:`Le jeu publié deviendra une nouvelle franchise.`;
  els.platformGrid.innerHTML=availablePlatforms().map(platform=>{const selected=selectedPlatformIds.includes(platform.id),affinity=platformAffinity(platform.id,genre.id)>1,owned=platform.id==="computer"?0:state.owned[platform.id]||0;return `<button type="button" class="platform-option" data-platform="${platform.id}" aria-pressed="${selected}"><span>${platform.icon}</span><span><strong>${platform.name}</strong><small>${affinity?`Très adaptée au genre · `:""}public ×${platformReach(platform.id).toFixed(2).replace(".",",")}${owned?` · ${owned} kit${owned>1?"s":""}`:""}</small></span></button>`}).join("");
  const fit=platformFit(selectedPlatformIds,genre.id),kitBonus=platformKitBonus(selectedPlatformIds);els.platformHint.textContent=`${selectedPlatformIds.length} plateforme${selectedPlatformIds.length>1?"s":""} · adéquation ${fit>1?"excellente":"standard"}${kitBonus?` · +${kitBonus} qualité grâce aux kits possédés`:""}`;
  els.budgetGrid.innerHTML=budgetTiers.map(item=>{const unlocked=tierUnlocked(item);return `<button type="button" class="budget-option ${item.id===selectedTierId?"active":""}" data-tier="${item.id}" ${unlocked?"":"disabled"}><strong>${item.name} · ${formatMoney(item.cost)}</strong><small>${unlocked?`${formatDuration(item.duration)} · ${item.description}`:`Débloqué à ${formatMoney(item.unlock)} de revenus`}</small></button>`}).join("");
  els.marketingGrid.innerHTML=marketingPlans.map(item=>{const unlocked=marketingUnlocked(item),cost=marketingCost(item);return `<button type="button" class="marketing-option ${item.id===selectedMarketingId?"active":""}" data-marketing="${item.id}" ${unlocked?"":"disabled"}><span>${item.icon}</span><p><strong>${item.name} · ${formatMoney(cost)}</strong><small>${unlocked?`Audience ×${item.audience.toFixed(2).replace(".",",")} · attentes +${item.expectation}`:`Débloqué à ${formatMoney(item.unlock)} de revenus`}</small></p></button>`}).join("");
  const activeEffects=eventEffectSummary();els.marketingHint.textContent=`${marketing.description}${marketing.expectation?` Une forte campagne augmente les attentes de la presse de ${marketing.expectation} points.`:""}${activeEffects.length?` Bonus événement : ${activeEffects.join(" · ")}.`:""}`;
  els.estimateCost.textContent=formatMoney(scope.cost);els.estimateTime.textContent=formatDuration(scope.duration);els.estimateQuality.textContent=`${qualityRange.low}–${qualityRange.high}/100`;els.estimateTeamFee.textContent=formatMoney(scope.teamFee);els.estimateCopies.textContent=format(estimate.copies);els.estimateRoyalty.textContent=`${format(estimate.royalty)} ¤/s`;
  els.startProject.disabled=!tierUnlocked(tier)||state.money<scope.cost||selectedPlatformIds.length<1||(queueing&&!canQueueProject());els.startProject.textContent=state.money<scope.cost?`Il manque ${formatMoney(scope.cost-state.money)}`:queueing?"Ajouter à la file":"Lancer le développement";
}
function startProject(){
  const queueing=Boolean(state.activeProject),genre=currentGenre(),tier=currentTier(),marketing=currentMarketing(),targets=selectedPlatformIds.filter(id=>availablePlatforms().some(platform=>platform.id===id)).slice(0,3),baseFranchise=currentFranchise(),franchise=planningFranchise(baseFranchise),scope=projectScope(tier,targets,franchise,state.activeTeam,state,marketing),eventEffects={...state.eventEffects};if((queueing?!canQueueProject():Date.now()<state.nextPitchAt)||!genreUnlocked(genre)||!tierUnlocked(tier)||!marketingUnlocked(marketing)||targets.length<1||state.money<scope.cost)return;
  state.money-=scope.cost;const teamIds=[...state.activeTeam],quality=projectQuality(genre,tier,targets,franchise,teamIds,state,eventEffects.nextQuality),now=Date.now(),name=baseFranchise?sequelName(baseFranchise,plannedFranchiseProjects(baseFranchise.id)):makeGameName(genre),duration=scope.duration*eventEffects.nextDuration,project={genreId:genre.id,tierId:tier.id,platformIds:[...targets],franchiseId:baseFranchise?.id||null,teamIds,invested:scope.cost,name,quality,marketingId:marketing.id,marketingBoost:eventEffects.nextMarketing,marketingExpectationBonus:eventEffects.nextExpectation,baseDurationMs:duration*1000,manualAccelerationMs:0,rushesUsed:0};if(queueing){state.projectQueue.push({...project,queuedAt:now})}else{state.activeProject={...project,startedAt:now,completesAt:now+project.baseDurationMs}}
  state.eventEffects.nextQuality=0;state.eventEffects.nextMarketing=1;state.eventEffects.nextDuration=1;state.eventEffects.nextExpectation=0;els.projectDialog.close();toast(queueing?`${name} ajouté à la file de production.`:`${baseFranchise?"Suite":"Nouvelle licence"} lancée avec ${marketing.name.toLowerCase()}.`);playTone(queueing?610:520,.16);renderAll();save();
}
function projectCancellationQuote(project=state.activeProject,at=Date.now()){
  if(!project)return{progress:0,rate:0,refund:0,lost:0};const tier=budgetTiers.find(item=>item.id===project.tierId),invested=Math.max(0,project.invested??tier?.cost??0),duration=Math.max(1,project.completesAt-project.startedAt),progress=clamp((at-project.startedAt)/duration,0,1),rate=.65-progress*.45,refund=invested*rate;return{progress,rate,refund,lost:invested-refund};
}
function projectClickSeconds(s=state){return .25*effect("projectClick",1,(a,b)=>a*b,s)*archiveEffect("projectClick",1,(a,b)=>a*b,s)}
function projectManualCap(project=state.activeProject){if(!project)return 0;return Math.max(1,(project.baseDurationMs||project.completesAt-project.startedAt)/1000*.3)}
function accelerateProjectByClick(at=Date.now(),s=state){const project=s.activeProject;if(!project)return 0;const used=(project.manualAccelerationMs||0)/1000,available=Math.max(0,projectManualCap(project)-used),remaining=Math.max(0,(project.completesAt-at)/1000),amount=Math.min(projectClickSeconds(s),available,Math.max(0,remaining-.1));if(amount<=0)return 0;project.completesAt-=amount*1000;project.manualAccelerationMs=(project.manualAccelerationMs||0)+amount*1000;s.stats.projectRushClicks=(s.stats.projectRushClicks||0)+1;return amount}
function projectRushQuote(project=state.activeProject,s=state){if(!project)return{cost:0,reduction:0,max:0,used:0};const used=project.rushesUsed||0,max=2+Math.round(effect("rushSlots",0,(a,b)=>a+b,s)),discount=effect("rushDiscount",1,(a,b)=>a*b,s)*archiveEffect("rushDiscount",1,(a,b)=>a*b,s),cost=(project.invested||0)*.5*Math.pow(2,used)*discount,reduction=Math.min(.35,.2*effect("rushPower",1,(a,b)=>a*b,s));return{cost,reduction,max,used}}
function rushProject(){const project=state.activeProject;if(!project)return;const quote=projectRushQuote(project);if(quote.used>=quote.max||state.money<quote.cost)return;const remaining=Math.max(0,project.completesAt-Date.now()),removed=remaining*quote.reduction;state.money-=quote.cost;project.completesAt-=removed;project.rushesUsed=quote.used+1;state.stats.cashAccelerations=(state.stats.cashAccelerations||0)+1;toast(`Renforts financés : ${formatDuration(removed/1000)} de développement gagnées.`);playTone(700,.14);renderAll();save()}
function cancelProject(){
  const project=state.activeProject;if(!project)return;const quote=projectCancellationQuote(project),percent=Math.round(quote.rate*100);
  if(!confirm(`Annuler ${project.name} ? Le studio récupérera ${formatMoney(quote.refund)} (${percent} % de l’investissement) et perdra ${formatMoney(quote.lost)}.`))return;
  state.money+=quote.refund;state.activeProject=null;const continued=startNextQueuedProject(Date.now());state.nextPitchAt=continued?state.nextPitchAt:Date.now()+8000;toast(`Projet annulé : ${formatMoney(quote.refund)} récupérés.${continued?` ${continued.name} démarre maintenant.`:""}`);playTone(230,.16);renderAll();save();
}
function removeQueuedProject(index){const project=state.projectQueue[index];if(!project)return;const refund=(project.invested||0)*.85;if(!confirm(`Retirer ${project.name} de la file ? Le studio récupérera ${formatMoney(refund)} (85 % de l’investissement).`))return;state.projectQueue.splice(index,1);state.money+=refund;toast(`${project.name} retiré : ${formatMoney(refund)} récupérés.`);renderAll();save()}

function doPrestige(){
  const gain=prestigeGain();if(gain<=0)return;
  const retained=hasArchiveUpgrade("archive_staff_memory")?[...activeSpecialists()].sort((a,b)=>b.gradeIndex-a.gradeIndex)[0]:null,kept={lifetimeRevenue:state.lifetimeRevenue,lifetimeCopies:state.lifetimeCopies,copiesSold:state.copiesSold,genreProgress:state.genreProgress,bestGenreScores:state.bestGenreScores,awards:state.awards,reputation:state.reputation+gain,archivePoints:(state.archivePoints||0)+gain,archiveUpgrades:state.archiveUpgrades,automation:state.automation,achievements:state.achievements,gameCompleted:state.gameCompleted,completedAt:state.completedAt,endingSeen:state.endingSeen,settings:state.settings,stats:state.stats,...(retained?{roster:[retained.id],activeTeam:[retained.id],staffStats:{[retained.id]:staffRecord(retained.id)}}:{})};
  state={...initialState(),...kept,nextPitchAt:Date.now()+6000};els.prestigeDialog.close();toast(`Nouvelle génération : +${gain} héritage actif.${retained?` ${retained.name} reste dans l’équipe.`:""}`);playTone(880,.3);renderAll();save();
}

function renderTop(){
  const salesRevenue=estimatedSalesRevenue(),royalties=catalogRoyalties();els.money.textContent=formatMoney(state.money);els.stock.textContent=format(state.stock);els.revenue.textContent=formatMoney(salesRevenue+royalties);els.incomeBreakdown.textContent=`Ventes ${formatMoney(salesRevenue)}/s · Royalties ${formatMoney(royalties)}/s`;els.criticReputation.textContent=Math.round(state.studioReputation);els.criticReputation.title=reputationLabel(state.studioReputation);els.reputation.textContent=format(state.archivePoints||0);
  const manualRatio=effect("clickPps",0,(a,b)=>a+b);els.perClick.textContent=format(clickValue());els.manualShare.textContent=state.activeProject?`Chaque clic accélère aussi le projet de ${projectClickSeconds().toFixed(2).replace(".",",")} s (maximum 30 %).`:manualRatio?`${Math.round(manualRatio*100)} % de la production/s inclus par clic`:"Valeur fixe · des outils permettront de la faire évoluer";els.salesCapacity.textContent=`${format(salesCapacity())} copie${salesCapacity()>=2?"s":""}/s`;els.copyPrice.textContent=formatMoney(copyPrice());
  els.salesFill.style.width=`${clamp(state.stock/Math.max(1,salesCapacity()*20)*100,2,100)}%`;
  els.lifetimeCopies.textContent=format(state.lifetimeCopies);els.copiesSold.textContent=format(state.copiesSold);els.gamesReleased.textContent=format(state.stats.gamesReleased);els.totalConsoles.textContent=format(totalConsoles());
  const trend=trendSnapshot(),hot=trend.hot.map(id=>genres.find(genre=>genre.id===id).name);els.trendText.textContent=`${hot.join(", ")} en hausse`;els.trendTimer.textContent=formatDuration((trend.endsAt-Date.now())/1000);
  const stages=[[0,"Petit studio indépendant"],[1e4,"Éditeur local"],[1e6,"Studio reconnu"],[1e9,"Groupe international"],[1e15,"Empire du divertissement"],[1e24,"Éditeur interplanétaire"]];els.studioStatus.textContent=stages.filter(([amount])=>state.lifetimeRevenue>=amount).at(-1)[1];
  renderCombo();renderProjectCard();renderProductionQueue();renderPrestige();
}
function renderCombo(){const now=Date.now(),combo=state.combo,profile=comboProfile();decayCombo(now);const active=combo.activeUntil>now,cooldown=!active&&combo.cooldownUntil>now;els.comboCard.classList.toggle("active",active);els.comboCard.classList.toggle("cooldown",cooldown);if(active){els.comboLabel.textContent="Focus actif";els.comboStatus.textContent=`×${profile.multiplier} · ${formatDuration((combo.activeUntil-now)/1000)}`;els.comboFill.style.width=`${clamp((combo.activeUntil-now)/profile.duration*100,0,100)}%`;els.comboHint.textContent=`Chaque clic fabrique ${profile.multiplier} fois plus de copies.`}else if(cooldown){els.comboLabel.textContent="Récupération";els.comboStatus.textContent=formatDuration((combo.cooldownUntil-now)/1000);els.comboFill.style.width=`${clamp((combo.cooldownUntil-now)/profile.cooldown*100,0,100)}%`;els.comboHint.textContent="La prochaine cadence pourra commencer après la récupération."}else{els.comboLabel.textContent="Cadence";els.comboStatus.textContent=`${Math.min(profile.required,combo.clicks||0)} / ${profile.required}`;els.comboFill.style.width=`${clamp(combo.count/profile.required*100,0,100)}%`;els.comboHint.textContent=combo.count?`Continue : l’élan diminue régulièrement dès que tu arrêtes de cliquer.`:`${profile.required} clics rapides déclenchent Focus ×${profile.multiplier}.`}}
function renderProjectCard(){
  const now=Date.now();
  if(state.activeProject){const project=state.activeProject,genre=genres.find(item=>item.id===project.genreId),tier=budgetTiers.find(item=>item.id===project.tierId),remaining=Math.max(0,(project.completesAt-now)/1000),baseDuration=Math.max(1,(project.baseDurationMs||project.completesAt-project.startedAt)/1000),progress=clamp((1-remaining/baseDuration)*100,0,100),projectType=project.franchiseId?"Suite":"Nouvelle licence",cancellation=projectCancellationQuote(project,now),rush=projectRushQuote(project),manualUsed=(project.manualAccelerationMs||0)/1000,manualCap=projectManualCap(project);els.projectTitle.textContent=project.name;els.projectDescription.textContent=`${projectType} · ${genre.icon} ${genre.name} · ${tier.name} · ${platformNames(project.platformIds)} · qualité prévue ${project.quality}/100`;els.projectTimer.textContent=formatDuration(remaining);els.projectFill.style.width=`${progress}%`;els.projectBoosts.hidden=false;els.projectClickBoost.textContent=`Réduction manuelle : ${formatPreciseDuration(manualUsed)} / ${formatPreciseDuration(manualCap)}.`;els.projectRushButton.disabled=rush.used>=rush.max||state.money<rush.cost;els.projectRushButton.textContent=rush.used>=rush.max?"Renforts maximum atteints":`Renforts ${rush.used+1}/${rush.max} · ${formatMoney(rush.cost)} · −${Math.round(rush.reduction*100)} % du temps restant`;els.projectButton.disabled=false;els.projectButton.classList.add("cancel-project");els.projectButton.textContent=`Annuler · récupérer ${formatMoney(cancellation.refund)}`}
  else if(now<state.nextPitchAt){const remaining=(state.nextPitchAt-now)/1000;els.projectTitle.textContent="Recherche d’une nouvelle idée";els.projectDescription.textContent="L’équipe prépare plusieurs concepts.";els.projectTimer.textContent=formatDuration(remaining);els.projectFill.style.width=`${clamp((1-remaining/30)*100,0,100)}%`;els.projectBoosts.hidden=true;els.projectButton.disabled=true;els.projectButton.classList.remove("cancel-project");els.projectButton.textContent=`Pitch dans ${formatDuration(remaining)}`}
  else{els.projectTitle.textContent="Un nouveau pitch est disponible";els.projectDescription.textContent="Choisis la licence, le genre, les plateformes et le budget du prochain jeu.";els.projectTimer.textContent="Prêt";els.projectFill.style.width="100%";els.projectBoosts.hidden=true;els.projectButton.disabled=false;els.projectButton.classList.remove("cancel-project");els.projectButton.textContent="Créer un jeu"}
}
function renderProductionQueue(){const capacity=productionQueueCapacity(),queue=state.projectQueue||[];els.productionQueue.hidden=capacity<=0;if(capacity<=0)return;els.queueCapacity.textContent=`${queue.length} / ${capacity}`;els.queueHint.textContent=state.activeProject?queue.length>=capacity?"La file est pleine. Une place se libérera au prochain lancement.":"Les projets démarrent automatiquement dans l’ordre.":"Lance un projet pour pouvoir préparer les suivants.";els.queueList.innerHTML=queue.length?queue.map((project,index)=>{const genre=genres.find(item=>item.id===project.genreId),tier=budgetTiers.find(item=>item.id===project.tierId);return `<article class="queue-item"><span>${index+1}</span><p><strong>${project.name}</strong><small>${genre?.icon||"🎮"} ${genre?.name||"Jeu"} · ${tier?.name||"Projet"} · ${formatDuration((project.baseDurationMs||0)/1000)}</small></p><button type="button" data-remove-queued="${index}" aria-label="Retirer ${project.name} de la file">×</button></article>`}).join(""):`<div class="queue-empty">Aucun jeu en attente</div>`;els.queueAddButton.disabled=!canQueueProject();els.queueAddButton.textContent=!state.activeProject?"Lance d’abord un projet":queue.length>=capacity?"File complète":"Planifier un jeu"}
function renderArchiveGrid(){
  const key=`${state.archivePoints}|${state.archiveUpgrades.join(",")}`;if(key===lastArchiveRenderKey)return;lastArchiveRenderKey=key;
  els.archiveGrid.innerHTML=archiveBranches.map(branch=>`<section class="archive-branch"><header><span>${branch.icon}</span><strong>${branch.name}</strong></header>${branch.nodes.map(raw=>{const node=archiveUpgrades.find(item=>item.id===raw.id),bought=hasArchiveUpgrade(node.id),requires=node.requires?hasArchiveUpgrade(node.requires):true,canBuy=!bought&&requires&&state.archivePoints>=node.cost;return `<article class="archive-node ${bought?"bought":requires?"available":"locked"} ${node.cost===1?"founder":""}"><span>${bought?"✓":node.index+1}</span><p><strong>${node.name}</strong><small>${node.description}</small></p><button type="button" data-archive-upgrade="${node.id}" ${canBuy?"":"disabled"}>${bought?"Acquis":requires?`${node.cost} ★`:"Verrouillé"}</button></article>`}).join("")}</section>`).join("");
}
function renderPrestige(){
  const gain=prestigeGain(),current=reputationMultiplier(),future=reputationMultiplier({...state,archivePoints:(state.archivePoints||0)+gain}),researchUnlocked=hasArchiveUpgrade("archive_auto_research"),milestonesUnlocked=hasArchiveUpgrade("archive_auto_milestones");
  els.prestigeButton.disabled=false;els.prestigeTitle.textContent=gain?`Gagner ${gain} héritage actif`:"Centre de l’héritage";els.prestigeProgress.textContent=gain?`Production ×${current.toFixed(2).replace(".",",")} → ×${future.toFixed(2).replace(".",",")}`:`Encore ${formatMoney(Math.max(0,1e6-state.runRevenue))} avant la transmission`;els.prestigeReward.textContent=gain?`+${gain} héritage actif · production ×${future.toFixed(2).replace(".",",")}`:"Aucun héritage disponible pour le moment";els.prestigeNote.textContent=`Bonus actuel : production et clic de base ×${current.toFixed(2).replace(".",",")}. Investir de l’Héritage réduit ce multiplicateur mais inscrit l’amélioration pour toujours.`;els.confirmPrestige.disabled=gain<=0;els.heritageTotal.textContent=format(state.archivePoints||0);els.heritageMultiplier.textContent=`×${current.toFixed(2).replace(".",",")}`;els.archivePoints.textContent=format(state.archivePoints||0);els.archiveSpent.textContent=`${state.archiveUpgrades.length} / ${archiveUpgrades.length}`;els.heritageRunRevenue.textContent=formatMoney(state.runRevenue);els.heritageNextGain.textContent=`+${gain} héritage actif`;els.autoResearchToggle.disabled=!researchUnlocked;els.autoResearchToggle.textContent=researchUnlocked?`Assistant R&D · ${state.automation.research?"actif":"en pause"}`:"Assistant R&D · verrouillé";els.autoResearchToggle.classList.toggle("active",researchUnlocked&&state.automation.research);els.autoMilestonesToggle.disabled=!milestonesUnlocked;els.autoMilestonesToggle.textContent=milestonesUnlocked?`Intendant du parc · ${state.automation.milestones?"actif":"en pause"}`:"Intendant du parc · verrouillé";els.autoMilestonesToggle.classList.toggle("active",milestonesUnlocked&&state.automation.milestones);renderArchiveGrid();if(gain)els.prestigeButton.dataset.ready="true";else delete els.prestigeButton.dataset.ready;
}

function renderConsoles(){
  const unlocked=consoles.filter(item=>consoleUnlocked(item));const next=consoles.find(item=>!consoleUnlocked(item));const visible=next?[...unlocked,next]:unlocked;els.consoleBadge.textContent=`${unlocked.length} / ${consoles.length}`;
  els.consoleList.innerHTML=visible.map(item=>{const owned=state.owned[item.id]||0,isUnlocked=consoleUnlocked(item),quote=purchaseQuote(item),canAfford=isUnlocked&&quote.count>0&&state.money+1e-8>=quote.cost,nextMark=nextMilestone(item),milestoneReady=nextMark&&owned>=nextMark,total=owned*item.production*milestoneMultiplier(item)*effect("production",1)*effect("all",1)*archiveEffect("production",1)*reputationMultiplier()*(careerReward("productionMultiplier")?.value||1),affinityNames=(familyAffinities[item.family]||[]).slice(0,2).map(id=>genres.find(genre=>genre.id===id)?.name).filter(Boolean).join(", ");return `<button type="button" class="console-card ${isUnlocked?(canAfford?"":"unaffordable"):"locked"}" data-console="${item.id}" ${canAfford?"":"disabled"}><span class="console-icon">${isUnlocked?item.icon:"?"}</span><span class="console-copy"><span class="console-title"><strong>${isUnlocked?item.name:"Console inconnue"}</strong><span class="generation">${isUnlocked?item.generation:"Verrouillée"}</span></span><p>${isUnlocked?item.description:`Atteins ${formatMoney(item.baseCost/12)} de revenus pour la découvrir.`}</p><span class="console-meta"><span>Possédées <b>${owned}</b></span><span>Production <b>${format(total)}/s</b></span>${isUnlocked&&affinityNames?`<span>Idéale pour <b>${affinityNames}</b></span>`:""}${nextMark?`<span>${milestoneReady?"Optimisation disponible · palier":"Prochain palier"} <b>${nextMark}</b></span>`:"<span>Optimisations <b>complètes · ×16</b></span>"}</span></span><span class="console-buy"><strong>${quote.count>0?`+${quote.count}`:"+1"}</strong><span>${formatMoney(quote.cost)}</span></span></button>`}).join("");
}
function renderUpgrades(){
  const available=availableUpgrades(),milestones=availableConsoleMilestones(),future=upgrades.filter(item=>!hasUpgrade(item.id)&&state.lifetimeRevenue<item.unlock).sort((a,b)=>a.unlock-b.unlock),milestonesBought=consoles.reduce((sum,item)=>sum+consoleMilestones(item).length,0);els.upgradeBadge.textContent=available.length+milestones.length;els.milestoneUpgradeHint.textContent=milestones.length?`${milestones.length} optimisation${milestones.length>1?"s":""} disponible${milestones.length>1?"s":""} · ${milestonesBought} / ${consoles.length*MILESTONES.length} acquises`:`${milestonesBought} / ${consoles.length*MILESTONES.length} acquises · les prochaines apparaîtront aux seuils 10, 25, 50 et 100`;els.milestoneUpgradeList.innerHTML=milestones.length?milestones.map(({console,mark,cost})=>`<article class="upgrade-card milestone-upgrade-card"><span>${console.icon}</span><div><h2>${console.name} · palier ${mark}</h2><p>Double définitivement la production de ce modèle pour cette génération.</p><button type="button" data-console-milestone="${console.id}" data-mark="${mark}" ${state.money<cost?"disabled":""}>Optimiser · ${formatMoney(cost)}</button></div></article>`).join(""):`<div class="milestone-empty"><span>◇</span><p><strong>Aucune optimisation en attente</strong><small>Continue d’agrandir ton parc de consoles.</small></p></div>`;els.upgradeList.innerHTML=available.map(item=>`<article class="upgrade-card"><span>${item.icon}</span><div><h2>${item.name}</h2><p>${item.description}</p><button type="button" data-upgrade="${item.id}" ${state.money<item.cost?"disabled":""}>${formatMoney(item.cost)}</button></div></article>`).join("");els.upgradeEmpty.hidden=available.length>0;if(!available.length)els.upgradeEmpty.innerHTML=future.length?`<span>◌</span><strong>Prochaine recherche à ${formatMoney(future[0].unlock)}</strong><p>${future[0].name} apparaîtra avec les revenus cumulés du studio.</p>`:`<span>✓</span><strong>Toutes les recherches sont installées</strong><p>Le studio a atteint le sommet de son équipement.</p>`;
}
function specialistCard(specialist,location){
  const branch=specialistBranch(specialist.branchId),projects=staffRecord(specialist.id).projects||0,skill=specialistSkill(specialist).toFixed(1).replace(".",","),action=location==="active"?`<button type="button" data-reserve="${specialist.id}">Mettre en réserve</button>`:`<button type="button" data-activate="${specialist.id}">Activer</button>`,next=specialistGrades[specialist.gradeIndex+1],career=next?` · vers ${next.label} ${Math.min(projects,next.requiredProjects)}/${next.requiredProjects}`:" · sommet de carrière";
  return `<article class="team-card ${location}"><span class="team-avatar">${branch.icon}</span><div class="team-copy"><span class="team-title"><strong>${specialist.name}</strong><b>${specialist.grade}</b></span><small>${branch.name} · compétence ${skill}/6 · ${projects} projet${projects>1?"s":""}${career}</small><p>${branch.description}</p><div class="team-actions">${action}<button class="fire-button" type="button" data-fire="${specialist.id}">Rompre</button></div></div></article>`;
}
function renderTeam(){
  const active=activeSpecialists(),reserve=state.roster.filter(id=>!state.activeTeam.includes(id)).map(specialistById).filter(Boolean),candidates=recruitmentCandidates(),capacity=state.teamCapacity||3,next=[[50,4],[65,5],[75,6],[85,7],[93,8]].find(([,size])=>size>capacity);
  els.teamBadge.textContent=`${active.length} / ${capacity}`;els.teamCapacity.textContent=`${active.length} / ${capacity}`;els.teamUnlockHint.textContent=next?`À ${next[0]}/100 de réputation : ${next[1]} places actives.`:"Capacité maximale atteinte.";els.rosterCapacity.textContent=`${state.roster.length} / ${rosterCapacity()} contrats`;
  els.activeTeamList.innerHTML=active.length?active.map(item=>specialistCard(item,"active")).join(""):`<div class="team-empty"><span>👤</span><p><strong>Aucun spécialiste actif</strong><small>Recrute un profil : il rejoindra automatiquement le prochain projet.</small></p></div>`;
  els.reserveTeamList.innerHTML=reserve.length?reserve.map(item=>specialistCard(item,"reserve")).join(""):`<div class="team-empty compact"><span>◌</span><p><strong>Réserve vide</strong><small>Un spécialiste remplacé reste ici et peut revenir plus tard.</small></p></div>`;
  els.recruitList.innerHTML=candidates.length?candidates.map(item=>{const branch=specialistBranch(item.branchId),locked=state.roster.length>=rosterCapacity()||state.money<item.cost,progress=specialistCareerProgress(item),careerText=progress.target?`Carrière requise : ${progress.previous} ${progress.current}/${progress.target} projets`:`Premier échelon de la branche`;return `<article class="recruit-card ${locked?"unaffordable":""}"><span class="team-avatar">${branch.icon}</span><div><span class="team-title"><strong>${item.name}</strong><b>${item.grade}</b></span><small>${branch.name} · compétence ${format(item.skill)}/6</small><p>${branch.description}</p><span class="contract-note">${careerText} · honoraires dès ${formatMoney(item.projectFee)}</span><button type="button" data-recruit="${item.id}" ${locked?"disabled":""}>Recruter · ${formatMoney(item.cost)}</button></div></article>`}).join(""):`<div class="team-empty"><span>🔒</span><p><strong>Prochain grade en préparation</strong><small>Fais participer les spécialistes actuels aux projets pour ouvrir l’échelon suivant.</small></p></div>`;
}
function renderGenres(){
  const unlocked=genres.filter(genre=>genreUnlocked(genre));const next=genres.find(genre=>!genreUnlocked(genre));const visible=next?[...unlocked,next]:unlocked;els.genreBadge.textContent=unlocked.length;
  els.genreList.innerHTML=visible.map(genre=>{const isUnlocked=genreUnlocked(genre),progress=genreProgress(genre.id),target=genreXpTarget(progress.level),status=demandStatus(genre.id),best=Math.max(0,...state.catalog.filter(game=>game.genreId===genre.id).map(game=>game.criticScore||0));return `<article class="genre-card ${isUnlocked?"":"locked"}"><div class="genre-head"><span class="genre-icon">${isUnlocked?genre.icon:"🔒"}</span><p><strong>${isUnlocked?genre.name:"Genre à découvrir"}</strong><small>${isUnlocked?`Niveau ${progress.level} · potentiel ×${genre.base.toFixed(2).replace(".",",")}${best?` · meilleure presse ${best}/100`:""}`:`Débloqué à ${formatMoney(genre.unlock)}`}</small></p>${isUnlocked?`<span class="demand ${status}">${demandLabel(genre.id)}</span>`:""}</div>${isUnlocked?`<div class="xp-copy"><span>Expérience</span><b>${format(progress.xp)} / ${format(target)}</b></div><div class="xp-bar"><i style="width:${clamp(progress.xp/target*100,0,100)}%"></i></div>`:""}</article>`}).join("");
}
function renderCatalog(){
  els.catalogBadge.textContent=state.catalog.length;els.catalogRoyalty.textContent=`${format(catalogRoyalties())} ¤/s`;els.catalogEmpty.hidden=state.catalog.length>0;els.franchiseSection.hidden=state.franchises.length===0;
  els.franchiseList.innerHTML=state.franchises.slice(0,12).map(franchise=>{const genre=genres.find(item=>item.id===franchise.genreId),level=franchiseLevel(franchise),modifiers=franchiseModifiers(franchise),progress=level>=10?100:((franchise.xp||0)%150)/150*100,fatigueLoss=Math.round((1-modifiers.fatigue)*100),audience=Math.round((modifiers.audience-1)*100);return `<article class="franchise-card"><div class="franchise-card-head"><span>${genre?.icon||"🎮"}</span><p><strong>${franchise.name}</strong><small>${franchise.episodes} épisode${franchise.episodes>1?"s":""} · prochaine suite ${episodeSuffix(franchise.episodes+1)}</small></p><span class="franchise-level">Niv. ${level}</span></div><div class="franchise-meter"><i style="width:${progress}%"></i></div><div class="franchise-effects"><span>Audience <b>${audience>=0?"+":""}${audience} %</b></span><span>${fatigueLoss?`Fatigue <b>−${fatigueLoss} %</b>`:`Public <b>enthousiaste</b>`}</span></div></article>`}).join("");
  els.catalogList.innerHTML=state.catalog.slice(0,30).map(game=>{const genre=genres.find(item=>item.id===game.genreId),tier=budgetTiers.find(item=>item.id===game.tierId);return `<article class="catalog-item"><span class="catalog-cover">${genre.icon}</span><span class="catalog-copy"><strong>${game.name}<span class="review-badge press">Presse ${game.criticScore??game.quality}/100</span><span class="review-badge players">Joueurs ${game.playerScore??game.quality}/100</span>${game.episodeNumber?`<span class="franchise-badge">Épisode ${game.episodeNumber}</span>`:""}</strong><small>${genre.name} niv. ${genreProgress(genre.id).level} · ${tier.name} · maîtrise interne ${game.quality}/100 · ${platformNames(game.platformIds)} · marché ${demandLabel(genre.id).toLowerCase()}</small></span><span class="catalog-money"><b>+${format(gameRoyalty(game))} ¤/s</b><small>royalties actuelles</small></span></article>`}).join("")
}
function renderCareer(){
  const trophies=awardTotal(),requirements=finalRequirements(),remaining=requirements.filter(item=>!item.complete).length,effects=eventEffectSummary();els.careerBadge.textContent=trophies;els.trophyCount.textContent=trophies;
  els.finalChallenge.classList.toggle("complete",state.gameCompleted);els.finalChallengeTitle.textContent=state.gameCompleted?"Projet Ultime accompli":"Le Projet Ultime";els.finalChallengeSubtitle.textContent=state.gameCompleted?"La fin est atteinte. Le studio peut continuer librement.":"Réunis toutes les conditions, puis investis 1 Sx ¤ dans le dernier jeu de l’histoire.";els.finalRequirements.innerHTML=requirements.map(item=>`<div class="final-requirement ${item.complete?"done":""}"><span>${item.complete?"✓":"○"}</span><p><strong>${item.label}</strong><small>${item.value}</small></p></div>`).join("");
  els.startFinalProject.disabled=!canStartFinalProject();els.startFinalProject.hidden=state.gameCompleted;els.startFinalProject.textContent=remaining?`${remaining} condition${remaining>1?"s":""} restante${remaining>1?"s":""}`:state.money<FINAL_PROJECT_COST?`Il manque ${formatMoney(FINAL_PROJECT_COST-state.money)}`:`Lancer L’Ultime Pixel · ${formatMoney(FINAL_PROJECT_COST)}`;
  els.legendGrid.innerHTML=genres.map(genre=>{const record=state.bestGenreScores[genre.id],mastered=record?.mastered;return `<article class="legend-card ${mastered?"mastered":""}"><span>${genre.icon}</span><p><strong>${genre.name}</strong><small>${record?`Presse ${record.critic} · Joueurs ${record.player}`:"Aucun candidat"}</small></p><b>${mastered?"👑":"—"}</b></article>`}).join("");
  els.rewardList.innerHTML=careerRewards.map(item=>{const unlocked=trophies>=item.threshold,progress=clamp(trophies/item.threshold*100,0,100);return `<article class="reward-card ${unlocked?"unlocked":""}"><span>${item.icon}</span><div><strong>${item.name}</strong><small>${item.description}</small><i><b style="width:${progress}%"></b></i></div><em>${unlocked?"Actif":`${trophies}/${item.threshold}`}</em></article>`}).join("");
  els.awardProgress.textContent=`${state.awards.length} / ${awards.length} récompenses`;els.awardGrid.innerHTML=awards.map(item=>{const unlocked=state.awards.includes(item.id);return `<article class="award-card ${unlocked?"unlocked":""}"><span>${unlocked?item.icon:"?"}</span><p><strong>${item.name}</strong><small>${item.description}</small></p><b>+${item.trophies}</b></article>`}).join("");
  els.eventBonusSummary.textContent=effects.length?`Actifs : ${effects.join(" · ")}`:"Aucun bonus temporaire";els.eventHistory.innerHTML=state.eventHistory.length?state.eventHistory.map(entry=>{const event=studioEvents.find(item=>item.id===entry.eventId);return `<article><span>${event?.icon||"✦"}</span><p><strong>${entry.title}</strong><small>${entry.result}</small></p></article>`}).join(""):`<div class="team-empty compact"><span>✦</span><p><strong>Le studio est encore calme</strong><small>Les événements commenceront après la première sortie.</small></p></div>`;
}
function renderAll(){unlockAwards();renderTop();renderConsoles();renderUpgrades();renderTeam();renderGenres();renderCatalog();renderCareer();checkAchievements()}

function checkAchievements(){achievements.forEach(item=>{if(!state.achievements.includes(item.id)&&item.check(state)){state.achievements.push(item.id);showAchievement(item.name)}})}
function toast(message){clearTimeout(toastTimer);els.toast.textContent=message;els.toast.hidden=false;toastTimer=setTimeout(()=>els.toast.hidden=true,3000)}
function showAchievement(message){clearTimeout(achievementTimer);els.achievement.querySelector("b").textContent=message;els.achievement.hidden=false;achievementTimer=setTimeout(()=>els.achievement.hidden=true,3600)}
function showReview(game,oldReputation,newAwards=[]){els.reviewGameTitle.textContent=`${game.name} est sorti !`;els.reviewPressScore.textContent=game.criticScore;els.reviewPlayerScore.textContent=game.playerScore;els.reviewList.innerHTML=game.reviews.map(item=>`<article><span>${item.icon}</span><p><strong>${item.name}</strong><small>${item.verdict}</small></p><b>${item.score}</b></article>`).join("");const change=state.studioReputation-oldReputation,sign=change>=0?"+":"";els.reviewReputationChange.textContent=`Réputation du studio : ${Math.round(oldReputation)} → ${Math.round(state.studioReputation)} (${sign}${change.toFixed(1).replace(".",",")}) · ${reputationLabel(state.studioReputation)}`;els.releaseAwards.hidden=!newAwards.length;els.releaseAwards.innerHTML=newAwards.length?`<strong>🏆 ${newAwards.length===1?"Nouvelle récompense":"Nouvelles récompenses"}</strong>${newAwards.map(item=>`<span>${item.icon} ${item.name} · +${item.trophies}</span>`).join("")}`:"";if(!els.reviewDialog.open)els.reviewDialog.showModal()}
function showEnding(){els.endingSummary.textContent=`${format(state.stats.gamesReleased)} jeux publiés · ${awardTotal()} trophées · ${format(state.lifetimeRevenue)} crédits générés · ${format(state.stats.playSeconds/3600)} heures de carrière`;state.endingSeen=true;if(!els.endingDialog.open)els.endingDialog.showModal();save()}
function playTone(frequency=500,duration=.08){if(!state.settings.sound)return;try{const AudioContext=window.AudioContext||window.webkitAudioContext;if(!AudioContext)return;if(!audioContext)audioContext=new AudioContext();if(audioContext.state==="suspended")audioContext.resume();const osc=audioContext.createOscillator(),gain=audioContext.createGain(),end=audioContext.currentTime+duration;osc.type="square";osc.frequency.value=frequency;gain.gain.setValueAtTime(.025,audioContext.currentTime);gain.gain.exponentialRampToValueAtTime(.001,end);osc.connect(gain);gain.connect(audioContext.destination);osc.addEventListener("ended",()=>{osc.disconnect();gain.disconnect()},{once:true});osc.start();osc.stop(end)}catch(error){}}

els.developer.addEventListener("click",()=>{const now=Date.now();registerComboClick(now);const value=clickValue(state,now),accelerated=accelerateProjectByClick(now);addCopies(value);state.stats.clicks++;els.developer.classList.add("clicked");if(accelerated)els.projectCard.classList.add("boosted");setTimeout(()=>{els.developer.classList.remove("clicked");els.projectCard.classList.remove("boosted")},100);playTone(360+Math.min(300,state.stats.clicks%12*18),.05);renderTop()});
els.consoleList.addEventListener("click",event=>{const card=event.target.closest("[data-console]");if(card)buyConsole(card.dataset.console)});
els.upgradeList.addEventListener("click",event=>{const button=event.target.closest("[data-upgrade]");if(button)buyUpgrade(button.dataset.upgrade)});
els.milestoneUpgradeList.addEventListener("click",event=>{const button=event.target.closest("[data-console-milestone]");if(button)buyConsoleMilestone(button.dataset.consoleMilestone,button.dataset.mark)});
els.archiveGrid.addEventListener("click",event=>{const button=event.target.closest("[data-archive-upgrade]");if(button)buyArchiveUpgrade(button.dataset.archiveUpgrade)});
els.autoResearchToggle.addEventListener("click",()=>{if(!hasArchiveUpgrade("archive_auto_research"))return;state.automation.research=!state.automation.research;toast(`Assistant R&D ${state.automation.research?"activé":"mis en pause"}.`);renderPrestige();save()});
els.autoMilestonesToggle.addEventListener("click",()=>{if(!hasArchiveUpgrade("archive_auto_milestones"))return;state.automation.milestones=!state.automation.milestones;toast(`Intendant du parc ${state.automation.milestones?"activé":"mis en pause"}.`);renderPrestige();save()});
$("#teamPage").addEventListener("click",event=>{const recruit=event.target.closest("[data-recruit]"),activate=event.target.closest("[data-activate]"),reserve=event.target.closest("[data-reserve]"),fire=event.target.closest("[data-fire]");if(recruit)recruitSpecialist(recruit.dataset.recruit);else if(activate)activateSpecialist(activate.dataset.activate);else if(reserve)reserveSpecialist(reserve.dataset.reserve);else if(fire)fireSpecialist(fire.dataset.fire)});
$$('.buy-modes button').forEach(button=>button.addEventListener("click",()=>{state.buyMode=button.dataset.mode;$$('.buy-modes button').forEach(item=>item.classList.toggle("active",item===button));renderConsoles()}));
$$('.tabs button').forEach(button=>button.addEventListener("click",()=>{$$('.tabs button').forEach(item=>item.classList.toggle("active",item===button));$$('.tab-page').forEach(page=>{const active=page.id===`${button.dataset.tab}Page`;page.hidden=!active;page.classList.toggle("active",active)})}));
els.projectButton.addEventListener("click",()=>state.activeProject?cancelProject():openProjectDialog());els.trendBanner.addEventListener("click",()=>{$('.tabs button[data-tab="genres"]').click()});
els.projectRushButton.addEventListener("click",rushProject);
els.queueAddButton.addEventListener("click",openProjectDialog);els.queueList.addEventListener("click",event=>{const button=event.target.closest("[data-remove-queued]");if(button)removeQueuedProject(Number(button.dataset.removeQueued))});
els.genreSelect.addEventListener("change",()=>{selectedFranchiseId=null;renderProjectDialog()});els.franchiseChoiceGrid.addEventListener("click",event=>{const button=event.target.closest("[data-franchise]");if(!button)return;selectedFranchiseId=button.dataset.franchise||null;renderProjectDialog()});els.platformGrid.addEventListener("click",event=>{const button=event.target.closest("[data-platform]");if(!button)return;const id=button.dataset.platform,index=selectedPlatformIds.indexOf(id);if(index>=0){if(selectedPlatformIds.length===1){toast("Choisis au moins une plateforme.");return}selectedPlatformIds.splice(index,1)}else{if(selectedPlatformIds.length>=3){toast("Trois plateformes maximum par projet.");return}selectedPlatformIds.push(id)}renderProjectDialog()});els.budgetGrid.addEventListener("click",event=>{const button=event.target.closest("[data-tier]");if(button&&!button.disabled){selectedTierId=button.dataset.tier;renderProjectDialog()}});els.marketingGrid.addEventListener("click",event=>{const button=event.target.closest("[data-marketing]");if(button&&!button.disabled){selectedMarketingId=button.dataset.marketing;renderProjectDialog()}});els.startProject.addEventListener("click",startProject);
els.eventChoices.addEventListener("click",event=>{const button=event.target.closest("[data-event-choice]");if(button&&!button.disabled)resolveStudioEvent(button.dataset.eventChoice)});els.startFinalProject.addEventListener("click",startFinalProject);
function openHeritageCenter(){renderPrestige();if(!els.prestigeDialog.open)els.prestigeDialog.showModal()}
els.prestigeButton.addEventListener("click",openHeritageCenter);els.heritageButton.addEventListener("click",openHeritageCenter);els.confirmPrestige.addEventListener("click",doPrestige);
els.helpButton.addEventListener("click",()=>els.help.showModal());$$('[data-close]').forEach(button=>button.addEventListener("click",()=>$("#"+button.dataset.close).close()));
els.soundButton.addEventListener("click",()=>{state.settings.sound=!state.settings.sound;els.soundButton.textContent=state.settings.sound?"♪":"×";els.soundButton.setAttribute("aria-pressed",String(state.settings.sound));save()});
els.effectsButton.addEventListener("click",()=>{state.settings.effects=!state.settings.effects;document.body.classList.toggle("reduce-effects",!state.settings.effects);els.effectsButton.textContent=state.settings.effects?"Réduire les animations":"Rétablir les animations";save()});
els.exportSave.addEventListener("click",()=>{save();const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"}),link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download="pixel-empire-save.json";link.click();URL.revokeObjectURL(link.href)});
els.importSave.addEventListener("click",()=>els.importFile.click());els.importFile.addEventListener("change",event=>{const file=event.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{localStorage.setItem(SAVE_KEY,JSON.stringify(JSON.parse(reader.result)));location.reload()}catch(error){toast("Sauvegarde invalide.")}};reader.readAsText(file)});
els.resetButton.addEventListener("click",()=>{if(confirm("Effacer définitivement toute la progression de Pixel Empire ?")){localStorage.removeItem(SAVE_KEY);location.reload()}});

function frame(now){const dt=Math.min(.25,(now-lastFrame)/1000);lastFrame=now;update(dt);if(now-lastPaint>100){renderTop();lastPaint=now}requestAnimationFrame(frame)}

document.body.classList.toggle("reduce-effects",!state.settings.effects);els.soundButton.textContent=state.settings.sound?"♪":"×";els.soundButton.setAttribute("aria-pressed",String(state.settings.sound));els.effectsButton.textContent=state.settings.effects?"Réduire les animations":"Rétablir les animations";
restoreOffline();initialized=true;renderAll();if(state.pendingEvent){const pending=studioEvents.find(item=>item.id===state.pendingEvent.id);if(pending)setTimeout(()=>{renderEventDialog(pending);els.eventDialog.showModal()},300)}if(state.gameCompleted&&!state.endingSeen)setTimeout(showEnding,500);setInterval(()=>{renderAll();save()},1000);requestAnimationFrame(frame);window.addEventListener("beforeunload",save);
if("serviceWorker" in navigator&&location.protocol.startsWith("http"))navigator.serviceWorker.register("service-worker.js").catch(()=>{});

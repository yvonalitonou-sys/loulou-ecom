const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const replacements = {
  "ConfirmǸe": "Confirmée",
  "confirmǸe": "confirmée",
  "bientt": "bientôt",
  "N de commande": "N° de commande",
  "BǸnin": "Bénin",
  "NumǸro de tǸlǸphone": "Numéro de téléphone",
  "Paiement  la livraison": "Paiement à la livraison",
  "commandǸs": "commandés",
  "QuantitǸ": "Quantité",
  "dǸnicher": "dénicher",
  "sǸlection": "sélection",
  "qualitǸ": "qualité",
  " des prix": "à des prix",
  "marchǸ": "marché",
  "mǦme": "même",
  "Ǹquipe": "équipe",
  "passionnǸe": "passionnée",
  "dǸvouǸe ": "dévouée à",
  "rǸactif": "réactif",
  "sǸcuritǸ": "sécurité",
  "tranquillitǸ": "tranquillité",
  "prioritǸ": "priorité",
  "optǸ": "opté",
  "modle": "modèle",
  "sǯr": "sûr",
  "a marche": "ça marche",
  "ZǸro": "Zéro",
  " l'avance": "à l'avance",
  "VǸrification": "Vérification",
  "MǸthodes acceptǸes  la livraison": "Méthodes acceptées à la livraison",
  "manires": "manières",
  "espces": "espèces",
  "ExpǸdition": "Expédition",
  "Ǹtes": "êtes",
  "DǸs": "Dès",
  "gǸnǸralement": "généralement",
  "disponibilitǸs": "disponibilités",
  "DǸlais": "Délais",
  "trs": "très",
  "RǸception": "Réception",
  "communiquǸs": "communiqués",
  "tǸlǸphone": "téléphone",
  "GǸnǸraliste": "Généraliste",
  "DǸpǦchez-vous": "Dépêchez-vous",
  "remboursǸ": "remboursé",
  "Systme": "Système",
  "ultra-optimisǸ": "ultra-optimisé",
  "sǸcurisǸ": "sécurisé",
  "prǸnom": "prénom"
};

for (const [bad, good] of Object.entries(replacements)) {
  content = content.split(bad).join(good);
}

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Fixed texts');
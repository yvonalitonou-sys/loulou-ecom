const fs = require('fs');
const content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');
const match = content.match(/Pourquoi Nous Choisir[\s\S]*?<\/section>/);
console.log(match ? match[0] : "Not found");
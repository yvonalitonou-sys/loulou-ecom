const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const regex = /Avis de Nos Clients[\s\S]*?<\/div>\s*<\/section>/;
const match = content.match(regex);
console.log(match ? match[0] : "Not found");
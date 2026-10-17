const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const match = content.match(/NOUVELLE COMMANDE COD/g);
console.log("Found:", match ? match.length : 0);

const textLines = content.split('\n').filter(l => l.includes('text .='));
console.log(textLines.slice(0, 5));
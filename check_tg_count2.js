const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const matches = content.match(/api\.telegram\.org/g);
console.log("Matches:", matches ? matches.length : 0);
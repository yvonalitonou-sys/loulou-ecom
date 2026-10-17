const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const lines = content.split('\n');
const start = lines.findIndex(l => l.includes('NOUVELLE COMMANDE COD'));
if (start > -1) {
  for (let i = start; i < start + 8; i++) {
    console.log(i, Buffer.from(lines[i]).toString('hex'));
    console.log(i, lines[i]);
  }
}
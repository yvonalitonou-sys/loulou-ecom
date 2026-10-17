const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');
const lines = content.split('\n');
for (let i = 120; i < 160; i++) {
    console.log(`Line ${i+1}: ${lines[i]}`);
}
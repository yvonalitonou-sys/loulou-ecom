const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');
const lines = content.split('\n');
lines.forEach((line, i) => {
    if (line.includes('')) {
        console.log(`Line ${i+1}: ${line.trim()}`);
    }
});
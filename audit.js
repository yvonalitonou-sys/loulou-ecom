const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');
const lines = content.split('\n');
let found = false;
lines.forEach((line, i) => {
    if (line.includes('Ã')) {
        console.log(`Line ${i+1}: ${line.trim()}`);
        found = true;
    }
});
if (!found) console.log("No more corruptions found!");
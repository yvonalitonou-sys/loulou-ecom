const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const decoded = Buffer.from(content, 'latin1').toString('utf8');
const lines = decoded.split('\n');
console.log("Line 164:", lines[164].trim()); // Should be 'Qualité Premium'
console.log("Line 183:", lines[183].trim()); // Should be '⭐⭐⭐⭐⭐'
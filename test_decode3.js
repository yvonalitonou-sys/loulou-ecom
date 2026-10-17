const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const decoded = Buffer.from(content, 'latin1').toString('utf8');

const regex = /<div class="wao-reviews">[\s\S]*?<\/div>\s*<\/div>/;
const match = decoded.match(regex);
console.log("Reviews block:", match ? match[0] : "Not found");
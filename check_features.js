const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const regex = /<div class="wao-features">[\s\S]*?<\/div>\s*<\/div>/;
const match = content.match(regex);
console.log("Features block:", match ? match[0] : "Not found");
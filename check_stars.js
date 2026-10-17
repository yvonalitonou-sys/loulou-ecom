const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const regex = /<div class="wao-review-stars">⭐⭐⭐⭐⭐<\/div>/;
console.log("Stars fixed:", regex.test(content) ? "Yes" : "No");
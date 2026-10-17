const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const regex = /<div class="wao-feat-icon">💎<\/div>/;
console.log("Features fixed:", regex.test(content) ? "Yes" : "No");

const regexTel = /🚨 \*NOUVELLE COMMANDE COD\*/;
console.log("Telegram fixed:", regexTel.test(content) ? "Yes" : "No");
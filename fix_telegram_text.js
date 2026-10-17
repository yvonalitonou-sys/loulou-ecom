const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

content = content.replace("T\ufffdl\ufffdphone:", "Téléphone:");
content = content.replace("TǸlǸphone:", "Téléphone:");

// Ensure we fix it just in case
content = content.replace(/\*T[\s\S]l[\s\S]phone:\*/g, "*Téléphone:*");

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Fixed Telegram corrupted text');
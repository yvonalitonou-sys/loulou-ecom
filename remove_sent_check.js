const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const regex = /(if \(!\$order \|\| get_post_meta\(\$order_id, '_telegram_sent', true\)\) \{)/;
content = content.replace(regex, "if (!$order) {");

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Removed telegram_sent check');
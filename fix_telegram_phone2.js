const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const regex = /\$text \.\= ".*\*.*:\* " \. \$phone \. "\\n";/g;
content = content.replace(regex, '$text .= "📞 *Téléphone:* " . $phone . "\\n";');

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Fixed Telegram Phone Line using regex');
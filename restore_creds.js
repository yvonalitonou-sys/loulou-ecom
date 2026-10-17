const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

content = content.replace(
  "$token = get_option('wao_telegram_token');",
  "$token = '8871627389:AAFm3ZwhV35SuyBEqGhGN_6KmCRKh9WA4Ss';"
);
content = content.replace(
  "$chat_id = get_option('wao_telegram_chatid');",
  "$chat_id = '8183719890';"
);

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Restored hardcoded Telegram credentials');
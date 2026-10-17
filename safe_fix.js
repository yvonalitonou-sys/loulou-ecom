const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

// 1. Fix the payload encoding (change to Telephone:)
content = content.replace(/\$text \.\= ".*? \*T.*phone:\* " \. \$phone \. "\\n";/g, '$text .= "📞 *Telephone:* " . $phone . "\\n";');

// 2. Change blocking => false to true for Telegram
const tgRegex = /'blocking'  => false,\s*'timeout'   => 5,\s*'sslverify' => false,\s*'body'      => array\(\s*'chat_id'\s*=> \$chat_id,\s*'text'\s*=> \$text/;
content = content.replace(tgRegex, "'blocking'  => true,\n          'timeout'   => 5,\n          'sslverify' => false,\n          'body'      => array(\n              'chat_id'    => $chat_id,\n              'text'       => $text");

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Fixed backup file safely');
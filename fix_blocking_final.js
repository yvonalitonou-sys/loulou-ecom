const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const tgRegex = /'blocking'  => true,\s*'timeout'   => 5,\s*'sslverify' => false/;
content = content.replace(tgRegex, "'blocking'  => false,\n          'timeout'   => 1,\n          'sslverify' => false");

// Also add ignore_user_abort to wao_send_telegram_ajax
content = content.replace("function wao_send_telegram_ajax() {", "function wao_send_telegram_ajax() {\n    ignore_user_abort(true);");

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Restored original blocking=false behavior and added ignore_user_abort');
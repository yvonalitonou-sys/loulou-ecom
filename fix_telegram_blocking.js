const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const regex = /'blocking'  => false,\s*'timeout'   => 5,\s*'sslverify' => false,\s*'body'      => array\(/;

content = content.replace(regex, "'blocking'  => true,\n          'timeout'   => 5,\n          'sslverify' => false,\n          'body'      => array(");

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Set Telegram request to blocking=true');
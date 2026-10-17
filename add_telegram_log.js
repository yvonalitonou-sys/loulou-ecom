const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const regex = /(wp_remote_post\(\$url, array\([\s\S]*?\)\);)/;
content = content.replace(regex, `$1\n      error_log("TELEGRAM RESPONSE: " . print_r(wp_remote_retrieve_body(wp_remote_post($url, array('blocking'=>true, 'body'=>array('chat_id'=>$chat_id, 'text'=>$text, 'parse_mode'=>'Markdown')))), true));`);

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Added error log for Telegram');
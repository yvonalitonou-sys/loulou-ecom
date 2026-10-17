const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const processOrder = content.substring(content.indexOf('function wao_process_order()'), content.indexOf('function wao_send_telegram_ajax()'));
console.log(processOrder.includes('https://api.telegram.org'));
console.log(processOrder.includes('wp_send_json_success'));
console.log("Blocking true?", processOrder.includes("'blocking'  => true"));
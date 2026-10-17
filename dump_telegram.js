const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const dump = `
add_action('wp_ajax_nopriv_test_telegram', 'test_telegram');
function test_telegram() {
    $token = get_option('wao_telegram_token');
    $chat_id = get_option('wao_telegram_chatid');
    wp_send_json_success(array('token' => $token, 'chat_id' => $chat_id));
}
`;
if (!content.includes('test_telegram')) {
  fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content + dump, 'utf8');
}
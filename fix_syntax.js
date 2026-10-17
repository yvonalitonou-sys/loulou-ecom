const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const regex = /function wao_send_telegram_ajax\(\) \{[\s\S]*?wp_send_json_success\(\);\s*\}/;
const newFunction = `function wao_send_telegram_ajax() {
    $order_id = intval($_POST['order_id']);
    $order = wc_get_order($order_id);
    if (!$order || get_post_meta($order_id, '_telegram_sent', true)) {
        wp_send_json_error();
    }
    
    update_post_meta($order_id, '_telegram_sent', '1');
    
    $name = $order->get_billing_first_name();
    $phone = $order->get_billing_phone();
    $address = $order->get_billing_address_1();
    $total = $order->get_total();
    
    $product_name = '';
    $qty = 1;
    foreach ($order->get_items() as $item) {
        $product_name = $item->get_name();
        $qty = $item->get_quantity();
        break;
    }
    
    $token = get_option('wao_telegram_token');
    $chat_id = get_option('wao_telegram_chatid');
    
    if (empty($token) || empty($chat_id)) {
        wp_send_json_success();
    }
    
    $whatsapp = "https://wa.me/" . preg_replace('/[^0-9]/', '', $phone);
    
    $text = "🚨 *NOUVELLE COMMANDE COD* 🚨\\n\\n";
    $text .= "👤 *Client:* " . $name . "\\n";
    $text .= "📞 *Téléphone:* " . $phone . "\\n";
    $text .= "📍 *Adresse:* " . $address . "\\n";
    $text .= "📦 *Produit:* " . $product_name . " (x" . $qty . ")\\n";
    $text .= "💰 *Total:* " . $total . " FCFA\\n\\n";
    $text .= "📲 [Appeler sur WhatsApp](" . $whatsapp . ")";
    
    $url = "https://api.telegram.org/bot" . $token . "/sendMessage";
    wp_remote_post($url, array(
        'blocking'  => false,
        'timeout'   => 5,
        'sslverify' => false,
        'body'      => array(
            'chat_id'    => $chat_id,
            'text'       => $text,
            'parse_mode' => 'Markdown'
        )
    ));
    
    wp_send_json_success();
}`;

content = content.replace(regex, newFunction);
fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Fixed syntax error');
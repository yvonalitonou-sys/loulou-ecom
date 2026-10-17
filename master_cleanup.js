const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/wao-cod-system-BACKUP.php', 'utf8');

// I will rewrite the entire wao_process_order to include Telegram properly, and delete wao_send_telegram_ajax completely.

const telegramCode = `
      // --- SEND TELEGRAM ---
      $token = '8871627389:AAFm3ZwhV35SuyBEqGhGN_6KmCRKh9WA4Ss';
      $chat_id = '8183719890';
      $whatsapp = "https://wa.me/" . preg_replace('/[^0-9]/', '', $phone);
      
      $text = "🔔 *NOUVELLE COMMANDE COD* 🔔\\n\\n";
      $text .= "👤 *Client:* " . $name . "\\n";
      $text .= "📞 *Telephone:* " . $phone . "\\n";
      $text .= "📍 *Adresse:* " . $address . "\\n";
      $text .= "📦 *Produit:* " . $product->get_name() . " (x" . $qty . ")\\n";
      $text .= "💰 *Total:* " . $total . " FCFA\\n\\n";
      $text .= "📲 [Appeler sur WhatsApp](" . $whatsapp . ")";
      
      $tg_url = "https://api.telegram.org/bot" . $token . "/sendMessage";
      wp_remote_post($tg_url, array(
          'blocking'  => true,
          'timeout'   => 5,
          'sslverify' => false,
          'body'      => array(
              'chat_id'    => $chat_id,
              'text'       => $text,
              'parse_mode' => 'Markdown'
          )
      ));
`;

content = content.replace(
  '      wp_send_json_success(array(',
  telegramCode + '\n      wp_send_json_success(array('
);

// Delete the wao_send_telegram_ajax function completely since we don't need it
const ajaxStart = content.indexOf("add_action('wp_ajax_wao_send_telegram_ajax'");
if (ajaxStart !== -1) {
    const endStr = "// === FACEBOOK PIXEL INTEGRATION ===";
    const ajaxEnd = content.indexOf(endStr);
    if (ajaxEnd !== -1) {
        content = content.substring(0, ajaxStart) + endStr + content.substring(ajaxEnd + endStr.length);
    }
}

// Ensure the frontend fetch is gone (which it was in the backup? Actually backup had it)
const fetchRegex = /let data = new FormData\(\);\s*data\.append\('action', 'wao_send_telegram_ajax'\);\s*data\.append\('order_id', '<\?php echo \$order_id; \?>'\);\s*fetch\('<\?php echo admin_url\('admin-ajax\.php'\); \?>', \{ method: 'POST', body: data \}\);/;
content = content.replace(fetchRegex, "// Telegram moved to backend for reliability");

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Master cleanup done');
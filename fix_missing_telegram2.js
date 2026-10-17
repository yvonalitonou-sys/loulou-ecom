const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const telegramCode = `
      // --- SEND TELEGRAM ---
      $token = '8871627389:AAFm3ZwhV35SuyBEqGhGN_6KmCRKh9WA4Ss';
      $chat_id = '8183719890';
      $whatsapp = "https://wa.me/" . preg_replace('/[^0-9]/', '', $phone);
      
      $text = "🔔 *NOUVELLE COMMANDE COD* 🔔\\n\\n";
      $text .= "👤 *Client:* " . $name . "\\n";
      $text .= "📞 *Téléphone:* " . $phone . "\\n";
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
  /(\s*wp_send_json_success\(array\()/g, 
  telegramCode + '$1'
);

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Successfully injected Telegram into backend process via regex');
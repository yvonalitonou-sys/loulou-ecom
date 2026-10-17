const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

// The first wp_send_json_success is in wao_process_order. The second is in wao_send_telegram_ajax.
// Let's just restore the file from backup and inject it SAFELY!
let backup = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/wao-cod-system-BACKUP.php', 'utf8');

const webhookRegex = /(wp_remote_post\(\$webhook_url, array\([\s\S]*?body'        => wp_json_encode\(\$payload\),\n      \)\);)/;

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

// I will inject it right BEFORE wp_send_json_success in wao_process_order ONLY!
let lines = content.split('\n');
let newLines = [];
let insideProcessOrder = false;
let alreadyInjected = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('function wao_process_order()')) insideProcessOrder = true;
  if (lines[i].includes('function wao_send_telegram_ajax()')) insideProcessOrder = false;

  if (insideProcessOrder && lines[i].includes('wp_send_json_success(array(') && !alreadyInjected) {
    newLines.push(telegramCode);
    alreadyInjected = true;
  }
  
  // Strip out my previous mistaken injection
  if (lines[i].includes('// --- SEND TELEGRAM ---') && !alreadyInjected) {
     // Skip the block
     let j = i;
     while(j < lines.length && !lines[j].includes('parse_mode')) j++;
     j += 2; // skip brackets
     i = j;
     continue;
  }

  newLines.push(lines[i]);
}

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', newLines.join('\n'), 'utf8');
console.log('Cleaned and correctly injected');
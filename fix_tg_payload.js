const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const regex = /\$text = ".*?\n.*?\n.*?\n.*?\n.*?\n.*?\n.*?\]\(\". \(\$whatsapp \?\? \$whatsapp\) \. \"\)\";/s;

// Since regex across lines might fail if characters are corrupted, let's replace by finding the block boundaries
let startIdx = content.indexOf('// --- SEND TELEGRAM ---');
let endIdx = content.indexOf('$tg_url = "https://api.telegram.org/bot"');

if (startIdx !== -1 && endIdx !== -1) {
  const telegramCode = `// --- SEND TELEGRAM ---
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
      
      `;
  
  content = content.substring(0, startIdx) + telegramCode + content.substring(endIdx);
  fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
  console.log('Fixed Telegram payload string!');
} else {
  console.log('Could not find block');
}
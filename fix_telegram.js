const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const telegramRegex = /\$text = "[^"]*\*NOUVELLE COMMANDE COD\*[^{]*?\]\(" \. \$whatsapp \. "\)";/;
const newTelegram = `$text = "🚨 *NOUVELLE COMMANDE COD* 🚨\\n\\n";
    $text .= "👤 *Client:* " . $name . "\\n";
    $text .= "📞 *Téléphone:* " . $phone . "\\n";
    $text .= "📍 *Adresse:* " . $address . "\\n";
    $text .= "📦 *Produit:* " . $product_name . " (x" . $qty . ")\\n";
    $text .= "💰 *Total:* " . $total . " FCFA\\n\\n";
    $text .= "📲 [Appeler sur WhatsApp](" . $whatsapp . ")";`;

content = content.replace(telegramRegex, newTelegram);
fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Fixed telegram');
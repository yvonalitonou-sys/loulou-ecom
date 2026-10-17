const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('phone . "\\n";') && lines[i].includes('$text .=')) {
    lines[i] = '    $text .= "📞 *Téléphone:* " . $phone . "\\n";';
  }
}

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', lines.join('\n'), 'utf8');
console.log('Fixed Telegram Phone Line');
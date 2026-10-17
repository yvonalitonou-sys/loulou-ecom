const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const replacements = {
  "Ãƒâ€°": "É",
  "Ã¢Â­Â": "⭐",
  "Ã°Å¸Å¡Â¨": "🚨",
  "Ã°Å¸â€˜Â¤": "👤",
  "Ã°Å¸â€œÅ¾": "📞",
  "Ã°Å¸â€œÂ ": "📍",
  "Ã°Å¸â€œÂ¦": "📦",
  "Ã°Å¸â€™Â°": "💰",
  "Ã°Å¸â€œÂ²": "📲",
  "sÃƒÂ»r": "sûr"
};

for (const [bad, good] of Object.entries(replacements)) {
  content = content.split(bad).join(good);
}

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Fixed remaining issues');
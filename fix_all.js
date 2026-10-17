const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const replacements = {
  "ÃƒÂ©": "é",
  "ÃƒÂ ": "à",
  "ÃƒÂ¨": "è",
  "ÃƒÂª": "ê",
  "ÃƒÂ´": "ô",
  "ÃƒÂ®": "î",
  "Ã¢Â­Â ": "⭐",
  "Ã¢Â€Â™": "'",
  "Ã‚Â°": "°",
  "Ã¢Â€Â“": "–",
  "Ã¢Â€Âœ": '"',
  "Ã¢Â€Â": '"',
  "ÃƒÂ§": "ç"
};

for (const [bad, good] of Object.entries(replacements)) {
  content = content.split(bad).join(good);
}

// Since I partially fixed wao-features and pages with perfect UTF-8, they shouldn't contain these corrupted sequences anyway, so it's perfectly safe!

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('File globally fixed');
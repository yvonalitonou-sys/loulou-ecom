const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

// The file was likely read as Latin1 and saved as UTF8 by PowerShell.
// Let's decode it back.
const decoded = Buffer.from(content, 'latin1').toString('utf8');

const lines = decoded.split('\n');
console.log(lines[155].trim()); // Should be 'DÃƒÂ©couvrez' converted back to 'Découvrez' if successful.
console.log(lines[857].trim()); // Should be 'Commande confirmÃƒÂ©e !' converted back.

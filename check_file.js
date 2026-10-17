const fs = require('fs');
try {
  let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');
  console.log("File length:", content.length);
} catch(e) { console.log(e); }
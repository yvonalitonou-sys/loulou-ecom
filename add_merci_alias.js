const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

content = content.replace(
  'add_shortcode("wao_thank_you", "wao_thank_you_shortcode");',
  'add_shortcode("wao_thank_you", "wao_thank_you_shortcode");\nadd_shortcode("wao_merci", "wao_thank_you_shortcode");'
);

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Added wao_merci alias');
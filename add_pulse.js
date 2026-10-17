const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const newCss = `
          /* Bouton Flottant */
          .wao-floating-bar { position: fixed; bottom: -100px; left: 0; width: 100%; background: #fff; box-shadow: 0 -2px 10px rgba(0,0,0,0.1); padding: 10px 20px; z-index: 9999; text-align: center; transition: bottom 0.3s; display: flex; justify-content: center;}
          .wao-floating-bar.wao-show { bottom: 0; }
          
          @keyframes wao-pulse {
            0% { transform: scale(1); box-shadow: 0 4px 15px rgba(195, 0, 216, 0.4); }
            50% { transform: scale(1.05); box-shadow: 0 4px 25px rgba(195, 0, 216, 0.8); }
            100% { transform: scale(1); box-shadow: 0 4px 15px rgba(195, 0, 216, 0.4); }
          }
          
          .wao-floating-btn { background: #c300d8; color: #fff; border: none; padding: 12px 20px; border-radius: 30px; font-weight: 800; font-size: 15px; text-decoration: none; display: inline-block; box-shadow: 0 4px 15px rgba(195, 0, 216, 0.4); text-align: center; animation: wao-pulse 1.5s infinite ease-in-out;}
`;

content = content.replace(/\/\* Bouton Flottant \*\/[\s\S]*?\.wao-floating-btn \{.*?\}/, newCss.trim());

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Added pulse animation');
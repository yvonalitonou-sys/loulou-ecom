const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const regex = /<div class="wao-reviews">[\s\S]*?<\/div>\s*<\/div>/;
const newHtml = `<div class="wao-reviews">
                  <div class="wao-review-card">
                      <div class="wao-review-stars">⭐⭐⭐⭐⭐</div>
                      <div class="wao-review-text">"Produits d'excellente qualité et livraison super rapide ! Le paiement à la livraison m'a vraiment rassuré. Je recommande à 100%."</div>
                      <div class="wao-review-author">Aminata D.</div>
                  </div>
                  <div class="wao-review-card">
                      <div class="wao-review-stars">⭐⭐⭐⭐⭐</div>
                      <div class="wao-review-text">"Service client irréprochable. J'ai eu une question sur ma commande et ils m'ont répondu immédiatement sur WhatsApp. Top !"</div>
                      <div class="wao-review-author">Kevin M.</div>
                  </div>
                  <div class="wao-review-card">
                      <div class="wao-review-stars">⭐⭐⭐⭐⭐</div>
                      <div class="wao-review-text">"J'adore la sélection de produits, on y trouve vraiment des choses utiles pour le quotidien. C'est devenu ma boutique préférée."</div>
                      <div class="wao-review-author">Sarah L.</div>
                  </div>
              </div>
          </div>`;

content = content.replace(regex, newHtml);

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Reviews replaced completely');
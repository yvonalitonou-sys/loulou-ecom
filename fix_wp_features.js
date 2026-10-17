const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

// The corrupted block:
const regex = /<h2 class="wao-section-title"[\s\S]*?<\/div>\s*<\/div>/;

const newHtml = `<h2 class="wao-section-title" style="text-align:center; margin-bottom:10px;">Pourquoi Nous Choisir</h2>
          <p class="wao-section-subtitle" style="text-align:center; margin-bottom:40px;">Nous nous engageons à vous offrir la meilleure expérience d'achat en ligne.</p>
          <div class="wao-features">
              <div>
                  <div class="wao-feat-icon">💎</div>
                  <h4>Qualité Premium</h4>
                  <p>Tous nos produits sont testés et approuvés pour garantir votre satisfaction.</p>
              </div>
              <div>
                  <div class="wao-feat-icon">🔒</div>
                  <h4>Paiement Sécurisé</h4>
                  <p>Profitez de l'esprit tranquille. Payez uniquement à la réception de votre colis.</p>
              </div>
              <div>
                  <div class="wao-feat-icon">🚀</div>
                  <h4>Livraison Rapide</h4>
                  <p>Vos commandes sont expédiées rapidement et livrées directement chez vous.</p>
              </div>
              <div>
                  <div class="wao-feat-icon">🎧</div>
                  <h4>Service Client 24/7</h4>
                  <p>Notre équipe est toujours disponible pour répondre à vos questions et vous assister.</p>
              </div>
          </div>`;

content = content.replace(regex, newHtml);

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Features section fixed');
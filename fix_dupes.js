const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const regex = /function wao_home_reviews\(\) \{[\s\S]*?add_action\('init', 'wao_remove_default_grid_elements'\);/;

const newFunction = `function wao_home_reviews() {
    if(is_shop() || is_front_page()) {
        ?>
        <div style="margin-top: 80px;">
            <h2 class="wao-section-title" style="text-align:center; margin-bottom:40px;">Avis de Nos Clients</h2>
            <div class="wao-reviews">
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
        </div>
        <?php
    }
}

add_action('init', 'wao_remove_default_grid_elements');`;

content = content.replace(regex, newFunction);

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Fixed duplicated reviews');
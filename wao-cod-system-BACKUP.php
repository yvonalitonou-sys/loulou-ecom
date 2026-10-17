<?php
/**
 * Plugin Name: WAO COD System
 * Description: Système de Cash on Delivery ultra-optimisé avec notifications Telegram.
 * Version: 1.5
 * Author: Antigravity
 */

if (!defined('ABSPATH')) { exit; }

// === INCLUSION DU BOT WHATSAPP IA ===
require_once plugin_dir_path(__FILE__) . 'wao-whatsapp-bot.php';

// === 1. DESACTIVATION DES FONCTIONNALIT�0S WOOCOMMERCE INUTILES ===
add_filter( 'woocommerce_checkout_fields' , 'wao_simplify_checkout_fields' );
function wao_simplify_checkout_fields( $fields ) { return $fields; }
add_filter( 'wc_add_to_cart_message_html', '__return_false' );

// === 2. CSS GLOBAL ET OPTIMISATIONS ASTRA ===
add_action('wp_head', 'wao_blue_custom_styles', 100);
function wao_blue_custom_styles() {
    ?>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Roboto:wght@400;500;700&display=swap');
        
        :root {
            --wao-bg: #f9fdfa;
            --wao-text: #1a1a1a;
            --wao-green-btn: #0db485;
            --wao-green-hover: #0a916b;
            --wao-border: #e2e8f0;
        }

        html { scroll-behavior: smooth; }
        body { font-family: 'Roboto', sans-serif !important; background-color: var(--wao-bg) !important; color: var(--wao-text); }
        .site-content { background-color: transparent !important; }
        h1, h2, h3, h4 { font-family: 'Montserrat', sans-serif !important; }
        
        /* Header Astra */
        .site-header { border-bottom: none !important; box-shadow: 0 2px 10px rgba(0,0,0,0.05) !important; }
        .site-logo-img img { max-width: 220px !important; transition: 0.3s; }
        @media (max-width: 921px) { .site-logo-img img { max-width: 170px !important; } }
        .single-product-category, .product_meta, .posted_in { display: none !important; }
        .woocommerce-breadcrumb, .ast-breadcrumbs-wrapper, .ast-header-breadcrumb { display: none !important; }

        .wao-full-description img { width: 100% !important; max-width: 100% !important; height: auto !important; border-radius: 12px; margin: 40px auto; display: block; box-shadow: 0 5px 15px rgba(0,0,0,0.05); clear: both; }
        .wao-full-description h1, .wao-full-description h2, .wao-full-description h3, .wao-full-description h4 { color: #111; margin-top: 50px; margin-bottom: 25px; font-weight: 800; text-align: left; clear: both; }
        .wao-full-description ul, .wao-full-description ol { padding-left: 30px; margin-bottom: 30px; font-weight: 500; }
        .wao-full-description li { margin-bottom: 12px; line-height: 1.7; }

        /* NOUVELLE PAGE D'ACCUEIL */
        ul.products { display: grid !important; grid-template-columns: repeat(4, 1fr) !important; gap: 40px !important; padding: 0 !important; margin: 0 auto 60px !important; max-width: 1200px; list-style:none;}
        ul.products::before, ul.products::after { display: none !important; }
        .products .product { display: flex !important; flex-direction: column !important; height: 100% !important; background: transparent !important; border: none !important; box-shadow: none !important; padding: 0 !important; text-align: left !important; width: 100% !important; margin: 0 !important;}
        .products .product img { margin-bottom: 15px; border-radius: 8px; width: 100%; object-fit: cover; aspect-ratio: 4/5; background: #f0f0f0; transform: scale(1.05); transition: 0.3s;}
        
        /* HIDE DEFAULT WOOCOMMERCE LOOP ELEMENTS */
        .products .product .woocommerce-loop-product__title,
        .products .product .price,
        .products .product .button,
        .products .product .added_to_cart,
        .products .product .ast-woo-product-category,
        .products .product .star-rating { display: none !important; }

        /* SHOW CUSTOM ELEMENTS */
        .wao-grid-title { font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 700; color: #111; margin: 10px 0 5px; line-height: 1.3;}
        .wao-grid-price { font-size: 15px; font-weight: 700; color: #111; margin-bottom: 15px; }
        
        .wao-grid-btn { margin-top: auto !important; display: block; width: 100%; background: var(--wao-green-btn); color: #fff; padding: 12px 0; border-radius: 6px; font-weight: 700; font-size: 14px; text-decoration: none; text-align: center; transition: 0.2s;}
        .wao-grid-btn:hover { background: var(--wao-green-hover); color: #fff; transform: translateY(-2px);}

        /* Animations on Scroll */
        .wao-animate { opacity: 0; transform: translateY(30px); transition: all 0.6s ease-out; }
        .wao-in-view { opacity: 1; transform: translateY(0); }

        /* Section Hero Banner */
        .wao-hero { background: linear-gradient(rgba(30, 40, 50, 0.35), rgba(30, 40, 50, 0.35)), url('/wp-content/uploads/hero-bg.jpg?v=2'); background-size: cover; background-position: center; color: #fff; padding: 120px 20px; text-align: center; margin-bottom: 60px;}
        .wao-hero h1 { font-size: 48px; font-weight: 800; color: #fff; margin-bottom: 20px; text-shadow: 0 4px 15px rgba(0,0,0,0.6); }
        .wao-hero p { font-size: 18px; margin-bottom: 30px; opacity: 1; font-weight: 600; text-shadow: 0 2px 8px rgba(0,0,0,0.7); }
        
        /* Pourquoi Nous Choisir */
        .wao-features { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; max-width: 1200px; margin: 0 auto 80px; text-align: center;}
        .wao-feat-icon { width: 60px; height: 60px; margin: 0 auto 15px; border: 1px solid #ccc; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; color: var(--wao-green-btn);}
        .wao-features h4 { font-size: 16px; font-weight: 700; margin-bottom: 10px; color: #111;}
        .wao-features p { font-size: 13px; color: #666; line-height: 1.5;}
        
        /* Bouton Flottant */
          .wao-floating-bar { position: fixed; bottom: -100px; left: 0; width: 100%; background: #fff; box-shadow: 0 -2px 10px rgba(0,0,0,0.1); padding: 10px 20px; z-index: 9999; text-align: center; transition: bottom 0.3s; display: flex; justify-content: center;}
          .wao-floating-bar.wao-show { bottom: 0; }
          
          @keyframes wao-pulse {
            0% { transform: scale(1); box-shadow: 0 4px 15px rgba(195, 0, 216, 0.4); }
            50% { transform: scale(1.05); box-shadow: 0 4px 25px rgba(195, 0, 216, 0.8); }
            100% { transform: scale(1); box-shadow: 0 4px 15px rgba(195, 0, 216, 0.4); }
          }
          
          .wao-floating-btn { background: #c300d8; color: #fff; border: none; padding: 12px 20px; border-radius: 30px; font-weight: 800; font-size: 15px; text-decoration: none; display: inline-block; box-shadow: 0 4px 15px rgba(195, 0, 216, 0.4); text-align: center; animation: wao-pulse 1.5s infinite ease-in-out;}
        
        /* Reviews */
        .wao-reviews { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1200px; margin: 0 auto; }
        .wao-review-card { background: #fff; border-radius: 12px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border: 1px solid #f0f0f0; }
        .wao-review-stars { color: #fbbf24; font-size: 18px; margin-bottom: 10px; }
        .wao-review-text { font-size: 14px; color: #444; font-style: italic; margin-bottom: 15px; line-height: 1.6; }
        .wao-review-author { font-weight: 700; color: #111; font-size: 15px; }

        @media (max-width: 900px) {
            ul.products { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; padding: 0 15px !important;}
            .wao-features { grid-template-columns: repeat(2, 1fr); padding: 0 15px;}
            .wao-reviews { grid-template-columns: 1fr; padding: 0 15px;}
            .wao-full-description { padding: 0 15px; font-size: 16px; }
        }
        
        @media (max-width: 768px) {
            .wao-features { grid-template-columns: 1fr; gap: 40px; }
            .wao-features h4 { font-size: 18px; margin-bottom: 5px; }
            .wao-features p { font-size: 15px; padding: 0 10px; }
            .wao-features { grid-template-columns: 1fr; gap: 40px; }
            .wao-features h4 { font-size: 18px; margin-bottom: 5px; }
            .wao-features p { font-size: 15px; padding: 0 10px; }
            .wao-hero { padding: 80px 20px; }
            .wao-hero h1 { font-size: 32px; }
            ul.products { grid-template-columns: 1fr !important; }
            .products .product img { transform: scale(1.02); }
        }
        @media (max-width: 768px) {
            /* Alignements Produit Mobile */
            .woocommerce-product-details__short-description, 
            .woocommerce-Tabs-panel--description { 
                padding: 0 15px; 
                text-align: left; 
            }
            .woocommerce-product-details__short-description img, 
            .woocommerce-Tabs-panel--description img { 
                width: 100% !important; 
                height: auto !important; 
                border-radius: 10px; 
                margin: 20px 0; 
                display: block; 
            }
            .woocommerce-product-details__short-description h1,
            .woocommerce-product-details__short-description h2,
            .woocommerce-product-details__short-description h3, 
            .woocommerce-Tabs-panel--description h1,
            .woocommerce-Tabs-panel--description h2,
            .woocommerce-Tabs-panel--description h3 { 
                text-align: center; 
                margin-top: 25px;
                margin-bottom: 15px;
            }
        }
    </style>
    <?php
}

// === 3. PAGE D'ACCUEIL : DESIGN GENERALISTE ===
add_action( 'woocommerce_before_shop_loop', 'wao_generalist_home_sections', 10 );
function wao_generalist_home_sections() {
    if(is_shop() || is_front_page()) {
        ?>
        <!-- HERO -->
        <div class="wao-hero">
            <h1>Des Produits Uniques. Des Prix Imbattables.</h1>
            <p>Découvrez notre sélection des meilleures tendances du moment.</p>
        </div>
        
        <!-- FEATURES -->
        <h2 class="wao-section-title" style="text-align:center; margin-bottom:10px;">Pourquoi Nous Choisir</h2>
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
          </div>
        
        <h2 id="nos-produits" class="wao-section-title" style="text-align:center;">Nos Produits Vedettes</h2>
        <p class="wao-section-subtitle" style="text-align:center; margin-bottom:40px;">Découvrez notre sélection des articles les plus populaires.</p>
        <?php
    }
}

add_action( 'woocommerce_after_shop_loop', 'wao_home_reviews', 10 );
function wao_home_reviews() {
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

add_action('init', 'wao_remove_default_grid_elements');
function wao_remove_default_grid_elements() {
    remove_action( 'woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_title', 10 );
    remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10 );
    remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_rating', 5 );
    remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );
    
    // Remove Sorting Dropdown & Result Count
    remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );
    remove_action( 'woocommerce_before_shop_loop', 'woocommerce_result_count', 20 );
    
    // Astra specific removals
    remove_action( 'woocommerce_shop_loop_item_title', 'astra_woo_shop_category', 5 );
    remove_action( 'woocommerce_after_shop_loop_item', 'astra_woo_shop_add_to_cart_button', 10 );
}

add_action('woocommerce_after_shop_loop_item', 'wao_clean_grid_elements', 10);
function wao_clean_grid_elements() {
    global $product;
    $price = $product->get_price();
    echo '<div class="wao-grid-title">' . $product->get_name() . '</div>';
    echo '<div class="wao-grid-price">CFA ' . number_format($price, 0, ',', ' ') . '</div>';
    echo '<a href="' . get_permalink() . '" class="wao-grid-btn" translate="no">COMMANDER</a>';
}

// === 4. PAGE PRODUIT : FORMULAIRE ET DESCRIPTION LIBEREE ===
add_action( 'woocommerce_before_single_product', 'wao_blue_remove_add_to_cart' );
function wao_blue_remove_add_to_cart() {
    remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20 );
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 10 );
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20 );
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
    remove_action( 'woocommerce_single_product_summary', 'astra_woo_single_product_category', 5 );
    remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );
    add_action( 'woocommerce_single_product_summary', 'wao_blue_render_product_form', 15 );
}

add_action( 'woocommerce_after_single_product_summary', 'wao_full_width_description', 15 );
function wao_full_width_description() {
    global $post;
    echo '<div class="wao-full-description">';
    echo apply_filters('the_content', $post->post_content);
    echo '</div>';
}

function wao_blue_render_product_form() {
    global $product;
    if ( ! is_a( $product, 'WC_Product' ) ) { return; }
    
    $product_id = $product->get_id();
    $product_price = $product->get_price();
    ?>
    <div class="wao-product-prices" style="font-size:24px; font-weight:800; color:#111; margin-bottom:20px;">
        <?php echo number_format($product_price, 0, ',', ' '); ?> F CFA
    </div>

    <div id="wao-form-wrapper" class="wao-new-form">
        <div style="text-align: center; margin-bottom: 25px;">
            <span style="background: #e04a3d; color: #fff; font-weight: 800; font-size: 15px; padding: 5px 10px; display: inline-block; line-height: 1.5; text-transform: uppercase;">
                Profitez de l'offre et commandez<br>maintenant
            </span>
        </div>
        <form id="wao-cod-form">
            <input type="hidden" id="wao_product_id" value="<?php echo esc_attr($product_id); ?>">
            <input type="hidden" id="wao_qty" value="1">
            <div class="wao-input-group">
                <label class="wao-input-label">Nom<span>*</span></label>
                <div class="wao-input-wrapper">
                    <div class="wao-input-icon"><svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>
                    <input type="text" id="wao_name" required placeholder="Votre nom complet">
                </div>
            </div>
            <div class="wao-input-group">
                <label class="wao-input-label">Téléphone<span>*</span></label>
                <div class="wao-input-wrapper">
                    <div class="wao-input-icon"><svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg></div>
                    <input type="tel" id="wao_phone" required value="+229" placeholder="+22901520000">
                </div>
            </div>
            <div class="wao-input-group">
                <label class="wao-input-label">Adresse<span>*</span></label>
                <div class="wao-input-wrapper">
                    <div class="wao-input-icon"><svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>
                    <input type="text" id="wao_address" required placeholder="Ville et quartier">
                </div>
            </div>
            <div class="wao-timer-box">
                <div class="wao-timer-text">Dépêchez-vous ! la vente se termine dans</div>
                <div class="wao-timer-clock" id="wao-timer-mins">15:00</div>
            </div>
            <button type="submit" id="wao-submit-btn" class="wao-btn-purple">
                <div class="wao-btn-purple-icon"><svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg></div>
                <div class="wao-btn-purple-text">
                    <span class="wao-btn-purple-main">COMMANDER MAINTENANT</span>
                    <span class="wao-btn-purple-sub">(livraison gratuite - satisfait ou remboursé)</span>
                </div>
            </button>
            <div id="wao-loader" style="display:none; text-align:center; color: #b800d1; margin-top:15px; font-weight:bold;">Traitement en cours... ?</div>
        </form>
    </div>

    <style>
        .wao-new-form { background: #fff; padding: 15px; margin-bottom: 30px; font-family: 'Roboto', sans-serif; border: 1px solid #eee; border-radius: 8px;}
        .wao-input-group { margin-bottom: 20px; }
        .wao-input-label { font-weight: 800; font-size: 15px; color: #000; margin-bottom: 8px; display: block; }
        .wao-input-label span { color: #e74c3c; }
        .wao-input-wrapper { display: flex; border: 1px solid #ddd; border-radius: 6px; overflow: hidden; background: #fff;}
        .wao-input-icon { background: #f0f0f0; width: 50px; display: flex; align-items: center; justify-content: center; border-right: 1px solid #ddd; }
        .wao-input-icon svg { width: 22px; height: 22px; fill: #111; }
        .wao-input-wrapper input { flex: 1; border: none; padding: 14px 15px; font-size: 16px; outline: none; width: 100%; color: #333;}
        .wao-input-wrapper input::placeholder { color: #888; }
        .wao-timer-box { background: #fcf1f0; border: 1px solid #fadbd8; border-radius: 8px; padding: 15px; text-align: center; margin-bottom: 20px; }
        .wao-timer-text { color: #d35400; font-weight: 700; font-size: 16px; line-height: 1.3;}
        .wao-timer-clock { color: #5c2a1a; font-weight: 900; font-size: 24px; margin-top: 5px; }
        .wao-btn-purple { display: flex; align-items: center; justify-content: center; width: 100%; background: #c300d8; border-radius: 40px; padding: 12px 10px; color: #fff; text-decoration: none; border: 4px solid #fff; box-shadow: 0 0 0 1px #eee, 0 8px 20px rgba(0,0,0,0.15); cursor: pointer; transition: 0.2s;}
        .wao-btn-purple:hover { transform: scale(1.02); }
        .wao-btn-purple-icon { margin-right: 12px; }
        .wao-btn-purple-icon svg { fill: #fff; width: 26px; height: 26px; }
        .wao-btn-purple-text { text-align: left; }
        .wao-btn-purple-main { font-size: 17px; font-weight: 900; display: block; letter-spacing: 0.5px;}
        .wao-btn-purple-sub { font-size: 13px; font-weight: 400; display: block; margin-top: 2px;}
        @media (max-width: 768px) {
            /* Alignements Produit Mobile */
            .woocommerce-product-details__short-description, 
            .woocommerce-Tabs-panel--description { 
                padding: 0 15px; 
                text-align: left; 
            }
            .woocommerce-product-details__short-description img, 
            .woocommerce-Tabs-panel--description img { 
                width: 100% !important; 
                height: auto !important; 
                border-radius: 10px; 
                margin: 20px 0; 
                display: block; 
            }
            .woocommerce-product-details__short-description h1,
            .woocommerce-product-details__short-description h2,
            .woocommerce-product-details__short-description h3, 
            .woocommerce-Tabs-panel--description h1,
            .woocommerce-Tabs-panel--description h2,
            .woocommerce-Tabs-panel--description h3 { 
                text-align: center; 
                margin-top: 25px;
                margin-bottom: 15px;
            }
        }
    </style>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            let endTime = sessionStorage.getItem('wao_timer_end');
            if(!endTime) {
                endTime = new Date().getTime() + (15 * 60 * 1000); // 15 mins
                sessionStorage.setItem('wao_timer_end', endTime);
            }
            function updateTimer() {
                let now = new Date().getTime();
                let distance = endTime - now;
                if (distance < 0) {
                    endTime = new Date().getTime() + (15 * 60 * 1000);
                    sessionStorage.setItem('wao_timer_end', endTime);
                    distance = endTime - now;
                }
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                document.getElementById('wao-timer-mins').innerText = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
            }
            setInterval(updateTimer, 1000);
            updateTimer();

            let form = document.getElementById('wao-cod-form');
            if(form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    document.getElementById('wao-submit-btn').style.display = 'none';
                    document.getElementById('wao-loader').style.display = 'block';
                    
                    let data = new FormData();
                    data.append('action', 'wao_submit_order');
                    data.append('name', document.getElementById('wao_name').value);
                    data.append('phone', document.getElementById('wao_phone').value);
                    data.append('address', document.getElementById('wao_address').value);
                    data.append('qty', 1);
                    data.append('product_id', document.getElementById('wao_product_id').value);
                    
                    fetch('<?php echo admin_url('admin-ajax.php'); ?>', { method: 'POST', body: data })
                    .then(res => res.json()).then(response => {
                        if(response.success) {
                            window.location.href = '/commande-confirmee/?order_id=' + response.data.order_id + '&key=' + response.data.order_key;
                        } else {
                            alert('Erreur: ' + response.data);
                            document.getElementById('wao-submit-btn').style.display = 'flex';
                            document.getElementById('wao-loader').style.display = 'none';
                        }
                    }).catch(() => {
                        alert('Une erreur est survenue.');
                        document.getElementById('wao-submit-btn').style.display = 'flex';
                        document.getElementById('wao-loader').style.display = 'none';
                    });
                });
            }
        });
    </script>
    <?php
}

// === 5. PIED DE PAGE ET BOUTON FLOTTANT ===
add_action('wp_footer', 'wao_blue_custom_footer_render', 100);
function wao_blue_custom_footer_render() {
    ?>
    <footer class="wao-footer">
        <div class="wao-footer-grid">
            <div class="wao-footer-col">
                <h4>Loulou Store</h4>
                <p style="font-size:13px; opacity:0.8;">Votre boutique de confiance au Bénin. Qualité, rapidité et satisfaction garantie.</p>
            </div>
            <div class="wao-footer-col">
                <h4>Liens Rapides</h4>
                <ul>
                    <li><a href="/qui-sommes-nous/">Qui sommes-nous ?</a></li>
                    <li><a href="/contact/">Contactez-nous</a></li>
                </ul>
            </div>
            <div class="wao-footer-col">
                <h4>Support</h4>
                <ul>
                    <li><a href="/moyens-de-paiement/">Moyens de paiement</a></li>
                    <li><a href="/expedition-et-livraison/">Expédition et livraison</a></li>
                </ul>
            </div>
        </div>
        <div style="text-align:center; border-top:1px solid rgba(255,255,255,0.1); padding-top:20px; font-size:12px; opacity:0.6;">
            &copy; <?php echo date('Y'); ?> Loulou Store. Tous droits réservés.
        </div>
    </footer>
    <style>
        .site-footer, .ast-footer-copyright, .ast-builder-footer-all-elements { display: none !important; }
        .wao-footer { background: #1a252f; padding: 60px 20px 30px; font-size: 14px; color: #cbd5e0;}
        .wao-footer-grid { display: flex; flex-wrap: wrap; justify-content: space-between; max-width: 1200px; margin: 0 auto; margin-bottom: 40px;}
        .wao-footer-col { width: 25%; min-width: 220px; text-align: left; margin-bottom: 30px;}
        .wao-footer-col h4 { color: #fff; font-weight: 700; font-size: 16px; margin-bottom: 20px;}
        .wao-footer-col ul { list-style: none; padding: 0; margin: 0; }
        .wao-footer-col ul li { margin-bottom: 12px; }
        .wao-footer-col a { color: #cbd5e0; text-decoration: none; transition: 0.2s;}
        .wao-footer-col a:hover { color: #fff; }
        @media (max-width: 768px) {
            /* Alignements Produit Mobile */
            .woocommerce-product-details__short-description, 
            .woocommerce-Tabs-panel--description { 
                padding: 0 15px; 
                text-align: left; 
            }
            .woocommerce-product-details__short-description img, 
            .woocommerce-Tabs-panel--description img { 
                width: 100% !important; 
                height: auto !important; 
                border-radius: 10px; 
                margin: 20px 0; 
                display: block; 
            }
            .woocommerce-product-details__short-description h1,
            .woocommerce-product-details__short-description h2,
            .woocommerce-product-details__short-description h3, 
            .woocommerce-Tabs-panel--description h1,
            .woocommerce-Tabs-panel--description h2,
            .woocommerce-Tabs-panel--description h3 { 
                text-align: center; 
                margin-top: 25px;
                margin-bottom: 15px;
            }
        }
    </style>

    <?php if(is_product()): ?>
    <div id="wao-floating-bar" class="wao-floating-bar">
        <a href="#wao-form-wrapper" class="wao-floating-btn">
            COMMANDER MAINTENANT
        </a>
    </div>
    <?php endif; ?>

    <!-- WhatsApp Floating Button -->
    <a href="https://wa.me/2290163202354?text=Bonjour%20Loulou%20Store%2C%20j'ai%20une%20question%20!" class="wao-whatsapp-btn" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>

    <style>
        .wao-whatsapp-btn {
            position: fixed;
            bottom: 25px;
            right: 25px;
            width: 60px;
            height: 60px;
            background-color: #25d366;
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
            z-index: 10000;
            transition: transform 0.3s ease, bottom 0.3s ease;
            animation: waoPulse 2s infinite;
        }
        .wao-whatsapp-btn:hover { transform: scale(1.1); }
        .wao-whatsapp-btn svg { width: 35px; height: 35px; fill: #fff; }
        @keyframes waoPulse {
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        body.wao-bar-visible .wao-whatsapp-btn { bottom: 85px; }
        @media (max-width: 768px) {
            /* Alignements Produit Mobile */
            .woocommerce-product-details__short-description, 
            .woocommerce-Tabs-panel--description { 
                padding: 0 15px; 
                text-align: left; 
            }
            .woocommerce-product-details__short-description img, 
            .woocommerce-Tabs-panel--description img { 
                width: 100% !important; 
                height: auto !important; 
                border-radius: 10px; 
                margin: 20px 0; 
                display: block; 
            }
            .woocommerce-product-details__short-description h1,
            .woocommerce-product-details__short-description h2,
            .woocommerce-product-details__short-description h3, 
            .woocommerce-Tabs-panel--description h1,
            .woocommerce-Tabs-panel--description h2,
            .woocommerce-Tabs-panel--description h3 { 
                text-align: center; 
                margin-top: 25px;
                margin-bottom: 15px;
            }
        }
    </style>

    <script>
    document.addEventListener('DOMContentLoaded', function() {
          // Animation au défilement (Intersection Observer)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                   entry.target.classList.add('wao-in-view');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.wao-features > div, .wao-reviews > div, ul.products li.product').forEach((el) => {
            el.classList.add('wao-animate');
            observer.observe(el);
        });

        const formContainer = document.getElementById('wao-form-wrapper');
        const floatingBar = document.getElementById('wao-floating-bar');
        
        if (formContainer && floatingBar) {
            window.addEventListener('scroll', function() {
                const formRect = formContainer.getBoundingClientRect();
                const isFormVisible = (formRect.top < window.innerHeight && formRect.bottom > 0);
                
                if (window.scrollY > 200 && !isFormVisible) {
                    floatingBar.classList.add('wao-show');
                    document.body.classList.add('wao-bar-visible');
                } else {
                    floatingBar.classList.remove('wao-show');
                    document.body.classList.remove('wao-bar-visible');
                }
            });
            floatingBar.querySelector('a').addEventListener('click', function(e) {
                e.preventDefault();
                formContainer.scrollIntoView({ behavior: 'smooth' });
            });
        }
    });
    </script>
    <?php
}

// === 6. TRAITEMENT AJAX COMMANDE & TELEGRAM ===
add_action('wp_ajax_wao_submit_order', 'wao_process_order');
add_action('wp_ajax_nopriv_wao_submit_order', 'wao_process_order');

function wao_process_order() {
    $name = sanitize_text_field($_POST['name']);
    $phone = sanitize_text_field($_POST['phone']);
    $address = sanitize_text_field($_POST['address']);
    $qty = intval($_POST['qty']);
    $product_id = intval($_POST['product_id']);

    $product = wc_get_product($product_id);
    if(!$product) { wp_send_json_error('Produit invalide.'); }

    $base_price = $product->get_price();
    $total = $base_price * $qty;

    $order = wc_create_order();
    $order->add_product($product, $qty);
    $addr_array = array(
        'first_name' => $name, 
        'address_1' => $address,
        'phone' => $phone
    );
    $order->set_address($addr_array, 'billing');
    $order->set_address($addr_array, 'shipping');
    $order->set_total($total);
    
    // Disable emails for speed
    add_filter( 'woocommerce_email_enabled_new_order', '__return_false' );
    add_filter( 'woocommerce_email_enabled_customer_processing_order', '__return_false' );
    
    // Use set_status instead of update_status to bypass heavy transition hooks
    $order->set_status('processing');
    $order->save();
    $order->add_order_note('Commande COD (Theme Généraliste).');

        // --- SEND WEBHOOK TO LOULOU ECOM ---
    $webhook_url = 'http://127.0.0.1:3000/api/webhooks/woocommerce';
    $payload = array(
        'number' => (string) $order->get_id(),
        'billing' => array(
            'first_name' => $name,
            'last_name' => '',
            'phone' => $phone,
            'address_1' => $address
        ),
        'total' => $total,
        'line_items' => array(
            array(
                'name' => $product->get_name(),
                'quantity' => $qty
            )
        )
    );
    wp_remote_post($webhook_url, array(
        'method'      => 'POST',
        'timeout'     => 1,
        'blocking'    => false,
        'headers'     => array('Content-Type' => 'application/json; charset=utf-8'),
        'body'        => wp_json_encode($payload),
    ));
    // -----------------------------------

    wp_send_json_success(array(
        'order_id' => $order->get_id(),
        'order_key' => $order->get_order_key()
    ));
}

add_action('wp_ajax_wao_send_telegram_ajax', 'wao_send_telegram_ajax');
add_action('wp_ajax_nopriv_wao_send_telegram_ajax', 'wao_send_telegram_ajax');
function wao_send_telegram_ajax() {
    $order_id = intval($_POST['order_id']);
    $order = wc_get_order($order_id);
    if (!$order || get_post_meta($order_id, '_telegram_sent', true)) {
        wp_send_json_error();
    }
    
    update_post_meta($order_id, '_telegram_sent', '1');
    
    $name = $order->get_billing_first_name();
    $phone = $order->get_billing_phone();
    $address = $order->get_billing_address_1();
    $total = $order->get_total();
    
    $product_name = '';
    $qty = 1;
    foreach ($order->get_items() as $item) {
        $product_name = $item->get_name();
        $qty = $item->get_quantity();
        break;
    }
    
    $token = get_option('wao_telegram_token');
    $chat_id = get_option('wao_telegram_chatid');
    
    if (empty($token) || empty($chat_id)) {
        wp_send_json_success();
    }
    
    $whatsapp = "https://wa.me/" . preg_replace('/[^0-9]/', '', $phone);
    
    $text = "🚨 *NOUVELLE COMMANDE COD* 🚨\n\n";
    $text .= "👤 *Client:* " . $name . "\n";
    $text .= "📞 *Téléphone:* " . $phone . "\n";
    $text .= "📍 *Adresse:* " . $address . "\n";
    $text .= "📦 *Produit:* " . $product_name . " (x" . $qty . ")\n";
    $text .= "💰 *Total:* " . $total . " FCFA\n\n";
    $text .= "📲 [Appeler sur WhatsApp](" . $whatsapp . ")";
    
    $url = "https://api.telegram.org/bot" . $token . "/sendMessage";
    wp_remote_post($url, array(
        'blocking'  => false,
        'timeout'   => 5,
        'sslverify' => false,
        'body'      => array(
            'chat_id'    => $chat_id,
            'text'       => $text,
            'parse_mode' => 'Markdown'
        )
    ));
    
    wp_send_json_success();
}



// === 7. AUTO-CREATION DES PAGES (ONE TIME) ===
add_action('init', 'wao_auto_create_pages_now');
function wao_auto_create_pages_now() {
    if (get_option('wao_pages_created_v5')) return;
    
    $pages = [
        [
            'title' => 'Commande Confirmée',
            'slug' => 'commande-confirmee',
            'content' => '[wao_thank_you]'
        ],
        [
            'title' => 'Qui sommes-nous ?',
            'slug' => 'qui-sommes-nous',
            'content' => "Bienvenue sur <strong>Loulou Store</strong>, votre destination incontournable pour dénicher des produits uniques, pratiques et tendances au Bénin.<br><br>Notre mission est simple : vous faciliter le quotidien en vous proposant une sélection rigoureuse d'articles de haute qualité àà des prix imbattables. Nous parcourons le marché pour trouver les meilleures innovations afin de vous les proposer en un seul et même endroit.<br><br>Nous ne sommes pas qu'une simple boutique en ligne, nous sommes une équipe passionnée et dévouée à votre satisfaction. Chez Loulou Store, le client est roi, et nous mettons un point d'honneur à vous offrir un service client réactif, transparent et chaleureux.<br><br>Merci de nous faire confiance pour vos achats !"
        ],
        [
            'title' => 'Moyens de paiement',
            'slug' => 'moyens-de-paiement',
            'content' => "Chez Loulou Store, votre sécurité et votre tranquillité d'esprit sont notre priorité absolue. C'est pourquoi nous avons opté pour le modèle le plus sûr pour vous : <strong>le Paiement à la Livraison (Cash on Delivery)</strong>.<br><br><strong>Comment çça marche ?</strong><br><ol><li><strong>Zéro risque en ligne :</strong> Vous ne payez absolument rien àà l'avance sur notre site. Aucune carte bancaire n'est requise pour passer commande.</li><li><strong>Vérification :</strong> Vous payez uniquement lorsque le livreur arrive chez vous avec votre colis.</li><li><strong>Méthodes acceptées à la livraison :</strong> Une fois le colis entre vos mains, vous pouvez régler le livreur de deux manières :<ul><li>En espèces (Cash)</li><li>Par Mobile Money (MoMo, Celtiis, Flooz, etc.) selon votre convenance.</li></ul></li></ol>Achetez l'esprit 100% tranquille, nous nous occupons du reste !"
        ],
        [
            'title' => 'Expédition et livraison',
            'slug' => 'expedition-et-livraison',
            'content' => "Nous savons que vous êtes impatient de recevoir vos commandes ! C'est pourquoi nous avons mis en place un réseau de livraison rapide, discret et fiable partout au Bénin.<br><br><strong>Notre processus d'expédition :</strong><br><ol><li><strong>Confirmation de commande :</strong> Dès que vous validez votre formulaire sur le site, notre service client vous appelle (généralement dans les heures qui suivent) pour confirmer avec vous votre adresse exacte et vos disponibilités.</li><li><strong>Délais de livraison :</strong> Les livraisons se font généralement de manière très rapide, sous <strong>24h à 48h</strong> maximum selon votre ville et votre quartier.</li><li><strong>Réception :</strong> Notre livreur vous contacte lorsqu'il est en route vers chez vous. Il vous remet votre colis en mains propres, à l'adresse convenue (à votre domicile, point de rencontre ou sur votre lieu de travail).</li></ol><em>Note : Les frais de livraison vous seront communiqués en toute transparence par téléphone lors de la confirmation de votre commande par notre agent.</em>"
        ]
    ];
    
    foreach ($pages as $p) {
        $page_check = get_page_by_path($p['slug']);
        if (isset($page_check->ID)) {
            wp_update_post([
                'ID' => $page_check->ID,
                'post_title' => $p['title'],
                'post_content' => $p['content']
            ]);
        } else {
            wp_insert_post([
                'post_title' => $p['title'],
                'post_name' => $p['slug'],
                'post_content' => $p['content'],
                'post_status' => 'publish',
                'post_type' => 'page'
            ]);
        }
    }
    update_option('wao_pages_created_v5', true);
}

// === 8. PAGE DE CONFIRMATION (THANK YOU PAGE) ===
add_shortcode("wao_thank_you", "wao_thank_you_shortcode");
function wao_thank_you_shortcode() {
    if (!isset($_GET["order_id"]) || !isset($_GET["key"])) {
        return "<p>Commande introuvable.</p>";
    }
    
    $order_id = intval($_GET["order_id"]);
    $order = wc_get_order($order_id);
    
    if (!$order || $order->get_order_key() !== $_GET["key"]) {
        return "<p>Accès refusé.</p>";
    }
    
    $items = $order->get_items();
    $total = $order->get_total();
    $date = wc_format_datetime($order->get_date_created(), "j F Y");
    
    ob_start();
    ?>
    <style>
        body { background: #f0fbf5 !important; }
        .wao-ty-wrapper { max-width: 600px; margin: 0 auto; padding: 20px; font-family: "Roboto", sans-serif; color: #111; }
        .wao-ty-header { text-align: center; margin-bottom: 30px; margin-top: 20px; }
        .wao-ty-icon { width: 70px; height: 70px; background: #dcfce7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .wao-ty-icon svg { width: 35px; height: 35px; fill: #16a34a; }
        .wao-ty-header h1 { font-size: 24px; font-weight: 800; color: #064e3b; margin-bottom: 10px; font-family: "Montserrat", sans-serif;}
        .wao-ty-header p { font-size: 14px; color: #4b5563; line-height: 1.5; }
        
        .wao-ty-card { background: #fff; border: 1px solid #d1fae5; border-radius: 12px; padding: 20px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .wao-ty-row { display: flex; justify-content: space-between; align-items: center; }
        .wao-ty-label { font-size: 12px; color: #6b7280; display: block; margin-bottom: 5px; }
        .wao-ty-val { font-size: 18px; font-weight: 800; color: #1f2937; letter-spacing: 0.5px;}
        .wao-ty-val-sub { font-size: 14px; font-weight: 600; color: #1f2937; }
        
        .wao-ty-card-title { font-size: 15px; font-weight: 700; color: #064e3b; margin-bottom: 15px; display: flex; align-items: center; gap: 8px;}
        .wao-ty-card-title svg { width: 18px; height: 18px; fill: #064e3b; }
        
        .wao-ty-item { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 14px; font-weight: 600; color: #1f2937;}
        .wao-ty-qty { font-size: 12px; color: #6b7280; font-weight: 400; display: block; margin-top: 4px; }
        
        .wao-ty-divider { height: 1px; background: #e5e7eb; margin: 15px 0; }
        .wao-ty-totals { font-size: 14px; color: #4b5563; }
        .wao-ty-totals > div { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .wao-ty-total-final { font-size: 16px; font-weight: 800; color: #111; margin-top: 15px; }
        
        .wao-ty-info-row { margin-bottom: 15px; }
        .wao-ty-info-row:last-child { margin-bottom: 0; }
        
        .wao-ty-btn { display: block; width: 100%; text-align: center; padding: 15px; background: #fff; border: 1px solid #16a34a; color: #16a34a; border-radius: 8px; font-weight: 700; text-decoration: none; margin-top: 20px; font-size: 15px;}
        @media (max-width: 768px) {
            /* Alignements Produit Mobile */
            .woocommerce-product-details__short-description, 
            .woocommerce-Tabs-panel--description { 
                padding: 0 15px; 
                text-align: left; 
            }
            .woocommerce-product-details__short-description img, 
            .woocommerce-Tabs-panel--description img { 
                width: 100% !important; 
                height: auto !important; 
                border-radius: 10px; 
                margin: 20px 0; 
                display: block; 
            }
            .woocommerce-product-details__short-description h1,
            .woocommerce-product-details__short-description h2,
            .woocommerce-product-details__short-description h3, 
            .woocommerce-Tabs-panel--description h1,
            .woocommerce-Tabs-panel--description h2,
            .woocommerce-Tabs-panel--description h3 { 
                text-align: center; 
                margin-top: 25px;
                margin-bottom: 15px;
            }
        }
    </style>
    
    <div class="wao-ty-wrapper">
        <div class="wao-ty-header">
            <div class="wao-ty-icon">
                <svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
            </div>
            <h1>Commande confirmée !</h1>
            <p>Merci pour votre commande. Nous vous enverrons une confirmation bientôt.</p>
        </div>
        
        <div class="wao-ty-card">
            <div class="wao-ty-row">
                <div>
                    <span class="wao-ty-label">N° de commande</span>
                    <span class="wao-ty-val">ORD-<?php echo date("Ymd"); ?>-<?php echo $order->get_id(); ?></span>
                </div>
                <div style="text-align: right;">
                    <span class="wao-ty-label">Date de commande</span>
                    <span class="wao-ty-val-sub"><?php echo $date; ?></span>
                </div>
            </div>
        </div>
        
        <div class="wao-ty-card">
            <div class="wao-ty-card-title">
                <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                Statut de la commande
            </div>
            <div class="wao-ty-row">
                <div>
                    <span class="wao-ty-label">Traitement</span>
                    <span class="wao-ty-val-sub">Pending</span>
                </div>
                <div style="text-align: right;">
                    <span class="wao-ty-label">Paiement</span>
                    <span class="wao-ty-val-sub">Unpaid</span>
                </div>
            </div>
        </div>
        
        <div class="wao-ty-card">
            <div class="wao-ty-card-title">
                <svg viewBox="0 0 24 24"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 013 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15L6.04 7.5 12 10.85l5.96-3.35L12 4.15z"/></svg>
                Articles commandés
            </div>
            <?php foreach($items as $item): ?>
            <div class="wao-ty-item">
                <div style="width: 70%;">
                    <?php echo $item->get_name(); ?>
                    <span class="wao-ty-qty">Quantité: <?php echo $item->get_quantity(); ?></span>
                </div>
                <div><?php echo number_format($item->get_total(), 0, ",", " "); ?> FCFA</div>
            </div>
            <?php endforeach; ?>
            
            <div class="wao-ty-divider"></div>
            
            <div class="wao-ty-totals">
                <div><span>Sous-total</span> <span><?php echo number_format($total, 0, ",", " "); ?> FCFA</span></div>
                <div><span>Frais de livraison</span> <span>0 FCFA</span></div>
                <div class="wao-ty-total-final"><span>Total</span> <span><?php echo number_format($total, 0, ",", " "); ?> FCFA</span></div>
            </div>
        </div>
        
        <div class="wao-ty-card">
            <div class="wao-ty-card-title">Informations client</div>
            <div class="wao-ty-info-row">
                <span class="wao-ty-label">Pays</span>
                <span class="wao-ty-val-sub">Bénin</span>
            </div>
            <div class="wao-ty-info-row">
                <span class="wao-ty-label">Nom et prénom</span>
                <span class="wao-ty-val-sub"><?php echo esc_html($order->get_billing_first_name()); ?></span>
            </div>
            <div class="wao-ty-info-row">
                <span class="wao-ty-label">Numéro de téléphone</span>
                <span class="wao-ty-val-sub"><?php echo esc_html($order->get_billing_phone()); ?></span>
            </div>
            <div class="wao-ty-info-row">
                <span class="wao-ty-label">Ville et quartier</span>
                <span class="wao-ty-val-sub"><?php echo esc_html($order->get_billing_address_1()); ?></span>
            </div>
        </div>
        
        <div class="wao-ty-card">
            <div class="wao-ty-card-title">Mode de paiement</div>
                <span class="wao-ty-val-sub" style="font-weight: 500;">Paiement à la livraison</span>
        </div>
        
        <a href="<?php echo home_url("/"); ?>" class="wao-ty-btn">Continuer les achats</a>
    </div>
    
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        let data = new FormData();
        data.append('action', 'wao_send_telegram_ajax');
        data.append('order_id', '<?php echo $order_id; ?>');
        fetch('<?php echo admin_url('admin-ajax.php'); ?>', { method: 'POST', body: data });

          if(typeof fbq === 'function') {
              fbq('track', 'Purchase', {
                  value: <?php echo floatval($total); ?>,
                  currency: 'XOF'
              });
          }
      });
      </script>
    <?php
    return ob_get_clean();
}
// === FACEBOOK PIXEL INTEGRATION ===
add_action('wp_head', 'wao_facebook_pixel_base_code', 1);
function wao_facebook_pixel_base_code() {
    ?>
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1081535277976505');
fbq('track', 'PageView');
<?php if (is_product()): 
    global $product;
    if ( is_a($product, 'WC_Product') ) {
        $price = $product->get_price();
        $name = $product->get_name();
        echo "fbq('track', 'ViewContent', { content_name: '" . esc_js($name) . "', value: " . floatval($price) . ", currency: 'XOF' });\n";
    }
endif; ?>
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1081535277976505&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
    <?php
}








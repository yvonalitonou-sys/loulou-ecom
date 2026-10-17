const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const regex = /\$pages = \[\s*\[\s*'title' => 'Moyens de paiement',[\s\S]*?\]\s*\];/;

const newArray = `$pages = [
          [
              'title' => 'Moyens de paiement',
              'slug' => 'moyens-de-paiement',
              'content' => "Chez Loulou Store, votre sécurité et votre tranquillité d'esprit sont notre priorité absolue. C'est pourquoi nous avons opté pour le modèle le plus sûr pour vous : <strong>le Paiement à la Livraison (Cash on Delivery)</strong>.<br><br><strong>Comment ça marche ?</strong><br><ol><li><strong>Zéro risque en ligne :</strong> Vous ne payez absolument rien à l'avance sur notre site. Aucune carte bancaire n'est requise pour passer commande.</li><li><strong>Vérification :</strong> Vous payez uniquement lorsque le livreur arrive chez vous avec votre colis.</li><li><strong>Méthodes acceptées à la livraison :</strong> Une fois le colis entre vos mains, vous pouvez régler le livreur de deux manières :<ul><li>En espèces (Cash)</li><li>Par Mobile Money (MoMo, Celtiis, Flooz, etc.) selon votre convenance.</li></ul></li></ol>Achetez l'esprit 100% tranquille, nous nous occupons du reste !"
          ],
          [
              'title' => 'Expédition et livraison',
              'slug' => 'expedition-et-livraison',
              'content' => "Nous savons que vous êtes impatient de recevoir vos commandes ! C'est pourquoi nous avons mis en place un réseau de livraison rapide, discret et fiable partout au Bénin.<br><br><strong>Notre processus d'expédition :</strong><br><ol><li><strong>Confirmation de commande :</strong> Dès que vous validez votre formulaire sur le site, notre service client vous appelle (généralement dans les heures qui suivent) pour confirmer avec vous votre adresse exacte et vos disponibilités.</li><li><strong>Délais de livraison :</strong> Les livraisons se font généralement de manière très rapide, sous <strong>24h à 48h</strong> maximum selon votre ville et votre quartier.</li><li><strong>Réception :</strong> Notre livreur vous contacte lorsqu'il est en route vers chez vous. Il vous remet votre colis en mains propres, à l'adresse convenue (à votre domicile, point de rencontre ou sur votre lieu de travail).</li></ol><em>Note : Les frais de livraison vous seront communiqués en toute transparence par téléphone lors de la confirmation de votre commande par notre agent.</em>"
          ]
      ];`;

content = content.replace(regex, newArray);
fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Pages array fixed');
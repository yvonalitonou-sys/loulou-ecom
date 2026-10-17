const token = '8871627389:AAFm3ZwhV35SuyBEqGhGN_6KmCRKh9WA4Ss';
const chat_id = '8183719890';

const text = "🔔 *NOUVELLE COMMANDE COD* 🔔\n\n👤 *Client:* Test\n📞 *Téléphone:* 00000\n📍 *Adresse:* Test\n📦 *Produit:* Tampons nettoyants visage à l'acide kojique et curcuma (x1)\n💰 *Total:* 8000 FCFA\n\n📲 [Appeler sur WhatsApp](https://wa.me/00000)";

const url = `https://api.telegram.org/bot${token}/sendMessage`;

fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    chat_id: chat_id,
    text: text,
    parse_mode: 'Markdown'
  })
})
.then(res => res.json())
.then(console.log)
.catch(console.error);
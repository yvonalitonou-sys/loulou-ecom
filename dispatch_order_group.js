const token = '8871627389:AAFm3ZwhV35SuyBEqGhGN_6KmCRKh9WA4Ss';
const chat_id = '-1003729052939';

const name = "Cédric";
const phone = "+2290166587485";
const address = "Calavi";
const product = "Tampons nettoyants visage à l'acide kojique et curcuma (x1)";
const total = "8000";
const whatsapp = "https://wa.me/2290166587485";

let text = "🚨 *NOUVELLE COMMANDE COD* 🚨\n\n";
text += "👤 *Client:* " + name + "\n";
text += "📞 *Telephone:* " + phone + "\n";
text += "📍 *Adresse:* " + address + "\n";
text += "📦 *Produit:* " + product + "\n";
text += "💰 *Total:* " + total + " FCFA\n\n";
text += "📲 [Appeler sur WhatsApp](" + whatsapp + ")\n";
text += "⚡️ [Ouvrir l'application Loulou Ecom](http://192.168.164.49:3000/commandes)";

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
.then(data => console.log("TELEGRAM GROUP DISPATCH:", data.ok))
.catch(err => console.error(err));
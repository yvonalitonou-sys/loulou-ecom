const token = '8871627389:AAFm3ZwhV35SuyBEqGhGN_6KmCRKh9WA4Ss';
const chat_id = '-1003729052939';
const url = `https://api.telegram.org/bot${token}/sendMessage`;

fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    chat_id: chat_id,
    text: "🎉 *Connexion réussie !*\n\nLe bot est désormais connecté à votre groupe *Vente loulou*.\nToutes les nouvelles commandes de la boutique sonneront ici pour toute l'équipe !",
    parse_mode: 'Markdown'
  })
})
.then(res => res.json())
.then(data => console.log("SEND RESULT:", data))
.catch(err => console.error("ERROR:", err));
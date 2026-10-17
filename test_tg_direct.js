const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testTelegram() {
  const token = '8871627389:AAFm3ZwhV35SuyBEqGhGN_6KmCRKh9WA4Ss';
  const chat_id = '8183719890';
  
  // order 111 mock data based on Prisma
  const name = 'juliano';
  const phone = '00000000'; // I don't know the exact phone, let's use a dummy
  const address = 'Test addr';
  const product_name = "Tampons nettoyants visage à l'acide kojique et curcuma";
  const qty = 1;
  const total = 8000;
  const whatsapp = "https://wa.me/" + phone;

  let text = "🚨 *NOUVELLE COMMANDE COD* 🚨\n\n";
  text += "👤 *Client:* " + name + "\n";
  text += "📞 *Telephone:* " + phone + "\n";
  text += "📍 *Adresse:* " + address + "\n";
  text += "📦 *Produit:* " + product_name + " (x" + qty + ")\n";
  text += "💰 *Total:* " + total + " FCFA\n\n";
  text += "📲 [Appeler sur WhatsApp](" + whatsapp + ")";

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chat_id,
        text: text,
        parse_mode: 'Markdown'
      })
    });
    const json = await res.json();
    console.log("TELEGRAM RESPONSE:", json);
  } catch(e) {
    console.error("ERROR:", e);
  }
}
testTelegram();
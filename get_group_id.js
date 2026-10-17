const token = '8871627389:AAFm3ZwhV35SuyBEqGhGN_6KmCRKh9WA4Ss';
const url = `https://api.telegram.org/bot${token}/getUpdates`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log("UPDATES COUNT:", data.result ? data.result.length : 0);
    if (data.result) {
      data.result.forEach(u => {
        const chat = u.message?.chat || u.my_chat_member?.chat || u.channel_post?.chat;
        if (chat) {
          console.log(`CHAT ID: ${chat.id} | TITLE: ${chat.title || chat.first_name} | TYPE: ${chat.type}`);
        }
      });
    }
  })
  .catch(err => console.error("ERROR:", err));
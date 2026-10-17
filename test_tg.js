const token = '8871627389:AAFm3ZwhV35SuyBEqGhGN_6KmCRKh9WA4Ss';
const chat_id = '8183719890';
const text = 'test message';

const url = `https://api.telegram.org/bot${token}/sendMessage`;

fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    chat_id: chat_id,
    text: text
  })
})
.then(res => res.json())
.then(console.log)
.catch(console.error);
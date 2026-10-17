fetch('http://boutique-cod.local/wp-admin/admin-ajax.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: 'action=wao_send_telegram_ajax&order_id=999999'
})
.then(res => res.text())
.then(text => console.log("AJAX RESPONSE:", text.substring(0, 500)))
.catch(err => console.log("FETCH ERROR:", err));
fetch('http://boutique-cod.local/wp-admin/admin-ajax.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: 'action=test_telegram'
})
.then(res => res.json())
.then(json => console.log("CREDENTIALS:", json))
.catch(err => console.log("FETCH ERROR:", err));
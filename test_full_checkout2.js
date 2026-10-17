async function submitOrder() {
  const params = new URLSearchParams();
  params.append('action', 'wao_submit_order');
  params.append('name', 'TEST AUTO GEMINI');
  params.append('phone', '22900000000');
  params.append('address', 'Cotonou');
  params.append('qty', '1');
  params.append('product_id', '14'); 

  try {
    const res = await fetch('http://boutique-cod.local/wp-admin/admin-ajax.php', {
      method: 'POST',
      body: params
    });
    const text = await res.text();
    console.log("RESPONSE:", text);
  } catch(e) {
    console.error("ERROR:", e);
  }
}
submitOrder();
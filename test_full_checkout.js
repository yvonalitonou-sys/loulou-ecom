const FormData = require('form-data');
const fetch = require('node-fetch'); // If not available, I will use http module, but let's try native fetch if Node 18+

async function submitOrder() {
  const form = new FormData();
  form.append('action', 'wao_submit_order');
  form.append('name', 'TEST AUTO GEMINI');
  form.append('phone', '22900000000');
  form.append('address', 'Cotonou');
  form.append('qty', '1');
  form.append('product_id', '14'); // Assuming 14 is a valid product id based on previous screenshots

  try {
    const res = await fetch('http://boutique-cod.local/wp-admin/admin-ajax.php', {
      method: 'POST',
      body: form
    });
    const text = await res.text();
    console.log("RESPONSE:", text);
  } catch(e) {
    console.error("ERROR:", e);
  }
}
submitOrder();
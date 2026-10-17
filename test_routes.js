async function testRoutes() {
  const routes = ['/', '/login', '/commandes', '/livraisons', '/equipe'];
  for (const r of routes) {
    try {
      const res = await fetch('http://127.0.0.1:3000' + r, { redirect: 'manual' });
      console.log(r, "Status:", res.status);
    } catch(e) {
      console.error(r, "Error:", e.message);
    }
  }
}
testRoutes();
async function test() {
  const res = await fetch("https://loulou-ecom.vercel.app/login");
  console.log("HTTP Status Code:", res.status);
  const html = await res.text();
  console.log("Titre trouvé dans le HTML:", html.includes("Loulou Ecom"));
  console.log("Formulaire de connexion trouvé:", html.includes("admin@loulou.com") || html.includes("type=\"password\""));
}
test();
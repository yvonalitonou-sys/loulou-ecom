const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/commandes/page.tsx', 'utf8');

const importAuth = `import { getSession } from '@/lib/session';\nimport { redirect } from 'next/navigation';\n`;
const checkAuth = `
  const user = await getSession();
  if (!user) redirect('/login');
`;

content = importAuth + content.replace('export default async function Commandes() {', 'export default async function Commandes() {' + checkAuth);
content = content.replace('<OrderTable orders={orders} drivers={drivers} />', '<OrderTable orders={orders} drivers={drivers} userRole={user.role} />');
fs.writeFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/commandes/page.tsx', content, 'utf8');
console.log('Protected commandes page');
const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/page.tsx', 'utf8');

const importAuth = `import { getSession } from '@/lib/session';\nimport { redirect } from 'next/navigation';\n`;
const checkAuth = `
  const user = await getSession();
  if (!user) redirect('/login');
  if (user.role !== 'ADMIN') redirect('/commandes');
`;

content = importAuth + content.replace('export default async function Dashboard() {', 'export default async function Dashboard() {' + checkAuth);
fs.writeFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/page.tsx', content, 'utf8');
console.log('Protected page.tsx');
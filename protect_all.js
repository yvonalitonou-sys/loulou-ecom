const fs = require('fs');

const protectFile = (file, requiresAdmin = false) => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('getSession')) return; // already protected

  const importAuth = `import { getSession } from '@/lib/session';\nimport { redirect } from 'next/navigation';\n`;
  const checkAuth = `
  const user = await getSession();
  if (!user) redirect('/login');
  ${requiresAdmin ? "if (user.role !== 'ADMIN') redirect('/commandes');" : ""}
`;
  
  // Find the default export async function
  const regex = /export default (async )?function [a-zA-Z]+\(\) \{/;
  const match = content.match(regex);
  if (match) {
    content = importAuth + content.replace(match[0], match[0] + checkAuth);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Protected ${file}`);
  }
}

protectFile('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/livraisons/page.tsx', false);
protectFile('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/pub/page.tsx', true);
protectFile('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/stock/page.tsx', true);
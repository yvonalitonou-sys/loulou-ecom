const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/actions.ts', 'utf8');

const logoutAction = `
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
  const sessionId = (await cookies()).get('sessionId')?.value;
  if (sessionId) {
    await prisma.session.delete({ where: { id: sessionId } }).catch(() => null);
  }
  (await cookies()).delete('sessionId');
  redirect('/login');
}
`;

// Make sure not to duplicate imports
content = content.replace("import { revalidatePath } from 'next/cache'", "import { revalidatePath } from 'next/cache'\nimport { cookies } from 'next/headers'\nimport { redirect } from 'next/navigation'");
// Remove the duplicate imports from logoutAction string
const cleanLogout = `
export async function logout() {
  const sessionId = (await cookies()).get('sessionId')?.value;
  if (sessionId) {
    await prisma.session.delete({ where: { id: sessionId } }).catch(() => null);
  }
  (await cookies()).delete('sessionId');
  redirect('/login');
}
`;

fs.writeFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/actions.ts', content + '\n' + cleanLogout, 'utf8');
console.log('Added logout action');
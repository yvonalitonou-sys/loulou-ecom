const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/layout.tsx', 'utf8');

const importLogout = `import { getSession } from '@/lib/session';\nimport { logout } from './actions';`;
content = content.replace("import { getSession } from '@/lib/session';", importLogout);

const bottomSidebar = `<div className="pt-4 border-t border-slate-800 mt-auto">
                <div className="text-sm text-slate-400 mb-4 px-2">Connecté : {user.name} ({user.role})</div>
              </div>`;
              
const newBottomSidebar = `<div className="pt-4 border-t border-slate-800 mt-auto">
                <div className="text-sm text-slate-400 mb-4 px-2">Connecté : {user.name} ({user.role})</div>
                <form action={logout}>
                  <button type="submit" className="flex w-full items-center gap-3 px-4 py-3 hover:bg-red-500/10 hover:text-red-400 rounded-lg font-medium transition text-slate-400 cursor-pointer">
                    <LogOut size={20} /> Déconnexion
                  </button>
                </form>
              </div>`;

content = content.replace(bottomSidebar, newBottomSidebar);
fs.writeFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/layout.tsx', content, 'utf8');
console.log('Added logout button to layout');
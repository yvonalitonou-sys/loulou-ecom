const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/components/OrderTable.tsx', 'utf8');

const regex = /(<td className="px-6 py-4">\s*<div className="font-bold text-slate-800">\{order\.customerName\}<\/div>)/;

const dateHtml = `<td className="px-6 py-4">
                    <div className="text-sm font-semibold text-slate-700">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  `;

content = content.replace(regex, dateHtml + '$1');

fs.writeFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/components/OrderTable.tsx', content, 'utf8');
console.log('Fixed columns');
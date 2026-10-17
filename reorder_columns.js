const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/components/OrderTable.tsx', 'utf8');

// 1. Reorder Headers
content = content.replace(
  '<th className="px-6 py-4 font-medium">Date</th>\n                <th className="px-6 py-4 font-medium">Client & Contact</th>',
  '<th className="px-6 py-4 font-medium">Client & Contact</th>'
);

content = content.replace(
  '<th className="px-6 py-4 font-medium">Produit</th>',
  '<th className="px-6 py-4 font-medium">Produit</th>\n                <th className="px-6 py-4 font-medium whitespace-nowrap">Date de commande</th>'
);

// 2. Reorder Body Cells & Add whitespace-nowrap to Date
const oldDateCell = `<td className="px-6 py-4">
                    <div className="text-sm font-semibold text-slate-700">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  `;
                  
content = content.replace(oldDateCell, '');

const newDateCell = `\n                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-slate-700">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>`;

content = content.replace(
  '<td className="px-6 py-4 text-slate-600">{order.productName}</td>',
  '<td className="px-6 py-4 text-slate-600">{order.productName}</td>' + newDateCell
);

fs.writeFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/components/OrderTable.tsx', content, 'utf8');
console.log('Reordered columns and fixed Date width');
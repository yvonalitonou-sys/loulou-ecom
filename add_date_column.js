const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/components/OrderTable.tsx', 'utf8');

// Header
content = content.replace(
  '<th className="px-6 py-4 font-medium">Client & Contact</th>',
  '<th className="px-6 py-4 font-medium">Date</th>\n                <th className="px-6 py-4 font-medium">Client & Contact</th>'
);

// Body
const dateHtml = `<td className="px-6 py-4">
                    <div className="text-sm font-semibold text-slate-700">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-6 py-4">`;

content = content.replace(
  '<td className="px-6 py-4">\n                    <div className="font-bold text-slate-800">{order.customerName}</div>',
  dateHtml + '\n                    <div className="font-bold text-slate-800">{order.customerName}</div>'
);

// colspan fix for empty state
content = content.replace(
  '<td colSpan={drivers.length > 0 ? 6 : 5}',
  '<td colSpan={drivers.length > 0 ? 7 : 6}'
);

fs.writeFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/components/OrderTable.tsx', content, 'utf8');
console.log('Added Date column');
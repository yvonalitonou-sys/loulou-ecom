const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/components/OrderTable.tsx', 'utf8');

content = content.replace(
  `export function OrderTable({ orders, drivers = [] }: { orders: any[], drivers?: any[] }) {`,
  `export function OrderTable({ orders, drivers = [], userRole = 'CLOSER' }: { orders: any[], drivers?: any[], userRole?: string }) {`
);

const deleteBtn = `<button onClick={() => { if(window.confirm('Voulez-vous vraiment supprimer cette commande ?')) deleteOrder(order.id) }} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition ml-2" title="Supprimer la commande">
                        <Trash2 size={18} />
                        </button>`;
const newDeleteBtn = `{userRole === 'ADMIN' && (
  <button onClick={() => { if(window.confirm('Voulez-vous vraiment supprimer cette commande ?')) deleteOrder(order.id) }} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition ml-2" title="Supprimer la commande">
    <Trash2 size={18} />
  </button>
)}`;

content = content.replace(deleteBtn, newDeleteBtn);
fs.writeFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/components/OrderTable.tsx', content, 'utf8');
console.log('Updated OrderTable');
const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/components/OrderTable.tsx', 'utf8');

// Update imports
content = content.replace("import { assignOrderToDriver } from '../actions'", "import { assignOrderToDriver, deleteOrder } from '../actions'");
content = content.replace("import { MessageCircle, PhoneCall, Truck, Send } from 'lucide-react'", "import { MessageCircle, PhoneCall, Truck, Send, Trash2 } from 'lucide-react'");

// Add delete button
const deleteBtn = `                      <a href={\`tel:\${order.phone}\`} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition" title="Appeler le client">
                        <PhoneCall size={18} />
                      </a>
                      <button onClick={() => { if(window.confirm('Voulez-vous vraiment supprimer cette commande ?')) deleteOrder(order.id) }} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition ml-2" title="Supprimer la commande">
                        <Trash2 size={18} />
                      </button>`;
                      
content = content.replace(/<a href=\{`tel:\$\{order\.phone\}`\}[\s\S]*?<\/a>/, deleteBtn);

fs.writeFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/components/OrderTable.tsx', content, 'utf8');
console.log('Added delete button');
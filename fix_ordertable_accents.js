const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/components/OrderTable.tsx', 'utf8');

content = content.replace("TǸl:", "Tél:");
content = content.replace("? demander", "À demander");
content = content.replace("? encaisser", "À encaisser");

fs.writeFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/components/OrderTable.tsx', content, 'utf8');
console.log('Fixed accents in OrderTable');
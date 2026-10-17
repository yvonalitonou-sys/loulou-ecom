const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/components/OrderTable.tsx', 'utf8');

// Match the entire button
const regex = /(<button onClick=\{\(\) => \{ if\(window\.confirm[\s\S]*?<\/button>)/;
content = content.replace(regex, "{userRole === 'ADMIN' && (\n                          $1\n                        )}");

fs.writeFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/components/OrderTable.tsx', content, 'utf8');
console.log('Fixed admin button');
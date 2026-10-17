const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/page.tsx', 'utf8');

content = content.replace(
  '<OrderTable orders={orders} />',
  '<OrderTable orders={orders} userRole={user.role} />'
);

fs.writeFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/page.tsx', content, 'utf8');
console.log('Fixed OrderTable props on Dashboard');
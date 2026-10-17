const fs = require('fs');

function replaceAsyncCookies(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/cookies\(\)\.get\(/g, '(await cookies()).get(');
  content = content.replace(/cookies\(\)\.set\(/g, '(await cookies()).set(');
  content = content.replace(/cookies\(\)\.delete\(/g, '(await cookies()).delete(');
  fs.writeFileSync(file, content, 'utf8');
}

replaceAsyncCookies('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/lib/session.ts');
replaceAsyncCookies('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/login/actions.ts');
console.log('Fixed async cookies');
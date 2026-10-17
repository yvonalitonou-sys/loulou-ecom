const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/prisma/schema.prisma', 'utf8');

const userModel = `
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  role      String   @default("CLOSER") // "ADMIN" or "CLOSER"
  name      String?
  createdAt DateTime @default(now())
}
`;
if (!content.includes('model User')) {
  fs.writeFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/prisma/schema.prisma', content + '\n' + userModel, 'utf8');
  console.log('Added User model');
} else {
  console.log('User model already exists');
}
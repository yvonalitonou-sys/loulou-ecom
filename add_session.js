const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/prisma/schema.prisma', 'utf8');

const sessionModel = `
model Session {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  expiresAt DateTime
}
`;
if (!content.includes('model Session')) {
  // also add relation to User
  content = content.replace('name      String?', 'name      String?\n  sessions  Session[]');
  fs.writeFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/prisma/schema.prisma', content + '\n' + sessionModel, 'utf8');
  console.log('Added Session model');
}
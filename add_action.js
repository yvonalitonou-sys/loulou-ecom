const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/actions.ts', 'utf8');

const newAction = `
export async function deleteOrder(id: string) {
  await prisma.order.delete({
    where: { id }
  })
  revalidatePath('/')
  revalidatePath('/commandes')
}
`;

fs.writeFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/actions.ts', content + newAction, 'utf8');
console.log('Added deleteOrder action');
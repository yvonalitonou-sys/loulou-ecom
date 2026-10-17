import { cookies } from "next/headers";
import { prisma } from "./prisma";

export async function getSession() {
  const sessionId = (await cookies()).get("sessionId")?.value;
  if (!sessionId) return null;
  
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true }
  });

  if (!session) return null;
  
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: session.id } });
    return null;
  }
  
  return session.user;
}
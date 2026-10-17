'use server'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

function hashPassword(password: string) {
  return crypto.scryptSync(password, 'loulou-salt-123', 64).toString('hex');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return 'Identifiants incorrects.';

    const hashedInput = hashPassword(password);
    if (hashedInput !== user.password) return 'Identifiants incorrects.';

    // Create a new session in DB
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
      }
    });

    (await cookies()).set({
      name: 'sessionId',
      value: session.id,
      httpOnly: true,
      expires: session.expiresAt,
    });

  } catch (error) {
    return 'Une erreur est survenue.';
  }
  
  redirect('/');
}
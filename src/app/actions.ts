'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createOrder(data: FormData) {
  const order = await prisma.order.create({
    data: {
      orderNumber: 'ORD-' + Math.floor(Math.random() * 1000000),
      storeName: 'Manuel',
      customerName: data.get('customerName') as string,
      phone: data.get('phone') as string,
      address: (data.get('address') as string) || null,
      productName: data.get('productName') as string,
      totalPrice: parseFloat(data.get('totalPrice') as string),
      status: 'PENDING'
    }
  })
  revalidatePath('/')
  revalidatePath('/commandes')
  return order
}

import crypto from 'crypto'

export async function updateOrderStatus(id: string, status: string, postponedReason?: string) {
  const dataToUpdate: any = { status }
  if (status === 'DELIVERED') {
    dataToUpdate.deliveredAt = new Date()
  }
  if (postponedReason !== undefined) {
    dataToUpdate.postponedReason = postponedReason
  }
  await prisma.order.update({
    where: { id },
    data: dataToUpdate
  })
  revalidatePath('/')
  revalidatePath('/commandes')
  revalidatePath('/livraisons')
}

export async function remitDriverMoney(driverId: string) {
  await prisma.order.updateMany({
    where: {
      driverId,
      status: 'DELIVERED',
      isPaidToAdmin: false
    },
    data: {
      isPaidToAdmin: true
    }
  })
  revalidatePath('/livraisons')
  revalidatePath('/')
}

export async function addTeamMember(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const role = formData.get('role') as string || 'CLOSER'
  const password = formData.get('password') as string

  if (!email || !password) return { error: 'Email et mot de passe requis' }

  const hashedPassword = crypto.scryptSync(password, 'loulou-salt-123', 64).toString('hex')

  await prisma.user.create({
    data: {
      name,
      email,
      role,
      password: hashedPassword
    }
  })
  revalidatePath('/equipe')
}

export async function deleteTeamMember(userId: string) {
  await prisma.session.deleteMany({ where: { userId } })
  await prisma.user.delete({ where: { id: userId } })
  revalidatePath('/equipe')
}

export async function deleteDriver(driverId: string) {
  await prisma.driver.delete({ where: { id: driverId } })
  revalidatePath('/livraisons')
}

export async function toggleDriverStatus(driverId: string, active: boolean) {
  await prisma.driver.update({
    where: { id: driverId },
    data: { active }
  })
  revalidatePath('/livraisons')
}

export async function assignOrderToDriver(orderId: string, driverId: string | null) {
  await prisma.order.update({
    where: { id: orderId },
    data: { 
      driverId,
      status: driverId ? 'SHIPPED' : 'CONFIRMED'
    }
  })
  revalidatePath('/')
  revalidatePath('/livraisons')
  revalidatePath('/commandes')
}

export async function deleteOrder(id: string) {
  await prisma.order.delete({
    where: { id }
  })
  revalidatePath('/')
  revalidatePath('/commandes')
}

export async function logout() {
  const sessionId = (await cookies()).get('sessionId')?.value;
  if (sessionId) {
    await prisma.session.delete({ where: { id: sessionId } }).catch(() => null);
  }
  (await cookies()).delete('sessionId');
  redirect('/login');
}


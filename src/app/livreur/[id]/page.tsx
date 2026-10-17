import React from 'react'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { DriverClientView } from './DriverClientView'

export default async function DriverPortalPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const driver = await prisma.driver.findUnique({
    where: { id }
  })

  if (!driver) {
    notFound()
  }

  // Fetch all orders assigned to this driver
  const orders = await prisma.order.findMany({
    where: { driverId: driver.id },
    orderBy: { createdAt: 'desc' }
  })

  return <DriverClientView driver={driver} initialOrders={orders} />
}

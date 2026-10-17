import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react';
import { prisma } from '@/lib/prisma';
import { OrderTable } from '../components/OrderTable';

export default async function Commandes() {
  const user = await getSession();
  if (!user) redirect('/login');

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const drivers = await prisma.driver.findMany();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Toutes les Commandes</h1>
        <p className="text-slate-500 mt-1">Gérez votre pipeline de ventes et assignez les livreurs.</p>
      </header>
      
      <OrderTable orders={orders} drivers={drivers} userRole={user.role} />
    </div>
  );
}
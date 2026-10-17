import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react';
import { prisma } from '@/lib/prisma';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';

export default async function Dashboard() {
  const user = await getSession();
  if (!user) redirect('/login');
  if (user.role !== 'ADMIN') redirect('/commandes');

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const expenses = await prisma.expense.findMany({
    orderBy: { date: 'asc' },
  });

  const drivers = await prisma.driver.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <AnalyticsDashboard
          initialOrders={orders}
          initialExpenses={expenses}
          drivers={drivers}
          userRole={user.role}
        />
      </div>
    </div>
  );
}
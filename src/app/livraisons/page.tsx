import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react';
import { Truck, Users, Wallet } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { DriverCard } from './DriverCard';

export default async function Livraisons() {
  const user = await getSession();
  if (!user) redirect('/login');
  if (user.role !== 'ADMIN') redirect('/commandes');

  const drivers = await prisma.driver.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  const stats = await Promise.all(drivers.map(async (driver) => {
    const orders = await prisma.order.findMany({ where: { driverId: driver.id } });
    const deliveredOrders = orders.filter(o => o.status === 'DELIVERED');
    const moneyCollected = deliveredOrders.reduce((acc, curr) => acc + curr.totalPrice, 0);
    const unpaidMoney = deliveredOrders.filter(o => !o.isPaidToAdmin).reduce((acc, curr) => acc + curr.totalPrice, 0);
    const pendingOrders = orders.filter(o => o.status === 'SHIPPED');
    
    return {
      ...driver,
      totalAssigned: orders.length,
      deliveredCount: deliveredOrders.length,
      pendingCount: pendingOrders.length,
      moneyCollected,
      unpaidMoney
    };
  }));

  const totalUnpaidCash = stats.reduce((acc, curr) => acc + curr.unpaidMoney, 0);

  async function addDriver(formData: FormData) {
    'use server';
    await prisma.driver.create({
      data: {
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
      }
    });
    revalidatePath('/livraisons');
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Gestion des Livreurs & Caisse</h1>
            <p className="text-slate-500 mt-1">Générez les liens magiques pour vos livreurs et suivez l'argent liquide à récupérer.</p>
          </div>
          <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-sm flex items-center gap-3">
            <Wallet className="w-6 h-6" />
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-emerald-100">Total Cash sur le Terrain</div>
              <div className="text-2xl font-black">{totalUnpaidCash.toLocaleString()} FCFA</div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="text-indigo-500"/> Nouveau Livreur
            </h2>
            <form action={addDriver} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Prénom / Nom du Livreur</label>
                <input required name="name" type="text" placeholder="Ex: Koffi" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Numéro WhatsApp</label>
                <input required name="phone" type="text" placeholder="Ex: +22997000000" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-indigo-500" />
              </div>
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl mt-2 transition text-sm shadow">
                Créer l'accès Livreur
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {stats.length === 0 && (
              <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center text-slate-500">
                <Truck className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <p className="font-semibold">Aucun livreur enregistré pour le moment.</p>
                <p className="text-xs text-slate-400 mt-1">Ajoutez votre premier livreur dans le formulaire à gauche.</p>
              </div>
            )}
            
            {stats.map(driver => (
              <DriverCard key={driver.id} driver={driver} userRole={user.role} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react';
import { DollarSign, TrendingDown } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function PubBudget() {
  const user = await getSession();
  if (!user) redirect('/login');
  if (user.role !== 'ADMIN') redirect('/commandes');

  const expenses = await prisma.expense.findMany({
    orderBy: { date: 'desc' }
  });

  const totalAds = expenses.reduce((acc, curr) => acc + curr.adSpend, 0);

  async function addExpense(formData: FormData) {
    'use server'
    await prisma.expense.create({
      // @ts-ignore
      data: {
        date: new Date(formData.get('date') as string),
        adSpend: parseFloat(formData.get('adSpend') as string),
        otherSpend: parseFloat(formData.get('otherSpend') as string) || 0,
        notes: formData.get('notes') as string,
      }
    })
    revalidatePath('/pub')
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Budget Publicitaire</h1>
          <p className="text-slate-500 mt-1">Déclarez vos dépenses Facebook Ads, TikTok Ads, etc.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><TrendingDown className="text-rose-500"/> Ajouter une dépense</h2>
            <form action={addExpense} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input required name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full border border-slate-300 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Dépense Pub (XOF)</label>
                <input required name="adSpend" type="number" placeholder="Ex: 15000" className="w-full border border-slate-300 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Autres Frais (Hébergement, etc)</label>
                <input name="otherSpend" type="number" defaultValue="0" className="w-full border border-slate-300 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Note / Campagne</label>
                <input name="notes" type="text" placeholder="Ex: Campagne Montre Connectée" className="w-full border border-slate-300 rounded-lg px-4 py-2" />
              </div>
              <button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-lg mt-2">
                Enregistrer la dépense
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">Historique des Dépenses</h2>
              <div className="text-rose-600 font-bold bg-rose-50 px-4 py-2 rounded-lg">
                Total Pub : {totalAds.toLocaleString()} XOF
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-sm">
                  <tr>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Note</th>
                    <th className="px-6 py-4 font-medium">Dépense Pub</th>
                    <th className="px-6 py-4 font-medium">Autres Frais</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {expenses.length === 0 && (
                    <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-500">Aucune dépense enregistrée.</td></tr>
                  )}
                  {expenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 text-slate-800 font-semibold">{new Date(exp.date).toLocaleDateString('fr-FR')}</td>
                      <td className="px-6 py-4 text-slate-600">{exp.notes || '-'}</td>
                      <td className="px-6 py-4 text-rose-600 font-bold">-{exp.adSpend.toLocaleString()} XOF</td>
                      <td className="px-6 py-4 text-orange-600 font-bold">-{exp.otherSpend.toLocaleString()} XOF</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
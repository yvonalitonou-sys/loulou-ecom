import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react';
import { PackageOpen, TrendingDown } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function StockPage() {
  const user = await getSession();
  if (!user) redirect('/login');
  if (user.role !== 'ADMIN') redirect('/commandes');

  const products = await prisma.product.findMany();

  async function addProduct(formData: FormData) {
    'use server'
    await prisma.product.create({
      data: {
        name: formData.get('name') as string,
        costPrice: parseFloat(formData.get('costPrice') as string),
      }
    })
    revalidatePath('/stock')
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Stocks & Coûts d'Achat</h1>
          <p className="text-slate-500 mt-1">Gérez le coût unitaire de vos produits pour calculer le vrai bénéfice.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><PackageOpen className="text-emerald-500"/> Ajouter un produit</h2>
            <form action={addProduct} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom du Produit</label>
                <input required name="name" type="text" placeholder="Ex: Kit Beauté Glow" className="w-full border border-slate-300 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Coût d'Achat (XOF)</label>
                <input required name="costPrice" type="number" placeholder="Ex: 2500" className="w-full border border-slate-300 rounded-lg px-4 py-2" />
                <p className="text-xs text-slate-400 mt-1">Ce montant sera déduit du bénéfice pour chaque vente.</p>
              </div>
              <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg mt-2 transition">
                Enregistrer
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-800">Catalogue de Produits</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-sm">
                  <tr>
                    <th className="px-6 py-4 font-medium">Nom du Produit</th>
                    <th className="px-6 py-4 font-medium">Coût d'Achat Unitaire</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {products.length === 0 && (
                    <tr><td colSpan={2} className="px-6 py-10 text-center text-slate-500">Aucun produit enregistré.</td></tr>
                  )}
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 text-slate-800 font-bold">{product.name}</td>
                      <td className="px-6 py-4 text-rose-600 font-bold flex items-center gap-1">
                        <TrendingDown size={16}/> -{product.costPrice.toLocaleString()} XOF
                      </td>
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
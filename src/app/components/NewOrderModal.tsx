'use client'

import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { createOrder } from '../actions'

export function NewOrderModal() {
  const [isOpen, setIsOpen] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await createOrder(formData)
    setIsOpen(false)
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition"
      >
        <Plus size={20} /> Nouvelle Commande
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Ajouter une Commande</h2>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Client</label>
                <input required name="customerName" type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Téléphone</label>
                <input required name="phone" type="text" placeholder="Ex: +229..." className="w-full border border-slate-300 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Adresse / Ville</label>
                <input name="address" type="text" placeholder="Ex: Cotonou, Akpakpa" className="w-full border border-slate-300 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Produit</label>
                <input required name="productName" type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Montant (XOF)</label>
                <input required name="totalPrice" type="number" className="w-full border border-slate-300 rounded-lg px-4 py-2" />
              </div>
              <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg mt-2">
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
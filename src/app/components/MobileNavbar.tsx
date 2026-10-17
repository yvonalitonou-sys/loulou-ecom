'use client'

import React, { useState } from 'react'
import {
  LayoutDashboard,
  ShoppingBag,
  Truck,
  DollarSign,
  PackageOpen,
  Users,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { logout } from '../actions'

export function MobileNavbar({ user }: { user: { name: string | null; role: string } }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Top Header Bar on Mobile */}
      <header className="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-sm text-slate-950">
            L
          </div>
          <span className="font-extrabold text-base tracking-tight">Loulou Ecom</span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
          aria-label="Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Slide-over Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-xs bg-slate-900 text-white p-5 flex flex-col h-full shadow-2xl z-10">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-slate-950">
                  L
                </div>
                <div>
                  <h2 className="font-extrabold text-base">Loulou Ecom</h2>
                  <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                    {user.role === 'ADMIN' ? '👑 Admin' : '🎧 Closeur'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="space-y-1.5 flex-1 overflow-y-auto">
              {user.role === 'ADMIN' && (
                <a
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-xl font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
                >
                  <LayoutDashboard size={18} className="text-emerald-400" /> Tableau de bord
                </a>
              )}
              <a
                href="/commandes"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
              >
                <ShoppingBag size={18} className="text-blue-400" /> Commandes Web
              </a>

              {user.role === 'ADMIN' && (
                <>
                  <a
                    href="/livraisons"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-3 rounded-xl font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
                  >
                    <Truck size={18} className="text-amber-400" /> Livreurs & Caisse
                  </a>
                  <a
                    href="/pub"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-3 rounded-xl font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
                  >
                    <DollarSign size={18} className="text-rose-400" /> Budget Pub
                  </a>
                  <a
                    href="/stock"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-3 rounded-xl font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
                  >
                    <PackageOpen size={18} className="text-purple-400" /> Stocks & Chine
                  </a>
                  <a
                    href="/equipe"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-3 rounded-xl font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
                  >
                    <Users size={18} className="text-indigo-400" /> Mon Équipe
                  </a>
                </>
              )}
            </nav>

            <div className="pt-4 border-t border-slate-800 mt-auto">
              <div className="text-xs text-slate-400 mb-3 px-1">
                Connecté : <span className="text-white font-bold">{user.name || 'Utilisateur'}</span>
              </div>
              <form action={logout}>
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 px-3.5 py-2.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-xl font-bold transition text-xs"
                >
                  <LogOut size={16} /> Déconnexion
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

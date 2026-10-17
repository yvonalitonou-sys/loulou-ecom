'use client'

import React, { useState } from 'react'
import { Phone, MessageCircle, CheckCircle2, Clock, MapPin, Package, AlertTriangle, ShieldAlert } from 'lucide-react'
import { updateOrderStatus } from '@/app/actions'

export function DriverClientView({ driver, initialOrders }: { driver: any, initialOrders: any[] }) {
  const [filter, setFilter] = useState<'PENDING' | 'DELIVERED' | 'POSTPONED'>('PENDING')
  const [loadingId, setLoadingId] = useState<string | null>(null)

  if (!driver.active) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <div className="max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-slate-800 mb-2">Accès Désactivé</h1>
          <p className="text-sm text-slate-500">
            Votre compte livreur a été temporairement suspendu. Veuillez contacter votre responsable Loulou Ecom.
          </p>
        </div>
      </div>
    )
  }

  const formatPhone = (phone: string) => {
    return phone ? phone.replace(/[^0-9]/g, '') : ''
  }

  const getWaLink = (order: any) => {
    const text = `Bonjour ${order.customerName}, c'est ${driver.name} votre livreur de la boutique Loulou. Je suis en route pour votre commande de ${order.productName}. Êtes-vous bien disponible à ${order.address || 'votre adresse'} ? (Montant à préparer : ${order.totalPrice.toLocaleString()} FCFA).`
    return `https://wa.me/${formatPhone(order.phone)}?text=${encodeURIComponent(text)}`
  }

  const handleMarkDelivered = async (orderId: string) => {
    if (!window.confirm("Confirmez-vous que ce colis est bien LIVRÉ et l'argent ENCAISSÉ ?")) return
    setLoadingId(orderId)
    await updateOrderStatus(orderId, 'DELIVERED')
    setLoadingId(null)
  }

  const handleMarkPostponed = async (orderId: string) => {
    const reason = window.prompt("Motif du report (ex: Injoignable, Pas d'argent aujourd'hui, Absent, Décalé à demain) :")
    if (!reason) return
    setLoadingId(orderId)
    await updateOrderStatus(orderId, 'POSTPONED', reason)
    setLoadingId(null)
  }

  // Count stats
  const toDeliverOrders = initialOrders.filter(o => o.status === 'SHIPPED' || o.status === 'CONFIRMED' || o.status === 'PENDING')
  const deliveredOrders = initialOrders.filter(o => o.status === 'DELIVERED')
  const postponedOrders = initialOrders.filter(o => o.status === 'POSTPONED')

  const totalCashCollected = deliveredOrders.reduce((sum, o) => sum + o.totalPrice, 0)

  let displayedOrders = toDeliverOrders
  if (filter === 'DELIVERED') displayedOrders = deliveredOrders
  if (filter === 'POSTPONED') displayedOrders = postponedOrders

  return (
    <div className="min-h-screen bg-slate-100 pb-12 font-sans antialiased text-slate-900">
      {/* Top Mobile Header */}
      <div className="bg-slate-900 text-white p-5 sticky top-0 z-20 shadow-md">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Espace Livreur</div>
            <h1 className="text-xl font-bold">{driver.name}</h1>
          </div>
          <div className="text-right bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Cash Encaissé</div>
            <div className="text-base font-extrabold text-emerald-400">
              {totalCashCollected.toLocaleString()} <span className="text-xs">FCFA</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 bg-slate-800/80 p-1 rounded-xl">
          <button
            onClick={() => setFilter('PENDING')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              filter === 'PENDING'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            À Livrer ({toDeliverOrders.length})
          </button>
          <button
            onClick={() => setFilter('DELIVERED')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              filter === 'DELIVERED'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Livrées ({deliveredOrders.length})
          </button>
          <button
            onClick={() => setFilter('POSTPONED')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              filter === 'POSTPONED'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Reportées ({postponedOrders.length})
          </button>
        </div>
      </div>

      {/* Orders List Container */}
      <div className="max-w-md mx-auto p-4 space-y-4">
        {displayedOrders.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-400 border border-slate-200 mt-6">
            <Package className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <p className="font-semibold text-slate-600">Aucune commande dans cet onglet.</p>
            <p className="text-xs mt-1">Vous n'avez pas de course ici pour l'instant.</p>
          </div>
        )}

        {displayedOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between transition hover:shadow-md"
          >
            {/* Order Header */}
            <div className="flex justify-between items-start mb-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{order.customerName}</h3>
                <div className="text-sm font-semibold text-indigo-600 mt-0.5">{order.phone}</div>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-emerald-600 block">
                  {order.totalPrice.toLocaleString()} <span className="text-xs">FCFA</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {order.quantity > 1 ? `${order.quantity} articles` : '1 article'}
                </span>
              </div>
            </div>

            {/* Product & Address Info */}
            <div className="space-y-2 mb-4 text-sm text-slate-700">
              <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <Package className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="font-medium text-slate-800">{order.productName}</span>
              </div>

              <div className="flex items-start gap-2 bg-amber-50/70 p-2.5 rounded-xl border border-amber-100/60">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="font-semibold text-slate-800">
                  {order.address || 'Adresse à demander par téléphone'}
                </span>
              </div>

              {order.postponedReason && (
                <div className="flex items-start gap-2 bg-orange-50 p-2.5 rounded-xl border border-orange-200">
                  <AlertTriangle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-orange-800">
                    Motif : {order.postponedReason}
                  </span>
                </div>
              )}
            </div>

            {/* Communication Actions */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <a
                href={getWaLink(order)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-3 rounded-xl transition text-sm shadow-sm"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <a
                href={`tel:${order.phone}`}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-3 rounded-xl transition text-sm shadow-sm"
              >
                <Phone size={18} />
                Appeler
              </a>
            </div>

            {/* Status Change Buttons */}
            {order.status !== 'DELIVERED' ? (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <button
                  disabled={loadingId === order.id}
                  onClick={() => handleMarkDelivered(order.id)}
                  className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-3 rounded-xl transition text-sm shadow"
                >
                  <CheckCircle2 size={18} />
                  {loadingId === order.id ? 'En cours...' : 'Livré (Encaissé)'}
                </button>
                <button
                  disabled={loadingId === order.id}
                  onClick={() => handleMarkPostponed(order.id)}
                  className="flex items-center justify-center gap-1.5 bg-orange-100 hover:bg-orange-200 text-orange-800 font-bold py-3 px-3 rounded-xl transition text-sm border border-orange-200"
                >
                  <Clock size={18} />
                  Reporté
                </button>
              </div>
            ) : (
              <div className="bg-emerald-50 text-emerald-700 p-2.5 rounded-xl text-center font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-100">
                <CheckCircle2 size={16} /> Colis Livré & Encaissé
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

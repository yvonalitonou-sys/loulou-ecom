'use client'

import React, { useState, useMemo } from 'react'
import { assignOrderToDriver, deleteOrder } from '../actions'
import {
  MessageCircle,
  PhoneCall,
  Truck,
  Send,
  Trash2,
  Clock,
  AlertCircle,
  Search,
  Download,
  AlertTriangle,
  RotateCw,
} from 'lucide-react'
import { StatusSelect } from './StatusSelect'

export function OrderTable({
  orders,
  drivers = [],
  userRole = 'CLOSER',
}: {
  orders: any[]
  drivers?: any[]
  userRole?: string
}) {
  const [filter, setFilter] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const formatPhone = (phone: string) => {
    return phone ? phone.replace(/[^0-9]/g, '') : ''
  }

  const getWaLinkClient = (order: any) => {
    let text = `Bonjour ${order.customerName}, c'est la boutique Loulou. Nous confirmons votre commande pour ${order.productName} (${order.totalPrice.toLocaleString()} FCFA). Êtes-vous bien disponible pour la livraison aujourd'hui ?`
    if (order.status === 'POSTPONED') {
      text = `Bonjour ${order.customerName}, c'est la boutique Loulou. Nous revenons vers vous comme convenu pour la livraison de votre commande (${order.productName} - ${order.totalPrice.toLocaleString()} FCFA). Êtes-vous disponible aujourd'hui à ${order.address || 'votre adresse'} ?`
    }
    return `https://wa.me/${formatPhone(order.phone)}?text=${encodeURIComponent(text)}`
  }

  const getWaLinkDriver = (order: any, driverId: string) => {
    const driver = drivers.find((d) => d.id === driverId)
    if (!driver || !driver.phone) return '#'
    const text = `*NOUVELLE LIVRAISON*\n\nClient: ${order.customerName}\nTél: ${order.phone}\nAdresse: ${order.address || 'À demander au client'}\nProduit: ${order.productName} (x${order.quantity})\nÀ encaisser: ${order.totalPrice.toLocaleString()} XOF`
    return `https://wa.me/${formatPhone(driver.phone)}?text=${encodeURIComponent(text)}`
  }

  // Pre-calculate phone frequency for duplicate detection (Anti-fraude)
  const phoneCounts = useMemo(() => {
    const counts: { [phone: string]: number } = {}
    orders.forEach((o) => {
      const clean = formatPhone(o.phone)
      if (clean) {
        counts[clean] = (counts[clean] || 0) + 1
      }
    })
    return counts
  }, [orders])

  // Filter orders by tab status AND search query (Name, Phone, Product, Address)
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // 1. Status Filter
      let matchesStatus = true
      if (filter === 'PENDING') matchesStatus = order.status === 'PENDING'
      else if (filter === 'CONFIRMED') matchesStatus = order.status === 'CONFIRMED'
      else if (filter === 'SHIPPED') matchesStatus = order.status === 'SHIPPED'
      else if (filter === 'POSTPONED') matchesStatus = order.status === 'POSTPONED'
      else if (filter === 'DELIVERED') matchesStatus = order.status === 'DELIVERED'
      else if (filter === 'OTHERS') matchesStatus = ['CANCELLED', 'RETURNED'].includes(order.status)

      if (!matchesStatus) return false

      // 2. Search Query Filter
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase().trim()
      const matchName = order.customerName?.toLowerCase().includes(q)
      const matchPhone = order.phone?.includes(q)
      const matchProduct = order.productName?.toLowerCase().includes(q)
      const matchAddress = order.address?.toLowerCase().includes(q)
      const matchOrderNum = order.orderNumber?.toLowerCase().includes(q)

      return matchName || matchPhone || matchProduct || matchAddress || matchOrderNum
    })
  }, [orders, filter, searchQuery])

  // Counts for tabs
  const counts = {
    ALL: orders.length,
    PENDING: orders.filter((o) => o.status === 'PENDING').length,
    CONFIRMED: orders.filter((o) => o.status === 'CONFIRMED').length,
    SHIPPED: orders.filter((o) => o.status === 'SHIPPED').length,
    POSTPONED: orders.filter((o) => o.status === 'POSTPONED').length,
    DELIVERED: orders.filter((o) => o.status === 'DELIVERED').length,
  }

  // CSV Export functionality
  const handleExportCSV = () => {
    if (filteredOrders.length === 0) return alert('Aucune commande à exporter.')

    const headers = [
      'Numéro',
      'Date',
      'Client',
      'Téléphone',
      'Adresse',
      'Produit',
      'Quantité',
      'Montant XOF',
      'Statut',
      'Livreur',
    ]

    const rows = filteredOrders.map((o) => [
      `"${o.orderNumber || ''}"`,
      `"${new Date(o.createdAt).toLocaleDateString('fr-FR')} ${new Date(o.createdAt).toLocaleTimeString('fr-FR')}"`,
      `"${(o.customerName || '').replace(/"/g, '""')}"`,
      `"${o.phone || ''}"`,
      `"${(o.address || '').replace(/"/g, '""')}"`,
      `"${(o.productName || '').replace(/"/g, '""')}"`,
      o.quantity || 1,
      o.totalPrice || 0,
      `"${o.status || ''}"`,
      `"${drivers.find((d) => d.id === o.driverId)?.name || 'Non assigné'}"`,
    ])

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `loulou-commandes-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Search and Action Bar */}
      <div className="p-4 md:p-6 border-b border-slate-200 bg-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-800">
              Commandes ({filteredOrders.length})
            </h2>
            {searchQuery && (
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                filtrées par recherche
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Instant Search Input */}
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher client, tél, ville..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs md:text-sm focus:outline-emerald-500 focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* CSV Export Button */}
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition shadow-sm cursor-pointer"
              title="Exporter les commandes affichées au format CSV / Excel"
            >
              <Download size={15} />
              <span>Export Excel</span>
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filter === 'ALL'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Toutes ({counts.ALL})
          </button>
          <button
            onClick={() => setFilter('PENDING')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filter === 'PENDING'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            À appeler ({counts.PENDING})
          </button>
          <button
            onClick={() => setFilter('CONFIRMED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filter === 'CONFIRMED'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            Confirmées ({counts.CONFIRMED})
          </button>
          <button
            onClick={() => setFilter('SHIPPED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filter === 'SHIPPED'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            En livraison ({counts.SHIPPED})
          </button>
          <button
            onClick={() => setFilter('POSTPONED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filter === 'POSTPONED'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
            }`}
          >
            À relancer ({counts.POSTPONED})
          </button>
          <button
            onClick={() => setFilter('DELIVERED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filter === 'DELIVERED'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            Livrées ({counts.DELIVERED})
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
            <tr>
              <th className="px-6 py-4 font-bold">Client & Contact</th>
              <th className="px-6 py-4 font-bold">Produit</th>
              <th className="px-6 py-4 font-bold whitespace-nowrap">Date de commande</th>
              <th className="px-6 py-4 font-bold">Montant</th>
              {drivers.length > 0 && <th className="px-6 py-4 font-bold">Livreur</th>}
              <th className="px-6 py-4 font-bold whitespace-nowrap">Actions & Relance</th>
              <th className="px-6 py-4 font-bold">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredOrders.length === 0 && (
              <tr>
                <td
                  colSpan={drivers.length > 0 ? 7 : 6}
                  className="px-6 py-12 text-center text-slate-400 font-medium"
                >
                  Aucune commande ne correspond à ces critères.
                </td>
              </tr>
            )}
            {filteredOrders.map((order) => {
              const cleanPhone = formatPhone(order.phone)
              const isDuplicate = cleanPhone && (phoneCounts[cleanPhone] || 0) > 1

              return (
                <tr key={order.id} className="hover:bg-slate-50/80 transition">
                  {/* Client & Address + Duplicate Alert */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-slate-900 text-sm">{order.customerName}</div>
                      {isDuplicate && (
                        <span
                          className="flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full"
                          title="Ce numéro de téléphone a passé plusieurs commandes dans la boutique"
                        >
                          <AlertTriangle size={11} className="text-amber-600" />
                          Doublon ({phoneCounts[cleanPhone]})
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">{order.phone}</div>
                    {order.address && (
                      <div
                        className="text-xs text-slate-500 mt-1 truncate max-w-[200px]"
                        title={order.address}
                      >
                        📍 {order.address}
                      </div>
                    )}
                  </td>

                  {/* Product */}
                  <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                    {order.productName}
                    {order.quantity > 1 && (
                      <span className="ml-1 text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">
                        x{order.quantity}
                      </span>
                    )}
                  </td>

                  {/* Date & Time */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs font-bold text-slate-700">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                      })}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {new Date(order.createdAt).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 text-slate-900 font-extrabold text-sm whitespace-nowrap">
                    {order.totalPrice.toLocaleString()} <span className="text-xs font-semibold text-slate-500">XOF</span>
                  </td>

                  {/* Driver Assignation */}
                  {drivers.length > 0 && (
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Truck size={16} className="text-slate-400" />
                        <select
                          value={order.driverId || ''}
                          onChange={(e) => assignOrderToDriver(order.id, e.target.value || null)}
                          className="text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none cursor-pointer text-indigo-700 font-bold hover:bg-slate-100 transition"
                        >
                          <option value="">Non assigné</option>
                          {drivers.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name} {!d.active ? '(Désactivé)' : ''}
                            </option>
                          ))}
                        </select>
                        {order.driverId && (
                          <a
                            href={getWaLinkDriver(order, order.driverId)}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 transition"
                            title="Transférer les infos au livreur via WhatsApp"
                          >
                            <Send size={14} />
                          </a>
                        )}
                      </div>
                    </td>
                  )}

                  {/* Client Actions & Relance */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <a
                        href={getWaLinkClient(order)}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer ${
                          order.status === 'POSTPONED'
                            ? 'bg-orange-500 hover:bg-orange-600 text-white'
                            : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        }`}
                        title={order.status === 'POSTPONED' ? 'Envoyer message de relance' : 'Confirmer sur WhatsApp'}
                      >
                        <MessageCircle size={14} />
                        <span>{order.status === 'POSTPONED' ? 'Relancer' : 'WhatsApp'}</span>
                      </a>
                      <a
                        href={`tel:${order.phone}`}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold transition"
                        title="Appeler le client"
                      >
                        <PhoneCall size={14} />
                        <span>Appel</span>
                      </a>
                      {userRole === 'ADMIN' && (
                        <button
                          onClick={() => {
                            if (window.confirm('Voulez-vous vraiment supprimer cette commande ?'))
                              deleteOrder(order.id)
                          }}
                          className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition ml-1 cursor-pointer"
                          title="Supprimer la commande"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </td>

                  {/* Status Select & Postponed Reason */}
                  <td className="px-6 py-4">
                    <StatusSelect
                      orderId={order.id}
                      currentStatus={order.status}
                      currentReason={order.postponedReason}
                    />
                    {order.status === 'POSTPONED' && order.postponedReason && (
                      <div className="text-[11px] text-orange-700 font-semibold mt-1 max-w-[150px] leading-tight bg-orange-50 p-1 rounded border border-orange-100">
                        💬 {order.postponedReason}
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
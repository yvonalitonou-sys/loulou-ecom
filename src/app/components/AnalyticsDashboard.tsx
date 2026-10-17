'use client'

import React, { useState, useMemo } from 'react'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Truck,
  ShoppingBag,
  Target,
  Percent,
  Calendar,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts'
import { NewOrderModal } from './NewOrderModal'
import { OrderTable } from './OrderTable'

interface Order {
  id: string
  orderNumber: string
  storeName: string
  customerName: string
  phone: string
  address: string | null
  productName: string
  quantity: number
  totalPrice: number
  status: string
  driverId: string | null
  postponedReason: string | null
  isPaidToAdmin: boolean
  createdAt: string | Date
  updatedAt: string | Date
}

interface Expense {
  id: string
  date: string | Date
  adSpend: number
  otherSpend: number
  notes: string | null
}

interface Driver {
  id: string
  name: string
  phone: string | null
  active: boolean
}

type Period = 'TODAY' | 'YESTERDAY' | '7DAYS' | 'ALL'

export function AnalyticsDashboard({
  initialOrders,
  initialExpenses,
  drivers,
  userRole,
}: {
  initialOrders: Order[]
  initialExpenses: Expense[]
  drivers: Driver[]
  userRole: string
}) {
  const [period, setPeriod] = useState<Period>('7DAYS')

  // Date filtering logic
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfYesterday = new Date(startOfToday.getTime() - 24 * 60 * 60 * 1000)
  const startOf7Days = new Date(startOfToday.getTime() - 7 * 24 * 60 * 60 * 1000)

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }

  // Filter orders by period
  const filteredOrders = useMemo(() => {
    return initialOrders.filter((order) => {
      const orderDate = new Date(order.createdAt)
      if (period === 'TODAY') {
        return orderDate >= startOfToday
      }
      if (period === 'YESTERDAY') {
        return orderDate >= startOfYesterday && orderDate < startOfToday
      }
      if (period === '7DAYS') {
        return orderDate >= startOf7Days
      }
      return true
    })
  }, [initialOrders, period])

  // Filter expenses by period
  const filteredExpenses = useMemo(() => {
    return initialExpenses.filter((exp) => {
      const expDate = new Date(exp.date)
      if (period === 'TODAY') {
        return expDate >= startOfToday
      }
      if (period === 'YESTERDAY') {
        return expDate >= startOfYesterday && expDate < startOfToday
      }
      if (period === '7DAYS') {
        return expDate >= startOf7Days
      }
      return true
    })
  }, [initialExpenses, period])

  // Core KPI Calculations
  const deliveredOrders = filteredOrders.filter((o) => o.status === 'DELIVERED')
  const confirmedOrders = filteredOrders.filter(
    (o) => o.status === 'CONFIRMED' || o.status === 'SHIPPED' || o.status === 'DELIVERED'
  )

  const totalDeliveredRevenue = deliveredOrders.reduce((sum, o) => sum + o.totalPrice, 0)
  const totalPotentialRevenue = filteredOrders.reduce((sum, o) => sum + o.totalPrice, 0)

  const totalAdSpend = filteredExpenses.reduce((sum, e) => sum + e.adSpend, 0)
  const totalOtherExpenses = filteredExpenses.reduce((sum, e) => sum + (e.otherSpend || 0), 0)
  const totalExpenses = totalAdSpend + totalOtherExpenses

  const netProfit = totalDeliveredRevenue - totalExpenses

  // Deliver rate & confirmation rate
  const totalOrdersCount = filteredOrders.length
  const deliveredCount = deliveredOrders.length
  const deliveryRate = totalOrdersCount > 0 ? Math.round((deliveredCount / totalOrdersCount) * 100) : 0
  const confirmationRate = totalOrdersCount > 0 ? Math.round((confirmedOrders.length / totalOrdersCount) * 100) : 0

  // Cost per purchase / acquisition (CPA / Coût par commande livrée)
  const costPerDelivered = deliveredCount > 0 ? Math.round(totalAdSpend / deliveredCount) : 0
  const costPerOrder = totalOrdersCount > 0 ? Math.round(totalAdSpend / totalOrdersCount) : 0

  // ROAS (Return On Ad Spend)
  const roas = totalAdSpend > 0 ? (totalDeliveredRevenue / totalAdSpend).toFixed(2) : '0.00'

  // Chart data: daily breakdown for the last 7 days
  const chartData = useMemo(() => {
    const days: { [key: string]: { date: string; ca: number; ads: number; ordersCount: number; deliveredCount: number } } = {}

    for (let i = 6; i >= 0; i--) {
      const d = new Date(startOfToday.getTime() - i * 24 * 60 * 60 * 1000)
      const key = d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
      days[key] = {
        date: key,
        ca: 0,
        ads: 0,
        ordersCount: 0,
        deliveredCount: 0,
      }
    }

    initialOrders.forEach((order) => {
      const d = new Date(order.createdAt)
      const key = d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
      if (days[key]) {
        days[key].ordersCount += 1
        if (order.status === 'DELIVERED') {
          days[key].ca += order.totalPrice
          days[key].deliveredCount += 1
        }
      }
    })

    initialExpenses.forEach((exp) => {
      const d = new Date(exp.date)
      const key = d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
      if (days[key]) {
        days[key].ads += exp.adSpend
      }
    })

    return Object.values(days)
  }, [initialOrders, initialExpenses])

  return (
    <div className="space-y-8">
      {/* Top Header & Filters bar like in Goudi Ecom pro dashboard */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl text-white">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Pilotage E-commerce & Ventes COD
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
            Tableau de bord
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Chiffres clés, dépenses pubs, rentabilité nette et suivi des livreurs.
          </p>
        </div>

        {/* Period Selector Tabs (Aujourd'hui, Hier, 7 derniers jours, Tout) */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-950/80 p-1 rounded-xl border border-slate-800 flex items-center gap-1 shadow-inner">
            <button
              onClick={() => setPeriod('TODAY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                period === 'TODAY'
                  ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Aujourd'hui
            </button>
            <button
              onClick={() => setPeriod('YESTERDAY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                period === 'YESTERDAY'
                  ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hier
            </button>
            <button
              onClick={() => setPeriod('7DAYS')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                period === '7DAYS'
                  ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              7 derniers jours
            </button>
            <button
              onClick={() => setPeriod('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                period === 'ALL'
                  ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tout afficher
            </button>
          </div>

          <NewOrderModal />
        </div>
      </div>

      {/* Primary KPI Grid (Dark theme, neon accents inspired by reference capture) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Ad Spend */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm hover:border-slate-700 transition">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              DÉPENSE PUB
            </span>
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
              <TrendingDown size={16} />
            </div>
          </div>
          <div className="text-xl md:text-2xl font-black text-white">
            {totalAdSpend.toLocaleString()} <span className="text-xs font-semibold text-slate-400">XOF</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <span>Frais annexes: {totalOtherExpenses.toLocaleString()} XOF</span>
          </div>
        </div>

        {/* Purchases (Achats/Livrées) */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm hover:border-slate-700 transition">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              ACHATS (LIVRÉS)
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShoppingBag size={16} />
            </div>
          </div>
          <div className="text-xl md:text-2xl font-black text-emerald-400">
            {deliveredCount} <span className="text-xs font-semibold text-slate-400">colis</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Total reçues: {totalOrdersCount}
          </div>
        </div>

        {/* Coût par achat / CPA */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm hover:border-slate-700 transition">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              COÛT / ACHAT (CPA)
            </span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Target size={16} />
            </div>
          </div>
          <div className="text-xl md:text-2xl font-black text-white">
            {costPerDelivered.toLocaleString()} <span className="text-xs font-semibold text-slate-400">XOF</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Par commande brute: {costPerOrder.toLocaleString()} XOF
          </div>
        </div>

        {/* Bénéfice Net Réel */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm hover:border-slate-700 transition">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              BÉNÉFICE NET
            </span>
            <div className={`p-1.5 rounded-lg ${netProfit >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
              <TrendingUp size={16} />
            </div>
          </div>
          <div className={`text-xl md:text-2xl font-black ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {netProfit.toLocaleString()} <span className="text-xs font-semibold text-slate-400">XOF</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            CA Livré: {totalDeliveredRevenue.toLocaleString()} XOF
          </div>
        </div>
      </div>

      {/* Secondary Metrics Bar (ROAS, Taux de Confirmation, Taux de Livraison, CA Total) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl text-slate-300">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-800 text-amber-400">
            <Zap size={18} />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">ROAS (Retour Pub)</div>
            <div className="text-lg font-black text-white">{roas}x</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-800 text-blue-400">
            <Percent size={18} />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Taux Confirmation</div>
            <div className="text-lg font-black text-white">{confirmationRate}%</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-800 text-emerald-400">
            <Truck size={18} />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Taux Livraison</div>
            <div className="text-lg font-black text-white">{deliveryRate}%</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-800 text-purple-400">
            <DollarSign size={18} />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">CA Encaissé</div>
            <div className="text-lg font-black text-white">{totalDeliveredRevenue.toLocaleString()} XOF</div>
          </div>
        </div>
      </div>

      {/* Interactive Chart Section: CA vs Dépense Pub (Inspired directly by the reference image) */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-2">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              DÉPENSE PUB & CA ENCAISSÉ PAR JOUR
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Barres vertes : Chiffre d'Affaires Livré | Courbe orange : Dépense Publicitaire
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" />
              <span>CA Livré</span>
            </div>
            <div className="flex items-center gap-1.5 text-orange-400">
              <span className="w-3 h-0.5 bg-orange-400 inline-block" />
              <span>Dépenses Pub</span>
            </div>
          </div>
        </div>

        <div className="h-[280px] w-full pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis
                stroke="#64748b"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                tickFormatter={(val) => `${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(value: any, name: any) => {
                  const val = Number(value || 0).toLocaleString() + ' XOF'
                  if (name === 'ca') return [val, 'CA Livré']
                  if (name === 'ads') return [val, 'Dépense Pub']
                  return [val, name]
                }}
              />
              <Bar dataKey="ca" fill="#10b981" radius={[4, 4, 0, 0]} barSize={26} name="ca" />
              <Line
                type="monotone"
                dataKey="ads"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ fill: '#f97316', r: 4 }}
                activeDot={{ r: 6 }}
                name="ads"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders Table Section */}
      <div>
        <OrderTable orders={filteredOrders} drivers={drivers} userRole={userRole} />
      </div>
    </div>
  )
}

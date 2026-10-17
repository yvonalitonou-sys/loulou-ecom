'use client'

import React, { useState } from 'react'
import { Truck, Copy, Check, MessageCircle, ExternalLink, DollarSign, Trash2, Power } from 'lucide-react'
import { remitDriverMoney, deleteDriver, toggleDriverStatus } from '@/app/actions'

export function DriverCard({ driver, userRole }: { driver: any, userRole: string }) {
  const [copied, setCopied] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Construct magic link
  const getBaseOrigin = () => {
    if (typeof window === 'undefined') return ''
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      // Use local Wi-Fi IP so mobile devices on the same network can access it
      return `http://192.168.164.49:3000`
    }
    return window.location.origin
  }

  const portalUrl = typeof window !== 'undefined' 
    ? `${getBaseOrigin()}/livreur/${driver.id}`
    : `/livreur/${driver.id}`

  const handleCopy = () => {
    navigator.clipboard.writeText(portalUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRemit = async () => {
    if (driver.unpaidMoney === 0) return
    if (!window.confirm(`Confirmez-vous avoir reçu les ${driver.unpaidMoney.toLocaleString()} FCFA en espèces ou Mobile Money de la part de ${driver.name} ?`)) return
    setIsSubmitting(true)
    await remitDriverMoney(driver.id)
    setIsSubmitting(false)
  }

  const handleToggle = async () => {
    setIsSubmitting(true)
    await toggleDriverStatus(driver.id, !driver.active)
    setIsSubmitting(false)
  }

  const handleDelete = async () => {
    if (!window.confirm(`Supprimer définitivement le livreur ${driver.name} ?`)) return
    setIsSubmitting(true)
    await deleteDriver(driver.id)
    setIsSubmitting(false)
  }

  const formatPhone = (phone: string) => phone ? phone.replace(/[^0-9]/g, '') : ''
  const waShareLink = `https://wa.me/${formatPhone(driver.phone)}?text=${encodeURIComponent(
    `Bonjour ${driver.name}, voici ton lien magique pour accéder à tes livraisons du jour sur Loulou Ecom :\n\n${portalUrl}\n\n(Tu peux l'ajouter sur ton écran d'accueil comme une application !)`
  )}`

  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border ${driver.active ? 'border-slate-200' : 'border-slate-200 bg-slate-50/70 opacity-75'} flex flex-col gap-4`}>
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center pb-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${driver.active ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-200 text-slate-500'}`}>
            <Truck size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-800">{driver.name}</h3>
              {!driver.active && (
                <span className="bg-rose-100 text-rose-700 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                  Désactivé
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 font-medium">{driver.phone || 'Pas de numéro'}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="text-center px-3 py-1 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase">En cours</p>
            <p className="text-lg font-extrabold text-amber-500">{driver.pendingCount}</p>
          </div>
          <div className="text-center px-3 py-1 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Livrées</p>
            <p className="text-lg font-extrabold text-emerald-500">{driver.deliveredCount}</p>
          </div>
          <div className="text-right px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-[10px] text-emerald-700 font-bold uppercase">Cash à récupérer (Caisse)</p>
            <p className="text-lg font-black text-emerald-700">
              {driver.unpaidMoney.toLocaleString()} <span className="text-xs">FCFA</span>
            </p>
          </div>
        </div>
      </div>

      {/* Magic Link Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-sm">
        <div className="flex items-center gap-2 text-slate-600 truncate max-w-md">
          <span className="font-bold text-xs uppercase text-slate-400">Lien Magique :</span>
          <span className="text-xs font-mono text-indigo-600 truncate">{portalUrl}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition shadow-sm"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            {copied ? 'Copié !' : 'Copier'}
          </button>
          {driver.phone && (
            <a
              href={waShareLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition shadow-sm"
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>
          )}
          <a
            href={portalUrl}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 text-slate-400 hover:text-slate-600 transition"
            title="Ouvrir le portail"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 italic">
        💡 <strong>Note WhatsApp :</strong> Le mot « localhost » n&apos;est jamais reconnu comme cliquable par WhatsApp. Le lien utilise désormais votre adresse réseau locale (<code>192.168.164.49</code>) pour que vous puissiez le tester sur votre smartphone connecté au même Wi-Fi. Une fois votre application mise en ligne avec son vrai domaine, le lien sera 100% bleu et cliquable partout.
      </p>

      {/* Action Footer */}
      <div className="flex flex-wrap justify-between items-center gap-2 pt-1">
        <div>
          {driver.unpaidMoney > 0 ? (
            <button
              disabled={isSubmitting}
              onClick={handleRemit}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-4 py-2 rounded-xl transition shadow"
            >
              <DollarSign size={16} />
              Valider encaissement de la caisse ({driver.unpaidMoney.toLocaleString()} FCFA)
            </button>
          ) : (
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              ✓ Caisse à jour (0 FCFA en attente)
            </span>
          )}
        </div>

        {userRole === 'ADMIN' && (
          <div className="flex items-center gap-2">
            <button
              disabled={isSubmitting}
              onClick={handleToggle}
              className={`p-2 rounded-lg border text-xs font-bold flex items-center gap-1 transition ${
                driver.active
                  ? 'border-slate-200 text-slate-600 hover:bg-slate-100'
                  : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
              title={driver.active ? 'Désactiver le compte' : 'Réactiver le compte'}
            >
              <Power size={14} />
              {driver.active ? 'Désactiver' : 'Activer'}
            </button>
            <button
              disabled={isSubmitting}
              onClick={handleDelete}
              className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition"
              title="Supprimer ce livreur"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

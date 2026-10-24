'use client'

import React, { useState } from 'react'
import { Check, X, Lock } from 'lucide-react'
import { updateOrderStatus } from '../actions'

const STATUS_LABELS: Record<string, string> = {
  'PENDING': 'À APPELER',
  'CONFIRMED': 'CONFIRMÉE',
  'SHIPPED': 'EN LIVRAISON',
  'POSTPONED': 'REPORTÉE',
  'DELIVERED': 'LIVRÉE',
  'CANCELLED': 'ANNULÉE',
  'RETURNED': 'RETOUR',
}

export function StatusSelect({ orderId, currentStatus, currentReason }: { orderId: string, currentStatus: string, currentReason?: string | null }) {
  const [status, setStatus] = useState(currentStatus)
  const [reason, setReason] = useState(currentReason || '')
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Les statuts finaux qui bloquent la commande
  const isLocked = ['DELIVERED', 'CANCELLED', 'RETURNED'].includes(currentStatus)

  const getStatusColor = (s: string) => {
    switch(s) {
      case 'PENDING': return 'bg-amber-100 text-amber-700'
      case 'CONFIRMED': return 'bg-blue-100 text-blue-700'
      case 'SHIPPED': return 'bg-indigo-100 text-indigo-700'
      case 'POSTPONED': return 'bg-orange-100 text-orange-700'
      case 'DELIVERED': return 'bg-emerald-100 text-emerald-700'
      case 'CANCELLED': return 'bg-rose-100 text-rose-700'
      case 'RETURNED': return 'bg-slate-100 text-slate-700'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    let promptReason = reason
    if (status === 'POSTPONED' && !reason) {
      promptReason = window.prompt("Motif du report (ex: Injoignable, Pas d'argent aujourd'hui, Absent) :") || 'Non précisé'
      setReason(promptReason)
    }
    await updateOrderStatus(orderId, status, promptReason)
    setIsEditing(false)
    setIsLoading(false)
  }

  const handleCancel = () => {
    setStatus(currentStatus)
    setIsEditing(false)
  }

  return (
    <div className="flex items-center gap-2">
      <select 
        value={status}
        onChange={(e) => {
          setStatus(e.target.value)
          if (e.target.value !== currentStatus) setIsEditing(true)
          else setIsEditing(false)
        }}
        disabled={isLoading || isLocked}
        className={`${getStatusColor(status)} px-3 py-1 rounded-full text-xs font-bold outline-none ${isLocked ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'} appearance-none text-center`}
      >
        {Object.keys(STATUS_LABELS).map(key => (
          <option key={key} value={key} className="bg-white text-slate-800">{STATUS_LABELS[key]}</option>
        ))}
      </select>
      
      {isLocked && !isEditing && (
        <span title="Commande verrouillée">
          <Lock size={12} className="text-slate-400" />
        </span>
      )}

      {isEditing && (
        <div className="flex gap-1 animate-in fade-in zoom-in duration-200">
          <button onClick={handleConfirm} disabled={isLoading} className="p-1 bg-emerald-100 text-emerald-600 rounded hover:bg-emerald-200" title="Confirmer">
            <Check size={14} strokeWidth={3} />
          </button>
          <button onClick={handleCancel} disabled={isLoading} className="p-1 bg-rose-100 text-rose-600 rounded hover:bg-rose-200" title="Annuler">
            <X size={14} strokeWidth={3} />
          </button>
        </div>
      )}
    </div>
  )
}
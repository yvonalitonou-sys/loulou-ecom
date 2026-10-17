'use client'

import React, { useState } from 'react'
import { Users, UserPlus, Trash2, ShieldCheck, Headphones, Key, Mail, User } from 'lucide-react'
import { addTeamMember, deleteTeamMember } from '@/app/actions'

export function TeamClientView({ members, currentUserId }: { members: any[], currentUserId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    const formData = new FormData(e.currentTarget)
    try {
      await addTeamMember(formData)
      e.currentTarget.reset()
    } catch (err: any) {
      setError(err?.message || "Erreur lors de l'ajout")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Supprimer définitivement l'accès de ${name} ?`)) return
    setIsSubmitting(true)
    await deleteTeamMember(id)
    setIsSubmitting(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Formulaire Nouvel Utilisateur */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
          <UserPlus className="text-indigo-600" /> Ajouter un Membre
        </h2>
        
        {error && (
          <div className="p-3 mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Nom / Prénom</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                required
                name="name"
                type="text"
                placeholder="Ex: Amina"
                className="w-full border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email de Connexion</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                required
                name="email"
                type="email"
                placeholder="Ex: amina@loulou.com"
                className="w-full border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Rôle</label>
            <select
              name="role"
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-indigo-500 font-semibold text-slate-700"
            >
              <option value="CLOSER">🎧 Closeur / Closeuse (Ventes uniquement)</option>
              <option value="ADMIN">👑 Administrateur (Accès total)</option>
            </select>
            <p className="text-[11px] text-slate-400 mt-1">
              Les closeurs n'ont aucun accès aux finances, aux stocks ni à la suppression de commandes.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Mot de Passe Provisoire</label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                required
                name="password"
                type="text"
                placeholder="Ex: amina2026"
                className="w-full border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl mt-2 transition text-sm shadow disabled:opacity-50"
          >
            {isSubmitting ? 'Création...' : 'Créer le Compte'}
          </button>
        </form>
      </div>

      {/* Liste des Membres */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-slate-800">
          <Users className="text-slate-500" /> Membres Actifs ({members.length})
        </h2>

        {members.map((member) => (
          <div
            key={member.id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between gap-4 md:items-center"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  member.role === 'ADMIN'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-indigo-100 text-indigo-700'
                }`}
              >
                {member.role === 'ADMIN' ? <ShieldCheck size={24} /> : <Headphones size={24} />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-800">{member.name || 'Sans nom'}</h3>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                      member.role === 'ADMIN'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    {member.role === 'ADMIN' ? 'Admin' : 'Closeur'}
                  </span>
                  {member.id === currentUserId && (
                    <span className="text-[10px] text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded-full">
                      (Vous)
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 font-mono mt-0.5">{member.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-xs text-slate-400 font-medium">
                Créé le {new Date(member.createdAt).toLocaleDateString('fr-FR')}
              </div>
              {member.id !== currentUserId && (
                <button
                  disabled={isSubmitting}
                  onClick={() => handleDelete(member.id, member.name || member.email)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition"
                  title="Supprimer ce compte"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

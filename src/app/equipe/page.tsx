import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react';
import { prisma } from '@/lib/prisma';
import { Users, UserPlus } from 'lucide-react';
import { addTeamMember, deleteTeamMember } from '@/app/actions';
import { TeamClientView } from './TeamClientView';

export default async function EquipePage() {
  const user = await getSession();
  if (!user || user.role !== 'ADMIN') {
    redirect('/');
  }

  const members = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Gestion de l'Équipe</h1>
          <p className="text-slate-500 mt-1">Créez et gérez les comptes d'accès pour vos Closeurs et Administrateurs en toute autonomie.</p>
        </header>

        <TeamClientView members={members} currentUserId={user.id} />
      </div>
    </div>
  );
}

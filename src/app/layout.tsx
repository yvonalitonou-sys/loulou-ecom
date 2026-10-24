import type { Metadata } from 'next';
import './globals.css';
import { LayoutDashboard, ShoppingBag, Truck, DollarSign, PackageOpen, LogOut, Users } from 'lucide-react';
import { getSession } from '@/lib/session';
import { logout } from './actions';
import { MobileNavbar } from './components/MobileNavbar';

export const metadata: Metadata = {
  title: 'Loulou Ecom - ERP',
  description: 'ERP sur-mesure pour e-commerce COD',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSession();

  return (
    <html lang="fr">
      <body className="bg-slate-50 text-slate-900 flex flex-col md:flex-row min-h-screen font-sans">
        {user ? (
          <>
            <MobileNavbar user={user} />
            <aside className="w-64 bg-slate-900 text-white p-5 flex flex-col hidden md:flex shrink-0">
              <div className="mb-10 flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold">L</div>
                <h1 className="text-xl font-bold">Loulou Ecom</h1>
              </div>
              <nav className="space-y-2 flex-1">
                {user.role === 'ADMIN' && (
                  <a href="/" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg font-medium transition text-slate-300 hover:text-white">
                    <LayoutDashboard size={20} /> Tableau de bord
                  </a>
                )}
                <a href="/commandes" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg font-medium transition text-slate-300 hover:text-white">
                  <ShoppingBag size={20} /> Commandes Web
                </a>
                {user.role === 'ADMIN' && (
                  <>
                    <a href="/livraisons" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg font-medium text-slate-300 hover:text-white transition cursor-pointer">
                      <Truck size={20} /> Livreurs & Caisse
                    </a>
                    <a href="/pub" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg font-medium text-slate-300 hover:text-white transition cursor-pointer">
                      <DollarSign size={20} /> Budget Pub
                    </a>
                    <a href="/stock" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg font-medium text-slate-300 hover:text-white transition cursor-pointer">
                      <PackageOpen size={20} /> Stocks & Chine
                    </a>
                    <a href="/equipe" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg font-medium text-slate-300 hover:text-white transition cursor-pointer">
                      <Users size={20} /> Mon Équipe
                    </a>
                  </>
                )}
              </nav>
              <div className="pt-4 border-t border-slate-800 mt-auto">
                <div className="text-sm text-slate-400 mb-4 px-2">Connecté : {user.name} ({user.role})</div>
                <form action={logout}>
                  <button type="submit" className="flex w-full items-center gap-3 px-4 py-3 hover:bg-red-500/10 hover:text-red-400 rounded-lg font-medium transition text-slate-400 cursor-pointer">
                    <LogOut size={20} /> Déconnexion
                  </button>
                </form>
              </div>
            </aside>
            <main className="flex-1 overflow-x-hidden">
              {children}
            </main>
          </>
        ) : (
          <main className="flex-1 overflow-x-hidden">
            {children}
          </main>
        )}
      </body>
    </html>
  );
}

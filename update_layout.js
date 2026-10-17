const fs = require('fs');

const content = `import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { LayoutDashboard, ShoppingBag, Truck, DollarSign, PackageOpen, LogOut } from 'lucide-react';
import { getSession } from '@/lib/session';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
    <html lang="fr" className={\`\${geistSans.variable} \${geistMono.variable} antialiased\`}>
      <body className="bg-slate-50 text-slate-900 flex min-h-screen">
        {user ? (
          <>
            <aside className="w-64 bg-slate-900 text-white p-5 flex flex-col hidden md:flex">
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
                <a href="/livraisons" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg font-medium text-slate-300 hover:text-white transition cursor-pointer">
                  <Truck size={20} /> Livreurs
                </a>
                {user.role === 'ADMIN' && (
                  <>
                    <a href="/pub" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg font-medium text-slate-300 hover:text-white transition cursor-pointer">
                      <DollarSign size={20} /> Budget Pub
                    </a>
                    <a href="/stock" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg font-medium text-slate-300 hover:text-white transition cursor-pointer">
                      <PackageOpen size={20} /> Stocks & Chine
                    </a>
                  </>
                )}
              </nav>
              <div className="pt-4 border-t border-slate-800 mt-auto">
                <div className="text-sm text-slate-400 mb-4 px-2">Connecté : {user.name} ({user.role})</div>
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
`;
fs.writeFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/src/app/layout.tsx', content, 'utf8');
console.log('Updated layout with roles');
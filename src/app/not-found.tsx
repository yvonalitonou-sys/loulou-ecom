import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-900 text-white text-center">
      <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center font-black text-2xl text-slate-950 mb-6">
        L
      </div>
      <h1 className="text-4xl font-extrabold mb-2">404 - Page non trouvée</h1>
      <p className="text-slate-400 mb-8 max-w-sm">
        La page demandée n'existe pas ou a été déplacée.
      </p>
      <Link
        href="/login"
        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl transition shadow-lg"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}

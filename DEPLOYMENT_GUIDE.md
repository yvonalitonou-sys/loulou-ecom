# 🚀 Guide de Déploiement Cloud & Netlify (Loulou Ecom)

Ce guide récapitule les étapes simples pour mettre votre application **Loulou Ecom** en ligne sur Internet afin que vous, vos closeurs et vos livreurs puissiez y accéder 24h/24 sans dépendre de votre PC.

---

## Étape 1 : Créer votre Base de Données Cloud Gratuite (PostgreSQL)

Comme Netlify est un hébergeur "serverless", il lui faut une base de données Cloud permanente :
1. Rendez-vous sur **[Neon.tech](https://neon.tech)** ou **[Supabase.com](https://supabase.com)** (100% gratuit).
2. Créez un compte et cliquez sur **Create Project** (nommez-le `loulou-ecom`).
3. Copiez l'URL de connexion fournie (elle ressemble à : `postgresql://user:password@ep-xyz.neon.tech/loulou?sslmode=require`).

---

## Étape 2 : Connecter la Base de Données dans le Code

1. Dans le fichier `prisma/schema.prisma`, changez :
   ```prisma
   datasource db {
     provider = "postgresql" // au lieu de sqlite
     url      = env("DATABASE_URL")
   }
   ```
2. Dans votre fichier `.env`, collez votre URL :
   ```env
   DATABASE_URL="votre_lien_neon_ou_supabase"
   ```
3. Exécutez dans le terminal :
   ```bash
   npx prisma db push
   node seed.js
   ```
   *Toutes vos tables (commandes, utilisateurs, livreurs) seront instantanément créées et initialisées sur le Cloud.*

---

## Étape 3 : Déploiement sur Netlify

1. Poussez votre code sur votre compte **GitHub** privé :
   ```bash
   git init
   git add .
   git commit -m "Loulou Ecom Version Pro"
   git push origin main
   ```
2. Connectez-vous sur **[Netlify.com](https://netlify.com)**.
3. Cliquez sur **Add new site** > **Import an existing project** > Sélectionnez votre dépôt GitHub.
4. Dans **Environment Variables** (Variables d'environnement), ajoutez :
   - `DATABASE_URL` = (Votre lien PostgreSQL de l'Étape 1)
5. Cliquez sur **Deploy** !

Netlify construira l'application en ~1 minute et vous fournira votre lien public sécurisé en HTTPS (ex: `https://loulou-ecom.netlify.app`).
Vous pourrez ensuite y rattacher votre propre nom de domaine personnalisé si vous le souhaitez.

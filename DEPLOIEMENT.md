# Mettre le site en ligne sur Vercel

Le site est un site statique pré-rendu (Vite + React). Vercel le construit automatiquement à
chaque envoi sur GitHub : il n'y a ni serveur à gérer, ni frais pour un portfolio.

Durée : une quinzaine de minutes la première fois.

---

## 1. Avant de commencer

- Le code est sur GitHub : dépôt **`khaledced/cedric-portfolio`**, branche **`main`** à jour.
- Un compte Vercel : sur [vercel.com/signup](https://vercel.com/signup), choisir
  **« Continue with GitHub »** et accepter l'accès au dépôt. Le plan **Hobby** (gratuit) suffit.

## 2. Importer le projet

1. Sur [vercel.com/new](https://vercel.com/new), dans **« Import Git Repository »**,
   cliquer sur **Import** à côté de `cedric-portfolio`.
   Si le dépôt n'apparaît pas : **« Adjust GitHub App Permissions »** et autoriser ce dépôt.
2. Vérifier les réglages proposés (Vercel détecte Vite tout seul) :

   | Réglage | Valeur |
   |---|---|
   | Framework Preset | **Vite** |
   | Root Directory | `./` |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

3. **Environment Variables** : rien d'obligatoire. Voir l'étape 5 pour le formulaire.
4. Cliquer sur **Deploy**. Après 1 à 2 minutes, le site est en ligne à une adresse du type
   `https://cedric-portfolio.vercel.app` (affichée sur l'écran de fin).

> Version de Node.js : le projet demande Node 20.19 ou plus récent (22 conseillé).
> Si le build échoue pour cette raison : **Settings → Build and Deployment → Node.js Version → 22.x**, puis redéployer.

## 3. Renseigner l'adresse du site

Une fois l'adresse connue, l'indiquer dans `src/config/site.ts` :

```ts
url: 'https://cedric-portfolio.vercel.app',
```

Puis commiter et pousser sur `main`. Vercel redéploie tout seul. Cette adresse active :
le plan du site (`sitemap.xml`) pour Google, les adresses canoniques et l'aperçu des liens
partagés (LinkedIn, WhatsApp…).

## 4. Vérifier le site en ligne

- [ ] L'accueil, les pages Projets, Services, Insights, À propos et Contact s'affichent.
- [ ] Une adresse directe fonctionne après rechargement (ex. `/projets/sanialert`).
- [ ] Une adresse inexistante affiche la page 404 du site.
- [ ] Un article Insights affiche son PDF et le bouton « Télécharger » fonctionne.
- [ ] Le thème sombre, le menu mobile et les liens des réseaux sociaux fonctionnent.

## 5. Activer le formulaire de contact (une seule fois)

Les messages sont envoyés à l'adresse de `src/config/site.ts` via FormSubmit, sans compte ni clé.

1. Depuis le site **en ligne**, envoyer un message de test avec le formulaire.
2. FormSubmit envoie à `cedricl.saw@gmail.com` un email demandant d'**activer le formulaire**
   (regarder aussi les spams). Cliquer sur le bouton d'activation qu'il contient.
3. Renvoyer un message de test : il arrive dans la boîte mail, avec l'objet « [Portfolio] … ».

Facultatif, pour ne plus afficher l'adresse email dans le code du site : l'email d'activation
de FormSubmit indique un **identifiant aléatoire**. Sur Vercel :
**Settings → Environment Variables → Add** : nom `VITE_FORMSUBMIT_ID`, valeur = cet identifiant,
environnement **Production** (et Preview). Puis **Deployments → … → Redeploy**.

## 6. Nom de domaine personnalisé (facultatif)

Pour une adresse du type `cedricsawadogo.com` (domaine acheté chez un registraire) :

1. **Settings → Domains → Add**, saisir le domaine.
2. Vercel affiche les enregistrements DNS à créer chez le registraire (en général un
   enregistrement **A** pour le domaine nu et un **CNAME** pour `www`). Recopier exactement
   les valeurs affichées par Vercel.
3. Attendre la propagation (de quelques minutes à quelques heures) : le certificat HTTPS
   est créé automatiquement.
4. Mettre à jour `url` dans `src/config/site.ts` avec le nouveau domaine, puis pousser.

## 7. Au quotidien : comment publier une modification

Le fonctionnement Git du projet s'applique tel quel :

| Action | Résultat sur Vercel |
|---|---|
| Pousser sur une branche `feature/…` ou `develop` | Un **déploiement de prévisualisation** (adresse temporaire) pour vérifier avant publication |
| Fusionner dans `main` et pousser | Le site **en production** est mis à jour en 1 à 2 minutes |

- Chaque déploiement est listé dans l'onglet **Deployments**, avec son journal de build.
- En cas de problème, un déploiement précédent peut être remis en ligne en un clic :
  **Deployments → … → Promote to Production** (ou « Instant Rollback »).
- Pour un nouvel article : déposer le PDF et son fichier d'informations
  (voir `src/content/articles/LISEZMOI.md`), commiter, fusionner dans `main`, pousser.

## En cas d'échec du build

1. Ouvrir le déploiement en erreur dans **Deployments** et lire le journal (**Building**).
2. Lancer la même commande en local : `npm run build`. Si elle échoue aussi, l'erreur est dans le code.
3. Les erreurs les plus courantes : version de Node trop ancienne (voir l'encadré de l'étape 2),
   faute de syntaxe dans l'en-tête d'un article `.mdx`, fichier image introuvable.

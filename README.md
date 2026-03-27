# Bien-être Shop - Site E-Commerce

Site e-commerce sur-mesure Next.js 16, sans Shopify, avec détection automatique de pays/devise/langue.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** + shadcn/ui
- **next-intl** - i18n FR/EN automatique
- **Frankfurter API** - taux de change gratuits (pas de clé requise)
- **Vercel Edge Function** `/api/geo` - géolocalisation par IP header
- **Google Sheets** via Apps Script - stockage des commandes

---

## Lancer en local

```bash
cd bien-etre-shop
npm install
npm run dev
# → http://localhost:3000 (redirige vers /fr)
```

En local, la géoloc IP ne fonctionne pas (pas de header Vercel). Le site tombe en fallback Français / EUR - comportement normal.

---

## Variables d'environnement

Copier `.env.example` en `.env.local` et remplir :

```bash
cp .env.example .env.local
```

| Variable | Description | Requis |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL du site en prod | Oui |
| `APPS_SCRIPT_URL` | URL du Google Apps Script | Non (mock en dev) |
| `NEXT_PUBLIC_GA_ID` | ID Google Analytics 4 | Non |

> Sans `APPS_SCRIPT_URL`, les commandes sont loggées en console (mode mock).

---

## Ajouter un produit

Ouvrir `data/products.json` et ajouter un objet en suivant ce modèle :

```json
{
  "id": "mon-nouveau-produit",
  "slug": "mon-nouveau-produit",
  "category": "soin-corps",
  "priceEUR": 15,
  "images": ["/images/products/mon-produit-1.webp"],
  "featured": false,
  "stock": true,
  "name": { "fr": "Mon Produit", "en": "My Product" },
  "description": { "fr": "Description FR...", "en": "English description..." },
  "shortDescription": { "fr": "Court FR", "en": "Short EN" },
  "benefits": {
    "fr": ["Bénéfice 1", "Bénéfice 2"],
    "en": ["Benefit 1", "Benefit 2"]
  }
}
```

Placer les images dans `public/images/products/` au format `.webp`.

**Catégories disponibles :** `hygiene-bucco-dentaire` | `soin-corps` | `beaute`

---

## Configurer Google Sheets

### 1. Créer le Google Sheet

Créer un Google Sheet nommé **"Commandes Bien-être Shop"** avec ces colonnes :

```
Date | Heure | Prénom | Nom | Téléphone | Email | Adresse | Ville | Pays | Produit | Quantité | Prix | Devise | Message
```

### 2. Déployer le Google Apps Script

Dans le Sheet : **Extensions → Apps Script** → coller ce code :

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.date,
      data.time,
      data.firstName,
      data.lastName,
      data.phone,
      data.email,
      data.address,
      data.city,
      data.country,
      data.product,
      data.quantity,
      data.price,
      data.currency,
      data.message || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 3. Déployer comme Web App

- Cliquer **Déployer → Nouveau déploiement**
- Type : **Application Web**
- Exécuter en tant que : **Moi**
- Accès : **Tout le monde**
- Copier l'URL → coller dans `APPS_SCRIPT_URL` dans `.env.local`

---

## Déployer sur Vercel

```bash
npm install -g vercel
vercel --prod
```

Ajouter les variables d'env dans le dashboard Vercel.

---

## Devises supportées

| Pays | Code | Devise | Source |
|---|---|---|---|
| Guinée | GN | GNF | Fallback manuel |
| Côte d'Ivoire | CI | XOF | Fallback (pegged EUR) |
| Ghana | GH | GHS | Frankfurter |
| France | FR | EUR | Base |
| USA | US | USD | Frankfurter |
| UK | GB | GBP | Frankfurter |
| Suisse | CH | CHF | Frankfurter |
| Canada | CA | CAD | Frankfurter |

# Stoney Maloney USA

Headless Shopify storefront for [Stoney Maloney USA](https://stoney-maloney-usa.myshopify.com/), hosted on Firebase Hosting.

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Commerce**: Shopify Storefront API (headless)
- **Hosting**: Firebase Hosting
- **Version Control**: GitHub
- **IDE**: Cursor

## Prerequisites

- Node.js 18+
- npm or yarn
- Firebase CLI (`npm i -g firebase-tools`)
- Shopify store admin access

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Shopify Storefront API Token

1. Go to [Shopify Admin](https://stoney-maloney-usa.myshopify.com/admin) → **Settings** → **Apps and sales channels**
2. Click **Develop apps** → **Create an app** (or use an existing custom app)
3. Configure **Storefront API** scopes (at minimum: `unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`)
4. Install the app and copy the **Storefront API access token**

### 3. Environment Variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=stoney-maloney-usa.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here
```

### 4. Firebase Login (for local deploy)

```bash
firebase login
```

Project is already set to `stoney-maloney` in `.firebaserc`.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy

### Local deploy

```bash
npm run deploy
```

This builds the Next.js app and deploys the `out/` folder to Firebase Hosting.

### GitHub Actions (CI/CD)

1. **Firebase token**: Run `firebase login:ci` locally and add the output as `FIREBASE_TOKEN` in GitHub repo **Settings → Secrets and variables → Actions**.

2. **Shopify secrets** (for build-time product data):
   - `SHOPIFY_STORE_DOMAIN` = `stoney-maloney-usa.myshopify.com`
   - `SHOPIFY_STOREFRONT_ACCESS_TOKEN` = your Storefront API token

3. Push to `main` to trigger deploy.

## Project Structure

```
├── app/                 # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── products/
├── components/          # Reusable UI components
├── lib/                 # Shopify API client
├── firebase.json        # Firebase Hosting config
└── .firebaserc          # Firebase project (stoney-maloney)
```

## Adding Requirements / Blueprint

When you have a website blueprint or requirements document, add it to the repo (e.g. `docs/blueprint.md` or `REQUIREMENTS.md`) so the frontend can be refined accordingly.

## Pushing to GitHub

```bash
git add .
git commit -m "Initial Stoney Maloney storefront setup"
git push -u origin main
```

After pushing, configure GitHub Actions secrets (see CI/CD section above) to enable automatic deploys.

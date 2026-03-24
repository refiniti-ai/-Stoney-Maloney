# Stoney Maloney USA – Shopify Theme

Custom Shopify Liquid theme for [Stoney Maloney USA](https://stoney-maloney-usa.myshopify.com/). Built with Liquid, CSS, and JavaScript. 100% hosted on Shopify.

## Tech Stack

- **Liquid** – Shopify's templating language
- **CSS** – Custom styles (no framework)
- **JavaScript** – Vanilla JS for interactivity
- **Hosting** – Shopify (theme runs entirely on Shopify servers)

## Project Structure

```
├── assets/          # CSS, JS, images
│   ├── base.css
│   ├── theme.css
│   └── theme.js
├── config/          # Theme settings
│   ├── settings_schema.json
│   └── settings_data.json
├── layout/
│   └── theme.liquid # Main layout
├── locales/
│   └── en.default.json
├── sections/        # Custom sections (editable in theme editor)
│   ├── header.liquid
│   ├── footer.liquid
│   ├── hero.liquid
│   ├── featured-collection.liquid
│   ├── main-collection.liquid
│   ├── main-product.liquid
│   ├── main-page.liquid
│   └── main-404.liquid
├── snippets/        # Reusable Liquid snippets
│   └── pagination.liquid
└── templates/       # Page templates (JSON)
    ├── index.json
    ├── collection.json
    ├── product.json
    ├── page.json
    └── 404.json
```

## Development

### Prerequisites

1. [Node.js](https://nodejs.org/) 18+
2. Shopify store access

### Setup

```bash
npm install
```

### Push theme to Shopify

You must be logged in to Shopify (this will open a browser for auth):

```bash
npm run theme:push
```

Or with the Shopify CLI directly:

```bash
npx shopify theme push --store stoney-maloney-usa.myshopify.com
```

### Local development with live preview

```bash
npm run theme:dev
```

Starts a local preview that syncs changes to your store in real time.

## Sections (Theme Editor)

All sections are customizable in the theme editor:

- **Header** – Logo text, navigation menu
- **Footer** – Brand, tagline, footer menu
- **Hero** – Heading, subheading, CTA, background image, colors
- **Featured collection** – Collection picker, products to show, columns

## Adding Custom Sections

Create new `.liquid` files in `sections/` with a `{% schema %}` block. Add them to templates via the theme editor or by editing the JSON templates.

## Main menu

Create a navigation menu named **Main menu** in Shopify Admin (Online Store → Navigation) for the header links to appear.

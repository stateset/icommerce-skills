# Storefront Templates

## CLI

```bash
stateset-create my-store --template nextjs
stateset-create my-store --template remix
stateset-create my-store --template vite-react
stateset-create my-store --template astro
```

## Template Comparison

| Template | Framework | SSR | Best For | Bundle Size |
|----------|-----------|-----|----------|-------------|
| `nextjs` | Next.js 14+ | Yes | Full-featured commerce | Medium |
| `remix` | Remix | Yes | Data-heavy apps | Medium |
| `vite-react` | Vite + React | No | SPAs and dashboards | Small |
| `astro` | Astro | Partial | Content-heavy catalogs | Smallest |

## Common Pages

Each template generates these pages:

| Page | Route | Description |
|------|-------|-------------|
| Product listing | `/products` | Browse and filter catalog |
| Product detail | `/products/[slug]` | Single product with variants |
| Cart | `/cart` | View and edit cart items |
| Checkout | `/checkout` | Shipping, payment, and order |
| Account | `/account` | Customer profile and history |
| Orders | `/account/orders` | Order list and detail |

## Data Layer

- Use `@stateset/embedded` on the server for full SQL access.
- Use `@stateset/embedded-wasm` for client-only builds (limited to read operations).
- Database path is set via `DATABASE_PATH` in `.env`.

## Environment Variables

```bash
DATABASE_PATH=./commerce.db
STATESET_API_KEY=your_api_key
PUBLIC_STORE_NAME="My Store"
```

## Dev Server

```bash
cd my-store
npm install
npm run dev  # starts at http://localhost:3000
```

## Build and Deploy

```bash
npm run build        # Production build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
```

## Deployment Targets

| Target | Command | Notes |
|--------|---------|-------|
| Vercel | `vercel deploy` | Recommended for Next.js |
| Cloudflare Pages | `wrangler pages deploy` | Best for Astro/Vite |
| Docker | `docker build -t store .` | Self-hosted option |
| Node.js | `npm start` | Requires Node 18+ |

## Project Structure (Next.js Template)

```
my-store/
  app/
    layout.tsx          # Root layout with providers
    page.tsx            # Homepage
    products/
      page.tsx          # Product listing
      [slug]/page.tsx   # Product detail
    cart/page.tsx        # Cart
    checkout/page.tsx    # Checkout flow
    account/
      page.tsx          # Customer profile
      orders/page.tsx   # Order history
  components/
    ProductCard.tsx
    CartDrawer.tsx
    CheckoutForm.tsx
  lib/
    db.ts               # Database connection
    commerce.ts         # Commerce API helpers
  public/               # Static assets
  .env                  # Environment config
```

## Customization Points

| Area | File | What to Change |
|------|------|---------------|
| Theme colors | `tailwind.config.ts` | Brand palette, fonts |
| Navigation | `components/Header.tsx` | Menu items, logo |
| Homepage hero | `app/page.tsx` | Banner image, CTA text |
| Product card | `components/ProductCard.tsx` | Layout, price display |
| Checkout fields | `components/CheckoutForm.tsx` | Required fields, validation |

## API Integration

```typescript
import { createClient } from '@stateset/embedded';

const db = createClient({ path: process.env.DATABASE_PATH });

// Fetch products
const products = await db.query('SELECT * FROM products WHERE status = ?', ['active']);

// Fetch single product with variants
const product = await db.query(
  'SELECT p.*, v.* FROM products p LEFT JOIN variants v ON p.product_id = v.product_id WHERE p.slug = ?',
  [slug]
);
```

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| Blank page on load | Missing `DATABASE_PATH` | Add path to `.env` file |
| WASM errors in browser | Using server package client-side | Switch to `@stateset/embedded-wasm` |
| 404 on product pages | Missing dynamic route | Verify `[slug]` directory exists |
| Stale data after update | ISR cache | Set `revalidate: 60` or use `revalidatePath()` |

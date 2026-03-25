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

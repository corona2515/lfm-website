# LeanFM Marketing Website

Modern marketing website for LeanFM's OnPoint platform and Prescriptiv AI engine.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Render via Git

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Type check
npm run type-check

# Lint
npm run lint
```

Visit `http://localhost:3000` after starting the dev server.

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with fonts
│   │   ├── page.tsx            # Home page
│   │   ├── product/            # OnPoint product page
│   │   ├── prescriptiv/        # Prescriptiv AI page
│   │   ├── how-it-works/       # Process walkthrough
│   │   ├── pricing/            # Pricing tiers
│   │   ├── results/            # Case studies
│   │   ├── security/           # Security info
│   │   ├── company/about/      # About page
│   │   ├── contact/            # Contact form
│   │   ├── investors/          # Investor page
│   │   ├── privacy/            # Privacy policy
│   │   ├── terms/              # Terms of service
│   │   └── api/lead/           # Lead capture endpoint
│   ├── components/             # Reusable components
│   │   ├── ui/                 # Base UI components
│   │   ├── layout/             # Layout components
│   │   └── sections/           # Page sections
│   └── lib/                    # Utilities and helpers
├── public/
│   └── media/                  # Screenshots and images
├── docs/                       # Messaging and spec docs
└── assets-manifest.json        # Image placeholder manifest
```

## Adding Screenshots

1. Check `assets-manifest.json` for the placeholder ID and specs
2. Create your image matching the specified aspect ratio
3. Save to `/public/media/IMG-XXX.png` using the ID from manifest
4. The MediaPlaceholder component will automatically use real images when present

### Placeholder Convention

- All images use sequential IDs: `IMG-001`, `IMG-002`, etc.
- Placeholders show until real images are added
- Each placeholder includes:
  - ID for reference
  - Description of expected content
  - Recommended aspect ratio
  - Page and section location

See `/public/media/README.md` for the complete image spec.

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Description | Required |
|----------|-------------|----------|
| `SITE_URL` | Public site URL for meta tags | Yes |
| `DATABASE_URL` | Postgres connection string for Prisma/admin backend | Yes for admin |
| `ADMIN_SESSION_SECRET` | Secret used to sign admin session cookies | Yes for admin |
| `LEAD_WEBHOOK_URL` | Webhook for lead form submissions | No |
| `SAMPLE_INTAKE_WEBHOOK_URL` | Optional dedicated webhook for sample uploads | No |
| `CLOSE_API_KEY` | Close CRM API key | No |
| `CLOSE_LEAD_STATUS_ID` | Optional Close status ID for new leads | No |
| `CLOSE_SAMPLE_UPLOAD_STATUS_ID` | Optional Close status ID override for high-intent sample uploads | No |
| `ONPOINT_SAMPLE_INTAKE_URL` | Optional OnPoint intake endpoint for preview account provisioning | No |
| `ONPOINT_SAMPLE_INTAKE_TIMEOUT_MS` | Optional timeout for the OnPoint intake request | No |
| `ONPOINT_API_KEY` | Optional API key sent to the OnPoint intake endpoint | No |
| `ONPOINT_API_KEY_HEADER` | Optional header name for the OnPoint API key | No |
| `CONTACT_EMAIL` | Displayed contact email | No |
| `APP_URL` | OnPoint app URL for CTAs | No |
| `GOOGLE_ANALYTICS_ID` | GA4 measurement ID | No |

## Deployment on Render

### Via Git (Recommended)

1. Push this repo to GitHub/GitLab
2. In Render Dashboard, click "New" → "Blueprint"
3. Connect your repository
4. Render will detect `render.yaml` and configure automatically
5. Set environment variables in Render dashboard
6. Deploy

### Manual Setup

1. Create a new Web Service in Render
2. Connect your repository
3. Configure:
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `node .next/standalone/server.js`
   - **Environment**: Node
4. Add environment variables
5. Deploy

## Key Pages

| Route | Purpose |
|-------|---------|
| `/` | Home - Main landing with hero, process, proof |
| `/product` | OnPoint platform features |
| `/prescriptiv` | Prescriptiv AI engine details |
| `/how-it-works` | Step-by-step process |
| `/pricing` | Free / Unlock / Subscribe tiers |
| `/results` | Case studies and sample output |
| `/security` | Data security information |
| `/company/about` | Company story and team |
| `/contact` | Lead capture form |
| `/investors` | Investor narrative + deck request |

## Content Guidelines

See `/docs/` for:
- `messaging-bible.md` - StoryBrand framework and approved copy
- `funnel-spec.md` - Offer ladder and CTA strategy
- `claims-guardrails.md` - What we can and cannot claim

**Critical**: No references to BIM, 3D, patents, or visualization.

## License

Proprietary - LeanFM Technologies

# TaskFlow -- Varity SaaS Starter Template

[![npm](https://img.shields.io/npm/v/create-varity-app?label=create-varity-app&color=4f46e5)](https://www.npmjs.com/package/create-varity-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/varity-labs/varity-saas-template/blob/main/LICENSE)
[![Built with Varity](https://img.shields.io/badge/built%20with-Varity-7C3AED)](https://www.varity.so)

A production-ready SaaS starter template built with [Varity](https://www.varity.so). Ships as a fully functional project management app called **TaskFlow** -- clone it, rebrand it in 5 minutes, and deploy your own SaaS product.

**Zero configuration required.** Auth, database, and deployment work out of the box with no API keys, no `.env` file, and no accounts to create.

---

## Quick Start

### Option A: Use create-varity-app (Recommended)

```bash
npx create-varity-app my-app
cd my-app
npm install
npm run dev
```

### Option B: Clone this repo directly

```bash
git clone https://github.com/varity-labs/varity-saas-template.git my-app
cd my-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Everything works immediately:

- **Auth** -- Email and Google login, fully functional
- **Database** -- Create, read, update, delete with real data persistence
- **Dashboard** -- Interactive with KPI cards, tables, and status tracking

---

## What's Included

### Pages

| Route | Description |
|-------|-------------|
| `/` | Marketing landing page with hero, features, how-it-works, testimonials, pricing, and CTA sections |
| `/login` | Login page with email and social authentication |
| `/dashboard` | Overview with KPI stat cards, recent activity feed, and getting started checklist |
| `/dashboard/projects` | Project management with create, edit, delete, and status tracking |
| `/dashboard/tasks` | Task board with status filters, priority levels, and CSV export |
| `/dashboard/team` | Team member management with roles (admin, member, viewer) |
| `/dashboard/settings` | User preferences with 4-tab layout (profile, notifications, security, privacy) |

### Features

- **Zero-Config Auth** -- Email and social login works out of the box
- **Zero-Config Database** -- Data persistence with isolated dev environment, no credentials needed
- **Full CRUD** -- Create, read, update, delete for projects, tasks, and team members
- **Command Palette** -- `Cmd+K` / `Ctrl+K` to search across all data
- **Protected Routes** -- Automatic redirect for unauthenticated users
- **Landing Page** -- Professional 7-section marketing page (Navbar, Hero, Features, HowItWorks, Testimonials, Pricing, CTA, Footer)
- **Color Themes** -- 4 built-in presets (Blue, Purple, Green, Orange) plus custom colors
- **Mobile Responsive** -- Hamburger menu, responsive layouts, touch-friendly
- **E2E Tests** -- Playwright test suite covering dashboard, projects, settings, and navigation
- **TypeScript** -- Strict mode, full type safety, no `ignoreBuildErrors`
- **Static Export** -- Pre-rendered HTML, deployable anywhere

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 15](https://nextjs.org) | React framework (App Router, static export) |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Tailwind CSS 3](https://tailwindcss.com) | Utility-first styling with CSS variable theming |
| [Lucide React](https://lucide.dev) | Icons |
| [@varity-labs/sdk](https://www.npmjs.com/package/@varity-labs/sdk) | Database and infrastructure |
| [@varity-labs/ui-kit](https://www.npmjs.com/package/@varity-labs/ui-kit) | Auth components, toast notifications, navigation types |
| [@varity-labs/types](https://www.npmjs.com/package/@varity-labs/types) | Shared type definitions |
| [Playwright](https://playwright.dev) | End-to-end testing |

---

## Project Structure

```
saas-starter/
├── public/
│   ├── logo.svg                # App logo (replace with your own)
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/                    # Pages (Next.js App Router)
│   │   ├── page.tsx            # Landing page
│   │   ├── layout.tsx          # Root layout (metadata, fonts, providers)
│   │   ├── globals.css         # Color theme presets + typography
│   │   ├── login/
│   │   │   └── page.tsx        # Login page
│   │   └── dashboard/
│   │       ├── layout.tsx      # Dashboard shell (sidebar, header, auth gate)
│   │       ├── page.tsx        # Dashboard overview
│   │       ├── projects/
│   │       │   └── page.tsx    # Project management
│   │       ├── tasks/
│   │       │   └── page.tsx    # Task management
│   │       ├── team/
│   │       │   └── page.tsx    # Team management
│   │       └── settings/
│   │           └── page.tsx    # User settings (4 tabs)
│   ├── components/
│   │   ├── dashboard/          # DashboardStats, RecentActivity
│   │   ├── landing/            # Hero, Features, HowItWorks, Testimonials, Pricing, CTA
│   │   ├── shared/             # Navbar, Footer
│   │   └── providers.tsx       # App-level providers (ToastProvider)
│   ├── lib/
│   │   ├── varity.ts           # SDK initialization
│   │   ├── database.ts         # Typed database collections (projects, tasks, team, settings)
│   │   ├── hooks.ts            # Data hooks (useProjects, useTasks, useTeam, useCurrentUser)
│   │   ├── constants.ts        # App name, navigation items, option lists
│   │   └── utils.ts            # Helpers (CSV export, formatting)
│   └── types/
│       └── index.ts            # TypeScript interfaces (Project, Task, TeamMember, UserSettings)
├── e2e/                        # Playwright end-to-end tests
│   ├── dashboard.spec.ts
│   ├── projects.spec.ts
│   ├── settings.spec.ts
│   └── navigation.spec.ts
├── varity.config.json          # Varity deployment configuration
├── next.config.js              # Next.js config (static export)
├── tailwind.config.js          # Tailwind config (CSS variable theming)
├── tsconfig.json               # TypeScript strict mode
└── playwright.config.ts        # E2E test configuration
```

---

## Configuration

### varity.config.json

```json
{
  "name": "my-saas-app",
  "version": "0.1.0",
  "framework": "nextjs",
  "hosting": "ipfs",
  "build": {
    "command": "npm run build",
    "output": "out"
  },
  "database": {
    "provider": "varity",
    "collections": ["projects", "tasks", "team_members"]
  }
}
```

### Environment Variables

**For development:** Leave everything blank. Shared development credentials are used automatically.

**For production:** `varitykit app deploy` injects all credentials into your build automatically. You never need to manually set API keys.

| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_PRIVY_APP_ID` | No | Auth provider (auto-configured) |
| `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` | No | Infrastructure (auto-configured) |
| `NEXT_PUBLIC_VARITY_APP_TOKEN` | No | Database token (auto-configured) |
| `NEXT_PUBLIC_VARITY_APP_ID` | No | App ID (auto-configured) |

---

## Customization

### Rebrand in 5 Minutes

1. **App name** -- Edit `APP_NAME` in `src/lib/constants.ts`
2. **Logo** -- Replace `public/logo.svg` with your own
3. **Colors** -- Open `src/app/globals.css` and uncomment a color preset (Purple, Green, or Orange) or set your own
4. **Meta title** -- Update `title` and `description` in `src/app/layout.tsx`
5. **Navigation** -- Edit `NAVIGATION_ITEMS` in `src/lib/constants.ts` to rename or add sidebar links
6. **Landing page** -- Edit sections in `src/components/landing/` (Hero, Features, Pricing, etc.)

### Built-in Color Themes

Switch your entire app's color scheme by editing `src/app/globals.css`:

| Theme | How |
|-------|-----|
| **Blue** (default) | Active by default |
| **Purple** | Uncomment the Purple `:root` block, comment out Blue |
| **Green** | Uncomment the Green `:root` block, comment out Blue |
| **Orange** | Uncomment the Orange `:root` block, comment out Blue |
| **Custom** | Set your own `--color-primary-*` values using any [Tailwind palette](https://tailwindcss.com/docs/customizing-colors) |

### Add a New Page

Create a file at `src/app/dashboard/reports/page.tsx`:

```tsx
'use client';

import { useProjects } from '@/lib/hooks';

export default function ReportsPage() {
  const { data: projects, loading } = useProjects();

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
      <p className="text-gray-600">{projects.length} projects total</p>
    </div>
  );
}
```

Then add a navigation item in `src/lib/constants.ts`:

```ts
{ label: 'Reports', icon: 'chart', path: '/dashboard/reports' },
```

The page is automatically protected by auth and appears in the sidebar.

### Add a New Data Collection

1. **Define the type** in `src/types/index.ts`:

```ts
export interface Invoice {
  id: string;
  projectId: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid';
  createdAt: string;
}
```

2. **Create the collection** in `src/lib/database.ts`:

```ts
export const invoices = () => db.collection<Invoice>('invoices');
```

3. **Create a hook** in `src/lib/hooks.ts` (follow the `useProjects` pattern):

```ts
export function useInvoices(): UseCollectionReturn<Invoice> {
  // ... same pattern as useProjects, using invoices() instead of projects()
}
```

4. **Use it in any page:**

```tsx
const { data, loading, create, update, remove } = useInvoices();
```

Collections are created automatically on first use -- no migrations needed.

---

## Deployment

```bash
# Deploy to production
varitykit app deploy

# Deploy and submit to the Varity App Store
varitykit app deploy --submit-to-store
```

The CLI builds your app, provisions a private database, injects production credentials, and deploys -- all in one command.

**Deploy from your AI editor:** Set up the [Varity MCP server](https://docs.varity.so/mcp) (`npx @varity-labs/mcp`) and ask your AI to "deploy this project".

---

## Testing

Run the Playwright end-to-end test suite:

```bash
# Install test browsers (first time only)
npx playwright install

# Run all tests
npm run test:e2e

# Run tests with browser UI
npm run test:e2e:ui

# Run tests in headed mode
npm run test:e2e:headed
```

---

## Payments

Payment widgets and billing integration are **coming soon**. The Settings > Billing page currently shows placeholder UI. If you need payments now, wire your own billing provider (Stripe, etc.) into the settings page.

---

## Links

- [Varity Documentation](https://docs.varity.so)
- [UI Kit Components](https://docs.varity.so/ui-kit)
- [SDK Reference](https://docs.varity.so/sdk)
- [Varity SDK Monorepo](https://github.com/varity-labs/varity-sdk)
- [Discord Community](https://discord.gg/7vWsdwa2Bg)

---

## License

[MIT](https://github.com/varity-labs/varity-saas-template/blob/main/LICENSE)

# FAWN Frontend

**Fintech All-in-One Wallet** — React/TypeScript UI for onboarding, banking, cards, investing.

## Quick Start

```bash
npm install
npm run dev
```

## Architecture

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── KYCFlow.tsx
│   ├── Dashboard/
│   │   ├── Dashboard.tsx
│   │   ├── Balance.tsx
│   │   └── Transactions.tsx
│   ├── Cards/
│   │   ├── CardManager.tsx
│   │   ├── CardCreation.tsx
│   │   └── TokenizationFlow.tsx
│   ├── Transfers/
│   │   ├── ACHTransfer.tsx
│   │   ├── WireTransfer.tsx
│   │   └── TransferHistory.tsx
│   ├── Investing/
│   │   ├── BuyShares.tsx
│   │   ├── Portfolio.tsx
│   │   └── AutoInvest.tsx
│   └── Common/
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Modal.tsx
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── CardsPage.tsx
│   ├── TransfersPage.tsx
│   ├── InvestingPage.tsx
│   └── CompliancePage.tsx
├── services/
│   ├── api.ts         # API client
│   ├── auth.ts        # Auth service
│   ├── accounts.ts
│   ├── cards.ts
│   ├── transfers.ts
│   ├── investing.ts
│   └── compliance.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useAccount.ts
│   ├── useTransfers.ts
│   └── useInvesting.ts
├── store/             # Redux (optional)
├── styles/
│   ├── globals.css
│   ├── theme.css
│   └── components.css
├── types/
│   ├── index.ts       # Shared types
│   └── api.ts         # API types
├── App.tsx
└── main.tsx
```

## Key Features

- **Onboarding**: Email registration → KYC (Alloy) → Reg E acceptance
- **Dashboard**: Real-time balance, transaction history, alerts
- **Debit Card**: Create virtual/physical, tokenize (Apple/Google Pay), freeze/unfreeze, dispute
- **Transfers**: ACH, wires, book transfers, transfer history
- **Investing**: Buy fractional shares, auto-invest, portfolio dashboard
- **Compliance**: KYC status, AML alerts, Reg E disclosures

## Technologies

- **React 18** with TypeScript
- **Vite** for fast builds
- **TailwindCSS** for styling
- **React Query** for server state
- **React Router** for navigation
- **Axios** for API calls

## Environment Variables

```
VITE_API_URL=http://localhost:8000
VITE_SENTRY_DSN=...
```

## Status

- [ ] Frontend scaffold
- [ ] Auth UI (login, register)
- [ ] KYC flow (Alloy redirect)
- [ ] Dashboard
- [ ] Card management UI
- [ ] Transfer UI
- [ ] Investing UI
- [ ] Compliance UI
- [ ] Mobile responsive

---

**Team:** 1 full-stack | **Launch:** Aug 13

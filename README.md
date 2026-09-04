# KoinX – Tax Loss Harvesting Assignment

A responsive React + TypeScript application that demonstrates **Tax Loss Harvesting** functionality. Users can select crypto holdings and see the real-time impact on their capital gains (pre vs post harvesting).

**Live Demo:** _Deploy to Vercel/Netlify and paste the link here_

## Features

- **Pre-Harvesting Card** – Shows current short-term & long-term profits, losses, net gains and realised capital gains (from Capital Gains API).
- **After Harvesting Card** – Updates live when holdings are selected/deselected.
- **Savings Banner** – Displays “You’re going to save ₹X” only when post-harvest realised gains are lower than pre-harvest.
- **Holdings Table**
  - Checkbox selection (individual + select-all)
  - Asset logo, name, holdings, avg buy price, current price
  - Short-term & long-term gain + balance
  - “Amount to Sell” populated on selection
  - **View All / View Less** toggle
- Mock APIs with loading & error states
- Fully responsive (mobile → desktop)
- Clean component structure + Tailwind CSS

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Lucide React (icons)

## Setup Instructions

```bash
# Clone the repository
git clone <your-repo-url>
cd tax-loss-harvesting

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── api/
│   └── mockApi.ts          # Mock Holdings & Capital Gains APIs
├── components/
│   ├── Header.tsx
│   ├── CapitalGainsCard.tsx
│   └── HoldingsTable.tsx
├── data/
│   └── mockData.ts         # Dummy data from assignment
├── utils/
│   └── format.ts           # Currency & number formatters
├── App.tsx                 # Main logic & state
├── main.tsx
└── index.css
```

## Business Logic

1. Pre-harvesting values come directly from the Capital Gains API.
2. When a holding is selected:
   - If `stcg.gain > 0` → add to short-term **profits**
   - If `stcg.gain < 0` → add absolute value to short-term **losses**
   - Same logic for `ltcg`
3. Net Capital Gains = Profits − Losses (for both ST & LT)
4. Realised / Effective Capital Gains = Net ST + Net LT
5. Savings = Pre-realised − Post-realised (shown only when positive)

## Assumptions

- Currency is INR (₹).
- Very small numbers are shown in scientific notation for readability.
- “Amount to Sell” uses the full `totalHolding` of the selected asset (as specified).
- Select-all operates on the complete holdings list, even when “View Less” is active.
- Logos fall back to a default coin image if the remote URL fails.

## Screenshots

_(Add screenshots of desktop & mobile views after running the app)_

## Deployment

The app can be deployed for free on:

- [Vercel](https://vercel.com) – recommended
- [Netlify](https://netlify.com)

```bash
npm run build
# Then drag the `dist` folder to Netlify or connect the GitHub repo to Vercel
```

---

Built as part of the KoinX Frontend Intern assignment.

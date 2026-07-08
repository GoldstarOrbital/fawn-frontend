# FAWN UI Components — Future Enhancements

This document outlines UI components that should be added to fully realize the investing and instant payment messaging.

---

## Current Status (✅ Implemented)

### Dashboard
- ✅ Balance card with investment pills
- ✅ Quick actions (Send, Invest, History, News)
- ✅ Recent transactions list
- ✅ Spending breakdown (when data available)

### Investing Tab
- ✅ Portfolio balance card
- ✅ Position list with P&L
- ✅ Simple buy/sell form
- ✅ Dollar-based market orders

### Navigation
- ✅ Investing tab in sidebar
- ✅ Deep linking to Investing tab from quick actions

---

## Components to Add (Priority Order)

### HIGH PRIORITY (Launch-Critical)

#### 1. Stock Quote Display
**Location**: Investing tab, above order form
**Purpose**: Show current price before placing order
**Components**:
- Symbol input with autocomplete
- Real-time price display
- % change (green/red)
- Mini 1-day chart
- Last updated timestamp

**Example HTML**:
```html
<div class="quote-card">
  <div class="quote-header">
    <div class="quote-symbol">AAPL</div>
    <div class="quote-actions">
      <button onclick="addToWatchlist()">★ Watchlist</button>
    </div>
  </div>
  <div class="quote-price">
    <span class="price">$175.43</span>
    <span class="change pos">+2.15%</span>
  </div>
  <div class="quote-meta">
    <span>Open: $172.50</span>
    <span>High: $176.80</span>
    <span>Low: $171.20</span>
    <span>Volume: 42.3M</span>
  </div>
  <svg class="quote-chart" width="100%" height="60px"></svg>
  <div class="quote-timestamp">Updated 2 mins ago</div>
</div>
```

**Data Source**: `/investing/quote?symbol=AAPL`

---

#### 2. Symbol Autocomplete Search
**Location**: Stock symbol input field
**Purpose**: Help users find symbols without typos
**Features**:
- Type to search (debounced)
- Show symbol + company name
- Recent searches
- Popular stocks (AAPL, MSFT, TSLA, etc.)

**Example HTML**:
```html
<div class="autocomplete-wrapper">
  <input id="invest-symbol" placeholder="Search symbol (e.g. AAPL)" />
  <div class="autocomplete-dropdown hidden">
    <div class="autocomplete-item" onclick="selectSymbol('AAPL')">
      <div class="symbol">AAPL</div>
      <div class="company">Apple Inc.</div>
    </div>
    <div class="autocomplete-item" onclick="selectSymbol('MSFT')">
      <div class="symbol">MSFT</div>
      <div class="company">Microsoft Corporation</div>
    </div>
  </div>
</div>
```

**Data Source**: `/investing/symbols?q=AAP` (returns matching symbols)

---

#### 3. Order Preview/Confirmation
**Location**: Before placing order
**Purpose**: Show exactly what user will buy/sell
**Shows**:
- Symbol + price
- Quantity (shares + fractional)
- Total cost
- Fee ($0.01 highlighted)
- Final amount

**Example HTML**:
```html
<div class="order-preview">
  <div class="preview-row">
    <span>Buy</span>
    <span>1.234 shares of AAPL @ $175.43</span>
  </div>
  <div class="preview-row">
    <span>Total cost</span>
    <span>$216.34</span>
  </div>
  <div class="preview-row highlight">
    <span>Fee</span>
    <span>$0.01 ← flat fee</span>
  </div>
  <div class="preview-row">
    <span>Final charge</span>
    <span>$216.35</span>
  </div>
  <button onclick="confirmOrder()">Confirm purchase</button>
</div>
```

---

### MEDIUM PRIORITY (v2 Launch)

#### 4. Portfolio Dashboard
**Location**: Investing tab, top section
**Purpose**: Give overview of holdings
**Shows**:
- Portfolio value
- Today's gain/loss %
- Top holdings
- Portfolio diversification
- Recent trades

**Components**:
```html
<div class="portfolio-dashboard">
  <div class="portfolio-value">
    <div class="value-amount">$5,234.56</div>
    <div class="value-change neg">-$87.34 (-1.64%) today</div>
  </div>
  
  <div class="portfolio-breakdown">
    <div class="breakdown-bar">
      <!-- Pie chart or bar showing allocation -->
    </div>
    <div class="breakdown-legend">
      <div class="legend-item">Stocks: 60%</div>
      <div class="legend-item">ETFs: 35%</div>
      <div class="legend-item">Cash: 5%</div>
    </div>
  </div>
  
  <div class="portfolio-top-holdings">
    <!-- 3-5 top performers/losers -->
  </div>
</div>
```

---

#### 5. Watchlist
**Location**: New tab under Investing (or as card on dashboard)
**Purpose**: Track stocks user is interested in
**Features**:
- Add to watchlist from quote
- See price changes
- Alerts (optional)
- Quick buy from watchlist

**Example HTML**:
```html
<div class="watchlist-item">
  <div class="watchlist-symbol">
    <span class="symbol">MSFT</span>
    <span class="company">Microsoft</span>
  </div>
  <div class="watchlist-price">
    <span class="price">$375.20</span>
    <span class="change pos">+1.23%</span>
  </div>
  <button class="watchlist-buy" onclick="buyFromWatchlist('MSFT')">Buy</button>
  <button class="watchlist-remove" onclick="removeFromWatchlist('MSFT')">✕</button>
</div>
```

---

#### 6. Order History with Details
**Location**: Investing tab, below positions
**Purpose**: Show all past trades
**Shows**:
- Date/time
- Symbol
- Side (Buy/Sell)
- Quantity
- Price
- Total cost
- Fee
- Status (filled, pending, etc.)

**Example HTML**:
```html
<div class="order-history-item">
  <div class="order-header">
    <span class="order-symbol">Bought 10 shares of AAPL</span>
    <span class="order-date">July 8, 2026 at 2:34 PM</span>
  </div>
  <div class="order-details">
    <div>Price: $175.43 per share</div>
    <div>Total: $1,754.30</div>
    <div class="fee">Fee: $0.01</div>
  </div>
  <div class="order-status">Filled</div>
</div>
```

---

### LOW PRIORITY (Nice-to-Have)

#### 7. Market News Widget
**Location**: Investing tab sidebar or card
**Purpose**: Show relevant news while user is trading
**Shows**:
- Market opening/closing alerts
- Breaking stock news
- Fed announcements
- Economic calendar

**Note**: Already implemented in News tab—could add quick digest here.

---

#### 8. Educational Tooltips
**Location**: Inline help for new investors
**Purpose**: Explain fractional shares, P&L, diversification
**Examples**:
- Hover on "Fractional shares" → "1.5 shares means you own part of a full share"
- Hover on "Buying power" → "Total amount you can invest"
- Hover on "P&L" → "Profit/loss since purchase"

---

#### 9. Portfolio Performance Chart
**Location**: Investing dashboard
**Purpose**: Show portfolio growth over time
**Options**:
- 1D, 1W, 1M, 3M, 1Y, All-time
- Line chart with grid
- Hover to see exact value at date

---

#### 10. Diversification Guidance
**Location**: Portfolio card
**Purpose**: Suggest balanced allocation
**Shows**:
- Current allocation (pie chart)
- Recommended allocation
- Suggestions for rebalancing

---

## Data API Endpoints Needed

### Existing (Implemented)
```
GET /investing/account
GET /investing/positions
POST /investing/orders
GET /investing/positions
```

### New Endpoints

#### Stock Quotes
```
GET /investing/quote?symbol=AAPL
Response: {
  "symbol": "AAPL",
  "price": 175.43,
  "change": 2.15,
  "change_pct": 1.24,
  "open": 172.50,
  "high": 176.80,
  "low": 171.20,
  "volume": 42300000,
  "market_cap": 2800000000000,
  "timestamp": "2026-07-08T14:34:00Z"
}
```

#### Symbol Search
```
GET /investing/symbols?q=AAP&limit=10
Response: {
  "symbols": [
    { "symbol": "AAPL", "name": "Apple Inc.", "type": "stock" },
    { "symbol": "AAPLQ", "name": "Apple Inc. Preferred", "type": "stock" },
    ...
  ]
}
```

#### Watchlist
```
GET /investing/watchlist
POST /investing/watchlist
DELETE /investing/watchlist/:symbol
```

#### Order History
```
GET /investing/orders?limit=50&offset=0
Response: {
  "orders": [
    {
      "id": "ord_123",
      "symbol": "AAPL",
      "side": "buy",
      "quantity": 10,
      "price": 175.43,
      "total": 1754.30,
      "fee": 0.01,
      "status": "filled",
      "created_at": "2026-07-08T14:34:00Z"
    }
  ]
}
```

#### Portfolio Performance
```
GET /investing/performance?period=1d
Response: {
  "period": "1d",
  "entries": [
    { "timestamp": "2026-07-08T09:30:00Z", "value": 5234.56 },
    { "timestamp": "2026-07-08T10:00:00Z", "value": 5245.23 },
    ...
  ]
}
```

---

## CSS Classes to Create

```css
/* Quote Display */
.quote-card { }
.quote-header { }
.quote-symbol { }
.quote-price { }
.quote-change { }
.quote-change.pos { color: var(--green); }
.quote-change.neg { color: #ff4d4d; }
.quote-meta { }
.quote-chart { }
.quote-timestamp { }

/* Autocomplete */
.autocomplete-wrapper { }
.autocomplete-dropdown { }
.autocomplete-item { }
.autocomplete-item:hover { background: var(--surface2); }

/* Order Preview */
.order-preview { }
.preview-row { }
.preview-row.highlight { border-top: 1px solid var(--border); font-weight: 700; }

/* Watchlist */
.watchlist-item { }
.watchlist-symbol { }
.watchlist-price { }
.watchlist-buy { }

/* Order History */
.order-history-item { }
.order-header { }
.order-details { }
.order-status { }
.order-status.filled { color: var(--green); }
.order-status.pending { color: #ffa500; }

/* Portfolio */
.portfolio-dashboard { }
.portfolio-value { }
.portfolio-breakdown { }
.portfolio-top-holdings { }

/* Charts */
.mini-chart { width: 100%; height: 60px; }
```

---

## Mobile Responsiveness Notes

### Current Breakpoint
```css
@media (max-width: 768px) {
  .quick-actions { grid-template-columns: repeat(2, 1fr); }
  .investing-form { flex-direction: column; }
}
```

### For New Components
- Autocomplete dropdown should scroll on mobile
- Quote card should stack vertically
- Order history should truncate on small screens
- Portfolio chart should be swipeable for date ranges

---

## Accessibility Improvements

- [ ] Add ARIA labels to quote elements
- [ ] Ensure autocomplete keyboard navigation (arrow keys)
- [ ] Add focus states to all inputs
- [ ] Use semantic HTML (form, label, etc.)
- [ ] Screen reader text for P&L colors (not color-only indicators)
- [ ] High contrast mode support

---

## Analytics/Tracking Events

Recommended events to track:
- `invest_tab_viewed`
- `symbol_search_used`
- `quote_viewed` + symbol
- `order_preview_shown` + symbol + amount
- `order_placed` + symbol + side + amount
- `watchlist_added` + symbol
- `portfolio_viewed`
- `order_history_viewed`

---

## Testing Scenarios

### Happy Path: First Stock Purchase
1. Click "Invest" quick action
2. See onboarding if no account
3. Open investing account
4. See portfolio empty state
5. Enter symbol in buy form
6. See quote load
7. Enter dollar amount
8. See order preview with fee breakdown
9. Confirm order
10. See position appear in portfolio
11. Receive toast notification

### Error Cases
- Invalid symbol → Show error, suggest search
- Insufficient buying power → Show error, suggest deposit
- Market closed → Show warning, explain next open
- Network error → Show retry option

### Edge Cases
- Fractional shares (0.1234 shares)
- After-hours orders
- Dividend-paying stocks
- Bankrupt companies (delisted)
- Stock splits affecting position quantity

---

## Dependencies

### External APIs
- Real-time stock price data (IEX Cloud, Polygon, Alpaca, etc.)
- Market calendar (trading hours)
- Company information (symbols, sectors)
- Charts library (Chart.js, TradingView Lite)

### Internal Services
- `/investing/*` endpoints (must be implemented)
- WebSocket connection for live quotes (optional but recommended)
- Historical data storage for charts

---

## Summary

The current implementation provides a functional investing tab. To fully deliver on "Banking + Investing. Real stocks." messaging, these components will complete the experience:

**Immediately** (launch-ready):
1. Stock quote display
2. Symbol autocomplete
3. Order confirmation

**Next iteration** (polish):
4. Portfolio dashboard
5. Watchlist
6. Order history detail

**Future** (advanced):
7. Performance charts
8. Market news
9. Educational content
10. Alerts & notifications

Each addition strengthens the core message: **"Real stocks. Real investing. $1 minimum. $0.01 flat fee."**

# Crypto Dashboard 

A modern, responsive cryptocurrency dashboard built with React and TypeScript that provides real-time market data, trending coins, and comprehensive analytics.

![Crypto Dashboard](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-yellow)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4.1-teal)

## 🚀 Features

### Core Functionality
- **Real-time Market Data**: Live cryptocurrency prices, market cap, and 24h changes
- **Market Highlights**: Top gainers, losers, trending coins, and high-volume cryptocurrencies
- **Search & Filter**: Real-time search with debouncing and multiple sorting options
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark Mode Ready**: Tailwind CSS configuration supports dark mode implementation

### Advanced Features
- **Infinite Scroll Pagination**: Smooth loading of additional cryptocurrency data
- **Detailed Coin View**: Comprehensive modal with price charts and detailed metrics
- **Error Handling**: Robust error boundaries with retry mechanisms
- **Loading States**: Skeleton loading animations for better UX
- **Performance Optimized**: Caching, memoization, and efficient re-rendering

## 🛠 Tech Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.5.3** - Full type safety with strict mode enabled
- **Vite 5.4.2** - Lightning-fast build tool with HMR

### Styling & UI
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React 0.344.0** - Beautiful, customizable icons
- **Recharts 3.2.1** - Composable charting library

### Routing & Navigation
- **React Router DOM 7.9.1** - Client-side routing with modern patterns

### API & Data Management
- **CoinGecko API** - Real-time cryptocurrency data
- **Native Fetch API** - HTTP client with custom service layer
- **Built-in Caching** - 30-second response caching for optimal performance

## 🏗 Architecture Overview

### Layered Architecture
The application follows a clean, layered architecture with clear separation of concerns:

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│     (Components + Pages)            │
├─────────────────────────────────────┤
│        Business Logic Layer         │
│          (Custom Hooks)             │
├─────────────────────────────────────┤
│        Data Access Layer            │
│      (Services + Adapters)          │
├─────────────────────────────────────┤
│       Type Definitions Layer        │
│           (TypeScript)              │
├─────────────────────────────────────┤
│         Utility Layer               │
│    (Formatters + Helpers)           │
└─────────────────────────────────────┘
```

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── CoinTable.tsx       # Main data table with pagination
│   ├── CoinDetailModal.tsx # Detailed coin information modal
│   ├── HighlightCard.tsx   # Market highlight cards
│   ├── LoadingSkeleton.tsx # Loading state components
│   ├── ErrorBoundary.tsx   # Application-level error handling
│   └── ...
├── pages/              # Page-level route components
│   ├── Dashboard.tsx       # Main dashboard page
│   └── Highlights.tsx      # Market highlights page
├── hooks/              # Custom React hooks
│   ├── useCoinsData.ts     # Cryptocurrency data management
│   ├── useHighlights.ts    # Market highlights logic
│   └── useCoinDetail.ts    # Individual coin details
├── services/           # External API integration
│   └── coinGeckoApi.ts     # CoinGecko API service with caching
├── adapters/           # Data transformation layer
│   └── coinAdapter.ts      # API response to domain model adapters
├── types/              # TypeScript type definitions
│   ├── api.ts             # API response types
│   ├── domain.ts          # Domain model types
│   └── index.ts           # Type exports
├── utils/              # Utility functions
│   └── formatters.ts      # Number and currency formatters
└── App.tsx            # Root application component
```

## 🎯 Design Patterns

### 1. Adapter Pattern
**Purpose**: Transforms external API responses to internal domain models
**Implementation**: `src/adapters/coinAdapter.ts`
**Benefits**: Decouples external API structure from internal application logic

### 2. Custom Hooks Pattern
**Purpose**: Encapsulates stateful logic and side effects
**Implementation**: All hooks in `src/hooks/`
**Benefits**: Reusability, testability, and separation of concerns

### 3. Service Layer Pattern
**Purpose**: Centralizes API communication with built-in caching
**Implementation**: `src/services/coinGeckoApi.ts`
**Features**: Request caching, error handling, configurable endpoints

### 4. Compound Component Pattern
**Purpose**: Creates flexible, composable UI components
**Implementation**: `CoinTable`, `HighlightCard`, `CoinDetailModal`
**Benefits**: Better component reusability and maintainability

### 5. Error Boundary Pattern
**Purpose**: Graceful error handling at the application level
**Implementation**: `src/components/ErrorBoundary.tsx`
**Features**: Error recovery, user-friendly error display

## 🔧 Performance Optimizations

### Frontend Optimizations
- **Memoization**: `useMemo` and `useCallback` for expensive operations
- **Virtual Scrolling**: Efficient handling of large data sets
- **Debounced Search**: 300ms debounce to reduce API calls
- **Code Splitting**: Route-based automatic code splitting via Vite

### Data Layer Optimizations
- **Response Caching**: 30-second in-memory cache for API responses
- **Request Deduplication**: Prevents duplicate API calls
- **Parallel Loading**: `Promise.all` for independent API requests
- **Optimistic Updates**: Immediate UI updates with background sync

## 🔐 Security Features

- **Environment Variables**: Secure API key management
- **HTTPS Only**: All API communications over secure connections
- **Type Safety**: Compile-time validation prevents runtime errors
- **XSS Protection**: React's built-in protections and careful HTML handling

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support with logical tab order
- **ARIA Labels**: Comprehensive screen reader support
- **Focus Management**: Clear focus indicators and proper focus flow
- **Semantic HTML**: Proper use of table elements, headings, and landmarks
- **Color Contrast**: WCAG compliant color schemes

## 🚦 Getting Started

### Prerequisites
- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/chiragSahani/project-meddy.git
cd project-meddy
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

4. **Configure your CoinGecko API key**
Edit `.env` file and add your CoinGecko API key:
```env
VITE_COINGECKO_API_URL=https://api.coingecko.com/api/v3
VITE_COINGECKO_API_KEY=your_coingecko_api_key_here
```

5. **Start the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to `http://localhost:5173` to see the application.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔑 API Configuration

### CoinGecko API Setup
1. **Sign up** for a free account at [CoinGecko](https://www.coingecko.com/en/api)
2. **Generate an API key** from your dashboard
3. **Add the API key** to your `.env` file
4. **Free tier limits**: 30 calls/minute (sufficient for this application)

### Environment Variables
Create a `.env` file in the root directory:
```env
# CoinGecko API Configuration
VITE_COINGECKO_API_URL=https://api.coingecko.com/api/v3
VITE_COINGECKO_API_KEY=your_api_key_here
```

## 📱 Features Deep Dive

### Dashboard Page
- **Cryptocurrency Table**: Sortable table with market data
- **Search Functionality**: Real-time search with debouncing
- **Pagination**: Infinite scroll with "Load More" functionality
- **Market Navigation**: Quick access to highlights section

### Highlights Page
- **Top Gainers**: Cryptocurrencies with highest 24h gains
- **Top Losers**: Cryptocurrencies with highest 24h losses
- **Trending Coins**: Currently trending cryptocurrencies
- **High Volume**: Cryptocurrencies with highest trading volume
- **7-Day Performers**: Best performing coins over the week

### Coin Detail Modal
- **Price Information**: Current price, 24h change, market cap
- **Market Metrics**: Volume, supply, market cap rank
- **Price Chart**: Visual representation of price movement
- **Additional Data**: Links to official websites and social media

## 🏆 Code Quality

### TypeScript Configuration
- **Strict Mode**: Enabled for maximum type safety
- **No Implicit Any**: Prevents untyped variables
- **Strict Null Checks**: Prevents null/undefined errors
- **No Unused Variables**: Keeps codebase clean

### Error Handling Strategy
- **Multi-level Error Handling**: API → Service → Hook → Component → User
- **Retry Mechanisms**: Built into all data-fetching operations
- **User-friendly Messages**: Clear, actionable error messages
- **Graceful Degradation**: Partial functionality during failures

## 🧪 Testing Strategy (Recommended)

### Unit Tests
- Utility functions (`formatters.ts`)
- Data adapters (`coinAdapter.ts`)
- Custom hooks logic

### Integration Tests
- API service functionality
- Hook integration with components
- Error handling flows

### Component Tests
- UI component rendering
- User interaction handling
- Accessibility compliance

### End-to-End Tests
- Critical user flows
- Cross-browser compatibility
- Performance benchmarks

## 🔮 Future Improvements

### Features
- [ ] **Portfolio Tracking**: User portfolio management
- [ ] **Price Alerts**: Configurable price notifications
- [ ] **Advanced Charts**: Technical analysis indicators
- [ ] **News Integration**: Cryptocurrency news feed
- [ ] **Dark Mode**: Complete dark theme implementation
- [ ] **PWA Support**: Progressive Web App capabilities
- [ ] **Favorites**: Save and track favorite cryptocurrencies

### Technical Enhancements
- [ ] **React Query**: Advanced server state management
- [ ] **Virtualization**: Better performance for large datasets
- [ ] **Service Worker**: Offline functionality
- [ ] **WebSocket**: Real-time price updates
- [ ] **State Management**: Redux Toolkit for complex state
- [ ] **Testing Suite**: Comprehensive test coverage
- [ ] **CI/CD Pipeline**: Automated testing and deployment

### Performance
- [ ] **Bundle Analysis**: Optimize bundle size
- [ ] **Image Optimization**: WebP format support
- [ ] **Lazy Loading**: Component-level lazy loading
- [ ] **Caching Strategy**: Enhanced caching mechanisms

## 📊 Assumptions & Limitations

### Assumptions
- **API Availability**: CoinGecko API remains stable and accessible
- **Data Accuracy**: CoinGecko provides accurate, real-time data
- **Browser Support**: Modern browsers with ES2020+ support
- **Network Connection**: Stable internet connection for API calls
- **API Rate Limits**: Free tier limits are sufficient for typical usage

### Current Limitations
- **Offline Mode**: No offline functionality (requires internet)
- **Real-time Updates**: Data refreshes on user action, not real-time
- **Historical Data**: Limited historical price data visualization
- **Mobile Optimization**: Some advanced features limited on mobile
- **API Dependency**: Single point of failure with CoinGecko API

### Technical Debt
- **State Management**: Local state might need Redux for complex features
- **Testing Coverage**: Comprehensive test suite not yet implemented
- **Error Monitoring**: No production error tracking system
- **Performance Metrics**: No performance monitoring in production

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test` (when implemented)
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style Guidelines
- Follow TypeScript strict mode requirements
- Use functional components with hooks
- Implement proper error handling
- Add comprehensive TypeScript types
- Follow Tailwind CSS conventions
- Maintain accessibility standards

### Pull Request Process
1. Update documentation for any API changes
2. Add tests for new features
3. Ensure all tests pass
4. Update README.md if needed
5. Request review from maintainers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **CoinGecko API** - For providing comprehensive cryptocurrency data
- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite Team** - For the lightning-fast build tool
- **TypeScript Team** - For bringing type safety to JavaScript

## 📞 Support

If you have any questions or need help with setup, please:
1. Check the [Issues](https://github.com/chiragSahani/project-meddy/issues) page
2. Create a new issue with detailed information
3. Reach out to the maintainers

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
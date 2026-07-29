# StudyForge AI — Architecture Overview

## System Architecture

```
studyforge-ai/
├── src/
│   ├── features/          # Domain features (self-contained modules)
│   │   ├── ai/            # AI prompt engineering & validation
│   │   ├── analytics/     # Learning insights & charts
│   │   ├── dashboard/     # Main learning dashboard
│   │   ├── flashcards/    # 3D flashcard system
│   │   ├── generator/     # Study content generator
│   │   ├── history/       # Session workspace management
│   │   ├── profile/       # User profile & achievements
│   │   ├── quiz/          # Quiz engine
│   │   ├── revision/      # Exam revision module
│   │   ├── settings/      # App personalization
│   │   └── summary/       # AI summary reader
│   │
│   ├── components/        # Shared/global UI components
│   │   ├── ui/            # Design system primitives (Button, Card, etc.)
│   │   ├── Common/        # Shared app components (CommandPalette)
│   │   ├── landing/       # Landing page sections
│   │   └── ErrorBoundary/ # React error boundary
│   │
│   ├── config/            # Environment & app configuration
│   │   ├── env.js         # Typed env variable access
│   │   ├── axios.js       # Configured Axios instance
│   │   ├── queryClient.js # TanStack Query client
│   │   ├── featureFlags.js# Feature toggle system
│   │   └── constants.js   # App-wide constants
│   │
│   ├── context/           # React Context providers
│   ├── hooks/             # Reusable React hooks
│   ├── layouts/           # Page layout wrappers
│   ├── lib/               # Framework-agnostic utilities
│   │   ├── logger.js      # Structured logging
│   │   ├── storage.js     # LocalStorage abstraction
│   │   ├── analytics.js   # Analytics event bus
│   │   └── performance.js # Performance monitoring
│   │
│   ├── pages/             # Route-level page components
│   ├── providers/         # AppProviders wrapper
│   ├── routes/            # AppRouter & navigation logic
│   ├── services/          # API service layer
│   ├── styles/            # Global CSS & design tokens
│   ├── types/             # JSDoc type definitions
│   └── utils/             # Pure utility functions
│
├── server.js              # Express API server
└── docs/                  # Project documentation
```

## Key Design Decisions

### Feature-First Architecture
Each feature is a self-contained module with its own `components/`, `hooks/`, `services/`, and `utils/` subdirectories. Features export a public API via `index.js`.

### Provider Hierarchy
```
ErrorBoundary
  └── AppProviders
       ├── QueryClientProvider
       ├── ThemeProvider
       ├── NotificationProvider
       ├── SessionProvider
       └── QuizProvider
```

### AI Response Pipeline
```
User Input → Prompt Engineering (ai/prompts/) → Gemini API
          → JSON Validation (ai/schemas/) → Normalize
          → React State → UI Components
```

### Data Flow
- Sessions stored in `SessionContext` (in-memory) + `localStorage` (persistence)
- API calls via configured `axiosInstance` (config/axios.js)
- Server state managed by TanStack Query
- UI state managed by React hooks

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS v4, Framer Motion
- **State**: React Context + TanStack Query + localStorage
- **Backend**: Express.js, Axios, Google Gemini API
- **Styling**: Tailwind CSS with custom design tokens
- **Icons**: Lucide React

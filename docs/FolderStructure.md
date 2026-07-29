# StudyForge AI — Folder Structure

```
src/
│
├── assets/               # Static assets (images, fonts, icons)
│
├── components/           # Shared, reusable UI components
│   ├── ui/               # Design system primitives
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Badge/
│   │   ├── Modal/
│   │   ├── Spinner/
│   │   ├── Progress/
│   │   ├── Skeleton/
│   │   ├── Toast/
│   │   ├── Tooltip/
│   │   ├── Tabs/
│   │   ├── Select/
│   │   ├── Avatar/
│   │   ├── Divider/
│   │   └── EmptyState/
│   ├── Common/           # App-wide shared components
│   │   └── CommandPalette/
│   ├── landing/          # Landing page sections
│   │   ├── Hero/
│   │   ├── Features/
│   │   ├── Stats/
│   │   ├── Workflow/
│   │   ├── Testimonials/
│   │   ├── FAQ/
│   │   ├── CTA/
│   │   └── Footer/
│   └── ErrorBoundary/    # React error boundary
│
├── config/               # Application configuration
│   ├── env.js            # Typed env variable access
│   ├── axios.js          # Configured Axios instance
│   ├── queryClient.js    # TanStack Query client
│   ├── featureFlags.js   # Feature toggle system
│   └── constants.js      # App-wide constants
│
├── constants/            # Legacy constants (use config/constants.js for new code)
│
├── context/              # React Context providers
│   ├── ThemeContext.jsx
│   ├── NotificationContext.jsx
│   ├── SessionContext.jsx
│   └── QuizContext.jsx
│
├── features/             # Domain features (self-contained)
│   ├── ai/               # AI prompt engineering
│   │   ├── prompts/
│   │   └── schemas/
│   ├── analytics/        # Learning insights dashboard
│   ├── dashboard/        # Main study dashboard
│   ├── flashcards/       # 3D flashcard system
│   ├── generator/        # Study content generator
│   ├── history/          # Session history & workspace
│   ├── profile/          # User profile & achievements
│   ├── quiz/             # Quiz engine
│   ├── revision/         # Exam revision module
│   ├── settings/         # App personalization
│   └── summary/          # AI summary reader
│
├── hooks/                # Reusable React hooks
│   ├── useAI.js
│   ├── useClipboard.js
│   ├── useDarkMode.js
│   ├── useDebounce.js
│   ├── useFetch.js
│   ├── useInfiniteScroll.js
│   ├── useKeyboard.js
│   ├── useLocalStorage.js
│   ├── useModal.js
│   ├── useNetworkStatus.js
│   ├── usePagination.js
│   ├── usePrevious.js
│   ├── useSpeech.js
│   └── useStudyAssistant.js
│
├── layouts/              # Page layout wrappers
│   └── AppLayout/
│
├── lib/                  # Framework-agnostic utilities
│   ├── analytics.js      # Analytics event bus
│   ├── logger.js         # Structured logging
│   ├── performance.js    # Performance monitoring
│   └── storage.js        # LocalStorage abstraction
│
├── pages/                # Route-level page components
│   ├── Landing/
│   ├── LandingPage.jsx   # Re-export stub
│   ├── DashboardPage.jsx
│   ├── AnalyticsPage.jsx
│   ├── AIProcessingPage.jsx
│   ├── RevisionPage.jsx
│   ├── ProfilePage.jsx
│   ├── SettingsPage.jsx
│   ├── GeneratorPage.jsx
│   ├── NotFoundPage.jsx
│   └── ErrorPage.jsx
│
├── providers/            # App-level provider wrappers
│   └── AppProviders.jsx
│
├── routes/               # Routing configuration
│   └── AppRouter.jsx
│
├── services/             # API service layer
│   ├── ai.js             # Gemini AI service
│   ├── api.js            # Base API client
│   ├── exportService.js  # Export (PDF, JSON, Markdown)
│   ├── notificationService.js
│   ├── searchService.js
│   └── storageService.js
│
├── styles/               # Global CSS & design tokens
│
├── types/                # JSDoc type definitions
│   ├── analytics.js
│   ├── flashcard.js
│   ├── quiz.js
│   ├── revision.js
│   └── studySession.js
│
├── utils/                # Pure utility functions
│   ├── cache.js
│   ├── date.js
│   ├── debounce.js
│   ├── errorParser.js
│   ├── exportPDF.js
│   ├── formatter.js
│   ├── helpers.js
│   ├── jsonRepair.js
│   ├── jsonValidator.js
│   ├── parser.js
│   ├── retryEngine.js
│   ├── storage.js
│   ├── validator.js
│   └── validators.js
│
├── App.jsx               # Root component
└── main.jsx              # Entry point
```

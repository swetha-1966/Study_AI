# ⚡ StudyForge AI — Commercial Learning & Study Engine

> **Production-Grade AI Study Assistant Built with React 19, Vite, Tailwind CSS v4, Framer Motion, and Express.**

---

## 🧭 Project Overview

**StudyForge AI** is an enterprise-grade learning platform designed to convert raw lecture notes, textbook excerpts, or complex topics into structured, interactive study materials in seconds.

### Core Learning Modules
- **3D Interactive Flashcards**: 3D card flips, text-to-speech audio synthesis (`window.speechSynthesis`), spacebar navigation, shuffle, and bookmarking.
- **Scenario-Based Quizzes**: Multiple-choice questions, confidence selector, immediate feedback, and numbered question navigator grid.
- **Executive Summaries & Mnemonics**: Multi-paragraph academic overviews, key concept checklists, and memory tricks.
- **Targeted Revision Queue**: Auto-aggregates missed quiz questions and bookmarked flashcards for focused review.
- **Learning Analytics & Gamification**: XP points, level progression (Level 2 Scholar), daily study streaks, and 30-day study heatmaps.

---

## 🏗️ System Architecture

```
                    ┌────────────────────────┐
                    │     User Browser       │
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │ React 19 + Vite App    │
                    │ (Context & Custom Hooks)│
                    └───────────┬────────────┘
                                │ HTTP / REST API
                                ▼
                    ┌────────────────────────┐
                    │ Express Backend API v1 │
                    │ (Helmet, Logger, CORS) │
                    └───────────┬────────────┘
                                │
                  ┌─────────────┴─────────────┐
                  ▼                           ▼
       ┌────────────────────┐     ┌───────────────────────┐
       │ Google Gemini API  │     │ Dynamic Topic Engine  │
       │ (JSON Schema Output)│     │ (Resilient Fallback)  │
       └────────────────────┘     └───────────────────────┘
```

---

## 🛠️ Tech Stack Matrix

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 (Functional Components Only) |
| **Build Tool & HMR** | Vite v6 |
| **Styling & Design System** | Tailwind CSS v4 (Vanilla CSS Custom Utilities) |
| **Animations** | Framer Motion (3D Transforms & Layout Animations) |
| **HTTP Client** | Axios |
| **Icons** | Lucide React |
| **Backend API** | Node.js + Express.js |
| **AI Integration** | Google Gemini REST API + Dynamic Topic Engine |

---

## 📡 Backend API v1 Specification

### `GET /api/v1/health`
Health check endpoint.
```json
{
  "status": "OK",
  "version": "1.0.0",
  "uptime": 48231,
  "environment": "production"
}
```

### `POST /api/v1/generate`
Generates study deck from topic or notes text.
```json
// Payload
{
  "notes": "Operating Systems Scheduling",
  "difficulty": "Intermediate",
  "cardCount": 4,
  "quizCount": 3
}

// Response
{
  "success": true,
  "sessionId": "session_1785299000",
  "data": {
    "summary": {
      "overview": "...",
      "keyTakeaways": ["..."],
      "mnemonics": ["..."]
    },
    "flashcards": [
      { "id": 1, "question": "...", "answer": "..." }
    ],
    "quiz": [
      { "id": 1, "question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": 0, "explanation": "..." }
    ]
  }
}
```

---

## ⌨️ Keyboard Shortcuts Reference

| Shortcut | Action |
|---|---|
| <kbd>Space</kbd> / <kbd>Enter</kbd> | Flip active 3D flashcard |
| <kbd>→</kbd> | Next card or quiz question |
| <kbd>←</kbd> | Previous card or quiz question |
| <kbd>Ctrl + K</kbd> | Launch Command Palette modal |
| <kbd>Ctrl + Enter</kbd> | Submit study topic generation form |
| <kbd>Esc</kbd> | Close dialog or command palette |

---

## 🚀 Quick Start Guide

### 1. Installation
```bash
git clone https://github.com/your-username/studyforge-ai.git
cd studyforge-ai
npm install
```

### 2. Run Backend Server
```bash
npm run server
# Server running on http://localhost:5001
```

### 3. Run Frontend Dev Server
```bash
npm run dev
# App running on http://localhost:3000
```

### 4. Build Production Bundle
```bash
npm run build
```

---

## 🛡️ License
MIT License. Built for Software Engineering & AI Portfolio Demonstration.

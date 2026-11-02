# DevPrep Hub — Cross-Platform Developer Interview Platform

Production-ready, cross-platform Web and Mobile Software Developer Interview Preparation Platform architected inside a **Turborepo** monorepo with **pnpm workspaces**, **Next.js 15**, **Expo Router**, **tRPC v10**, **Prisma ORM**, and **Gemini AI**.

---

## 🏗️ Monorepo Topology

```
devprep-hub/
├── apps/
│   ├── web/                     # Next.js 15 (App Router, Tailwind CSS, Monaco Editor, React Query)
│   └── mobile/                  # React Native + Expo Router (NativeWind, FlashList, Parsons Drills)
├── packages/
│   ├── api/                     # Type-safe tRPC routers & Zod validation schemas
│   ├── db/                      # Prisma ORM schema, Supabase PostgreSQL, and deterministic seed script
│   └── ui/                      # Shared design tokens, difficulty scales, SM-2 math, and types
├── turbo.json                   # High-performance pipeline orchestration
└── pnpm-workspace.yaml          # Monorepo workspace mapping
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Generate Prisma Client & Seed Database
```bash
# Generates Prisma client
pnpm db:generate

# Seeds 10 DSA Problems, 3 System Design Prompts, and 20 CS Fundamentals Flashcards
pnpm db:seed
```

### 3. Launch Next.js 15 Web Application
```bash
pnpm --filter @devprep/web dev
# Accessible at http://localhost:3000
```

### 4. Launch Expo React Native Mobile Application
```bash
pnpm --filter @devprep/mobile start
# Or press 'w' in Metro terminal for Web preview
```

### 5. Run Quality Verification Gates
```bash
# Zero-error typecheck across all 5 workspace projects
pnpm run typecheck

# Lint across all workspaces
pnpm run lint

# Production build of Web app
pnpm --filter @devprep/web build
```

---

## 🌟 Core Modules & Features

### 🧩 Module A: Resource Hub & Curated Roadmaps
- **Interactive Pathways**: Structured curriculum for **Blind 75**, **NeetCode 150**, Frontend, and Backend with prerequisite DAGs.
- **Spaced Repetition System (SRS)**: Built-in **SuperMemo SM-2** algorithm ($EF' = EF + (0.1 - (5 - q) \cdot (0.08 + (5 - q) \cdot 0.02))$) scheduling daily review queues based on confidence ratings (*Again*, *Hard*, *Good*, *Easy*).
- **CS Fundamentals Vault**: Searchable high-yield flashcards covering Operating Systems, DBMS, Networks, Concurrency, and OOPs.

### 💻 Module B: DSA Coding Arena
- **Web Experience**: Resizable split-pane layout featuring problem constraints, multi-language Monaco IDE (Python 3, JavaScript, TypeScript, C++, Java, Go), and a collapsible test console.
- **Automated Grading & Complexity Analyzer**: Multi-language execution via Judge0 / Piston sandboxed runner returning runtime (ms), memory (MB), and automated Big-O Time & Space complexity critique.
- **Mobile Experience**: Optimized mobile problem reader, syntax-highlighted solutions, and touch-friendly **Parsons Problems** for drag-and-drop commute drills.

### 📐 Module C: System Design Studio (HLD & LLD)
- **Interactive Architecture Canvas**: Node-based diagramming tool with Cloudflare CDN, Kong API Gateways, Stateless Pods, Redis LRU, PostgreSQL Sharded DBs, and Kafka message buses.
- **AI Architecture Reviewer**: Evaluates canvas topology and user architectural write-ups for Single Points of Failure (SPOFs), read/write bottlenecks, and CAP theorem trade-offs.
- **LLD / Machine Coding Library**: Object-Oriented Design challenges (TinyURL, Distributed Rate Limiter, Parking Lot System) with Mermaid UML class diagrams.

### 🤖 Module D: AI Mock Interviewer & Behavioral Prep
- **Real-Time Staff Engineer Simulation**: Timed 45-minute simulation where the AI acts as a Senior Staff Engineer, asking clarifying questions, challenging edge cases, and providing progressive hints.
- **Behavioral STAR Builder**: Structured workspace mapping engineering challenges to Situation, Task, Action, and Result with quantifiable business metric grading.
- **Resume ATS Analyzer**: Scores engineering resumes against target job descriptions, surfaces missing technical keywords, and suggests action-verb rewrites.

### 📊 Module E: Analytics & Offline Sync
- **Readiness Competency Index**: Multi-axis readiness breakdown across Algorithmic Rigor, System Design HLD, LLD, and Behavioral metrics.
- **16-Week Consistency Heatmap**: GitHub-style daily activity and streak tracking.
- **Mobile Offline Cache**: Local storage abstraction enabling commute reading of CS notes, flashcards, and editorial solutions without internet connectivity.


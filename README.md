# 🚀 DevPrep Hub — Cross-Platform Developer Interview Platform

[![DevPrep Hub CI/CD](https://github.com/BharatD4/devprep-hub/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/BharatD4/devprep-hub/actions/workflows/ci-cd.yml)
[![Live Web Application](https://img.shields.io/badge/Live%20Web%20App-Online-indigo?style=for-the-badge&logo=vercel)](https://devprep-hub.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-BharatD4%2Fdevprep--hub-181717?style=for-the-badge&logo=github)](https://github.com/BharatD4/devprep-hub)
[![Stack](https://img.shields.io/badge/Stack-Next.js%2015%20%7C%20Expo%20%7C%20tRPC%20%7C%20Prisma-blue?style=for-the-badge)](https://github.com/BharatD4/devprep-hub)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FBharatD4%2Fdevprep-hub&root-directory=apps%2Fweb)

> **DevPrep Hub** is an enterprise-grade, cross-platform Software Developer Interview Preparation platform architected inside a **Turborepo** monorepo with **pnpm workspaces**, **Next.js 15 App Router**, **React Native / Expo Router**, **tRPC v10**, **Prisma ORM (Supabase PostgreSQL)**, and **Gemini AI**.

---

## 🌐 Live Access Links

| Platform | Access Link | Description |
| :--- | :--- | :--- |
| ⚡ **Live Web Application** | [**https://devprep-hub.vercel.app**](https://devprep-hub.vercel.app) | Production web interface with Monaco IDE, System Design studio, and AI Mock Interviewer |
| 🚀 **1-Click Live Deploy** | [**Deploy on Vercel**](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FBharatD4%2Fdevprep-hub&root-directory=apps%2Fweb) | Deploy your own instance directly to Vercel in 1-click |
| 📦 **GitHub Repository** | [**https://github.com/BharatD4/devprep-hub**](https://github.com/BharatD4/devprep-hub) | Complete monorepo source code & active CI/CD workflow |
| 📱 **Mobile App (Expo)** | `pnpm --filter @devprep/mobile start` | React Native mobile client with Parsons drills and offline cache |

---

## 🏗️ Monorepo Topology

```
devprep-hub/
├── .github/workflows/ci-cd.yml  # Automated GitHub Actions build, typecheck & test workflow
├── apps/
│   ├── web/                     # Next.js 15 (App Router, Tailwind CSS, Monaco IDE, TanStack Query)
│   └── mobile/                  # React Native + Expo Router (Parsons commute drills, offline reader)
├── packages/
│   ├── api/                     # Type-safe tRPC v10 routers + Zod validation schemas
│   ├── db/                      # Prisma ORM schema, Supabase PostgreSQL, and deterministic seed script
│   └── ui/                      # Shared design tokens, difficulty scales, SM-2 math, and types
├── turbo.json                   # Pipeline build, typecheck, lint cache orchestration
└── pnpm-workspace.yaml          # pnpm workspace mapping
```

---

## 🚀 Quick Start Guide

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/BharatD4/devprep-hub.git
cd devprep-hub
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
# Accessible locally at http://localhost:3000
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
- **Interactive Pathways**: Structured curriculum for **Blind 75**, **NeetCode 150**, Frontend, and Backend with prerequisite topic DAGs and persistent completion tracking.
- **Spaced Repetition System (SRS)**: Built-in **SuperMemo SM-2** algorithm ($EF' = EF + (0.1 - (5 - q) \cdot (0.08 + (5 - q) \cdot 0.02))$) scheduling daily review queues based on confidence ratings (*Again*, *Hard*, *Good*, *Easy*).
- **CS Fundamentals Vault**: Searchable high-yield flashcards covering Operating Systems, DBMS, Networks, Concurrency, and OOPs.

### 💻 Module B: DSA Coding Arena
- **Web Experience**: Resizable split-pane layout featuring problem constraints, multi-language Monaco IDE (Python 3, JavaScript, TypeScript, C++, Java, Go), and a collapsible test console.
- **Automated Grading & Complexity Analyzer**: Multi-language execution via Judge0 / Piston sandboxed runner returning runtime (ms), memory (MB), and automated Big-O Time & Space complexity critique.
- **Mobile Experience**: Optimized mobile problem reader, syntax-highlighted solutions, and touch-friendly **Parsons Problems** for drag-and-drop commute drills.

### 📐 Module C: System Design Studio (HLD & LLD)
- **Interactive Architecture Canvas**: Node-based diagramming tool with Cloudflare CDN, Kong API Gateways, Stateless Pods, Redis LRU, PostgreSQL Sharded DBs, and Kafka event buses.
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

---

## 🚢 Deploying to Vercel (1-Click)

Click the button below to deploy this monorepo to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FBharatD4%2Fdevprep-hub&root-directory=apps%2Fweb)

Vercel will automatically build `apps/web` with Next.js 15, wire the serverless tRPC routes, and deploy the live site.

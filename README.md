# 🚀 DevPrep Hub — Cross-Platform Developer Interview Platform

[![DevPrep Hub CI/CD](https://github.com/BharatD4/devprep-hub/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/BharatD4/devprep-hub/actions/workflows/ci-cd.yml)
[![Live Web Application](https://img.shields.io/badge/Live%20Web%20App-Online-indigo?style=for-the-badge&logo=vercel)](https://web-five-eta-28.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-BharatD4%2Fdevprep--hub-181717?style=for-the-badge&logo=github)](https://github.com/BharatD4/devprep-hub)
[![Stack](https://img.shields.io/badge/Stack-Next.js%2015%20%7C%20Expo%20%7C%20tRPC%20%7C%20Prisma-blue?style=for-the-badge)](https://github.com/BharatD4/devprep-hub)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FBharatD4%2Fdevprep-hub&root-directory=apps%2Fweb)

> **DevPrep Hub** is an enterprise-grade, cross-platform Software Developer Interview Preparation platform architected inside a **Turborepo** monorepo with **pnpm workspaces**, **Next.js 15 App Router**, **React Native / Expo Router**, **tRPC v10**, **Prisma ORM (Supabase PostgreSQL)**, and **Gemini AI**.

---

## 🌐 Live Access Links

| Platform | Access Link | Description |
| :--- | :--- | :--- |
| ⚡ **Live Production Web Application** | [**https://web-five-eta-28.vercel.app**](https://web-five-eta-28.vercel.app) | Live deployed Next.js 15 App Router platform on Vercel |
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

# Seeds 150 In-Depth DSA Problems (30 per topic), 3 System Design Prompts, Formula Vault & CS Flashcards
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

### 🧩 Module A: Resource Hub, Roadmaps, Concepts Vault & 150 Placement Theory Q&A
- **150 Top Placement Interview Theory Questions & Answers (`/flashcards`)**: Complete, structured interview answers (with code, ASCII diagrams, and trade-offs) covering:
  - **Operating Systems (30 Q&As)**: Processes vs Threads, Coffman Conditions, Banker's Algorithm, Semaphore vs Mutex, Peterson's Solution, Page Faults, Thrashing, TLB EMAT, Zombie/Orphan Processes, COW, Priority Inversion, DMA, RAID Levels, RTOS vs GP-OS, Virtual Memory math.
  - **DBMS & SQL (30 Q&As)**: ACID guarantees, 1NF to BCNF Normalization, Clustered vs Secondary Indexes, B+ Tree vs B-Tree structures, Isolation Levels & Read Phenomena (Dirty, Non-Repeatable, Phantom, Write Skew), MVCC, Write-Ahead Logging (WAL), 2PL, SQL vs NoSQL, Composite vs Covering Index, SQL Injection prevention, Optimistic vs Pessimistic Concurrency.
  - **Computer Networks (30 Q&As)**: OSI 7-Layer model, TCP 3-Way Handshake, TCP 4-Way Teardown & TIME_WAIT state, TCP vs UDP, SYN Flood & SYN Cookies, Flow Control vs Congestion Control, AIMD & Slow Start, DNS recursive resolution, HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC), TLS 1.3 Handshake, Subnetting & CIDR, NAT/PAT, ARP, ICMP/Ping/Traceroute, Proxy vs Reverse Proxy, WebSockets vs SSE vs Long Polling, CDN Anycast routing.
  - **Object-Oriented Programming & Principles (30 Q&As)**: 4 Core Pillars, Abstraction vs Encapsulation, Compile-Time vs Runtime Polymorphism, VTABLE & VPTR internal mechanisms, Abstract Class vs Interface, Diamond Problem resolution, Composition over Inheritance, SOLID Principles in practice (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion), Shallow vs Deep Copy, Virtual Destructors, Singleton with Double-Checked Locking, Factory vs Abstract Factory, Observer, Strategy, Adapter, Decorator patterns, RAII & Smart Pointers.
  - **System Design & Software Engineering (30 Q&As)**: Monolith to Microservices migration, REST vs GraphQL vs gRPC, Horizontal vs Vertical Scaling, L4 vs L7 Load Balancing, Caching Strategies (Cache-Aside, Write-Through, Write-Back), Cache Stampede/Thundering Herd mitigation, Kafka vs RabbitMQ message semantics, Idempotency Keys, Rate Limiting Algorithms (Token Bucket, Leaky Bucket, Sliding Window Counter), Consistent Hashing with Virtual Nodes, Bloom Filters, Two-Phase Commit (2PC) vs SAGA pattern, Circuit Breaker pattern, Replication Lag, Little's Law, Kubernetes Liveness vs Readiness probes, Blue-Green vs Canary deployments, Bulkheads, Distributed Locks (Redis Redlock).
- **Concept, Formula & Short Trick Vault (`/concepts`)**: Searchable, categorized revision cheat sheets covering DSA Patterns (Sliding Window, Monotonic Stack, Binary Search on Answer), System Design Math (Latency numbers, QPS & Capacity estimation, PACELC, Quorum $R + W > N$), OS (Coffman conditions, TLB EMAT), DBMS (Isolation levels, B+ Tree height math), and Networks (BDP, TCP handshake, HTTP/1-3).
- **Interactive Pathways**: Structured curriculum for **Blind 75**, **NeetCode 150**, Frontend, and Backend with prerequisite topic DAGs and persistent completion tracking.
- **Spaced Repetition System (SRS)**: Built-in **SuperMemo SM-2** algorithm ($EF' = EF + (0.1 - (5 - q) \cdot (0.08 + (5 - q) \cdot 0.02))$) scheduling daily review queues based on confidence ratings (*Again*, *Hard*, *Good*, *Easy*).

### 💻 Module B: DSA Coding Arena (150 Questions • 30 Per Core Topic)
- **150 Complete Problem Set (30 per Core Category)**:
  - **Arrays, Two Pointers & Sliding Window (30)**: Two Sum, 3Sum, Trapping Rain Water, Min Window Substring, Longest Substring Without Repeating, Sliding Window Max, Kadane's, Next Permutation, etc.
  - **Linked Lists, Stacks & Queues (30)**: Reverse List, Reorder List, LRU Cache, LFU Cache, Merge K Lists, Daily Temperatures, Largest Rectangle in Histogram, Car Fleet, Basic Calculator, etc.
  - **Binary Trees, BST, Heaps & Tries (30)**: Invert Tree, Diameter, LCA, Level Order, Validate BST, Max Path Sum, Serialize & Deserialize, Find Median from Data Stream, Trie, Word Search II, etc.
  - **Graph Traversal, DSU & Shortest Paths (30)**: Number of Islands, Rotting Oranges, Course Schedule I & II, Redundant Connection, Word Ladder, Dijkstra, Tarjan's Bridges, Bus Routes, Making A Large Island, etc.
  - **Dynamic Programming & Backtracking (30)**: Climbing Stairs, House Robber I & II, Coin Change I & II, Longest Increasing Subsequence, Word Break, Edit Distance, Burst Balloons, N-Queens, Sudoku Solver, Wildcard Matching, etc.
- **Optimal Engineering Editorials**: Every single problem features a dedicated "💡 Short Trick & Intuition" section, time & space Big-O derivations, and optimal clean code.
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

export interface SeedProblem {
  id: string;
  slug: string;
  title: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  category: string;
  companyTags: string[];
  orderIndex: number;
  descriptionMdx: string;
  constraints: string[];
  starterCodeJson: Record<string, string>;
  testCasesJson: Array<{ input: string; expected: string; hidden?: boolean }>;
  editorialMdx: string;
  timeLimitMs: number;
  memoryLimitMb: number;
}

import { PROBLEMS_ARRAYS } from './data/problems-arrays';
import { PROBLEMS_LINKEDLIST_STACK } from './data/problems-linkedlist-stack';
import { PROBLEMS_TREES_HEAPS } from './data/problems-trees-heaps';
import { PROBLEMS_GRAPHS } from './data/problems-graphs';
import { PROBLEMS_DP } from './data/problems-dp';

export * from './data/cheat-sheets';
export * from './data/problems-arrays';
export * from './data/problems-linkedlist-stack';
export * from './data/problems-trees-heaps';
export * from './data/problems-graphs';
export * from './data/problems-dp';

export const SEED_PROBLEMS: SeedProblem[] = [
  ...PROBLEMS_ARRAYS,
  ...PROBLEMS_LINKEDLIST_STACK,
  ...PROBLEMS_TREES_HEAPS,
  ...PROBLEMS_GRAPHS,
  ...PROBLEMS_DP,
];

export interface SeedSystemDesign {
  id: string;
  slug: string;
  title: string;
  type: 'HLD' | 'LLD';
  scaleRequirements: string;
  functionalSpecs: string[];
  nonFunctionalSpecs: string[];
  referenceDiagramJson?: any;
  rubricJson: Record<string, number>;
  starterUml?: string;
}

export interface SeedFlashcard {
  id: string;
  deckCategory: string;
  front: string;
  back: string;
  codeSnippet?: string;
  tags: string[];
}

export const SEED_SYSTEM_DESIGN: SeedSystemDesign[] = [
  {
    id: 'sd-1',
    slug: 'design-tinyurl',
    title: 'Design a Scalable URL Shortener (TinyURL)',
    type: 'HLD',
    scaleRequirements: '100M new URLs per month (approx 40 writes/sec), 10B clicks per month (approx 4,000 reads/sec, 100:1 read-to-write ratio). 5-year storage retention.',
    functionalSpecs: [
      'Generate a unique short 7-character hash alias for any long URL.',
      'Redirect HTTP GET on short URL to original destination with HTTP 301/302.',
      'Allow custom short aliases (optional).',
      'Record analytics on click counts and referral sources.',
    ],
    nonFunctionalSpecs: [
      'High availability (99.99% uptime).',
      'Low latency URL redirection (< 20ms).',
      'Non-guessable URLs to prevent enumeration attacks.',
    ],
    rubricJson: {
      spof: 20,
      bottlenecks: 20,
      scalability: 30,
      tradeoffs: 30,
    },
    referenceDiagramJson: {
      nodes: [
        { id: '1', type: 'client', label: 'User / Mobile Browser', position: { x: 50, y: 150 } },
        { id: '2', type: 'lb', label: 'Global Cloudflare CDN / Anycast DNS', position: { x: 250, y: 150 } },
        { id: '3', type: 'gateway', label: 'Nginx / Kong API Gateway', position: { x: 450, y: 150 } },
        { id: '4', type: 'service', label: 'Shortener Service (Stateless Pods)', position: { x: 650, y: 100 } },
        { id: '5', type: 'cache', label: 'Redis Cache (LRU 20% Hot Keys)', position: { x: 880, y: 50 } },
        { id: '6', type: 'db', label: 'PostgreSQL Primary / Replica (or Cassandra)', position: { x: 880, y: 180 } },
        { id: '7', type: 'kgs', label: 'Key Generation Service (Zookeeper Range Allocator)', position: { x: 650, y: 260 } },
      ],
      edges: [
        { source: '1', target: '2' },
        { source: '2', target: '3' },
        { source: '3', target: '4' },
        { source: '4', target: '5' },
        { source: '4', target: '6' },
        { source: '4', target: '7' },
      ],
    },
  },
  {
    id: 'sd-2',
    slug: 'design-distributed-rate-limiter',
    title: 'Design a Distributed Rate Limiter',
    type: 'HLD',
    scaleRequirements: 'Protecting 1M RPS API gateway across 4 regions with sub-2ms evaluation overhead.',
    functionalSpecs: [
      'Limit users/IPs to N requests per time window (e.g., 100 req/min).',
      'Return HTTP 429 Too Many Requests with X-RateLimit-Reset headers.',
      'Configurable tiers per API tier (Free vs Tier 1 vs Enterprise).',
    ],
    nonFunctionalSpecs: [
      'Ultra-low latency (< 2ms per request).',
      'Fault tolerant: If rate limiter fails, gracefully allow traffic (fail open).',
      'Synchronized distributed state across horizontally scaled gateway nodes.',
    ],
    rubricJson: {
      spof: 25,
      bottlenecks: 25,
      scalability: 25,
      tradeoffs: 25,
    },
  },
  {
    id: 'sd-3',
    slug: 'design-parking-lot-lld',
    title: 'Design an Object-Oriented Parking Lot System',
    type: 'LLD',
    scaleRequirements: 'Multi-level parking structure supporting 10,000 spots, 4 vehicle types, automated license plate readers and dynamic pricing.',
    functionalSpecs: [
      'Support Compact, Large, Handicapped, and EV charging spots.',
      'Assign nearest available spot automatically upon vehicle entry.',
      'Support hourly, daily, and surge pricing calculators.',
      'Generate ticket at entry gate and process payment at exit kiosk.',
    ],
    nonFunctionalSpecs: [
      'Thread-safe spot reservation under concurrent gate entries.',
      'Clean SOLID design with Strategy Pattern for pricing and Factory Pattern for spots.',
    ],
    rubricJson: {
      spof: 15,
      bottlenecks: 20,
      scalability: 35,
      tradeoffs: 30,
    },
    starterUml: `classDiagram
    class Vehicle {
      -String licensePlate
      -VehicleType type
      +getType()
    }
    class ParkingSpot {
      -int spotNumber
      -SpotType type
      -boolean isFree
      -Vehicle vehicle
      +assignVehicle(Vehicle v)
      +removeVehicle()
    }
    class ParkingTicket {
      -String ticketId
      -DateTime entryTime
      -DateTime exitTime
      -double fee
      +calculateFee(PricingStrategy strategy)
    }
    class ParkingLot {
      -List~ParkingFloor~ floors
      -PricingStrategy pricingStrategy
      +parkVehicle(Vehicle v)
      +unparkVehicle(ParkingTicket t)
    }
    ParkingSpot <|-- CompactSpot
    ParkingSpot <|-- LargeSpot
    ParkingSpot <|-- EVSpot
    ParkingLot *-- ParkingSpot`,
  },
];

export const SEED_FLASHCARDS: SeedFlashcard[] = [
  // Operating Systems (4)
  {
    id: 'fc-1',
    deckCategory: 'Operating Systems',
    front: 'What is Virtual Memory and what is Page Fault?',
    back: 'Virtual memory abstracts physical RAM, giving processes the illusion of contiguous private address space. A Page Fault occurs when a program tries to access a virtual memory address whose corresponding page is not currently mapped into physical RAM, triggering the OS to swap it in from disk.',
    tags: ['OS', 'Memory', 'Paging'],
  },
  {
    id: 'fc-2',
    deckCategory: 'Operating Systems',
    front: 'What are the 4 Coffman conditions required for a Deadlock?',
    back: '1. Mutual Exclusion (non-shareable resources)\n2. Hold and Wait (process holding resources can request new ones)\n3. No Preemption (resources cannot be forcibly taken)\n4. Circular Wait (a circular chain of processes waiting for each other)',
    tags: ['OS', 'Deadlock', 'Concurrency'],
  },
  {
    id: 'fc-3',
    deckCategory: 'Operating Systems',
    front: 'What is Context Switching and what are its performance costs?',
    back: 'Context switching is the process of storing the state (registers, program counter, stack pointer) of a running process/thread so that it can be restored later, allowing another process to run. Costs include CPU cycles to save/load PCB/TCB and cache misses (L1/L2 and TLB invalidation).',
    tags: ['OS', 'CPU', 'Scheduling'],
  },
  {
    id: 'fc-4',
    deckCategory: 'Operating Systems',
    front: 'Difference between Process and Thread?',
    back: 'A Process is an executing instance of a program with its own independent memory space (heap, stack, code, data). A Thread is a lightweight unit of execution within a process that shares the heap, global variables, and open files with sibling threads, but possesses its own stack and registers.',
    tags: ['OS', 'Processes', 'Threads'],
  },

  // DBMS (4)
  {
    id: 'fc-5',
    deckCategory: 'DBMS',
    front: 'Explain the 4 ACID properties of relational databases.',
    back: 'Atomicity: All operations in a transaction succeed or all fail.\nConsistency: Data transitions from one valid state to another satisfying constraints.\nIsolation: Concurrent transactions execute independently without dirty reads or conflicts.\nDurability: Committed data is permanently saved even in case of crash.',
    tags: ['DBMS', 'Transactions', 'ACID'],
  },
  {
    id: 'fc-6',
    deckCategory: 'DBMS',
    front: 'B-Tree vs Hash Index: When to use which?',
    back: 'B-Tree (and B+Tree) indices keep keys sorted in balanced order, supporting fast point lookups (O(log N)) AND range queries (e.g. BETWEEN, >, <, ORDER BY). Hash indices provide O(1) point lookups for equality (=) but cannot support range queries.',
    tags: ['DBMS', 'Indexing', 'B-Tree'],
  },
  {
    id: 'fc-7',
    deckCategory: 'DBMS',
    front: 'Explain the 4 SQL Transaction Isolation Levels and their phenomena.',
    back: '1. Read Uncommitted: vulnerable to Dirty Reads.\n2. Read Committed: avoids dirty reads; vulnerable to Non-Repeatable Reads.\n3. Repeatable Read: avoids non-repeatable reads; vulnerable to Phantom Reads.\n4. Serializable: strictest, eliminates all anomalies via strict locking or MVCC SSI.',
    tags: ['DBMS', 'Isolation', 'SQL'],
  },
  {
    id: 'fc-8',
    deckCategory: 'DBMS',
    front: 'What is the CAP Theorem in distributed databases?',
    back: 'In a distributed data store, you can only guarantee at most 2 out of 3 properties under network partitions:\n- Consistency (every read receives most recent write)\n- Availability (every non-failing node returns a response)\n- Partition Tolerance (system continues despite message loss or delays). Since networks are unreliable, you must choose CP or AP.',
    tags: ['DBMS', 'Distributed Systems', 'CAP'],
  },

  // Computer Networks (4)
  {
    id: 'fc-9',
    deckCategory: 'Computer Networks',
    front: 'Explain the TCP 3-Way Handshake step-by-step.',
    back: '1. SYN: Client sends SYN packet with an initial sequence number (ISN_c) to the server.\n2. SYN-ACK: Server responds with SYN packet (ISN_s) and ACK (ISN_c + 1).\n3. ACK: Client sends ACK (ISN_s + 1). Connection is established and data transfer begins.',
    tags: ['Networks', 'TCP', 'Protocols'],
  },
  {
    id: 'fc-10',
    deckCategory: 'Computer Networks',
    front: 'TCP vs UDP: Key differences and use cases?',
    back: 'TCP is connection-oriented, reliable (guaranteed delivery, ordered packets, retransmission, flow/congestion control), higher overhead. Ideal for HTTP, email, file transfers.\nUDP is connectionless, unreliable (fire and forget, no ordering), low latency, minimal overhead. Ideal for VoIP, live video streaming, DNS, online gaming.',
    tags: ['Networks', 'TCP', 'UDP'],
  },
  {
    id: 'fc-11',
    deckCategory: 'Computer Networks',
    front: 'What happens during a DNS Lookup when typing google.com?',
    back: '1. Browser cache check -> OS cache check -> Router cache check.\n2. Query Recursive DNS Resolver (ISP/Cloudflare).\n3. Resolver queries Root Nameserver (.) -> returns .com TLD server.\n4. Resolver queries TLD Nameserver (.com) -> returns google.com Authoritative Nameserver.\n5. Resolver queries Authoritative Nameserver -> gets IP address (A/AAAA record) and caches it.',
    tags: ['Networks', 'DNS', 'Internet'],
  },
  {
    id: 'fc-12',
    deckCategory: 'Computer Networks',
    front: 'WebSockets vs Server-Sent Events (SSE) vs Long Polling?',
    back: '- Long Polling: Client sends HTTP request, server holds it until new data arrives, then responds and connection closes. High HTTP overhead.\n- SSE: Unidirectional (server-to-client) streaming over single persistent HTTP connection. Built-in reconnection.\n- WebSockets: Full-duplex bidirectional persistent connection over a single TCP socket after HTTP upgrade handshake. Lowest latency for 2-way real-time data.',
    tags: ['Networks', 'WebSockets', 'HTTP'],
  },

  // Concurrency (4)
  {
    id: 'fc-13',
    deckCategory: 'Concurrency',
    front: 'What is a Race Condition and how is it prevented?',
    back: 'A Race Condition occurs when multiple threads or processes concurrently read and write shared data, and the final outcome depends on the nondeterministic timing/interleaving of execution. Prevented by Mutual Exclusion (Mutex locks, Semaphores, Atomic CAS operations, or Immutable data structures).',
    tags: ['Concurrency', 'Synchronization'],
  },
  {
    id: 'fc-14',
    deckCategory: 'Concurrency',
    front: 'Mutex vs Semaphore: What is the fundamental difference?',
    back: 'A Mutex (Mutual Exclusion) is a locking mechanism with ownership: only the thread that acquired the mutex can unlock it (binary lock).\nA Semaphore is a signaling mechanism using a counter: multiple threads can access up to N resources concurrently. Any thread can signal (increment) or wait on (decrement) the semaphore without strict ownership.',
    tags: ['Concurrency', 'Mutex', 'Semaphore'],
  },
  {
    id: 'fc-15',
    deckCategory: 'Concurrency',
    front: 'Optimistic vs Pessimistic Concurrency Control?',
    back: '- Pessimistic Locking: Assumes conflicts will happen; locks records upfront (e.g. SELECT FOR UPDATE) preventing any concurrent writes/reads. Better for high-contention writes.\n- Optimistic Locking: Assumes conflicts are rare; allows reads/writes without locks, but validates a version number before commit. If version changed, transaction aborts and retries. Higher throughput under low-to-medium contention.',
    tags: ['Concurrency', 'Databases', 'Locking'],
  },
  {
    id: 'fc-16',
    deckCategory: 'Concurrency',
    front: 'What is the ABA Problem in lock-free programming?',
    back: 'In atomic Compare-And-Swap (CAS), a thread reads value A, gets preempted while other threads change A -> B -> A. When the original thread resumes, CAS checks value, sees A, and wrongly assumes nothing changed. Solved by tagged pointers / generational counters (storing {value, version}).',
    tags: ['Concurrency', 'Lock-Free', 'CAS'],
  },

  // OOPs & Software Architecture (4)
  {
    id: 'fc-17',
    deckCategory: 'OOPs',
    front: 'Explain the SOLID principles in Object-Oriented Design.',
    back: 'S - Single Responsibility: A class should have only one reason to change.\nO - Open/Closed: Open for extension, closed for modification.\nL - Liskov Substitution: Subtypes must be substitutable for their base types without altering correctness.\nI - Interface Segregation: Clients should not be forced to depend on interfaces they do not use.\nD - Dependency Inversion: Depend on abstractions, not concretions.',
    tags: ['OOPs', 'SOLID', 'Design Patterns'],
  },
  {
    id: 'fc-18',
    deckCategory: 'OOPs',
    front: 'Why prefer Composition over Inheritance?',
    back: 'Inheritance creates tight compile-time coupling between parent and child ("white-box reuse"), breaks encapsulation, and can lead to fragile base class hierarchies. Composition ("has-a") achieves runtime flexibility by combining independent objects via interfaces, making code easier to test, mock, and refactor.',
    tags: ['OOPs', 'Architecture', 'Clean Code'],
  },
  {
    id: 'fc-19',
    deckCategory: 'OOPs',
    front: 'What is Dependency Injection (DI) and Inversion of Control (IoC)?',
    back: 'Inversion of Control (IoC) is a design principle where the control flow of a program is inverted (e.g., a framework calls your code instead of your code calling libraries). Dependency Injection is a design pattern implementing IoC where an object receives its dependencies from an external assembler/injector rather than creating them itself with "new".',
    tags: ['OOPs', 'Design Patterns', 'IoC'],
  },
  {
    id: 'fc-20',
    deckCategory: 'OOPs',
    front: 'What is the difference between Polymorphism and Encapsulation?',
    back: 'Encapsulation is bundling data and the methods that operate on that data inside a class, while restricting direct access to internal components (via private/protected access modifiers) to maintain invariant integrity.\nPolymorphism allows objects of different classes to respond to the same method invocation in their own specific way (compile-time overloading or runtime method overriding).',
    tags: ['OOPs', 'Foundations'],
  },
];


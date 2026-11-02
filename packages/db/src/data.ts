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

import { THEORY_OS_30 } from './data/theory-os';
import { THEORY_DBMS_30 } from './data/theory-dbms';
import { THEORY_NETWORKS_30 } from './data/theory-networks';
import { THEORY_OOPS_30 } from './data/theory-oops';
import { THEORY_SYSTEMDESIGN_30 } from './data/theory-systemdesign';

export * from './data/theory-os';
export * from './data/theory-dbms';
export * from './data/theory-networks';
export * from './data/theory-oops';
export * from './data/theory-systemdesign';

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

export const THEORY_QUESTIONS_150: SeedFlashcard[] = [
  ...THEORY_OS_30,
  ...THEORY_DBMS_30,
  ...THEORY_NETWORKS_30,
  ...THEORY_OOPS_30,
  ...THEORY_SYSTEMDESIGN_30,
];

export const SEED_FLASHCARDS: SeedFlashcard[] = [...THEORY_QUESTIONS_150];

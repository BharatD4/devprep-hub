import { SeedFlashcard } from '../data';

export const THEORY_SYSTEMDESIGN_30: SeedFlashcard[] = [
  {
    id: 'sd-q1',
    deckCategory: 'System Design',
    front: 'Monolith vs Microservices: When should you transition to microservices?',
    back: `• **Monolithic Architecture**:
  - Single unified codebase and shared database.
  - *Pros*: Simple local debugging, straightforward deployment, fast in-memory function calls, ACID transactions.
  - *Cons*: Single point of failure, entire app redeploys on small changes, large team merge conflicts, cannot scale components independently.
• **Microservices Architecture**:
  - Suite of small, autonomous, decoupled services communicating over HTTP/gRPC.
  - *Pros*: Independent deployment cycles, horizontal scaling of bottleneck services, technology polyglot.
  - *Cons*: Distributed system complexity (network partitions, distributed transactions, eventual consistency, distributed tracing).
• **Rule of Thumb**: Start with a well-modularized Monolith! Only transition to Microservices when organizational team size (>50 engineers) or distinct scaling bottlenecks demand independent deployment.`,
    tags: ['System Design', 'Microservices', 'Monolith', 'Architecture'],
  },
  {
    id: 'sd-q2',
    deckCategory: 'System Design',
    front: 'REST vs GraphQL vs gRPC: Compare protocol, serialization, and ideal use cases.',
    back: `| Dimension | REST | GraphQL | gRPC |
|---|---|---|---|
| **Protocol** | HTTP/1.1 or HTTP/2 | HTTP/1.1 or HTTP/2 | **HTTP/2 exclusively** (Multiplexing, streaming) |
| **Data Format** | JSON (Text) | JSON (Text) | **Protocol Buffers (Protobuf)** (Binary compact) |
| **Data Fetching** | Fixed endpoints (Over-fetching & Under-fetching risk) | Client queries **exact fields needed** in 1 request | Strongly typed RPC methods |
| **Performance** | Moderate | Moderate (Query parsing overhead) | **Ultra-Fast (7-10x faster than REST)** |
| **Streaming** | Hard (SSE/Polling) | Subscriptions (via WebSockets) | Native Bidirectional Client/Server Streaming |
| **Ideal For** | Public APIs, CRUD web services | Mobile apps with variable UI data needs | Internal high-throughput Microservice-to-Microservice IPC |`,
    tags: ['System Design', 'APIs', 'REST', 'GraphQL', 'gRPC'],
  },
  {
    id: 'sd-q3',
    deckCategory: 'System Design',
    front: 'Horizontal vs Vertical Scaling: Costs, limits, and operational tradeoffs.',
    back: `• **Vertical Scaling (Scale Up)**:
  - Adding more CPU, RAM, or SSD storage to an existing single machine.
  - *Pros*: Zero architectural complexity, no distributed consistency or network partitioning issues.
  - *Cons*: Hard physical hardware ceiling; exponentially expensive; requires downtime for hardware upgrades; single point of failure.
• **Horizontal Scaling (Scale Out)**:
  - Adding more commodity machines to a cluster pool behind a Load Balancer.
  - *Pros*: Theoretically infinite scale; high availability and fault tolerance (if one node crashes, traffic reroutes).
  - *Cons*: Requires stateless application tier; distributed data consistency challenges; complex deployment orchestration (Kubernetes).`,
    tags: ['System Design', 'Scaling', 'Horizontal', 'Vertical'],
  },
  {
    id: 'sd-q4',
    deckCategory: 'System Design',
    front: 'Explain Load Balancing Algorithms: Round Robin, Weighted, Least Connections, and IP Hash.',
    back: `1. **Round Robin**: Distributes requests sequentially in circular order ($1 \\to 2 \\to 3 \\to 1$). Assumes all servers have identical hardware capacity.
2. **Weighted Round Robin**: Servers with higher compute capacity receive proportionally more requests (e.g. Server A weight 3 gets 3 requests for every 1 request on Server B).
3. **Least Connections**: Directs incoming requests to the server currently processing the fewest active connections. Best for long-lived sessions (WebSockets, video streams).
4. **Weighted Least Connections**: Combines server capacity weighting with current active connection count.
5. **IP Hash**: Hashes client IP modulo number of servers: $\\text{Hash}(\\text{IP}) \\% N$. Guarantees the same client always reaches the same backend server (stateless session stickiness).`,
    tags: ['System Design', 'Load Balancing', 'Algorithms', 'High Availability'],
  },
  {
    id: 'sd-q5',
    deckCategory: 'System Design',
    front: 'Layer 4 (L4) vs Layer 7 (L7) Load Balancers: Contrasting packet routing intelligence.',
    back: `• **Layer 4 (Transport Layer) Load Balancer**:
  - Operates on IP address and TCP/UDP ports without inspecting packet payload.
  - Does NOT decrypt TLS or inspect HTTP headers.
  - *Pros*: Ultra-high throughput (millions of packets/sec), minimal CPU and memory overhead.
  - *Examples*: AWS NLB (Network Load Balancer), HAProxy in TCP mode, IPVS.
• **Layer 7 (Application Layer) Load Balancer**:
  - Terminate TLS, parses the full HTTP request (URL paths, headers, cookies).
  - Can route traffic intelligently (e.g. \`/api/video\` $\\to$ Video Cluster, \`/api/billing\` $\\to$ Payment Cluster).
  - *Examples*: AWS ALB (Application Load Balancer), Nginx, Envoy, Traefik.`,
    tags: ['System Design', 'Load Balancing', 'L4 vs L7', 'Networking'],
  },
  {
    id: 'sd-q6',
    deckCategory: 'System Design',
    front: 'Detail the 4 primary Caching Strategies: Cache-Aside, Read-Through, Write-Through, and Write-Back.',
    back: `1. **Cache-Aside (Lazy Loading)**:
   - Application queries cache. On cache miss, application queries database, writes data into cache, and returns it.
   - *Pros*: Cache only holds requested data; resilient to cache node restarts.
2. **Read-Through**:
   - Application treats cache as the primary data store. The cache library transparently fetches from DB on miss.
3. **Write-Through**:
   - Application writes to cache; cache immediately writes synchronously to database before returning success.
   - *Pros*: Zero stale cache reads. *Cons*: Higher write latency.
4. **Write-Back (Write-Behind)**:
   - Application writes to cache; cache acknowledges immediately, and asynchronously flushes writes to DB in background batches.
   - *Pros*: Blazingly fast write performance. *Cons*: Risk of data loss if cache crashes before flushing to disk!`,
    tags: ['System Design', 'Caching', 'Cache-Aside', 'Write-Through', 'Write-Back'],
  },
  {
    id: 'sd-q7',
    deckCategory: 'System Design',
    front: 'Explain Cache Invalidation Hazards: Cache Stampede (Thundering Herd), Cache Penetration, and Cache Breakdown.',
    back: `1. **Cache Stampede / Thundering Herd**: A popular key expires; thousands of concurrent requests miss cache simultaneously and bombard the database, causing DB CPU collapse!
   - *Fix*: Mutual exclusion lock (**Mutex / Singleflight**) so only 1 thread queries DB while others wait; or **Probabilistic Early Expiration (XFetch)**.
2. **Cache Penetration**: Requests for non-existent keys (e.g. \`id = -999\`) bypass cache and repeatedly hit DB.
   - *Fix*: **Bloom Filter** at entry, or cache \`null\` values with short TTL.
3. **Cache Breakdown**: A single super-hot key expires; all traffic hits database.
   - *Fix*: Never set hard expiry on hot keys; update asynchronously in background.
4. **Cache Avalanche**: Many keys share the exact same TTL and expire at the same second.
   - *Fix*: Add random jitter to TTL (\`TTL = 3600 + rand(0, 300)\`).`,
    tags: ['System Design', 'Caching', 'Cache Stampede', 'Thundering Herd'],
  },
  {
    id: 'sd-q8',
    deckCategory: 'System Design',
    front: 'Message Queues: Apache Kafka vs RabbitMQ architectural differences.',
    back: `| Feature | Apache Kafka | RabbitMQ |
|---|---|---|
| **Paradigm** | **Distributed Commit Log (Pull model)** | **Smart Broker / Dumb Consumer (Push model)** |
| **Data Retention** | Persisted on disk for days/weeks. Consumers can replay historical offsets. | Messages deleted from queue once acknowledged by consumer |
| **Throughput** | **Millions of events/sec** (sequential disk I/O, zero-copy kernel transfer) | Tens of thousands of messages/sec |
| **Routing** | Simple topic partition routing | Complex routing topologies (Exchange types: Direct, Topic, Fanout, Headers) |
| **Ordering** | Guaranteed strict order **within a single partition** | Ordering per queue |
| **Use Cases** | Event streaming, log aggregation, event-driven microservice backbones | Task queues, complex background job scheduling, point-to-point RPC |`,
    tags: ['System Design', 'Kafka', 'RabbitMQ', 'Message Queues'],
  },
  {
    id: 'sd-q9',
    deckCategory: 'System Design',
    front: 'What is API Idempotency and how do you implement Idempotency Keys?',
    back: `An API endpoint is **Idempotent** if making the same request multiple times produces the exact same side-effects as making it once ($f(f(x)) = f(x)$).
- HTTP Methods: \`GET\`, \`PUT\`, \`DELETE\` are idempotent by specification. \`POST\` is NOT.
**Implementing Idempotency Keys (e.g. Stripe Payments)**:
1. Client generates unique UUID **\`Idempotency-Key: 123e4567-e89b\`** in HTTP header.
2. Server acquires atomic lock in Redis: \`SET lock:123e4567 "processing" NX EX 120\`.
   - If key already exists with status "completed", server immediately returns the cached response!
   - If key exists with "processing", server returns \`409 Conflict\` or waits.
3. Server processes payment, writes transaction to DB, stores response in Redis with 24h TTL, and releases lock. Prevents double-charging customers on network retries!`,
    tags: ['System Design', 'Idempotency', 'APIs', 'Distributed Systems'],
  },
  {
    id: 'sd-q10',
    deckCategory: 'System Design',
    front: 'Compare Rate Limiting Algorithms: Token Bucket, Leaky Bucket, and Sliding Window Counter.',
    back: `1. **Token Bucket**: Tokens are added to bucket at steady rate $r$ up to capacity $b$. Each request consumes 1 token. If empty, request is dropped (\`429\`).
   - *Pros*: Supports **bursty traffic** up to capacity $b$. Memory efficient.
2. **Leaky Bucket**: Requests enter FIFO queue and leak out at a constant fixed rate. If queue overflows, requests drop.
   - *Pros*: Smooths traffic; outputs strict constant rate.
3. **Fixed Window Counter**: Divides time into fixed 1-minute blocks.
   - *Pitfall*: Vulnerable to $2x$ traffic spikes at window boundaries!
4. **Sliding Window Counter**: Hybrid combining current window and previous window weighted by elapsed percentage:
   $$\\text{Count} = \\text{CurrentWindowCount} + \\text{PrevWindowCount} \\times (1 - \\text{elapsed}\\%)$$
   - Smooths boundaries with $O(1)$ memory.`,
    tags: ['System Design', 'Rate Limiting', 'Token Bucket', 'Algorithms'],
  },
  {
    id: 'sd-q11',
    deckCategory: 'System Design',
    front: 'How does Consistent Hashing work and why are Virtual Nodes used?',
    back: `In naive distributed caching: $\\text{Server} = \\text{Hash}(\\text{Key}) \\% N$. Adding or removing a server changes $N$, causing almost **100% of keys to re-hash and miss cache**!
• **Consistent Hashing**:
  - Maps both Servers and Keys to a circular hash ring of range $[0, 2^{32} - 1]$.
  - A key is assigned to the first server encountered moving clockwise.
  - When a server is added or removed, only $1/N$ of keys are moved on average!
• **Virtual Nodes**:
  - *Problem*: Real servers can distribute non-uniformly on the ring, causing uneven hot spots.
  - *Solution*: Map each physical server to 100-200 **Virtual Nodes** across the ring. Guarantees balanced load distribution and seamless failover.`,
    tags: ['System Design', 'Consistent Hashing', 'Distributed Caching', 'Virtual Nodes'],
  },
  {
    id: 'sd-q12',
    deckCategory: 'System Design',
    front: 'What is a Bloom Filter? How does it guarantee Zero False Negatives?',
    back: `A **Bloom Filter** is a space-efficient probabilistic data structure used to test whether an element is a member of a set.
• **Properties**:
  - **Zero False Negatives**: If it returns "No", the element is **definitely NOT** in the set!
  - **False Positives Possible**: If it returns "Yes", the element is **probably** in the set.
• **How it works**:
  - Bit array of size $m$ initialized to all 0s, and $k$ independent hash functions.
  - **Insert**: Hash key with all $k$ hashes, set matching bits to 1.
  - **Query**: Hash key; if ANY of the $k$ bit positions is 0, element is 100% guaranteed NOT present!
• *Use Cases*: Google Bigtable (prevents reading SSTables from disk for missing keys), Chrome malicious URL checking.`,
    tags: ['System Design', 'Bloom Filter', 'Probabilistic', 'Data Structures'],
  },
  {
    id: 'sd-q13',
    deckCategory: 'System Design',
    front: 'Distributed Transactions: Two-Phase Commit (2PC) vs SAGA Pattern.',
    back: `• **Two-Phase Commit (2PC)**:
  - *Phase 1 (Prepare)*: Coordinator asks all participants to vote and acquire locks.
  - *Phase 2 (Commit)*: If all vote YES, coordinator broadcasts COMMIT; otherwise ABORT.
  - *Downside*: Blocking protocol; high latency; coordinator is single point of failure; poor scalability.
• **SAGA Pattern (Eventual Consistency)**:
  - Series of local transactions. Each transaction updates its local database and publishes an event.
  - If a step fails, the Saga executes **Compensating Transactions** backwards to undo previous changes!
  - Two styles: **Choreography** (services react to each other\'s events) vs **Orchestration** (central orchestrator coordinates steps).
  - Highly scalable and non-blocking.`,
    tags: ['System Design', 'Distributed Transactions', '2PC', 'SAGA'],
  },
  {
    id: 'sd-q14',
    deckCategory: 'System Design',
    front: 'Explain the Circuit Breaker Pattern and its 3 states.',
    back: `Prevents cascading failures in microservices when an upstream dependency is failing or unresponsive.
**3 Operational States**:
1. **Closed (Normal)**: Requests pass through to remote service. If failure rate exceeds threshold (e.g. 50% errors over 10s), circuit trips to **Open**.
2. **Open (Failing)**: Requests fail immediately **without calling remote service** (fail-fast fallback). Prevents thread exhaustion and gives remote service time to recover.
3. **Half-Open (Testing)**: After a cooldown sleep window (e.g. 30s), a limited number of trial requests are permitted to pass.
   - If trials succeed $\\to$ Circuit resets to **Closed**.
   - If trials fail $\\to$ Circuit trips back to **Open**.`,
    tags: ['System Design', 'Circuit Breaker', 'Fault Tolerance', 'Microservices'],
  },
  {
    id: 'sd-q15',
    deckCategory: 'System Design',
    front: 'What is Database Replication Lag and how do you guarantee "Read-Your-Own-Writes"?',
    back: `In Master-Slave architectures, writes go to Primary and replicate **asynchronously** to Read Replicas.
• **Replication Lag**: Temporary delay (milliseconds to seconds) before a replica catches up to primary.
• **Problem**: A user updates their profile, browser refreshes, queries replica, and displays old data!
• **Solutions for "Read-Your-Own-Writes"**:
  1. Route reads for a user's *own* profile to the **Primary DB** for 5-10 seconds after any write.
  2. Track client update timestamp/version and ensure replica's replication LSN (Log Sequence Number) $\\ge$ write LSN before serving read.`,
    tags: ['System Design', 'Replication Lag', 'Databases', 'Consistency'],
  },
  {
    id: 'sd-q16',
    deckCategory: 'System Design',
    front: 'What is Little\'s Law and how does it relate Concurrency, Throughput, and Latency?',
    back: `**Little\'s Law** states that the long-term average number of requests $L$ in a stationary queueing system is equal to the arrival rate $\\lambda$ multiplied by the average latency $W$:
$$L = \\lambda \\times W$$
- $L$ = Concurrency (number of requests currently being processed in system).
- $\\lambda$ = Throughput (requests per second, RPS).
- $W$ = Average response time (latency in seconds).
**Practical Sizing Example**:
- If an API receives 5,000 RPS ($\\lambda = 5000$) and average response latency is 200 ms ($W = 0.2$ s):
  $$L = 5000 \\times 0.2 = 1,000\\text{ concurrent threads / connections required!}$$
Helps correctly size backend server thread pools and database connections.`,
    tags: ['System Design', 'Littles Law', 'Capacity Planning', 'Latency'],
  },
  {
    id: 'sd-q17',
    deckCategory: 'System Design',
    front: 'Kubernetes Health Checks: Liveness Probes vs Readiness Probes vs Startup Probes.',
    back: `• **Liveness Probe**:
  - Detects if the application is deadlocked or in an unrecoverable corrupted state.
  - *Action on Failure*: Kubernetes **restarts / kills the container**.
• **Readiness Probe**:
  - Detects if the application is ready to accept incoming user traffic (e.g. warmed up caches, established DB pools).
  - *Action on Failure*: Kubernetes **removes the pod from the Service Load Balancer endpoints** (stops routing traffic), but does NOT kill the pod!
• **Startup Probe**:
  - Disables Liveness and Readiness probes until slow legacy apps finish bootup, preventing premature restarts.`,
    tags: ['System Design', 'Kubernetes', 'DevOps', 'Health Checks'],
  },
  {
    id: 'sd-q18',
    deckCategory: 'System Design',
    front: 'Blue-Green Deployment vs Canary Deployment: Operational comparison.',
    back: `• **Blue-Green Deployment**:
  - Two identical production environments: **Blue** (active live version) and **Green** (idle staging version).
  - Deploy new version to Green; run full integration tests.
  - Switch router / load balancer traffic 100% from Blue to Green instantaneously.
  - *Pros*: Instant zero-downtime cutover; instant rollback. *Cons*: Requires $2x$ full infrastructure cost.
• **Canary Deployment**:
  - Gradually rolls out new version to a small subset of real users (e.g. 5% traffic).
  - Monitors error rates, latency, and CPU metrics.
  - Incrementally increases to 25% $\\to$ 50% $\\to$ 100% if healthy.
  - *Pros*: Limits blast radius of bugs on real users.`,
    tags: ['System Design', 'Deployments', 'CI/CD', 'DevOps'],
  },
  {
    id: 'sd-q19',
    deckCategory: 'System Design',
    front: 'What is the Bulkhead Pattern in resilient software architecture?',
    back: `Named after the watertight partition compartments of a submarine or ship: if one compartment floods, only that section fills with water, preventing the entire vessel from sinking.
• **Application in Software**:
  - Partition critical resources (thread pools, memory, CPU, connection pools) into isolated pools per dependency.
  - *Example*: If an e-commerce platform uses one global thread pool for all requests, a slow 3rd-party shipping API will saturate all threads, causing checkout and login to hang!
  - *With Bulkheads*: Allocate dedicated thread pool of 20 threads for shipping API. If shipping hangs, only those 20 threads block; checkout and login continue operating smoothly.`,
    tags: ['System Design', 'Bulkhead', 'Resilience', 'Fault Tolerance'],
  },
  {
    id: 'sd-q20',
    deckCategory: 'System Design',
    front: 'Serverless (FaaS) vs Containerized Microservices: Architectural and cost trade-offs.',
    back: `• **Serverless Functions (AWS Lambda, Cloudflare Workers)**:
  - Event-driven execution; automatic horizontal scaling from 0 to thousands of instances.
  - Pay strictly per millisecond of compute time. Zero idle server costs.
  - *Downsides*: **Cold start latency** (JVM/Python); execution duration limits (15 min); stateless only (hard to maintain persistent connection pools).
• **Containerized Microservices (Docker / Kubernetes)**:
  - Long-running processes; persistent in-memory caching and connection pooling.
  - Predictable latency with zero cold starts.
  - *Downsides*: Pay for idle node compute capacity; operational cluster management overhead.`,
    tags: ['System Design', 'Serverless', 'Containers', 'Cloud'],
  },
  {
    id: 'sd-q21',
    deckCategory: 'System Design',
    front: 'What are the core responsibilities of an API Gateway in microservices?',
    back: `An **API Gateway** acts as the single reverse-proxy entry point for all client requests:
1. **Routing & Aggregation**: Routes incoming requests to target backend microservices; aggregates responses from multiple services.
2. **Authentication & Authorization**: Validates JWTs / OAuth tokens at the edge, offloading security verification from individual backend services.
3. **Rate Limiting & Throttling**: Protects downstream services from traffic spikes and DDoS attacks.
4. **SSL/TLS Termination**: Decrypts HTTPS at the gateway.
5. **Observability & Logging**: Injects unique \`X-Trace-Id\` correlation headers, records latency metrics and centralized request logs.`,
    tags: ['System Design', 'API Gateway', 'Microservices', 'Architecture'],
  },
  {
    id: 'sd-q22',
    deckCategory: 'System Design',
    front: 'Distributed Session Management: Sticky Sessions vs Centralized Store vs JWT.',
    back: `1. **Sticky Sessions (Load Balancer Affinity)**:
   - Load balancer routes requests from the same user to the exact same backend server using a cookie hash.
   - *Downside*: If that specific server crashes, user sessions are lost! Uneven traffic distribution.
2. **Centralized Session Store (Redis / Memcached)**:
   - Backend servers are 100% stateless. Any server can process any request by reading session data from centralized Redis cluster in sub-millisecond time.
   - *Industry Standard* for secure, revocable web sessions!
3. **Client-Side JWTs**:
   - Session data encoded directly in client token. Zero database lookups.
   - *Downside*: Hard to invalidate immediately before token expiry.`,
    tags: ['System Design', 'Sessions', 'Authentication', 'State Management'],
  },
  {
    id: 'sd-q23',
    deckCategory: 'System Design',
    front: 'Thread Pool Architecture: How do you tune Core Pool Size, Max Pool Size, and Queue Capacity?',
    back: `• **CPU-Bound Tasks** (Mathematical computations, image processing, encryption):
  $$\\text{Optimal Threads} = N_{\\text{CPU}} + 1$$
  *(More threads cause excessive context switching overhead without increasing throughput)*.
• **I/O-Bound Tasks** (Database queries, HTTP calls, disk reads):
  $$\\text{Optimal Threads} = N_{\\text{CPU}} \\times \\left(1 + \\frac{\\text{Wait Time}}{\\text{Compute Time}}\\right)$$
  *(Threads spend 90% of time idle waiting for I/O, so higher thread counts maximize CPU utilization)*.
• **Rejection Handlers**: When queue fills up, fallback handlers execute: \`AbortPolicy\` (throws exception), \`CallerRunsPolicy\` (calling thread executes task, throttling producer).`,
    tags: ['System Design', 'Concurrency', 'Thread Pools', 'Performance'],
  },
  {
    id: 'sd-q24',
    deckCategory: 'System Design',
    front: 'What is Amdahl\'s Law and how does it bound parallel speedup?',
    back: `**Amdahl\'s Law** predicts the theoretical maximum speedup of a program when using multiple processors:
$$\\text{Speedup} = \\frac{1}{(1 - P) + \\frac{P}{N}}$$
- $P$ = Proportion of program that can be parallelized.
- $(1 - P)$ = Serial portion of program that MUST execute sequentially.
- $N$ = Number of processing cores.
**Critical Takeaway**:
Even with an infinite number of CPU cores ($N \\to \\infty$), the maximum possible speedup is bounded by $\\frac{1}{1 - P}$!
*If only 90% of your code is parallelizable ($P = 0.90$), you can NEVER achieve more than a $10x$ speedup, even with 100,000 cores!*`,
    tags: ['System Design', 'Amdahls Law', 'Parallel Computing', 'Concurrency'],
  },
  {
    id: 'sd-q25',
    deckCategory: 'System Design',
    front: 'How does Distributed Tracing work? Explain Trace ID, Span ID, and OpenTelemetry.',
    back: `In microservices, a single user click may trigger requests across 15 different services, message queues, and databases.
• **Distributed Tracing**:
  1. An entry API Gateway generates a globally unique **\`Trace ID\`**.
  2. Each service invocation creates a **\`Span ID\`** representing a timed unit of work, referencing its \`Parent Span ID\`.
  3. Context is propagated across network calls using HTTP headers (\`traceparent: 00-4bf92f35...-00f067aa...-01\`).
  4. Services asynchronously ship span telemetry to collectors (Jaeger, Zipkin, OpenTelemetry).
• **Benefit**: Visual flame graphs showing exact latency bottlenecks and root cause failures across distributed networks!`,
    tags: ['System Design', 'Observability', 'Distributed Tracing', 'OpenTelemetry'],
  },
  {
    id: 'sd-q26',
    deckCategory: 'System Design',
    front: 'What are Disaster Recovery Metrics: RTO (Recovery Time Objective) vs RPO (Recovery Point Objective)?',
    back: `• **RTO (Recovery Time Objective)**:
  - The maximum acceptable duration of system downtime after a disaster strikes.
  - *"How quickly must the system be restored to operational status?"*
  - Example: RTO of 1 hour means the service must be back online within 60 minutes.
• **RPO (Recovery Point Objective)**:
  - The maximum acceptable volume of data loss measured in time backward from the disaster.
  - *"How much data can the business afford to lose?"*
  - Example: If database backups run every night at midnight and a crash occurs at 2 PM, RPO is 14 hours of lost transactions. Continuous WAL replication achieves near zero RPO.`,
    tags: ['System Design', 'Disaster Recovery', 'RTO', 'RPO', 'High Availability'],
  },
  {
    id: 'sd-q27',
    deckCategory: 'System Design',
    front: 'What is Semantic Versioning (SemVer) and how does it prevent breaking API changes?',
    back: `**Semantic Versioning** uses the format \`MAJOR.MINOR.PATCH\` (e.g. \`v2.4.1\`):
1. **MAJOR version**: Incremented on **incompatible, breaking API changes** (e.g. removing fields, renaming endpoints). Clients must update code.
2. **MINOR version**: Incremented on **backward-compatible new functionality** (e.g. adding optional parameters).
3. **PATCH version**: Incremented on **backward-compatible bug fixes**.
• **API Evolution Best Practice**: Never break \`v1\`! Introduce breaking changes on a parallel namespace (e.g. \`/api/v2\`) with deprecation headers (\`Sunset: Wed, 11 Nov 2026\`).`,
    tags: ['System Design', 'APIs', 'SemVer', 'Best Practices'],
  },
  {
    id: 'sd-q28',
    deckCategory: 'System Design',
    front: 'How do you design a Distributed Lock using Redis (Redlock algorithm)?',
    back: `A distributed lock ensures mutual exclusion across separate processes running on multiple physical machines.
• **Single-Node Redis Lock**:
\`\`\`bash
SET lock_key unique_token NX PX 10000
\`\`\`
- \`NX\`: Only set if not already existing.
- \`PX 10000\`: Auto-expire after 10 seconds to prevent permanent deadlocks if the holding node crashes.
- \`unique_token\`: Random UUID so a process only releases its OWN lock via Lua script (verifies token before deleting).
• **Redlock Algorithm (Multi-Master Redis)**:
  - Client attempts to acquire lock across $N$ (e.g. 5) independent Redis masters.
  - Lock is acquired if client acquires lock on a majority ($\\ge 3$) nodes within timeout.`,
    tags: ['System Design', 'Distributed Locks', 'Redis', 'Redlock'],
  },
  {
    id: 'sd-q29',
    deckCategory: 'System Design',
    front: 'What is Eventual Consistency and what are Conflict-Free Replicated Data Types (CRDTs)?',
    back: `• **Eventual Consistency**: A consistency model where, if no new updates are made, all replicas will eventually converge to identical values. Guarantees high availability and partition tolerance.
• **Conflict-Free Replicated Data Types (CRDTs)**:
  - Mathematical data structures (counters, sets, registers, text buffers) that can be replicated across multiple nodes and updated independently without central coordination or locks!
  - Replicas can always merge concurrent conflicting updates deterministically and mathematically guarantee convergence without conflicts.
  - *Used in*: Collaborative editors (Google Docs, Figma), distributed chat, Apple Notes sync.`,
    tags: ['System Design', 'Eventual Consistency', 'CRDTs', 'Distributed Systems'],
  },
  {
    id: 'sd-q30',
    deckCategory: 'System Design',
    front: 'What are Feature Flags and how do they enable Trunk-Based Continuous Deployment?',
    back: `**Feature Flags (Feature Toggles)** allow software features to be enabled or disabled dynamically at runtime without deploying new code.
**Benefits**:
1. **Decouples Deployment from Release**: Code can be safely merged into \`main\` and deployed to production continuously while dark/hidden behind a disabled flag.
2. **Instant Kill Switch**: If a newly released feature causes an error spike, toggling the flag to \`false\` disables the feature instantly (in <1s) without triggering an emergency hotfix rollback!
3. **A/B Testing & Targeted Rollouts**: Enable features only for internal employees, beta testers, or specific geographic regions.`,
    tags: ['System Design', 'Feature Flags', 'CI/CD', 'DevOps'],
  },
];

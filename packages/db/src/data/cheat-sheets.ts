export interface ConceptArticle {
  id: string;
  category: 'DSA' | 'System Design' | 'OS' | 'DBMS' | 'Networks';
  title: string;
  shortSummary: string;
  formulas: string[];
  shortTricks: string[];
  contentMdx: string;
}

export const CONCEPT_CHEAT_SHEETS: ConceptArticle[] = [
  {
    id: 'dsa-sliding-window',
    category: 'DSA',
    title: 'Sliding Window Mastery & Formula Templates',
    shortSummary: 'Universal templates for fixed-size and variable-size sliding windows, runtime complexity, and edge cases.',
    formulas: [
      'Window Size Formula: right - left + 1',
      'Fixed Window: Advance left = i - k + 1 when i >= k - 1',
      'Number of Subarrays with at most K distinct: f(K) - f(K - 1) = exactly K',
      'Time Complexity: O(N) since left and right pointers increment at most N times each'
    ],
    shortTricks: [
      'For "At most K" conditions, window is valid while condition <= K. Every new right pointer adds (right - left + 1) valid subarrays ending at right.',
      'To solve "Exact K", use the reduction: countExact(K) = countAtMost(K) - countAtMost(K - 1). This is 10x easier than tracking exact boundaries directly!',
      'When maximizing window length, only shrink left when the window becomes strictly invalid.',
      'Use a frequency counter / hash map of characters/numbers with an auxiliary `match_count` to achieve O(1) condition checks.'
    ],
    contentMdx: `### Universal Variable-Length Sliding Window Template
\`\`\`python
def variable_sliding_window(nums, k):
    left = 0
    curr_state = 0
    ans = 0 # or float('inf') for min-window
    
    for right in range(len(nums)):
        # 1. Expand window by incorporating nums[right]
        curr_state += nums[right]
        
        # 2. Shrink window from the left while constraint is violated
        while condition_violated(curr_state):
            curr_state -= nums[left]
            left += 1
            
        # 3. Update optimal answer with valid window
        ans = max(ans, right - left + 1)
        
    return ans
\`\`\`

### Universal Fixed-Length Sliding Window Template
\`\`\`python
def fixed_sliding_window(nums, k):
    curr_sum = sum(nums[:k])
    max_sum = curr_sum
    
    for i in range(k, len(nums)):
        curr_sum += nums[i] - nums[i - k] # add entrant, evict departant
        max_sum = max(max_sum, curr_sum)
        
    return max_sum
\`\`\`
`
  },
  {
    id: 'dsa-monotonic-stack',
    category: 'DSA',
    title: 'Monotonic Stack & Queue (Next Greater / Histogram)',
    shortSummary: 'The definitive guide to solving Next Greater Element, Daily Temperatures, Largest Rectangle in Histogram, and Sliding Window Maximum.',
    formulas: [
      'Monotonic Decreasing Stack -> Finds Next Greater Element (NGE)',
      'Monotonic Increasing Stack -> Finds Next Smaller Element (NSE) & Histogram bounds',
      'Total Operations: 2N pushes and pops -> Strictly O(N) runtime',
      'Width of Histogram Bar at index i: (right_boundary - left_boundary - 1)'
    ],
    shortTricks: [
      'Stack always stores INDICES, not just values! Indices allow computing distance, width, and element retrieval in O(1).',
      'For circular array questions, iterate up to 2*N and use `i % n` for the element lookup.',
      'Histogram Trick: Add a dummy 0 height at the very end of the array to automatically flush all remaining bars out of the stack at the conclusion!',
      'For Sliding Window Maximum, use `collections.deque`: discard smaller elements from the back, and discard out-of-boundary indices from the front.'
    ],
    contentMdx: `### Next Greater Element Template (Monotonic Decreasing Stack)
\`\`\`python
def next_greater_element(nums):
    n = len(nums)
    res = [-1] * n
    stack = [] # holds indices
    
    for i in range(n):
        while stack and nums[i] > nums[stack[-1]]:
            prev_idx = stack.pop()
            res[prev_idx] = nums[i]
        stack.append(i)
        
    return res
\`\`\`

### Largest Rectangle in Histogram O(N)
\`\`\`python
def largestRectangleArea(heights):
    heights.append(0) # Sentinel flush trick
    stack = [-1] # Sentinel left boundary
    max_area = 0
    
    for i, h in enumerate(heights):
        while stack and stack[-1] != -1 and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
        
    heights.pop()
    return max_area
\`\`\`
`
  },
  {
    id: 'dsa-binary-search-on-answer',
    category: 'DSA',
    title: 'Binary Search on Answer (Predicate Inversion)',
    shortSummary: 'Transform optimization problems (min of max, max of min) into binary search feasibility checks: Koko Eating Bananas, Capacity to Ship Packages, Split Array Largest Sum.',
    formulas: [
      'Search Space: low = min_possible_answer, high = max_possible_answer',
      'Mid calculation avoiding overflow: mid = low + (high - low) // 2',
      'Predicate Property: Monotonic f(x) where condition(x) is [False, False, ..., True, True]',
      'Time Complexity: O(log(Search Space) * FeasibilityCheckCost)'
    ],
    shortTricks: [
      'Recognize the phrase: "Find minimum speed to finish in H hours" or "Minimize maximum load". These are ALWAYS Binary Search on Answer!',
      'Define a clean helper `can_finish(speed)` returning boolean.',
      'If `can_finish(mid)` is True, try to do even better: `high = mid`. If False, you must go faster: `low = mid + 1`.',
      'Template invariant: `while low < high: if feasible: high = mid else: low = mid + 1`. At termination, `low == high` is your exact optimal answer.'
    ],
    contentMdx: `### Canonical Binary Search on Answer Template
\`\`\`python
def binary_search_answer(weights, days):
    def feasible(capacity):
        required_days = 1
        current_load = 0
        for w in weights:
            if current_load + w > capacity:
                required_days += 1
                current_load = 0
            current_load += w
        return required_days <= days

    low = max(weights) # minimum possible capacity must at least hold heaviest item
    high = sum(weights) # maximum possible capacity ships everything in 1 day

    while low < high:
        mid = low + (high - low) // 2
        if feasible(mid):
            high = mid # Try smaller capacity
        else:
            low = mid + 1 # Capacity too small, increase

    return low
\`\`\`
`
  },
  {
    id: 'sysdesign-math',
    category: 'System Design',
    title: 'System Design Math & Back-of-the-Envelope Estimation',
    shortSummary: 'Numbers every engineer must know, QPS calculations, storage, bandwidth, and high availability SLA downtime formulas.',
    formulas: [
      'Daily Request Math: 1 Million req/day ≈ 12 QPS | 100 Million req/day ≈ 1,200 QPS | 1 Billion req/day ≈ 11,600 QPS',
      'Peak QPS: Peak QPS ≈ Average QPS * 2 (or * 5 for spiky traffic)',
      'Storage Formula: Storage/Day = Daily Active Users (DAU) * Actions/Day * Average Payload Size',
      '5-Year Storage = Daily Storage * 365 * 5 * 1.4 (40% buffer for index & replication)',
      'Bandwidth: Ingress (bits/sec) = QPS * Request Size * 8 | Egress = QPS * Response Size * 8',
      'RAM Sizing (80/20 Rule): Cache 20% of daily active working set: RAM = Daily Read Volume * 0.20'
    ],
    shortTricks: [
      '2^10 ≈ 1 Thousand (1 KB) | 2^20 ≈ 1 Million (1 MB) | 2^30 ≈ 1 Billion (1 GB) | 2^40 ≈ 1 Trillion (1 TB). Memorize this conversion ladder!',
      'There are ~86,400 seconds in a day. Round to 100,000 for effortless mental math during interviews!',
      'When calculating DB storage, never forget overhead: B-Tree index pointers consume ~20-30% extra space, and 3x replica factor triples raw disk needs.',
      'SLA Downtime: 99.9% ("three nines") allows 8.76 hours of outage per year; 99.99% ("four nines") allows only 52.6 minutes per year!'
    ],
    contentMdx: `### Latency Numbers Every Programmer Must Know (Jeff Dean Reference)
| Operation | Latency | Human Scale (1ns = 1 sec) |
|---|---|---|
| L1 cache reference | 0.5 ns | 0.5 seconds |
| Branch mispredict | 5 ns | 5 seconds |
| L2 cache reference | 7 ns | 7 seconds |
| Mutex lock/unlock | 25 ns | 25 seconds |
| Main memory reference (RAM) | 100 ns | 1.7 minutes |
| Compress 1KB with Zippy | 2,000 ns (2 μs) | 33 minutes |
| Send 1KB over 1 Gbps network | 10,000 ns (10 μs) | 2.7 hours |
| Read 4KB randomly from SSD | 150,000 ns (150 μs) | 1.7 days |
| Read 1MB sequentially from memory | 250,000 ns (250 μs) | 2.9 days |
| Round trip within same datacenter | 500,000 ns (500 μs) | 5.8 days |
| Read 1MB sequentially from SSD | 1,000,000 ns (1 ms) | 11.6 days |
| Disk seek (HDD) | 10,000,000 ns (10 ms) | 3.8 months |
| Send packet CA to Netherlands & back | 150,000,000 ns (150 ms) | 4.8 years |

### Availability SLA Downtime Table
- **99% (Two 9s)**: 3.65 days / year | 14.4 hours / month | 1.68 hours / week
- **99.9% (Three 9s)**: 8.76 hours / year | 43.8 minutes / month | 10.1 minutes / week
- **99.99% (Four 9s)**: 52.6 minutes / year | 4.38 minutes / month | 1.01 minutes / week
- **99.999% (Five 9s)**: 5.26 minutes / year | 25.9 seconds / month | 6.05 seconds / week
`
  },
  {
    id: 'sysdesign-cap-pacelc',
    category: 'System Design',
    title: 'CAP Theorem, PACELC & Consistency Models',
    shortSummary: 'Understand trade-offs between Consistency, Availability, Partition Tolerance, Latency, and Consistency under normal operation.',
    formulas: [
      'CAP Invariant: In the presence of a network partition (P), a distributed system MUST choose either Consistency (C) or Availability (A)',
      'PACELC Theorem: If Partition (P) -> Choose (A) vs (C); Else (E) -> Choose Latency (L) vs Consistency (C)',
      'Quorum Formula for Strong Consistency: R + W > N (Read replicas + Write replicas > Total replicas)'
    ],
    shortTricks: [
      'Network partitions are inevitable in real-world networks; therefore "CA" without P does not exist in distributed computing!',
      'CP Systems: BigTable, HBase, MongoDB (single primary), Redis Sentinel, CockroachDB. During partition, requests to minority side fail or wait.',
      'AP Systems: Cassandra, DynamoDB, CouchDB, DNS. System responds immediately even with stale data.',
      'Cassandra is tunable: Set `Write Quorum = ALL` and `Read Quorum = ONE` (or `QUORUM` on both) to achieve strict linearizable consistency.'
    ],
    contentMdx: `### Quorum Reads and Writes Math
In a cluster with $N$ replicas:
- Let $W$ be the number of replicas that must acknowledge a write before it is reported successful.
- Let $R$ be the number of replicas that must respond to a read query.
- **Strong Consistency Condition**:
  $$R + W > N$$
  Because the pigeonhole principle guarantees that the read set and the write set overlap in at least one replica containing the latest write timestamp!

### PACELC Matrix
- **PA/EL (High Availability & Low Latency)**: Amazon Dynamo, Apache Cassandra, Couchbase.
- **PC/EC (Consistent always)**: Google Spanner, CockroachDB, Bigtable.
- **PA/EC (Consistent normally, available in partition)**: MongoDB (with primary read/write).
`
  },
  {
    id: 'os-concurrency-memory',
    category: 'OS',
    title: 'OS Process, Thread, Mutex, Deadlock & Virtual Memory',
    shortSummary: 'Coffman deadlock conditions, CPU scheduling formulas, TLB page table math, and synchronization primitives.',
    formulas: [
      'Virtual Address Formula: Virtual Page Number (VPN) + Page Offset',
      'Page Offset Bits = log2(Page Size). Example: 4KB page -> 12 offset bits (2^12 = 4096)',
      'Turnaround Time = Completion Time - Arrival Time',
      'Waiting Time = Turnaround Time - Burst Time',
      'Effective Memory Access Time (EMAT) = Hit_Ratio * (TLB_access + RAM_access) + (1 - Hit_Ratio) * (TLB_access + 2 * RAM_access)'
    ],
    shortTricks: [
      'Deadlock occurs IF AND ONLY IF all 4 Coffman conditions hold: 1) Mutual Exclusion, 2) Hold and Wait, 3) No Preemption, 4) Circular Wait. Breaking any ONE eliminates deadlock completely!',
      'To prevent Circular Wait in code: Always acquire locks in a globally defined lexicographical order (Lock hierarchy).',
      'Difference between Process and Thread: Processes have independent virtual memory address spaces (isolated heap, code, data). Threads within a process share the same heap and open file descriptors, but maintain their own private stack and registers.',
      'Belady\'s Anomaly: In FIFO page replacement, increasing the number of page frames can counterintuitively INCREASE page faults! Stack-based algorithms like LRU never suffer from Belady\'s Anomaly.'
    ],
    contentMdx: `### The 4 Coffman Conditions
1. **Mutual Exclusion**: At least one resource must be held in a non-shareable mode.
2. **Hold and Wait**: A process is holding at least one resource and requesting additional resources held by other processes.
3. **No Preemption**: Resources cannot be preempted; they are released only voluntarily by the holding process.
4. **Circular Wait**: A closed chain of processes exists such that each process holds at least one resource needed by the next.

### Context Switch Anatomy
1. Save CPU registers (Program Counter, Stack Pointer, General Purpose Registers) into the Process Control Block (PCB).
2. Change page table pointer (CR3 register on x86) $\\to$ invalidates the CPU TLB cache!
3. Switch stack pointer to new kernel stack.
4. Restore registers of the newly scheduled thread from its PCB.
`
  },
  {
    id: 'dbms-transactions-indexes',
    category: 'DBMS',
    title: 'DBMS ACID, Isolation Levels & B+ Tree Indexing Math',
    shortSummary: 'Read phenomena, Isolation levels, B+ tree height calculations, and Normalization rules (1NF to BCNF).',
    formulas: [
      'B+ Tree Fanout formula: Order M = Node_Size / (Key_Size + Pointer_Size)',
      'B+ Tree Height formula: Height h ≈ ceil(log_M(N))',
      'A 3-level B+ Tree with 4KB pages and 100-byte keys holds over 20 MILLION records in just 3 disk seeks!',
      'Clustered Index: Physical sort order matches index. Only 1 clustered index permitted per table.'
    ],
    shortTricks: [
      'Isolation Level Trade-offs: Read Uncommitted allows Dirty Reads. Read Committed eliminates Dirty Reads but allows Non-Repeatable Reads. Repeatable Read eliminates Non-Repeatable Reads but allows Phantom Reads (MySQL InnoDB prevents Phantoms via Next-Key Locking). Serializable eliminates all anomalies at high locking cost.',
      'Indexing Leftmost Prefix Rule: An index on `(a, b, c)` can accelerate `WHERE a = 1 AND b = 2`, but CANNOT accelerate `WHERE b = 2` without `a`!',
      'Write-Ahead Logging (WAL): A database writes changes to an append-only log on disk BEFORE modifying in-memory buffer pool pages. This guarantees Atomicity and Durability with fast sequential I/O.',
      'Normalization mnemonic: "The key, the whole key, and nothing but the key, so help me Codd!" (1NF: atomic attributes, 2NF: no partial key dependencies, 3NF: no transitive dependencies, BCNF: every determinant is a candidate key).'
    ],
    contentMdx: `### Transaction Isolation Levels & Read Phenomena
| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|---|---|---|---|
| **Read Uncommitted** | ❌ Allowed | ❌ Allowed | ❌ Allowed |
| **Read Committed** | ✅ Prevented | ❌ Allowed | ❌ Allowed |
| **Repeatable Read** | ✅ Prevented | ✅ Prevented | ❌ Allowed (Prevented in InnoDB) |
| **Serializable** | ✅ Prevented | ✅ Prevented | ✅ Prevented |

### B+ Tree vs B-Tree
- In a **B+ Tree**, data records (or record pointers) are stored EXCLUSIVELY in the leaf nodes. Internal nodes store only search keys and child pointers, maximizing node fanout $M$ and minimizing tree depth.
- Leaf nodes are linked via a doubly linked list, enabling extremely fast range scans ($O(\\log N + K)$) compared to B-trees.
`
  },
  {
    id: 'networks-tcp-http',
    category: 'Networks',
    title: 'Computer Networks: TCP/IP, Handshakes, BDP & HTTP/1-3',
    shortSummary: 'TCP 3-way handshake, 4-way teardown, Bandwidth-Delay Product, TCP Congestion Control, and HTTP/1.1 vs HTTP/2 vs HTTP/3.',
    formulas: [
      'Bandwidth-Delay Product (BDP) = RTT (sec) * Bandwidth (bytes/sec)',
      'TCP Window Scale: Buffer must be >= BDP to saturate the pipe',
      'Subnet Hosts Formula: Number of usable IPv4 hosts = 2^(32 - CIDR) - 2',
      'Example: /24 has 2^(32 - 24) - 2 = 256 - 2 = 254 usable hosts (network & broadcast reserved)'
    ],
    shortTricks: [
      'TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK. Data can only be sent on or after the 3rd ACK packet (TCP Fast Open allows data in SYN).',
      'TCP TIME_WAIT state lasts for 2 * MSL (Maximum Segment Lifetime, typically 60-120s) to guarantee delayed duplicate segments expire and the final ACK was received.',
      'Head-of-Line (HoL) Blocking: HTTP/1.1 suffered from HoL blocking on pipelined requests over a single TCP connection. HTTP/2 fixed application HoL with multiplexed streams, but still suffered from TCP transport HoL blocking if a single packet dropped. HTTP/3 solves this completely by running over QUIC (UDP)!',
      'DNS flow: Local Cache -> /etc/hosts -> Recursive Resolver -> Root Server (.) -> TLD Server (.com) -> Authoritative Nameserver.'
    ],
    contentMdx: `### HTTP Evolution Comparison
| Feature | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---|---|---|---|
| **Transport Protocol** | TCP | TCP | QUIC (UDP) |
| **Connection Multiplexing** | ❌ (1 req/conn or pipelining) | ✅ Multiple streams | ✅ Multiple streams |
| **Head-of-Line Blocking** | Application level | TCP Transport level | ✅ Eliminated entirely |
| **Header Compression** | ❌ None (plain text) | ✅ HPACK | ✅ QPACK |
| **Handshake Latency** | 1 RTT (TCP) + 1-2 RTT (TLS) | 1 RTT (TCP) + 1 RTT (TLS 1.3) | 0-RTT to 1-RTT (QUIC) |
| **Connection Migration** | ❌ Breaks on IP change (WiFi->LTE) | ❌ Breaks | ✅ Survives via Connection ID |
`
  }
];


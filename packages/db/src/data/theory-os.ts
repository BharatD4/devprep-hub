import { SeedFlashcard } from '../data';

export const THEORY_OS_30: SeedFlashcard[] = [
  {
    id: 'os-1',
    deckCategory: 'Operating Systems',
    front: 'Explain the fundamental differences between a Process and a Thread. What components are shared vs private?',
    back: `• **Process**: An executing instance of a program with independent virtual address space, heap, stack, data, and system resources. Isolation is enforced by OS memory protection.
• **Thread**: A lightweight execution unit within a process.
- **Shared across threads of same process**: Code segment, Data segment, Open file descriptors, Heap memory, Child processes, Signal handlers.
- **Private per thread**: Thread ID (TID), Program Counter (PC), CPU Registers, Private Stack (for local variables & call frames), Thread-Local Storage (TLS).
• **Context Switch Overhead**: Process switch is heavy (invalidates CPU TLB cache and switches MMU CR3 page directory pointer); Thread switch is lightweight (shares address space; preserves TLB).`,
    tags: ['OS', 'Processes', 'Threads', 'Memory'],
  },
  {
    id: 'os-2',
    deckCategory: 'Operating Systems',
    front: 'What is Context Switching? Describe the step-by-step sequence and performance overhead.',
    back: `**Context Switching** is saving the state of the currently executing process/thread so that execution can resume later, and restoring the state of another scheduled process.
**Step-by-Step Sequence**:
1. Hardware timer interrupt or system call triggers trap to kernel mode.
2. CPU registers, Program Counter (PC), and Stack Pointer (SP) are saved into current process Process Control Block (PCB) or kernel stack.
3. OS scheduler selects next process according to scheduling policy.
4. Memory management unit (MMU) page table pointer (e.g. CR3 register on x86) is updated to new process.
5. CPU restores registers and PC from new process's PCB and executes in user mode.
**Performance Costs**: CPU cycle overhead, cache pollution (L1/L2/L3 cache misses), and mandatory TLB flush causing memory stall delays.`,
    tags: ['OS', 'Context Switch', 'CPU', 'Scheduling'],
  },
  {
    id: 'os-3',
    deckCategory: 'Operating Systems',
    front: 'What are the 4 Coffman Conditions required for a Deadlock to occur?',
    back: `A deadlock occurs if and only if ALL four Coffman conditions hold simultaneously:
1. **Mutual Exclusion**: At least one resource must be held in a non-shareable mode (only one process can use it at a time).
2. **Hold and Wait**: A process is currently holding at least one resource and requesting additional resources currently held by others.
3. **No Preemption**: Resources cannot be forcibly seized; they are released only voluntarily by the holding process after completing its task.
4. **Circular Wait**: A closed chain of processes exists such that $P_0$ waits for resource held by $P_1$, $P_1$ waits for $P_2$, ..., and $P_n$ waits for $P_0$.
*Key Takeaway: Breaking any single one of these 4 conditions guarantees deadlock cannot occur.*`,
    tags: ['OS', 'Deadlock', 'Coffman Conditions'],
  },
  {
    id: 'os-4',
    deckCategory: 'Operating Systems',
    front: 'How does Banker\'s Algorithm work for Deadlock Avoidance?',
    back: `**Banker's Algorithm** (Dijkstra) is a deadlock avoidance algorithm for multiple resource instances. It tests whether granting a resource request leaves system in a **Safe State**.
**Data Structures**:
- Available Vector $[m]$: number of available instances per resource.
- Max Matrix $[n \times m]$: maximum demand of each process.
- Allocation Matrix $[n \times m]$: instances currently allocated per process.
- Need Matrix $[n \times m]$: remaining demand where $\\text{Need}[i][j] = \\text{Max}[i][j] - \\text{Allocation}[i][j]$.
**Safety Check**: Finds a safe sequence $\\langle P_0, P_1, \\dots, P_{n-1} \\rangle$ where for each $P_i$, $\\text{Need}_i \\le \\text{Work}$. If such a sequence exists, request is approved; otherwise process must wait. Time complexity: $O(m \\times n^2)$.`,
    tags: ['OS', 'Deadlock', 'Bankers Algorithm'],
  },
  {
    id: 'os-5',
    deckCategory: 'Operating Systems',
    front: 'Mutex vs Semaphore: What are the fundamental architectural differences?',
    back: `| Dimension | Mutex (Mutual Exclusion) | Semaphore |
|---|---|---|
| **Mechanism** | Locking object with ownership | Signaling mechanism using integer counter |
| **Ownership** | Strict: Only the thread that locked the mutex can unlock it | No ownership: Any thread can signal (\`V\` / \`post\`) or wait (\`P\` / \`wait\`) |
| **Capacity** | Strictly binary (0 or 1) | Counting Semaphore ($N \\ge 0$) or Binary Semaphore |
| **Use Case** | Serializing access to a shared resource | Managing pool of identical resources or cross-thread synchronization |
| **Priority Inversion** | Can be prevented using Priority Inheritance Protocol | Does not support Priority Inheritance naturally |`,
    tags: ['OS', 'Mutex', 'Semaphore', 'Synchronization'],
  },
  {
    id: 'os-6',
    deckCategory: 'Operating Systems',
    front: 'What is the Critical Section Problem and what are the 3 mandatory criteria to solve it?',
    back: `The **Critical Section** is a code segment where shared resources (memory, files, variables) are accessed and modified concurrently by multiple processes.
Any valid solution must strictly satisfy three criteria:
1. **Mutual Exclusion**: If process $P_i$ is executing in its critical section, no other process can be executing in its critical section.
2. **Progress**: If no process is executing in its critical section and some processes wish to enter, only those processes not executing in their remainder sections can participate in deciding who enters next, and this selection cannot be postponed indefinitely.
3. **Bounded Waiting**: There must exist a bound on the number of times other processes are allowed to enter their critical sections after a process has made a request, preventing starvation.`,
    tags: ['OS', 'Critical Section', 'Concurrency'],
  },
  {
    id: 'os-7',
    deckCategory: 'Operating Systems',
    front: 'What is a Race Condition? Give a real-world code example and how to fix it.',
    back: `A **Race Condition** occurs when multiple threads/processes read and write shared data concurrently, and the final state depends on the exact scheduling/interleaving of execution.
**Example**:
\`\`\`cpp
// Shared counter
int count = 0;
void increment() { count++; } // Assembly: LOAD, ADD 1, STORE
\`\`\`
If Thread A and B execute simultaneously, both load \`0\`, increment to \`1\`, and store \`1\`. Expected \`count = 2\`, actual \`count = 1\`!
**Fixes**:
1. Mutex lock (\`std::lock_guard<std::mutex>\`).
2. Atomic hardware instruction (\`std::atomic<int> count\`, using Compare-And-Swap / Test-And-Set).
3. Synchronized blocks / Semaphore.`,
    tags: ['OS', 'Race Condition', 'Atomic', 'Concurrency'],
  },
  {
    id: 'os-8',
    deckCategory: 'Operating Systems',
    front: 'Compare CPU Scheduling Algorithms: FCFS, SJF, SRTF, Round Robin, and Priority Scheduling.',
    back: `1. **FCFS (First-Come First-Served)**: Non-preemptive. Simple, but suffers from **Convoy Effect** (short processes wait behind long ones; high average waiting time).
2. **SJF (Shortest Job First)**: Non-preemptive. Provably optimal minimum average waiting time. Impossible to predict exact burst times in practice; risks starvation for long jobs.
3. **SRTF (Shortest Remaining Time First)**: Preemptive version of SJF. Preempts current job if newly arrived process has shorter remaining burst.
4. **Round Robin (RR)**: Preemptive. Each process gets a fixed time quantum $q$. Great responsiveness. If $q$ is too small $\\to$ high context switch overhead; if $q$ is too large $\\to$ degrades to FCFS.
5. **Priority Scheduling**: Runs highest priority first. Can cause indefinite starvation; solved via **Aging** (gradually increasing priority of waiting processes).`,
    tags: ['OS', 'CPU Scheduling', 'Algorithms'],
  },
  {
    id: 'os-9',
    deckCategory: 'Operating Systems',
    front: 'Explain Paging vs Segmentation in Memory Management.',
    back: `| Feature | Paging | Segmentation |
|---|---|---|
| **Concept** | Physical memory divided into fixed-size frames; logical memory into fixed-size pages | Logical memory divided into variable-size segments reflecting user/programmer view (main, functions, stack, heap) |
| **Size** | Fixed size (e.g. 4KB, 2MB, 1GB) | Variable size depending on code block |
| **Fragmentation** | **Internal Fragmentation** (unused space inside the last page frame). No external fragmentation. | **External Fragmentation** (free memory split into small scattered holes). No internal fragmentation. |
| **Address Translation** | (Page Number $p$, Offset $d$) translated via Page Table | (Segment Number $s$, Offset $d$) translated via Segment Table with Base and Limit check |`,
    tags: ['OS', 'Memory', 'Paging', 'Segmentation'],
  },
  {
    id: 'os-10',
    deckCategory: 'Operating Systems',
    front: 'What is a Page Fault? Describe the exact step-by-step sequence of events when it occurs.',
    back: `A **Page Fault** is an interrupt (trap) thrown by the hardware Memory Management Unit (MMU) when a program accesses a page that is marked not present in physical RAM (valid-invalid bit is 0).
**Step-by-Step Sequence**:
1. CPU references memory address; MMU checks page table entry and sees valid bit = 0.
2. MMU triggers internal hardware trap to OS kernel.
3. OS intercepts page fault and saves process state (registers, program counter).
4. OS validates whether the virtual address reference is legal. If illegal $\\to$ Segmentation Fault (\`SIGSEGV\`).
5. OS searches disk swap space / pagefile for desired page.
6. OS finds a free physical frame (if no frame free, executes page replacement algorithm).
7. OS schedules disk I/O to read page from disk into selected physical frame.
8. When I/O completes, OS updates page table entry (sets physical frame number, valid bit = 1).
9. OS restores process state and restarts the exact instruction that faulted.`,
    tags: ['OS', 'Page Fault', 'Virtual Memory', 'MMU'],
  },
  {
    id: 'os-11',
    deckCategory: 'Operating Systems',
    front: 'What is Belady\'s Anomaly? Which page replacement algorithms suffer from it and why?',
    back: `**Belady\'s Anomaly** is the counterintuitive phenomenon where **increasing the number of page frames results in an INCREASE in the number of page faults** for certain access patterns.
• **Algorithms that suffer from it**: FIFO (First-In, First-Out) page replacement.
• **Algorithms immune to it**: **Stack Algorithms** such as **LRU (Least Recently Used)** and **Optimal (OPT)**.
*Why Stack Algorithms are immune*: For any stack algorithm, the set of pages in memory for $N$ frames is always a strict subset of the pages in memory for $N+1$ frames ($M(N) \\subseteq M(N+1)$). FIFO does not possess this inclusion property!`,
    tags: ['OS', 'Beladys Anomaly', 'LRU', 'FIFO', 'Page Replacement'],
  },
  {
    id: 'os-12',
    deckCategory: 'Operating Systems',
    front: 'What is Thrashing in Operating Systems? What causes it and how can it be prevented?',
    back: `**Thrashing** is a pathological state where the CPU spends significantly more time swapping pages in and out of disk than executing actual user instructions, causing CPU utilization to collapse towards 0%.
**Root Cause**: Occurs when degree of multiprogramming is too high and the sum of working sets of all active processes exceeds available physical RAM ($\\sum \\text{WorkingSet}_i > \\text{Total RAM}$).
**Prevention & Remediation**:
1. **Working Set Model**: OS monitors working set of each process (pages referenced in time window $\\Delta$) and only schedules a process if its full working set fits in RAM.
2. **Page Fault Frequency (PFF)**: Establish upper and lower bounds on page fault rate. If PFF exceeds upper bound $\\to$ allocate more frames; if below lower bound $\\to$ reclaim frames.
3. Suspend / swap out low-priority processes to reduce degree of multiprogramming.`,
    tags: ['OS', 'Thrashing', 'Virtual Memory', 'Working Set'],
  },
  {
    id: 'os-13',
    deckCategory: 'Operating Systems',
    front: 'What is a Translation Lookaside Buffer (TLB)? Calculate Effective Memory Access Time (EMAT).',
    back: `A **TLB** is an associative high-speed hardware cache located on the CPU chip that caches recent virtual-to-physical page translations.
**Effective Memory Access Time (EMAT) Formula**:
$$\\text{EMAT} = h \\times (t_{\\text{TLB}} + t_{\\text{RAM}}) + (1 - h) \\times (t_{\\text{TLB}} + 2 \\times t_{\\text{RAM}})$$
*(Assuming single-level page table where a TLB miss requires accessing page table in RAM + accessing actual data in RAM)*.
**Example**: If TLB access = 10ns, RAM access = 100ns, Hit ratio $h = 90\\%$:
$$\\text{EMAT} = 0.90 \\times (10 + 100) + 0.10 \\times (10 + 200) = 0.90 \\times 110 + 0.10 \\times 210 = 99 + 21 = 120\\text{ ns}.$$`,
    tags: ['OS', 'TLB', 'EMAT', 'Hardware', 'Memory'],
  },
  {
    id: 'os-14',
    deckCategory: 'Operating Systems',
    front: 'Zombie Process vs Orphan Process: How are they created, diagnosed, and resolved?',
    back: `• **Zombie Process**: A process that has completed execution via \`exit()\`, but still occupies an entry in the OS Process Table because its parent has not yet read its exit status via \`wait()\` / \`waitpid()\`.
  - *Diagnosis*: Displayed with status \`Z\` or \`<defunct>\` in \`ps aux\`.
  - *Resolution*: Kill the parent process; the zombie is adopted by \`init\` (PID 1) which immediately reaps it.
• **Orphan Process**: A process whose parent process terminated before it did.
  - *Diagnosis*: Parent PID (PPID) changes to \`1\` (\`init\` or \`systemd\`).
  - *Resolution*: Not a bug! \`init\` adopts orphan processes and reaps their exit codes when they finish.`,
    tags: ['OS', 'Zombie', 'Orphan', 'Linux', 'Process Lifecycle'],
  },
  {
    id: 'os-15',
    deckCategory: 'Operating Systems',
    front: 'What happens when fork(), exec(), and wait() system calls are executed in Unix/Linux?',
    back: `1. **\`fork()\`**: Creates an exact duplicate child process.
   - Duplicates address space, file descriptors, and register state.
   - Returns \`0\` to the child process, returns child's \`PID\` to the parent process, returns \`-1\` on failure.
   - Uses **Copy-On-Write (COW)** so memory pages are physically shared read-only until either process writes.
2. **\`exec()\`** (family: \`execvp\`, \`execl\`): Replaces current process memory space, code, stack, and heap with a brand new program executable binary. PID remains identical!
3. **\`wait()\`**: Suspends execution of calling parent process until one of its child processes terminates, returning child's exit status code and clearing its zombie table entry.`,
    tags: ['OS', 'fork', 'exec', 'wait', 'System Calls'],
  },
  {
    id: 'os-16',
    deckCategory: 'Operating Systems',
    front: 'What are the main Inter-Process Communication (IPC) mechanisms in Operating Systems?',
    back: `1. **Anonymous Pipes**: Unidirectional byte stream for parent-child processes on same machine (\`pipe()\`).
2. **Named Pipes (FIFOs)**: Bidirectional file-system based pipe allowing communication between unrelated processes.
3. **Shared Memory**: Fastest IPC! Processes map the same physical memory frames into their virtual address spaces. Requires synchronization (Mutex/Semaphore) to avoid race conditions.
4. **Message Queues**: Kernel-managed message lists where processes send/receive formatted messages asynchronously.
5. **Unix Domain Sockets & Network Sockets**: Bidirectional communication stream/datagram. Works both locally and across network boundaries (TCP/IP).
6. **Signals**: Asynchronous software notifications (e.g. \`SIGINT\`, \`SIGKILL\`, \`SIGSEGV\`) interrupting process flow.`,
    tags: ['OS', 'IPC', 'Pipes', 'Shared Memory', 'Sockets'],
  },
  {
    id: 'os-17',
    deckCategory: 'Operating Systems',
    front: 'Explain Copy-on-Write (COW) and how it optimizes process creation.',
    back: `**Copy-on-Write (COW)** is an optimization technique where child processes created via \`fork()\` do not immediately copy the parent's memory pages.
**How it works**:
1. Parent and child share the same physical memory pages marked **Read-Only**.
2. Both page tables point to the exact same physical frame.
3. If either parent or child attempts a **write** operation, a hardware protection fault is raised.
4. The OS intercepts the fault, allocates a brand new physical frame, copies that single 4KB page over, updates the writer's page table with Write permission, and resumes execution.
**Benefit**: Enormous performance gain when \`fork()\` is immediately followed by \`exec()\`, avoiding copying megabytes or gigabytes of memory that would be immediately discarded!`,
    tags: ['OS', 'COW', 'Copy On Write', 'Virtual Memory'],
  },
  {
    id: 'os-18',
    deckCategory: 'Operating Systems',
    front: 'What is Priority Inversion and how does Priority Inheritance solve it?',
    back: `**Priority Inversion** is a scenario where a high-priority task ($H$) is indirectly preempted by a medium-priority task ($M$), inverting their assigned priorities!
**Classic Scenario**:
1. Low priority task $L$ acquires shared resource Mutex $R$.
2. High priority task $H$ arrives and requests $R$; it blocks waiting for $L$.
3. Medium priority task $M$ arrives (which does not need $R$). It preempts $L$ because priority $M > L$.
4. $L$ cannot finish releasing $R$, which starves $H$ indefinitely!
**Solution (Priority Inheritance Protocol - PIP)**:
When $H$ blocks waiting for resource held by $L$, $L$ temporarily inherits $H$'s high priority until it releases the resource. This prevents medium priority task $M$ from preempting $L$.`,
    tags: ['OS', 'Priority Inversion', 'Real-Time', 'Concurrency'],
  },
  {
    id: 'os-19',
    deckCategory: 'Operating Systems',
    front: 'Monolithic Kernel vs Microkernel: Contrast architecture, reliability, and speed.',
    back: `• **Monolithic Kernel** (e.g. Linux, Windows, macOS hybrid):
  - Entire OS services (File System, Virtual Memory, IPC, Device Drivers, Network Stack) execute in single privileged **Kernel Space** (Ring 0).
  - *Pros*: Extremely high performance because internal calls are direct C function calls without context switches.
  - *Cons*: Single point of failure; a crash in any third-party device driver brings down the entire operating system.
• **Microkernel** (e.g. Minix, QNX, L4):
  - Only bare minimum services (IPC, basic virtual memory, primitive scheduling) run in Kernel Space.
  - File systems, networking, and device drivers run as user-space server processes.
  - *Pros*: Fault tolerant and secure (if driver crashes, user daemon restarts without OS panic).
  - *Cons*: Heavy performance overhead due to continuous IPC message passing and context switches between user servers.`,
    tags: ['OS', 'Monolithic', 'Microkernel', 'Architecture'],
  },
  {
    id: 'os-20',
    deckCategory: 'Operating Systems',
    front: 'What is Direct Memory Access (DMA) and what is Cycle Stealing?',
    back: `**Direct Memory Access (DMA)** is a hardware feature that allows high-speed I/O devices (Disk controllers, NIC network cards, GPUs) to transfer data directly to and from main RAM without continuous CPU intervention.
**Sequence**:
1. CPU programs DMA controller with source address, destination address, and byte count.
2. DMA controller executes the entire block transfer.
3. Upon completion, DMA raises a single hardware interrupt to notify CPU.
• **Cycle Stealing**: When the CPU and DMA controller access the system bus simultaneously, the DMA controller "steals" clock cycles from the CPU, briefly pausing CPU memory access because I/O devices cannot buffer data indefinitely.`,
    tags: ['OS', 'DMA', 'Hardware', 'I/O'],
  },
  {
    id: 'os-21',
    deckCategory: 'Operating Systems',
    front: 'Explain RAID levels: RAID 0, RAID 1, RAID 5, RAID 6, and RAID 10.',
    back: `• **RAID 0 (Striping)**: Splits data across 2+ disks. Max read/write performance. Zero redundancy: failure of 1 disk loses ALL data!
• **RAID 1 (Mirroring)**: Duplicate copy on 2+ disks. 100% capacity overhead. High reliability (survives 1 disk loss).
• **RAID 5 (Block-level striping with Distributed Parity)**: Requires $\\ge 3$ disks. Parity is distributed across all drives ($N-1$ usable capacity). Survives 1 disk failure. Slow write penalties due to parity calculation.
• **RAID 6 (Dual Distributed Parity)**: Requires $\\ge 4$ disks. Uses two parity blocks per stripe ($N-2$ capacity). Survives **2 simultaneous disk failures**.
• **RAID 10 (1+0 Striping of Mirrored pairs)**: Requires $\\ge 4$ disks. Combines speed of RAID 0 with safety of RAID 1. Fast rebuild times. 50% storage efficiency.`,
    tags: ['OS', 'Storage', 'RAID', 'Reliability'],
  },
  {
    id: 'os-22',
    deckCategory: 'Operating Systems',
    front: 'What are Peterson\'s Solution and the TSL (Test-and-Set Lock) instruction?',
    back: `• **Peterson\'s Solution**: Classic software algorithm for mutual exclusion between 2 processes.
\`\`\`c
flag[i] = true;
turn = j;
while (flag[j] && turn == j); // Busy wait
// Critical Section
flag[i] = false;
\`\`\`
Guarantees Mutual Exclusion, Progress, and Bounded Waiting for 2 processes on single-core systems (out-of-order execution on modern multicore CPUs breaks it without memory barriers).
• **TSL (Test and Set Lock)**: An atomic hardware instruction:
\`\`\`c
boolean TestAndSet(boolean *target) {
    boolean rv = *target;
    *target = true;
    return rv;
}
\`\`\`
Executed indivisibly in one clock cycle, enabling portable spinlocks across multicore architectures.`,
    tags: ['OS', 'Peterson Solution', 'TSL', 'Atomic'],
  },
  {
    id: 'os-23',
    deckCategory: 'Operating Systems',
    front: 'Starvation vs Deadlock vs Livelock: Compare their definitions and resolutions.',
    back: `| Condition | Definition | Process State | Resolution |
|---|---|---|---|
| **Deadlock** | Permanent blocking of 2+ processes waiting for resources held by each other in circular chain | Blocked / Asleep (consuming 0% CPU) | Terminate process or preempt resources |
| **Starvation** | A process waits indefinitely because other processes repeatedly get higher priority (e.g. in Priority / SJF scheduling) | Ready to run, but perpetually ignored by scheduler | **Aging** (progressively increasing wait time priority) |
| **Livelock** | Two processes actively change states in response to each other without making any forward progress (e.g. two polite people stepping side to side in a hallway) | Actively running (consuming 100% CPU!) | Random exponential backoff delay before retrying |`,
    tags: ['OS', 'Deadlock', 'Starvation', 'Livelock'],
  },
  {
    id: 'os-24',
    deckCategory: 'Operating Systems',
    front: 'Explain Internal vs External Fragmentation and their solutions.',
    back: `• **Internal Fragmentation**: Unused allocated memory inside a partition/frame.
  - *Cause*: Occurs in fixed-size allocation schemes like Paging. If a process requests 5KB and page size is 4KB, it receives two pages (8KB). The remaining 3KB in the second page is wasted.
  - *Solution*: Use smaller page sizes or dynamic slab allocators (e.g. Buddy Allocator).
• **External Fragmentation**: Total free memory space is sufficient to satisfy a request, but it is split into non-contiguous scattered holes.
  - *Cause*: Variable-size dynamic partitioning / Segmentation.
  - *Solution*: **Paging** (allows non-contiguous physical allocation) or **Compaction** (shuffling allocated memory to merge free holes into one large block).`,
    tags: ['OS', 'Fragmentation', 'Memory Management'],
  },
  {
    id: 'os-25',
    deckCategory: 'Operating Systems',
    front: 'What is Spooling vs Buffering in Operating Systems?',
    back: `• **Buffering**: Storing data temporarily in main memory (RAM) while it is being transferred between two devices or between a device and an application. Overcomes speed mismatches between fast CPU and slower disks/networks, and coordinates different data transfer sizes.
• **SPOOLing (Simultaneous Peripheral Operations On-Line)**: Uses disk as a large temporary queue buffer for jobs directed to slow non-sharable devices (e.g. Printers). Multiple processes write print jobs to the spooler on disk simultaneously; the printer daemon dequeues and prints them sequentially without blocking processes.`,
    tags: ['OS', 'Spooling', 'Buffering', 'I/O'],
  },
  {
    id: 'os-26',
    deckCategory: 'Operating Systems',
    front: 'What is an Inverted Page Table and how does it save memory over standard Page Tables?',
    back: `• **Standard Page Table**: Has one entry per **Virtual Page** for each process. On a 64-bit system with 4KB pages, page tables consume gigabytes of memory per process!
• **Inverted Page Table (IPT)**: Has one entry per **Physical Frame** of real memory across the entire system.
- Format: \`Entry[frame_number] = (process_id, virtual_page_number)\`.
- **Memory Savings**: Table size is proportional to physical RAM size, regardless of how many processes or virtual pages exist.
- **Trade-off**: Address lookup requires searching the IPT ($O(N)$), so it relies on a hardware Hash Table and TLB for acceleration.`,
    tags: ['OS', 'Inverted Page Table', 'Memory', '64-bit'],
  },
  {
    id: 'os-27',
    deckCategory: 'Operating Systems',
    front: 'What are System Calls and how does the CPU transition between User Mode and Kernel Mode?',
    back: `A **System Call** is a programmatic interface through which a user-space application requests a privileged service from the operating system kernel (e.g. file read, socket creation, process fork).
**Dual Mode Protection (Ring 3 to Ring 0)**:
1. User application executes standard library wrapper (e.g. \`printf()\` $\\to$ \`write()\`).
2. CPU register is loaded with system call number (e.g. \`RAX = 1\` for sys_write on x86_64).
3. Executes software interrupt / trap instruction (\`syscall\` or \`int 0x80\`).
4. CPU hardware switches mode bit from User Mode (Ring 3) to Kernel Mode (Ring 0) and switches to kernel stack pointer.
5. CPU jumps to fixed address in System Call Interrupt Vector Table (IVT).
6. Kernel validates parameters, executes service, places return value in register, and invokes \`sysret\` / \`iret\` returning to user mode.`,
    tags: ['OS', 'System Calls', 'Kernel', 'Protection Rings'],
  },
  {
    id: 'os-28',
    deckCategory: 'Operating Systems',
    front: 'Explain the 5-State Process Lifecycle Model.',
    back: `A process transitions through 5 fundamental states during its lifecycle:
1. **New**: The process is being created and its PCB initialized.
2. **Ready**: The process is loaded in main memory and waiting in the ready queue to be assigned CPU time by the scheduler.
3. **Running**: Instructions are currently being executed by the CPU.
4. **Waiting / Blocked**: The process cannot execute until an external event occurs (I/O completion, timer, mutex acquisition).
5. **Terminated**: The process has finished execution; its resources are freed while exit code waits for parent reap.
*Transitions: Ready $\\xrightarrow{\\text{dispatch}}$ Running $\\xrightarrow{\\text{interrupt}}$ Ready $\\xrightarrow{\\text{I/O wait}}$ Blocked $\\xrightarrow{\\text{I/O complete}}$ Ready.*`,
    tags: ['OS', 'Process Lifecycle', 'States'],
  },
  {
    id: 'os-29',
    deckCategory: 'Operating Systems',
    front: 'Hard Real-Time OS (RTOS) vs Soft Real-Time OS: What are the differences?',
    back: `• **Hard Real-Time OS**: Missing a deadline results in total catastrophic system failure (e.g. Pacemakers, Aircraft fly-by-wire flight control, Car airbag deployment, Nuclear reactor safety).
  - Strict determinism: Zero jitter, bounded interrupt latency, no virtual memory demand paging (all memory must be pinned in RAM).
• **Soft Real-Time OS**: Missing a deadline degrades quality of service (QoS) but does not cause system crash (e.g. Video streaming, Online gaming audio synthesis, Smartphone UI touch response).
  - Employs priority scheduling and preemptive kernels, but does not guarantee absolute mathematical hard deadlines.`,
    tags: ['OS', 'RTOS', 'Real-Time', 'Embedded'],
  },
  {
    id: 'os-30',
    deckCategory: 'Operating Systems',
    front: 'What is Demand Paging and what is the Working Set Page Replacement algorithm?',
    back: `• **Demand Paging**: An execution policy where memory pages are loaded into physical RAM **only when they are referenced** during execution (lazy loading via page faults), rather than loading the entire program upfront. Reduces process startup time and RAM footprint.
• **Working Set Algorithm**:
  - The working set $W(t, \\Delta)$ is the set of pages referenced by a process in the most recent time window $\\Delta$.
  - Working set size $S$ represents the process\'s immediate memory needs.
  - If a page has not been referenced within the time window $\\Delta$, it is evicted from memory.
  - Ensures a process never starves for pages, preventing thrashing.`,
    tags: ['OS', 'Demand Paging', 'Working Set', 'Memory'],
  },
];

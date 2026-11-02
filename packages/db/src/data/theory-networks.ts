import { SeedFlashcard } from '../data';

export const THEORY_NETWORKS_30: SeedFlashcard[] = [
  {
    id: 'net-1',
    deckCategory: 'Computer Networks',
    front: 'Explain the 7 Layers of the OSI Model and their data units and protocols.',
    back: `1. **Physical Layer (Bits)**: Transmits raw bitstream over physical medium (cables, radio). *Protocols/Hardware*: Ethernet physical, Hubs, Repeaters.
2. **Data Link Layer (Frames)**: Hop-to-hop node transfer, physical MAC addressing, framing, and error detection. *Protocols*: Ethernet (802.3), WiFi (802.11), Switches, ARP.
3. **Network Layer (Packets)**: Logical IP addressing, routing across internetworks. *Protocols*: IPv4, IPv6, ICMP, Routers.
4. **Transport Layer (Segments/Datagrams)**: End-to-end process-to-process communication, port multiplexing, reliability. *Protocols*: TCP, UDP.
5. **Session Layer (Data)**: Establishes, manages, and terminates presentation sessions. *Protocols*: NetBIOS, RPC.
6. **Presentation Layer (Data)**: Data translation, formatting, encryption/decryption, compression. *Protocols*: TLS/SSL, JPEG, ASCII.
7. **Application Layer (Data)**: Human-computer interaction and network services. *Protocols*: HTTP, HTTPS, DNS, SMTP, FTP, SSH.`,
    tags: ['Networks', 'OSI Model', 'Layers', 'Protocols'],
  },
  {
    id: 'net-2',
    deckCategory: 'Computer Networks',
    front: 'Describe the TCP 3-Way Handshake step-by-step with packet flags and sequence numbers.',
    back: `Used to establish a reliable, full-duplex TCP connection before transmitting application data:
1. **SYN (Client $\\to$ Server)**:
   - Client chooses random Initial Sequence Number ($\\text{ISN}_C$).
   - Sends segment with flag \`SYN = 1\`, \`Seq = ISN_C\`. Client enters \`SYN_SENT\` state.
2. **SYN-ACK (Server $\\to$ Client)**:
   - Server acknowledges client's SYN and picks its own $\\text{ISN}_S$.
   - Sends segment with flags \`SYN = 1\`, \`ACK = 1\`, \`Seq = ISN_S\`, \`Ack = ISN_C + 1\`. Server enters \`SYN_RCVD\` state.
3. **ACK (Client $\\to$ Server)**:
   - Client confirms server's SYN.
   - Sends segment with flag \`ACK = 1\`, \`Seq = ISN_C + 1\`, \`Ack = ISN_S + 1\`.
   - Connection is now \`ESTABLISHED\` on both ends! (Data can piggyback on this 3rd ACK).`,
    tags: ['Networks', 'TCP', 'Handshake', 'Protocols'],
  },
  {
    id: 'net-3',
    deckCategory: 'Computer Networks',
    front: 'Explain the TCP 4-Way Teardown and the purpose of the TIME_WAIT state.',
    back: `Because TCP is full-duplex, each direction of the connection must be closed independently:
1. **FIN (Client $\\to$ Server)**: Client has no more data to send; sends \`FIN = 1\`. Enters \`FIN_WAIT_1\`.
2. **ACK (Server $\\to$ Client)**: Server acknowledges client's FIN (\`ACK = 1\`). Server enters \`CLOSE_WAIT\`; client enters \`FIN_WAIT_2\`. Server can still send remaining data!
3. **FIN (Server $\\to$ Client)**: Server finishes sending data; sends its own \`FIN = 1\`. Enters \`LAST_ACK\`.
4. **ACK (Client $\\to$ Server)**: Client sends final \`ACK = 1\`, and enters **\`TIME_WAIT\`** state for duration $2 \\times \\text{MSL}$ (Maximum Segment Lifetime, 60-120s).
• **Why TIME_WAIT is essential**:
  1. Ensures the final ACK reaches server (if lost, server retransmits FIN).
  2. Allows all old duplicated segments circulating in network routers to expire and die, preventing them from corrupting future connections reusing the same IP:Port tuple!`,
    tags: ['Networks', 'TCP', 'Teardown', 'TIME_WAIT'],
  },
  {
    id: 'net-4',
    deckCategory: 'Computer Networks',
    front: 'TCP vs UDP: Comprehensive comparison of architecture, reliability, and use cases.',
    back: `| Feature | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |
|---|---|---|
| **Connection** | Connection-oriented (3-way handshake required) | Connectionless (sends immediately) |
| **Reliability** | 100% Guaranteed delivery (acknowledgments, retransmissions) | Unreliable best-effort (packets may drop, duplicate, or arrive out of order) |
| **Ordering** | In-order delivery guaranteed via sequence numbers | No ordering guarantees |
| **Flow & Congestion** | Built-in Flow Control (Sliding Window) & Congestion Control (AIMD) | None: transmits as fast as application feeds it |
| **Header Size** | 20 to 60 bytes | 8 bytes (ultra lightweight) |
| **Speed** | Higher latency due to handshakes and ACKs | Minimal latency |
| **Use Cases** | Web (HTTP/HTTPS), File Transfer (FTP), Email (SMTP), SSH, Database connections | Video streaming, Voice/VoIP, Online Gaming, DNS queries, Live broadcast |`,
    tags: ['Networks', 'TCP vs UDP', 'Transport Layer'],
  },
  {
    id: 'net-5',
    deckCategory: 'Computer Networks',
    front: 'What is a SYN Flood Attack and how do SYN Cookies defend against it?',
    back: `• **SYN Flood Attack**: A Denial-of-Service (DoS) attack where an attacker sends a flood of \`TCP SYN\` packets with spoofed IP addresses.
  - The server allocates a Transmission Control Block (TCB) in memory and enters \`SYN_RCVD\`.
  - The server waits for the final ACK which never arrives, exhaustively consuming the server's **SYN Backlog Queue** and blocking legitimate users.
• **Defense (SYN Cookies)**:
  - When the backlog fills up, the server **does not allocate any memory state** for incoming SYNs!
  - Instead, the server encodes connection parameters into the Initial Sequence Number ($\\text{ISN}_S$) using a cryptographic hash: $\\text{ISN}_S = \\text{Hash}(IP_S, IP_D, Port_S, Port_D, \\text{SecretKey}) + \\text{MSS}$.
  - When client sends final ACK, server extracts and validates the cookie math. If valid, memory state is created on the spot!`,
    tags: ['Networks', 'Security', 'SYN Flood', 'SYN Cookies', 'TCP'],
  },
  {
    id: 'net-6',
    deckCategory: 'Computer Networks',
    front: 'Flow Control vs Congestion Control: What is the fundamental difference in TCP?',
    back: `• **Flow Control**:
  - *Goal*: Prevents the sender from overwhelming the **receiver's buffer memory**.
  - *Mechanism*: End-to-end. The receiver advertises its available buffer space in the **Receive Window (\`rwnd\`)** field in every TCP header. Sender never transmits more than \`rwnd\` unacknowledged bytes.
• **Congestion Control**:
  - *Goal*: Prevents the sender from overwhelming the **intermediate network routers and links** (preventing packet drops and bufferbloat).
  - *Mechanism*: Network-wide. Sender maintains a dynamic **Congestion Window (\`cwnd\`)** estimated based on packet loss and round-trip times (RTT).
• **Effective Transmission Window**:
  $$\\text{Effective Window} = \\min(\\text{rwnd}, \\text{cwnd})$$`,
    tags: ['Networks', 'Flow Control', 'Congestion Control', 'TCP'],
  },
  {
    id: 'net-7',
    deckCategory: 'Computer Networks',
    front: 'Explain TCP Congestion Control algorithms: Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery.',
    back: `1. **Slow Start**: Initial $\\text{cwnd} = 1\\text{ MSS}$. For every received ACK, $\\text{cwnd}$ doubles each RTT (**exponential growth** $1 \\to 2 \\to 4 \\to 8$). Continues until reaching slow start threshold ($\\text{ssthresh}$).
2. **Congestion Avoidance**: Once $\\text{cwnd} \\ge \\text{ssthresh}$, growth switches to **linear**: increments by $1\\text{ MSS}$ per RTT (**AIMD: Additive Increase**).
3. **Fast Retransmit**: If sender receives **3 Duplicate ACKs** for the same segment, it deduces packet loss immediately without waiting for a retransmission timer timeout, and immediately retransmits the missing segment!
4. **Fast Recovery**: Sets $\\text{ssthresh} = \\text{cwnd} / 2$, and $\\text{cwnd} = \\text{ssthresh} + 3\\text{ MSS}$ (**Multiplicative Decrease**), avoiding dropping down to 1 MSS!`,
    tags: ['Networks', 'Congestion Control', 'AIMD', 'Slow Start', 'TCP'],
  },
  {
    id: 'net-8',
    deckCategory: 'Computer Networks',
    front: 'Describe the complete step-by-step journey of DNS Resolution when typing a URL into a browser.',
    back: `When typing \`https://www.google.com\`:
1. **Browser Cache**: Checks internal cache (e.g. \`chrome://net-internals/#dns\`).
2. **OS Cache**: Checks OS resolver cache and local \`/etc/hosts\` file.
3. **Recursive Resolver (ISP / 8.8.8.8)**: Query sent to recursive DNS server. If cached, returns IP. If not:
4. **Root Nameserver (.)**: Recursive server queries Root server; returns addresses of **.com TLD Nameservers**.
5. **TLD Nameserver (.com)**: Queries .com TLD server; returns address of **google.com Authoritative Nameserver**.
6. **Authoritative Nameserver**: Queries Google's authoritative nameserver; returns the exact **A Record** (IPv4) or **AAAA Record** (IPv6).
7. Recursive resolver caches the record according to its **TTL (Time-To-Live)** and returns IP to browser!`,
    tags: ['Networks', 'DNS', 'Web Architecture', 'Resolution'],
  },
  {
    id: 'net-9',
    deckCategory: 'Computer Networks',
    front: 'HTTP/1.1 vs HTTP/2 vs HTTP/3: Complete evolution and architectural comparison.',
    back: `• **HTTP/1.1 (1997)**:
  - Text-based. Introduces persistent connections (\`Keep-Alive\`).
  - Suffers from **Application-Level Head-of-Line (HoL) Blocking**: Browsers must open 6 parallel TCP connections to fetch multiple assets simultaneously.
• **HTTP/2 (2015)**:
  - **Binary Framing** layer.
  - **Multiplexing**: Multiple bidirectional request/response streams over a single TCP connection.
  - **HPACK** header compression and **Server Push**.
  - *Limitation*: Suffers from **TCP Transport HoL Blocking**: if a single TCP packet is dropped, TCP halts all streams until the dropped packet is retransmitted.
• **HTTP/3 (2022)**:
  - Replaces TCP with **QUIC (UDP)**!
  - Streams are truly independent in the transport layer: a dropped packet on stream 1 does NOT block stream 2.
  - **0-RTT connection establishment** combining transport and TLS 1.3 handshake into a single round-trip.
  - Connection migration survives IP changes (e.g. WiFi to LTE).`,
    tags: ['Networks', 'HTTP', 'HTTP2', 'HTTP3', 'QUIC'],
  },
  {
    id: 'net-10',
    deckCategory: 'Computer Networks',
    front: 'How does HTTPS work? Detail the TLS 1.3 Handshake.',
    back: `HTTPS is HTTP over TLS (Transport Layer Security), providing **Confidentiality, Integrity, and Authentication**.
**TLS 1.3 1-RTT Handshake**:
1. **Client Hello**: Client sends supported cipher suites, random nonce, and **Key Share** (Diffie-Hellman public parameter).
2. **Server Hello & Certificate**: Server selects cipher suite, generates its DH key share, sends digital SSL certificate signed by a trusted **Certificate Authority (CA)**.
3. **Shared Secret Derivation**: Both sides calculate the exact same symmetric encryption key ($K_{\\text{session}}$) via Diffie-Hellman without ever transmitting it over the wire!
4. **Finished**: Server and client exchange encrypted verification messages. All subsequent HTTP traffic is encrypted using AES-GCM or ChaCha20 symmetric encryption!`,
    tags: ['Networks', 'HTTPS', 'TLS', 'Security', 'Encryption'],
  },
  {
    id: 'net-11',
    deckCategory: 'Computer Networks',
    front: 'Symmetric vs Asymmetric Encryption: How are they combined in modern security protocols?',
    back: `| Feature | Symmetric Encryption | Asymmetric Encryption (Public Key) |
|---|---|---|
| **Keys** | Single shared secret key for both encryption and decryption | Key Pair: **Public Key** (encrypts) + **Private Key** (decrypts) |
| **Speed** | Ultra-fast, hardware-accelerated (AES-NI) | 100x to 1000x slower due to heavy modular arithmetic (RSA, ECC) |
| **Key Distribution** | Hard: Secret key must be pre-shared securely | Easy: Public key can be broadcast openly |
| **Algorithms** | AES-256, ChaCha20, DES | RSA, Elliptic Curve Cryptography (ECC, ECDSA) |
• **Hybrid Cryptosystem**: Modern protocols (TLS, SSH, PGP) use Asymmetric encryption (Diffie-Hellman/RSA) strictly to exchange a temporary session key, and then switch to Symmetric encryption (AES) for all bulk data transfer!`,
    tags: ['Networks', 'Cryptography', 'Security', 'Encryption'],
  },
  {
    id: 'net-12',
    deckCategory: 'Computer Networks',
    front: 'Explain Subnetting and CIDR. How do you calculate usable host IPs for /24 and /28?',
    back: `**Classless Inter-Domain Routing (CIDR)** specifies the prefix length of network bits: \`IP/prefix\`.
**Formula**:
- Total Addresses = $2^{(32 - \\text{CIDR})}$
- **Usable Host Addresses** = $2^{(32 - \\text{CIDR})} - 2$
  *(2 addresses are reserved: First is Network Address, Last is Broadcast Address)*.
**Examples**:
1. \`/24\` Subnet (Subnet Mask: \`255.255.255.0\`):
   - Host bits = $32 - 24 = 8$
   - Usable hosts = $2^8 - 2 = 256 - 2 = 254$ usable hosts.
2. \`/28\` Subnet (Subnet Mask: \`255.255.255.240\`):
   - Host bits = $32 - 28 = 4$
   - Usable hosts = $2^4 - 2 = 16 - 2 = 14$ usable hosts.`,
    tags: ['Networks', 'Subnetting', 'CIDR', 'IP Addressing'],
  },
  {
    id: 'net-13',
    deckCategory: 'Computer Networks',
    front: 'What is NAT (Network Address Translation) and PAT (Port Address Translation)?',
    back: `• **NAT**: Modifies network address information in IP headers while in transit across a traffic routing device. Solves the exhaustion of IPv4 addresses by allowing an entire private LAN to share one or more public IP addresses.
• **PAT (NAT Overload)**:
  - Maps multiple private IP addresses and ports to a **single public IP address** using unique source port numbers.
  - *NAT Translation Table Example*:
    - \`192.168.1.10:4500\` $\\to$ \`203.0.113.5:50001\`
    - \`192.168.1.11:4500\` $\\to$ \`203.0.113.5:50002\`
  - When responses return to public port 50001, router remaps and forwards to internal host 192.168.1.10.`,
    tags: ['Networks', 'NAT', 'PAT', 'Routing'],
  },
  {
    id: 'net-14',
    deckCategory: 'Computer Networks',
    front: 'What is ARP (Address Resolution Protocol)? How does it resolve IP to MAC address?',
    back: `**ARP** is a Layer 2/Layer 3 mapping protocol that translates a logical **IP Address** into a physical **MAC Address** on a local broadcast domain.
**Sequence**:
1. Host A wants to send packet to IP $B$ on same subnet, but lacks MAC address in its ARP cache.
2. Host A broadcasts an **ARP Request** frame to physical broadcast address \`FF:FF:FF:FF:FF:FF\`: *"Who has IP 192.168.1.5? Tell 192.168.1.2!"*
3. All devices on the LAN receive the broadcast, but only the machine with IP $B$ replies with an **ARP Reply** (unicast): *"I am 192.168.1.5, my MAC address is 00:1A:2B:3C:4D:5E"*.
4. Host A caches the mapping in its local ARP table and transmits the frame.
• **ARP Poisoning / Spoofing**: An attacker broadcasts gratuitous fake ARP replies associating the default gateway's IP with their own MAC, executing a Man-in-the-Middle (MitM) attack!`,
    tags: ['Networks', 'ARP', 'Data Link Layer', 'MAC Address'],
  },
  {
    id: 'net-15',
    deckCategory: 'Computer Networks',
    front: 'How do ICMP, Ping, and Traceroute work under the hood?',
    back: `• **ICMP (Internet Control Message Protocol)**: Network layer protocol used for network diagnostic error reporting (e.g. Destination Unreachable, Time Exceeded).
• **Ping**: Sends an \`ICMP Echo Request\` (Type 8) to target IP. Target responds with \`ICMP Echo Reply\` (Type 0). Measures packet loss and Round-Trip Time (RTT).
• **Traceroute (Path Discovery)**:
  1. Sends UDP/ICMP packets with **Time-To-Live (TTL) = 1**. The first router decrements TTL to 0, drops the packet, and sends back an \`ICMP Time Exceeded\` (Type 11) message. Traceroute records Router 1's IP and latency.
  2. Sends packets with **TTL = 2** to discover Router 2.
  3. Increments TTL iteratively until the destination host is reached!`,
    tags: ['Networks', 'ICMP', 'Ping', 'Traceroute'],
  },
  {
    id: 'net-16',
    deckCategory: 'Computer Networks',
    front: 'Compare Routing Protocols: Distance Vector (RIP), Link State (OSPF), and Path Vector (BGP).',
    back: `1. **RIP (Routing Information Protocol)**:
   - *Algorithm*: Distance Vector (Bellman-Ford). Metric: Hop count (Max 15 hops).
   - Exchanges full routing tables with neighbors periodically (30s). Suffers from slow convergence and Count-to-Infinity problem.
2. **OSPF (Open Shortest Path First)**:
   - *Algorithm*: Link State (Dijkstra\'s SPF). Interior Gateway Protocol (IGP) within an Autonomous System (AS).
   - Every router builds full topological map of network; floods Link State Advertisements (LSAs) only on state changes. Fast convergence.
3. **BGP (Border Gateway Protocol)**:
   - *Algorithm*: Path Vector. Exterior Gateway Protocol (EGP) connecting disparate Autonomous Systems across the global Internet.
   - Routing decisions based on network policies, path attributes (AS-Path), and peering agreements rather than pure technical hop distance.`,
    tags: ['Networks', 'Routing', 'OSPF', 'BGP', 'RIP'],
  },
  {
    id: 'net-17',
    deckCategory: 'Computer Networks',
    front: 'Explain the DHCP DORA process for dynamic IP assignment.',
    back: `DHCP (Dynamic Host Configuration Protocol) assigns dynamic IP configurations through 4 steps (**DORA**):
1. **Discover (Broadcast)**: New client boots up without an IP; broadcasts a \`DHCPDISCOVER\` packet (\`0.0.0.0:68\` $\\to$ \`255.255.255.255:67\`).
2. **Offer (Unicast/Broadcast)**: DHCP Server reserves an IP address from its pool and replies with \`DHCPOFFER\` containing candidate IP, Subnet Mask, Default Gateway, and Lease Time.
3. **Request (Broadcast)**: Client broadcasts \`DHCPREQUEST\` confirming its acceptance of the offered IP (and notifying other DHCP servers that their offers were declined).
4. **Acknowledge (Unicast/Broadcast)**: Server sends final \`DHCPACK\` confirming the lease. Client configures its network interface.`,
    tags: ['Networks', 'DHCP', 'DORA', 'IP Configuration'],
  },
  {
    id: 'net-18',
    deckCategory: 'Computer Networks',
    front: 'Forward Proxy vs Reverse Proxy: Compare architecture and use cases.',
    back: `| Feature | Forward Proxy | Reverse Proxy |
|---|---|---|
| **Position** | Sits in front of **Clients** (Internal LAN $\\to$ Internet) | Sits in front of **Origin Backend Servers** (Internet $\\to$ Data Center) |
| **Visibility** | Servers do not know the real client IP | Clients do not know the real backend server IP |
| **Primary Goals** | Client privacy, bypass geo-restrictions, content filtering/caching in corporate LANs | Load balancing, SSL termination, DDoS protection, edge caching, web acceleration |
| **Examples** | Squid, Charles Proxy, Corporate enterprise gateways | Nginx, HAProxy, Cloudflare, Traefik, AWS ALB |`,
    tags: ['Networks', 'Proxy', 'Reverse Proxy', 'System Design'],
  },
  {
    id: 'net-19',
    deckCategory: 'Computer Networks',
    front: 'WebSockets vs Server-Sent Events (SSE) vs Long Polling: Compare real-time paradigms.',
    back: `| Feature | WebSockets | Server-Sent Events (SSE) | Long Polling |
|---|---|---|---|
| **Communication** | Full-duplex (Bidirectional simultaneous) | Unidirectional (Server $\\to$ Client only) | Simulated Bidirectional (Repeated HTTP requests) |
| **Protocol** | \`ws://\` / \`wss://\` (Upgraded TCP socket) | Standard HTTP (MIME: \`text/event-stream\`) | Standard HTTP request/response |
| **Firewall / Proxy** | May be blocked by strict firewalls | Passes through all standard HTTP proxies/firewalls | Standard HTTP |
| **Reconnection** | Must be implemented manually | Built-in automatic browser reconnection | Handled in application code |
| **Use Cases** | Chat applications, Multiplayer gaming, Collaborative whiteboards | Stock tickers, Twitter feeds, AI token streaming (ChatGPT) | Legacy real-time fallbacks |`,
    tags: ['Networks', 'WebSockets', 'SSE', 'Real-Time', 'Web'],
  },
  {
    id: 'net-20',
    deckCategory: 'Computer Networks',
    front: 'Cookies vs Sessions vs JWT (JSON Web Tokens): Architecture and tradeoffs.',
    back: `• **Cookie**: Key-value pair stored on client browser by server via \`Set-Cookie\` header. Automatically transmitted in subsequent HTTP requests to matching domain. Flags: \`HttpOnly\` (prevents XSS theft), \`Secure\` (HTTPS only), \`SameSite=Strict/Lax\` (prevents CSRF).
• **Server-Side Session**: State stored in server memory (Redis/Database). Client holds only opaque \`sessionId\` in a cookie.
  - *Pros*: Revocable instantly by deleting session key in Redis.
  - *Cons*: Stateful; requires horizontal database lookup on every request.
• **JWT (JSON Web Token)**: Stateless cryptographically signed token (\`Header.Payload.Signature\`) held by client.
  - *Pros*: Decentralized verification; backend services verify signature using public key without database lookups.
  - *Cons*: Cannot be revoked before expiry unless maintaining an explicit revocation blacklist.`,
    tags: ['Networks', 'Authentication', 'JWT', 'Cookies', 'Sessions'],
  },
  {
    id: 'net-21',
    deckCategory: 'Computer Networks',
    front: 'How does a Content Delivery Network (CDN) work? Explain Anycast routing and Edge Caching.',
    back: `A **CDN** is a globally distributed network of Edge Point-of-Presence (PoP) proxy servers located near users.
**How it works**:
1. **Anycast Routing**: Multiple CDN servers across the globe announce the exact same IP address via BGP. BGP routes the client's packet to the geographically nearest datacenter!
2. **Edge Caching**: If user requests static asset (\`image.png\`), edge server serves it in 5ms if cached.
3. **Cache Invalidation & Origin Fetch**: If not cached (cache miss), edge fetches from origin server, caches it based on \`Cache-Control: max-age=31536000\`, and returns it.
4. **Benefits**: Offloads 90% of traffic from backend origin; protects against multi-gigabit volumetric DDoS attacks.`,
    tags: ['Networks', 'CDN', 'Edge Computing', 'Anycast', 'Caching'],
  },
  {
    id: 'net-22',
    deckCategory: 'Computer Networks',
    front: 'What is MTU (Maximum Transmission Unit) and IP Fragmentation? Why is Path MTU Discovery used?',
    back: `• **MTU**: The maximum size (in bytes) of a packet that can be transmitted over a physical link without fragmenting. Standard Ethernet MTU is **1500 bytes**.
• **IP Fragmentation**: If a packet exceeds a router\'s outgoing MTU, the router splits the packet into smaller fragments, setting the \`More Fragments (MF)\` flag and fragment offset. Receiver reassembles them before passing to Transport layer.
  - *Downside*: If a single fragment drops, the entire original packet must be retransmitted!
• **Path MTU Discovery (PMTUD)**: Sender sets the **Don\'t Fragment (DF)** bit in IP header. If a router cannot forward without fragmenting, it drops the packet and sends an \`ICMP Fragmentation Needed\` message with its MTU. Sender adjusts segment size to match bottleneck link without fragmentation!`,
    tags: ['Networks', 'MTU', 'Fragmentation', 'IP Layer'],
  },
  {
    id: 'net-23',
    deckCategory: 'Computer Networks',
    front: 'Hub vs Switch vs Router: Compare layer, intelligence, collision domain, and broadcast domain.',
    back: `| Device | OSI Layer | Intelligence | Collision Domain | Broadcast Domain |
|---|---|---|---|---|
| **Hub** | Layer 1 (Physical) | Dumb repeater: broadcasts all electrical signals out all ports | **1 Single Collision Domain** across all connected ports | 1 Broadcast Domain |
| **Switch** | Layer 2 (Data Link) | Intelligent: learns MAC addresses in dynamic CAM table; forwards frames only to target port | **Separate Collision Domain per port** | 1 Broadcast Domain (can be isolated via VLANs) |
| **Router** | Layer 3 (Network) | Intelligent: routes IP packets between distinct subnets based on routing tables | Separate Collision Domain per port | **Breaks Broadcast Domains** (broadcasts do not cross routers) |`,
    tags: ['Networks', 'Hardware', 'Switch', 'Router', 'Hub'],
  },
  {
    id: 'net-24',
    deckCategory: 'Computer Networks',
    front: 'What is CSMA/CD vs CSMA/CA? Why does WiFi use Collision Avoidance instead of Detection?',
    back: `• **CSMA/CD (Carrier Sense Multiple Access with Collision Detection)**: Used in half-duplex wired Ethernet.
  - Listens before transmitting; transmits if line idle. If collision detected by electrical voltage spike, sends Jam Signal and waits a random time using **Exponential Backoff**.
• **CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)**: Used in wireless WiFi (802.11).
  - Listens to channel; if idle, waits **DIFS** time + random backoff. Optional RTS/CTS (Request-to-Send / Clear-to-Send) handshakes.
• **Why WiFi CANNOT use Collision Detection**:
  1. In wireless, transmitting drowns out the receiver antenna (cannot listen while transmitting).
  2. **Hidden Terminal Problem**: Two nodes out of range of each other might transmit to the same base station simultaneously; neither can detect the collision!`,
    tags: ['Networks', 'CSMA', 'Ethernet', 'WiFi', 'Wireless'],
  },
  {
    id: 'net-25',
    deckCategory: 'Computer Networks',
    front: 'What is Cross-Origin Resource Sharing (CORS)? Explain Preflight OPTIONS request.',
    back: `**CORS** is a browser security mechanism that restricts web applications from making AJAX/Fetch requests to a different domain, port, or protocol than the one that served the page (**Same-Origin Policy**).
• **Preflight Request**: For "non-simple" requests (e.g. methods \`PUT\`, \`DELETE\`, or custom headers like \`Authorization\`, \`Content-Type: application/json\`):
  1. The browser automatically sends an HTTP **\`OPTIONS\`** preflight request with headers:
     - \`Origin: https://frontend.com\`
     - \`Access-Control-Request-Method: DELETE\`
  2. The server responds with allowed origins and methods:
     - \`Access-Control-Allow-Origin: https://frontend.com\`
     - \`Access-Control-Allow-Methods: GET, POST, DELETE\`
  3. If allowed, browser sends the actual \`DELETE\` request; otherwise blocks with a CORS error!`,
    tags: ['Networks', 'CORS', 'Security', 'HTTP', 'Web'],
  },
  {
    id: 'net-26',
    deckCategory: 'Computer Networks',
    front: 'What is the Bandwidth-Delay Product (BDP)? Calculate required TCP Window size.',
    back: `The **Bandwidth-Delay Product (BDP)** represents the maximum volume of data "in flight" on the network pipe at any given moment:
$$\\text{BDP} = \\text{Round-Trip Time (RTT in seconds)} \\times \\text{Bandwidth (bytes/sec)}$$
**Significance**:
- To achieve 100% link utilization without stalling, the sender\'s TCP Receive Window (\`rwnd\`) must be at least equal to the BDP!
**Example Calculation**:
- 1 Gbps link ($1.25 \\times 10^8$ bytes/sec), RTT = 100 ms (0.1 sec):
  $$\\text{BDP} = 0.1 \\times 1.25 \\times 10^8 = 12.5\\text{ MB}.$$
- Because standard TCP header allows max 64KB window, modern operating systems enable **TCP Window Scaling** (RFC 1323) to expand window size up to 1GB!`,
    tags: ['Networks', 'BDP', 'TCP Window', 'Performance'],
  },
  {
    id: 'net-27',
    deckCategory: 'Computer Networks',
    front: 'IPv4 vs IPv6: Contrast header layout, address space, and major architectural improvements.',
    back: `| Feature | IPv4 | IPv6 |
|---|---|---|
| **Address Space** | 32-bit ($2^{32} \\approx 4.3\\text{ Billion}$ addresses) | 128-bit ($2^{128} \\approx 3.4 \\times 10^{38}$ addresses) |
| **Notation** | Dotted decimal (e.g. \`192.168.1.1\`) | Hexadecimal colon (e.g. \`2001:0db8::1\`) |
| **Header Size** | Variable (20 to 60 bytes with options) | Fixed 40 bytes (faster router processing) |
| **Checksum** | Header checksum verified at every hop | Checksum removed (deferred to Transport/Link layers) |
| **Fragmentation** | Performed by routers along path | Performed strictly by sender (End-to-end PMTUD) |
| **IP Allocation** | Requires NAT / DHCP | Auto-configuration (SLAAC) built-in; NAT unnecessary |`,
    tags: ['Networks', 'IPv4', 'IPv6', 'Internet Protocols'],
  },
  {
    id: 'net-28',
    deckCategory: 'Computer Networks',
    front: 'What is a Socket Address? Explain port multiplexing and well-known ports.',
    back: `• **Socket Address**: The unique endpoint tuple of an internet communication:
$$\\text{Socket} = (\\text{IP Address}, \\text{Port Number})$$
• **Full TCP Connection Identifier (4-Tuple)**:
$$(\\text{Source IP}, \\text{Source Port}, \\text{Destination IP}, \\text{Destination Port})$$
• **Port Multiplexing**: Allows a single physical server IP address to run thousands of distinct network services concurrently.
• **Port Ranges**:
  - *Well-Known Ports (0 - 1023)*: HTTP (80), HTTPS (443), SSH (22), DNS (53), SMTP (25), DHCP (67/68).
  - *Registered Ports (1024 - 49151)*: MySQL (3306), PostgreSQL (5432), Redis (6379), MongoDB (27017).
  - *Dynamic / Ephemeral Ports (49152 - 65535)*: Temporary ports assigned to outbound client connections.`,
    tags: ['Networks', 'Sockets', 'Ports', 'Transport Layer'],
  },
  {
    id: 'net-29',
    deckCategory: 'Computer Networks',
    front: 'Anycast vs Unicast vs Broadcast vs Multicast: Compare packet routing behaviors.',
    back: `• **Unicast (One-to-One)**: Packet is routed to a single unique destination host.
• **Broadcast (One-to-All)**: Packet is transmitted to all hosts within the same local broadcast domain (e.g. \`255.255.255.255\` or \`FF:FF:FF:FF:FF:FF\`). Routers do not forward broadcasts.
• **Multicast (One-to-Many Group)**: Packet is sent to a specific multicast group IP address (Class D: \`224.0.0.0/4\`); only subscribed hosts receive it (used in IPTV, live video streaming).
• **Anycast (One-to-Nearest)**: Multiple servers across the world share the exact same IP address. BGP routing delivers the packet to the topologically nearest server (used by DNS root servers, 1.1.1.1, 8.8.8.8, and CDNs).`,
    tags: ['Networks', 'Routing Modes', 'Anycast', 'Unicast', 'Broadcast'],
  },
  {
    id: 'net-30',
    deckCategory: 'Computer Networks',
    front: 'Explain the Stop-and-Wait, Go-Back-N, and Selective Repeat ARQ protocols.',
    back: `1. **Stop-and-Wait ARQ**: Sender transmits 1 frame, then halts and waits for ACK. Inefficient; channel remains idle for full RTT.
2. **Go-Back-N (GBN) ARQ**:
   - Pipelined: Sender can transmit up to $N$ frames before needing an ACK (Sliding Window).
   - Receiver accepts frames strictly in-order; discards any out-of-order frame. Uses **Cumulative ACKs**.
   - If frame $k$ is lost, sender timeouts and **retransmits all frames from $k$ onwards** (wasting bandwidth).
3. **Selective Repeat ARQ**:
   - Receiver maintains a buffer and accepts out-of-order frames, acknowledging each individually (**Selective ACKs**).
   - Sender retransmits **ONLY the specific missing frame** that timed out!`,
    tags: ['Networks', 'ARQ', 'Error Control', 'Sliding Window'],
  },
];

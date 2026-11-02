import { SeedFlashcard } from '../data';

export const THEORY_DBMS_30: SeedFlashcard[] = [
  {
    id: 'dbms-1',
    deckCategory: 'DBMS',
    front: 'Explain the 4 ACID properties of Relational Databases and how the engine enforces each.',
    back: `• **Atomicity ("All or Nothing")**: Either all statements in a transaction commit successfully, or all changes are rolled back.
  - *Enforced by*: **Write-Ahead Logging (WAL)** / Undo Logs in the transaction journal.
• **Consistency**: A transaction must transform the database from one valid state to another, preserving all schema invariants (constraints, foreign keys, triggers).
  - *Enforced by*: Declarative constraints + combined application logic and transactional rollbacks.
• **Isolation**: Concurrent transactions execute without interfering with one another, preventing dirty or incomplete data reads.
  - *Enforced by*: Locks (Two-Phase Locking 2PL) or **Multi-Version Concurrency Control (MVCC)**.
• **Durability**: Once a transaction commits, its writes are permanent and survive any sudden power outage or system crash.
  - *Enforced by*: Flushed Redo Logs / Write-Ahead Logs synced to non-volatile disk (\`fsync\`).`,
    tags: ['DBMS', 'ACID', 'Transactions', 'Foundations'],
  },
  {
    id: 'dbms-2',
    deckCategory: 'DBMS',
    front: 'Explain Normalization from 1NF to BCNF with concrete rules and anomaly elimination.',
    back: `• **1NF (First Normal Form)**:
  - Each column contains **atomic (indivisible) values**.
  - No repeating groups or array attributes. A unique primary key exists.
• **2NF (Second Normal Form)**:
  - Must be in 1NF.
  - **No Partial Dependency**: Every non-prime attribute must depend on the *entire* candidate key (applies to composite primary keys).
• **3NF (Third Normal Form)**:
  - Must be in 2NF.
  - **No Transitive Dependency**: Non-prime attributes must not depend on other non-prime attributes ($X \\to Y \\to Z$). "Every attribute must depend on the key, the whole key, and nothing but the key."
• **BCNF (Boyce-Codd Normal Form)**:
  - Stricter version of 3NF.
  - For every functional dependency $X \\to Y$, the determinant $X$ must be a **Super Key**. Eliminates anomalies when multiple overlapping candidate keys exist.`,
    tags: ['DBMS', 'Normalization', '1NF', '2NF', '3NF', 'BCNF'],
  },
  {
    id: 'dbms-3',
    deckCategory: 'DBMS',
    front: 'Clustered Index vs Non-Clustered (Secondary) Index: Architectural comparison.',
    back: `| Feature | Clustered Index | Non-Clustered (Secondary) Index |
|---|---|---|
| **Physical Storage** | Dictates the actual physical on-disk sort order of the table rows | Stored in a separate structure; does NOT alter physical row order |
| **Leaf Nodes** | The leaf nodes ARE the actual data pages! | Leaf nodes contain the index key + a **Row Pointer** (or Primary Key value) |
| **Max Limit per Table** | Exactly **ONE** per table | **Multiple** allowed per table (e.g. up to 999 in SQL Server) |
| **Speed** | Extremely fast for range queries and primary key lookups | Fast for key lookups, but may require secondary lookup (**Bookmark Lookup / RID Lookup**) |
| **Default** | Primary Key automatically creates Clustered Index by default | Created explicitly via \`CREATE INDEX\` on foreign keys or search columns |`,
    tags: ['DBMS', 'Indexing', 'Clustered', 'Non-Clustered'],
  },
  {
    id: 'dbms-4',
    deckCategory: 'DBMS',
    front: 'Why do relational databases use B+ Trees instead of B-Trees or Binary Search Trees for Indexing?',
    back: `1. **B+ Trees store data records exclusively in Leaf Nodes**: Internal nodes store only search keys and child pointers. This dramatically increases **Fanout** $M$ (hundreds of keys per 4KB node), reducing tree height to just 3-4 levels for millions of records.
2. **Linked Leaf Nodes for Range Scans**: All leaf nodes are linked via a doubly linked list. A range query (\`BETWEEN 100 AND 500\`) needs just one logarithmic search to the first leaf, followed by linear sequential pointer traversal. In B-Trees, range queries require expensive in-order tree traversals!
3. **Predictable Query Latency**: Every key lookup traverses exactly the same depth from root to leaf.
4. **Compared to BST/AVL/Red-Black**: Binary trees have a fanout of only 2, resulting in very deep trees ($O(\\log_2 N)$), requiring dozens of slow disk I/O operations per query.`,
    tags: ['DBMS', 'B+ Tree', 'B-Tree', 'Indexing', 'Data Structures'],
  },
  {
    id: 'dbms-5',
    deckCategory: 'DBMS',
    front: 'Detail the 4 SQL Transaction Isolation Levels and the 3 Read Phenomena they prevent.',
    back: `**Read Phenomena**:
1. *Dirty Read*: Transaction reads uncommitted data written by a concurrent transaction (which might subsequently rollback).
2. *Non-Repeatable Read*: Transaction re-reads the same row and discovers that the values have changed because another transaction committed an update.
3. *Phantom Read*: Transaction re-executes a query with a \`WHERE\` range condition and discovers new rows inserted by another committed transaction.

**Isolation Levels Matrix**:
| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|---|---|---|---|
| **Read Uncommitted** | ❌ Allowed | ❌ Allowed | ❌ Allowed |
| **Read Committed** | ✅ Prevented | ❌ Allowed | ❌ Allowed |
| **Repeatable Read** | ✅ Prevented | ✅ Prevented | ❌ Allowed (Prevented in MySQL InnoDB via Next-Key Locks) |
| **Serializable** | ✅ Prevented | ✅ Prevented | ✅ Prevented |`,
    tags: ['DBMS', 'Isolation Levels', 'Transactions', 'SQL'],
  },
  {
    id: 'dbms-6',
    deckCategory: 'DBMS',
    front: 'What is Multi-Version Concurrency Control (MVCC) and how does it prevent reader-writer blocking?',
    back: `**MVCC** is a concurrency control technique where **Readers do not block Writers, and Writers do not block Readers**!
**Mechanism**:
- Instead of mutating data in-place and locking rows, updates create a **new version** of the tuple with system timestamps or transaction IDs: \`xmin\` (creation transaction ID) and \`xmax\` (deletion transaction ID).
- When transaction $T$ reads, the engine presents a point-in-time snapshot of the database matching $T$'s visibility rules.
- **Deletes**: Mark \`xmax = T.id\` without immediately freeing disk space.
- **Garbage Collection**: Background vacuum processes (e.g. \`VACUUM\` in PostgreSQL) reclaim old tuple versions once no active transaction can see them.`,
    tags: ['DBMS', 'MVCC', 'PostgreSQL', 'Concurrency'],
  },
  {
    id: 'dbms-7',
    deckCategory: 'DBMS',
    front: 'What is Write-Ahead Logging (WAL) and how does it guarantee Atomicity and Durability?',
    back: `**Write-Ahead Logging (WAL)** is a core database invariant stating:
*All log records representing data changes MUST be flushed to non-volatile disk BEFORE the corresponding dirty pages in the database buffer pool are written to disk!*
**Why it matters**:
1. **Durability**: When a transaction commits, writing dirty 4KB/8KB pages scattered across random disk locations is too slow. Writing a compact, sequential append-only log record is ultra-fast.
2. **Atomicity (Crash Recovery)**:
   - **Undo Phase**: If system crashes mid-transaction, WAL undo records roll back partially written dirty pages.
   - **Redo Phase**: If system crashes after commit but before buffer pages reached disk, WAL redo records replay committed transactions.`,
    tags: ['DBMS', 'WAL', 'Durability', 'Crash Recovery'],
  },
  {
    id: 'dbms-8',
    deckCategory: 'DBMS',
    front: 'Explain Two-Phase Locking (2PL): Growing Phase, Shrinking Phase, and Strict 2PL.',
    back: `**Two-Phase Locking (2PL)** is a concurrency control protocol that guarantees serializability:
1. **Growing Phase**: Transaction may acquire locks (Shared or Exclusive), but cannot release any lock.
2. **Shrinking Phase**: Once a transaction releases its first lock, it enters the shrinking phase: it may release locks, but can **never acquire any new lock**!
• **Strict 2PL**: Holds all **Exclusive (Write) locks** until the transaction terminates (Commit or Abort). Prevents Cascading Aborts!
• **Rigorous 2PL**: Holds ALL locks (both Shared and Exclusive) until transaction termination. Guarantees strict serializability.`,
    tags: ['DBMS', '2PL', 'Concurrency Control', 'Locking'],
  },
  {
    id: 'dbms-9',
    deckCategory: 'DBMS',
    front: 'SQL vs NoSQL: When should you choose which database architecture?',
    back: `• **Relational (SQL)** (PostgreSQL, MySQL, Oracle):
  - *Schema*: Rigid tabular schemas with declarative foreign-key constraints.
  - *Scaling*: Vertical scaling (scale up) or complex read-replica setups.
  - *Transactions*: Full ACID compliance.
  - *Best for*: Financial systems, e-commerce orders, relational ERPs with complex multi-table joins.
• **NoSQL**:
  - **Document (MongoDB)**: Flexible JSON schemas for dynamic nested data (catalogs, user profiles).
  - **Key-Value (Redis, DynamoDB)**: Ultra-low sub-millisecond latency for caching, sessions, rate limits.
  - **Wide-Column (Cassandra, ScyllaDB)**: Massive write throughput and horizontal petabyte scaling across multiple regions (IoT metrics, timeseries).
  - **Graph (Neo4j)**: Social networks, recommendation engines, fraud graphs with deep multi-hop relationship traversals.`,
    tags: ['DBMS', 'SQL vs NoSQL', 'System Design'],
  },
  {
    id: 'dbms-10',
    deckCategory: 'DBMS',
    front: 'Explain all SQL Joins with set semantics: INNER, LEFT, RIGHT, FULL OUTER, CROSS, and SELF JOIN.',
    back: `1. **INNER JOIN**: Returns only rows with a matching key in both tables.
2. **LEFT (OUTER) JOIN**: Returns all rows from left table, plus matched rows from right table (fills with \`NULL\` if no match exists).
3. **RIGHT (OUTER) JOIN**: Returns all rows from right table, plus matched rows from left table.
4. **FULL OUTER JOIN**: Returns all rows from both tables, filling \`NULL\` on either side where matches do not exist.
5. **CROSS JOIN**: Produces the Cartesian product of both tables ($M \\times N$ rows).
6. **SELF JOIN**: A table joined with itself (e.g. employee reporting to manager: \`FROM Employees e1 JOIN Employees e2 ON e1.manager_id = e2.id\`).`,
    tags: ['DBMS', 'SQL', 'Joins'],
  },
  {
    id: 'dbms-11',
    deckCategory: 'DBMS',
    front: 'Views vs Materialized Views: Compare storage, query execution, and refresh strategies.',
    back: `• **Standard View (Virtual Table)**:
  - Stores only the **SQL query definition**, zero data on disk.
  - Every time the view is queried, the engine expands the query definition and executes the underlying join/filter from scratch.
  - Always returns 100% real-time data.
• **Materialized View**:
  - Physically executes the query and **stores the precomputed result set on disk** as a concrete table!
  - Query execution is blazingly fast (reads pre-aggregated rows directly from disk index).
  - Stale data trade-off: Must be refreshed explicitly (\`REFRESH MATERIALIZED VIEW\`) on a schedule, or updated incrementally via CDC (Change Data Capture) triggers.`,
    tags: ['DBMS', 'Views', 'Materialized Views', 'Performance'],
  },
  {
    id: 'dbms-12',
    deckCategory: 'DBMS',
    front: 'Database Sharding vs Partitioning: Horizontal vs Vertical differences.',
    back: `• **Horizontal Partitioning (Within Single Server)**: Splits a single large table into smaller physical partitions on the same database instance based on range (e.g. Date ranges), list, or hash. Application queries same logical table; engine prunes irrelevant partitions.
• **Vertical Partitioning**: Splits table columns into separate tables (e.g. moving rarely accessed blob columns \`user_biography\` away from hot columns \`id, email, password_hash\`).
• **Database Sharding (Across Multiple Servers)**: Horizontal partitioning distributed across physically separate, independent database instances (nodes).
  - Requires a **Shard Key** and routing mechanism (Consistent Hashing or Directory Lookup).
  - Trade-offs: Cross-shard joins and distributed transactions become prohibitively expensive.`,
    tags: ['DBMS', 'Sharding', 'Partitioning', 'Scaling'],
  },
  {
    id: 'dbms-13',
    deckCategory: 'DBMS',
    front: 'How is Deadlock handled in DBMS? Explain Wait-Die vs Wound-Wait prevention schemes.',
    back: `• **Deadlock Detection**: Database maintains a dynamic directed **Wait-For Graph** ($T_i \\to T_j$). A background thread runs cycle detection; if a cycle is found, the engine aborts the "cheapest" victim transaction and rolls it back.
• **Deadlock Prevention (Timestamp based, oldest = highest priority)**:
  - **Wait-Die (Non-preemptive)**: If older transaction $T_{old}$ requests lock held by younger $T_{young}$, $T_{old}$ is allowed to **wait**. If younger $T_{young}$ requests lock held by $T_{old}$, $T_{young}$ immediately **dies** (aborts and restarts).
  - **Wound-Wait (Preemptive)**: If older $T_{old}$ requests lock held by younger $T_{young}$, $T_{old}$ **wounds** $T_{young}$ (preempts and aborts it). If younger requests lock held by older, younger is allowed to wait.`,
    tags: ['DBMS', 'Deadlock', 'Transactions', 'Wait-Die'],
  },
  {
    id: 'dbms-14',
    deckCategory: 'DBMS',
    front: 'What is a Composite Index and what is the Leftmost Prefix Rule?',
    back: `A **Composite Index** is an index created on two or more columns, e.g., \`CREATE INDEX idx ON Users (country, city, age)\`.
• **Leftmost Prefix Rule**: The database index can only be used by queries that filter on a contiguous prefix of the index columns starting from the very first (leftmost) column:
  - \`WHERE country = 'IN'\` $\\to$ **Uses Index**
  - \`WHERE country = 'IN' AND city = 'Bangalore'\` $\\to$ **Uses Index**
  - \`WHERE country = 'IN' AND city = 'Bangalore' AND age = 25\` $\\to$ **Uses Index**
  - \`WHERE city = 'Bangalore'\` $\\to$ **CANNOT Use Index!** (Leftmost column missing)
  - \`WHERE country = 'IN' AND age = 25\` $\\to$ Uses index only for \`country\`; filters \`age\` sequentially.`,
    tags: ['DBMS', 'Composite Index', 'Indexing', 'Performance'],
  },
  {
    id: 'dbms-15',
    deckCategory: 'DBMS',
    front: 'What is a Covering Index (Index-Only Scan)? Why does it provide massive speedups?',
    back: `A **Covering Index** is an index that contains all the columns requested in the query's \`SELECT\`, \`WHERE\`, \`JOIN\`, and \`ORDER BY\` clauses.
**Why it provides massive speedups**:
- Normally, a non-clustered index lookup finds matching keys in the B+ tree, and then performs a secondary disk lookup (**Table Access / Bookmark Lookup**) to fetch the remaining columns from the table rows.
- When an index covers the query, the database engine retrieves all required data **directly from the index B+ tree leaf pages**, completely bypassing the main table! Eliminates random disk I/O.`,
    tags: ['DBMS', 'Covering Index', 'Performance', 'SQL'],
  },
  {
    id: 'dbms-16',
    deckCategory: 'DBMS',
    front: 'WHERE clause vs HAVING clause: What are the differences in SQL execution order?',
    back: `| Feature | WHERE Clause | HAVING Clause |
|---|---|---|
| **Filtering Level** | Filters **individual rows** before grouping | Filters **aggregated groups** after grouping |
| **Aggregate Functions** | **Cannot** contain aggregate functions (e.g. \`WHERE SUM(salary) > 1000\` is an error!) | Specifically designed for aggregate functions (e.g. \`HAVING COUNT(*) > 5\`) |
| **Performance** | Faster: reduces dataset early before expensive \`GROUP BY\` | Slower if used for non-aggregated conditions because groups are built first |
| **SQL Execution Order** | Evaluated **3rd** (FROM $\\to$ ON $\\to$ **WHERE** $\\to$ GROUP BY $\\to$ HAVING $\\to$ SELECT $\\to$ DISTINCT $\\to$ ORDER BY $\\to$ LIMIT) | Evaluated **5th** (after GROUP BY) |`,
    tags: ['DBMS', 'SQL', 'WHERE', 'HAVING'],
  },
  {
    id: 'dbms-17',
    deckCategory: 'DBMS',
    front: 'What is SQL Injection (SQLi) and what are the 3 best practices to eliminate it?',
    back: `**SQL Injection** occurs when untrusted user input is directly concatenated into a dynamic SQL query, allowing an attacker to manipulate the query structure:
\`\`\`sql
-- Vulnerable:
query = "SELECT * FROM Users WHERE email = '" + input + "'";
-- Attacker input: admin' OR '1'='1
-- Resulting SQL: SELECT * FROM Users WHERE email = 'admin' OR '1'='1' (Bypasses authentication!)
\`\`\`
**Prevention Best Practices**:
1. **Parameterized Queries / Prepared Statements**: The SQL query structure is compiled first; user input is passed strictly as data parameters, never interpreted as executable SQL syntax.
2. **Object-Relational Mapping (ORMs)**: Modern ORMs (Prisma, Hibernate, SQLAlchemy) use parameterized statements by default.
3. **Principle of Least Privilege**: Database user account should only have minimal required permissions (e.g. no \`DROP TABLE\`).`,
    tags: ['DBMS', 'Security', 'SQL Injection', 'Prepared Statements'],
  },
  {
    id: 'dbms-18',
    deckCategory: 'DBMS',
    front: 'Optimistic vs Pessimistic Concurrency Control: Compare performance and use cases.',
    back: `• **Pessimistic Locking**:
  - Assumes conflicting writes will frequently occur.
  - Locks rows immediately upon reading via \`SELECT ... FOR UPDATE\`.
  - Concurrent transactions attempting to modify those rows block and wait.
  - *Best for*: High-contention banking transactions, inventory reservation where conflict cost is high.
• **Optimistic Concurrency Control (OCC)**:
  - Assumes conflicts are rare.
  - Allows reads and writes without locks, but records a **version column** or timestamp (\`UPDATE Accounts SET balance = 50, version = version + 1 WHERE id = 1 AND version = current_version\`).
  - If another transaction modified the row, rows affected is \`0\`; transaction aborts and retries.
  - *Best for*: Low-to-medium contention web apps, high-throughput microservices.`,
    tags: ['DBMS', 'Concurrency', 'Optimistic Locking', 'Pessimistic Locking'],
  },
  {
    id: 'dbms-19',
    deckCategory: 'DBMS',
    front: 'Correlated vs Non-Correlated Subqueries: Compare execution and optimization.',
    back: `• **Non-Correlated Subquery**:
  - Independent of the outer query. Evaluated **exactly once** before the outer query runs.
  - Example: \`SELECT name FROM Employees WHERE department_id IN (SELECT id FROM Departments WHERE location = 'NY')\`.
• **Correlated Subquery**:
  - References columns from the outer query row ($O(M \\times N)$ naive cost). Evaluated **once for each row** processed by the outer query!
  - Example: \`SELECT e1.name, e1.salary FROM Employees e1 WHERE e1.salary > (SELECT AVG(e2.salary) FROM Employees e2 WHERE e2.dept_id = e1.dept_id)\`.
  - *Optimization*: Rewrite using **Window Functions** (\`AVG(salary) OVER (PARTITION BY dept_id)\`) or explicit \`INNER JOIN\` to execute in single pass.`,
    tags: ['DBMS', 'Subqueries', 'Optimization', 'SQL'],
  },
  {
    id: 'dbms-20',
    deckCategory: 'DBMS',
    front: 'Explain Primary Key, Candidate Key, Super Key, and Foreign Key.',
    back: `• **Super Key**: Any set of attributes that uniquely identifies a row in a table. May contain redundant columns (e.g. \`{SSN, Name, Phone}\`).
• **Candidate Key**: A **minimal Super Key** with no redundant attributes. A table may have multiple candidate keys.
• **Primary Key**: The specific candidate key chosen by the database designer to uniquely identify each row. It can **never contain NULL values** and must be unique.
• **Unique Key**: Enforces uniqueness on a column, but permits **one or more NULL values** (depending on SQL dialect).
• **Foreign Key**: A column that references the Primary Key of another table, enforcing **Referential Integrity** (\`ON DELETE CASCADE\`, \`ON DELETE SET NULL\`, \`ON DELETE RESTRICT\`).`,
    tags: ['DBMS', 'Keys', 'Schema Design', 'Relational Model'],
  },
  {
    id: 'dbms-21',
    deckCategory: 'DBMS',
    front: 'What is Database Connection Pooling and why is it essential?',
    back: `**Database Connection Pooling** maintains a cache of active physical database connections that are reused across incoming client requests.
**Why it is essential**:
1. **High Overhead of Establishing Connections**: Opening a new PostgreSQL/MySQL connection requires: TCP 3-way handshake, TLS negotiation, authentication exchange, memory allocation for backend worker process. This takes 20-100ms per request!
2. **Preventing Server Exhaustion**: Database memory is finite. If 5,000 concurrent web requests each opened an independent connection, the database server would crash due to OS thread exhaustion and RAM saturation.
3. *Tools*: HikariCP (Java), PgBouncer (PostgreSQL), Prisma connection pool.`,
    tags: ['DBMS', 'Connection Pooling', 'Performance', 'Backend'],
  },
  {
    id: 'dbms-22',
    deckCategory: 'DBMS',
    front: 'What is Star Schema vs Snowflake Schema in Data Warehousing?',
    back: `• **Star Schema**:
  - Central **Fact Table** (storing quantitative measurements/metrics) surrounded by denormalized **Dimension Tables**.
  - Resembles a star.
  - Dimension tables contain redundant data (not fully normalized).
  - *Pros*: Simple queries with fewer joins, fast OLAP read performance.
• **Snowflake Schema**:
  - An extension of Star Schema where Dimension Tables are **further normalized** into sub-dimension tables (e.g., \`DimProduct\` $\\to$ \`DimCategory\` $\\to$ \`DimDepartment\`).
  - Resembles a snowflake.
  - *Pros*: Minimizes data redundancy and saves storage.
  - *Cons*: Complex SQL queries requiring multiple joins, slower OLAP reporting queries.`,
    tags: ['DBMS', 'Data Warehouse', 'Star Schema', 'Snowflake Schema', 'OLAP'],
  },
  {
    id: 'dbms-23',
    deckCategory: 'DBMS',
    front: 'What is Denormalization? Why and when would an engineer intentionally denormalize?',
    back: `**Denormalization** is the intentional strategy of adding redundant data or grouping data from multiple tables into a single table to eliminate expensive joins.
**When to Denormalize**:
1. Read-heavy systems (e.g., 99% reads, 1% writes) where multi-table joins are the primary latency bottleneck.
2. Real-time dashboards and reporting pipelines requiring instantaneous aggregations.
**Trade-offs & Risks**:
- Slower writes (redundant data must be updated across multiple locations).
- Risk of data inconsistency / anomalies if an update fails to synchronize.
- Higher storage consumption.`,
    tags: ['DBMS', 'Denormalization', 'Performance', 'Architecture'],
  },
  {
    id: 'dbms-24',
    deckCategory: 'DBMS',
    front: 'How do Database Checkpoints work and how do they reduce recovery time?',
    back: `During execution, the database maintains dirty pages in RAM and writes sequential logs to WAL. If a crash occurs, the database would have to replay the WAL from the very beginning of time!
• **Checkpoint**:
1. The database flushes all modified dirty buffer pages currently in RAM to permanent disk tables.
2. Flushes all WAL log records to disk.
3. Writes a special **Checkpoint Record** to WAL and updates master pointer.
• **Benefit**: During crash recovery (via ARIES), the database knows all changes made prior to the checkpoint are guaranteed to be safe on disk. It only needs to scan and replay WAL logs created **after the checkpoint**, reducing recovery time from hours to seconds!`,
    tags: ['DBMS', 'Checkpoints', 'Crash Recovery', 'WAL'],
  },
  {
    id: 'dbms-25',
    deckCategory: 'DBMS',
    front: 'Triggers, Stored Procedures, and User Defined Functions (UDFs): Pros and Cons.',
    back: `• **Stored Procedure**: Precompiled SQL code stored in the database. Can execute transactions, return multiple result sets, and mutate data.
• **Trigger**: Automatically executes in response to database events (\`BEFORE/AFTER INSERT/UPDATE/DELETE\`).
• **UDF**: Callable scalar or table-valued function returning computed values.
**Pros**: Reduced network traffic between application and database; precompiled execution plans.
**Cons**:
1. Business logic scattered inside database, impossible to unit test and version control cleanly.
2. Consumes database CPU which cannot scale horizontally as easily as stateless web application pods.
3. Hard to debug and monitor.`,
    tags: ['DBMS', 'Stored Procedures', 'Triggers', 'Database Design'],
  },
  {
    id: 'dbms-26',
    deckCategory: 'DBMS',
    front: 'What causes Index Fragmentation and how is it resolved?',
    back: `• **Internal Fragmentation**: B+ tree pages have excessive empty space caused by row deletions or page splits.
• **External Fragmentation**: The physical order of B+ tree leaf pages on disk does not match their logical order, forcing slow random disk seeks during range queries.
• **Root Cause**: Frequent random inserts (e.g. non-sequential UUID primary keys) and deletes that split and leave gaps in B+ tree pages.
• **Resolution**:
  - \`OPTIMIZE TABLE\` (MySQL) or \`REINDEX TABLE\` / \`pg_repack\` (PostgreSQL).
  - Use sequential IDs (ULID, Auto-increment BigInt) instead of random UUIDv4 as primary keys.`,
    tags: ['DBMS', 'Index Fragmentation', 'B+ Tree', 'Performance'],
  },
  {
    id: 'dbms-27',
    deckCategory: 'DBMS',
    front: 'What is a Cursor in SQL? Why are cursors considered an antipattern for performance?',
    back: `A **Cursor** is a database object used to retrieve and process query result rows **one row at a time** (row-by-row / RBAR: "Row By Agonizing Row") rather than set-based processing.
**Why Cursors are an Antipattern**:
1. Relational databases are optimized for **set-based operations** using vectorization, pipelining, and parallel execution.
2. Cursors execute loops in procedural code, locking rows individually, consuming significant memory, and increasing query time by orders of magnitude.
3. *Alternative*: Always replace cursor loops with set-based \`UPDATE ... WHERE\`, \`CASE WHEN\`, Window Functions (\`ROW_NUMBER()\`), or CTEs.`,
    tags: ['DBMS', 'Cursors', 'SQL Optimization', 'Antipattern'],
  },
  {
    id: 'dbms-28',
    deckCategory: 'DBMS',
    front: 'Explain the difference between clustered vs secondary index lookups on MySQL InnoDB.',
    back: `In **MySQL InnoDB**:
1. The table data is physically organized as a **Clustered Index** keyed by the Primary Key. The leaf node holds the entire row data.
2. All **Secondary Indexes** store the indexed column(s) plus the **Primary Key value** as the row pointer (NOT physical disk offset).
3. **Execution**:
   - Primary Key lookup: 1 B+ tree traversal directly to data.
   - Secondary Index lookup: 1st B+ tree traversal to get Primary Key value $\\to$ 2nd B+ tree traversal (**Double Lookup / Bookmark Lookup**) on Clustered Index to retrieve full row columns!
   - Can be avoided if query is satisfied by a Covering Index.`,
    tags: ['DBMS', 'InnoDB', 'MySQL', 'Clustered Index'],
  },
  {
    id: 'dbms-29',
    deckCategory: 'DBMS',
    front: 'What is ACID vs BASE in Distributed Data Stores?',
    back: `• **ACID (Pessimistic, Strong Consistency)**:
  - Atomicity, Consistency, Isolation, Durability.
  - Prioritizes consistency over availability during network partitions.
  - Typical of relational databases (PostgreSQL, MySQL).
• **BASE (Optimistic, High Availability)**:
  - **Basically Available**: System guarantees availability of data, even with failures or partial network partitions.
  - **Soft State**: State of system may change over time without user interaction (e.g. due to background replica convergence).
  - **Eventual Consistency**: Replicas may temporarily diverge, but given no new updates, all replicas will eventually become consistent.
  - Typical of distributed NoSQL databases (Cassandra, DynamoDB).`,
    tags: ['DBMS', 'ACID', 'BASE', 'Distributed Systems'],
  },
  {
    id: 'dbms-30',
    deckCategory: 'DBMS',
    front: 'Explain Query Optimization and Cost-Based Optimizer (CBO) decisions in SQL.',
    back: `When a query arrives, the SQL engine compiles it through 4 stages:
1. **Parser & Lexer**: Verifies syntax and table schema legality.
2. **Rewriter / Rule Optimizer**: Simplifies boolean predicates, pushes down selections, flattens subqueries into joins.
3. **Cost-Based Optimizer (CBO)**:
   - Uses **Table Statistics** (histograms of column value distributions, null counts, total pages).
   - Evaluates multiple candidate execution plans:
     - Join methods: **Nested Loop Join** (small tables with index), **Hash Join** (large unsorted tables), **Merge Join** (both sorted on join key).
     - Access paths: **Index Scan** vs **Index Range Scan** vs **Sequential Full Table Scan**.
4. **Execution Engine**: Runs the plan with the lowest estimated disk I/O and CPU cost score.`,
    tags: ['DBMS', 'Query Optimization', 'CBO', 'Execution Plan'],
  },
];

import { SeedProblem } from '../data';

export const PROBLEMS_GRAPHS: SeedProblem[] = [
  {
    id: 'grp-1',
    slug: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'MEDIUM',
    category: 'Graphs',
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    orderIndex: 91,
    descriptionMdx: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return *the number of islands*.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', 'grid[i][j] is \'0\' or \'1\''],
    starterCodeJson: {
      python: `def numIslands(grid: list[list[str]]) -> int:
    if not grid: return 0
    R, C = len(grid), len(grid[0])
    count = 0
    
    def dfs(r, c):
        if r < 0 or r >= R or c < 0 or c >= C or grid[r][c] != '1':
            return
        grid[r][c] = '0' # sink the island
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
        
    for r in range(R):
        for c in range(C):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    return count`,
      javascript: `function numIslands(grid) {
  let count = 0;
  const R = grid.length, C = grid[0].length;
  function dfs(r, c) {
    if (r < 0 || r >= R || c < 0 || c >= C || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  }
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c] === '1') { count++; dfs(r, c); }
    }
  }
  return count;
}`,
    },
    testCasesJson: [
      { input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expected: '1', hidden: false },
      { input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expected: '3', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **"Sink the Island" DFS**: When discovering a \`'1'\`, increment count and immediately mutate the cell to \`'0'\` before recursively visiting its 4 neighbors.
- Eliminates extra $O(M \\times N)$ visited matrix memory!`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-2',
    slug: 'clone-graph',
    title: 'Clone Graph',
    difficulty: 'MEDIUM',
    category: 'Graphs',
    companyTags: ['Amazon', 'Meta', 'Google'],
    orderIndex: 92,
    descriptionMdx: `Given a reference of a node in a **connected** undirected graph, return a **deep copy** (clone) of the graph. Each node in the graph contains a value (\`int\`) and a list (\`List[Node]\`) of its neighbors.`,
    constraints: ['The number of nodes in the graph is in the range [0, 100]', '1 <= Node.val <= 100', 'Node.val is unique for each node'],
    starterCodeJson: {
      python: `def cloneGraph(node):
    if not node: return None
    cloned = {}
    def dfs(curr):
        if curr in cloned:
            return cloned[curr]
        copy = Node(curr.val)
        cloned[curr] = copy
        for nei in curr.neighbors:
            copy.neighbors.append(dfs(nei))
        return copy
    return dfs(node)`,
      javascript: `// DFS or BFS with Map(oldNode -> newNode)`,
    },
    testCasesJson: [
      { input: '[[2,4],[1,3],[2,4],[1,3]]', expected: '[[2,4],[1,3],[2,4],[1,3]]', hidden: false },
      { input: '[[]]', expected: '[[]]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Use a hash map \`cloned = {old_node: new_node}\`.
- If a node is already in the map, return its cloned instance immediately (handles cycles!).
- Recursively clone all neighbors and append them to \`copy.neighbors\`.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-3',
    slug: 'max-area-of-island',
    title: 'Max Area of Island',
    difficulty: 'MEDIUM',
    category: 'Graphs',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 93,
    descriptionMdx: `You are given an \`m x n\` binary matrix \`grid\`. An island is a group of \`1\`s connected 4-directionally. The **area** of an island is the number of cells with a value \`1\` in the island.

Return *the maximum **area** of an island in* \`grid\`. If there is no island, return 0.`,
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 50', 'grid[i][j] is either 0 or 1'],
    starterCodeJson: {
      python: `def maxAreaOfIsland(grid: list[list[int]]) -> int:
    R, C = len(grid), len(grid[0])
    def dfs(r, c):
        if r < 0 or r >= R or c < 0 or c >= C or grid[r][c] == 0:
            return 0
        grid[r][c] = 0
        return 1 + dfs(r+1, c) + dfs(r-1, c) + dfs(r, c+1) + dfs(r, c-1)
    
    max_area = 0
    for r in range(R):
        for c in range(C):
            if grid[r][c] == 1:
                max_area = max(max_area, dfs(r, c))
    return max_area`,
      javascript: `// In-place flood fill summing cell counts`,
    },
    testCasesJson: [
      { input: '[[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]', expected: '6', hidden: false },
      { input: '[[0,0,0,0,0,0,0,0]]', expected: '0', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- In DFS, return \`1 + sum(dfs(neighbor))\`.
- Zero out the cell immediately to prevent infinite cycles. Total runtime: $O(M \\times N)$.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-4',
    slug: 'pacific-atlantic-water-flow',
    title: 'Pacific Atlantic Water Flow',
    difficulty: 'MEDIUM',
    category: 'Graphs',
    companyTags: ['Google', 'Amazon', 'Meta'],
    orderIndex: 94,
    descriptionMdx: `There is an \`m x n\` rectangular island that borders both the Pacific Ocean and Atlantic Ocean. Pacific touches top & left borders; Atlantic touches bottom & right borders.

Water can flow in 4 directions to neighboring cells of equal or lower height. Return a 2D list of grid coordinates where water can flow to **both** oceans.`,
    constraints: ['m == heights.length', 'n == heights[r].length', '1 <= m, n <= 200', '0 <= heights[r][c] <= 10^5'],
    starterCodeJson: {
      python: `def pacificAtlantic(heights: list[list[int]]) -> list[list[int]]:
    R, C = len(heights), len(heights[0])
    pac, atl = set(), set()
    
    def dfs(r, c, visit, prev_height):
        if (r, c) in visit or r < 0 or r >= R or c < 0 or c >= C or heights[r][c] < prev_height:
            return
        visit.add((r, c))
        for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            dfs(r + dr, c + dc, visit, heights[r][c])
            
    for c in range(C):
        dfs(0, c, pac, heights[0][c])
        dfs(R - 1, c, atl, heights[R - 1][c])
    for r in range(R):
        dfs(r, 0, pac, heights[r][0])
        dfs(r, C - 1, atl, heights[r][C - 1])
        
    return list(pac & atl)`,
      javascript: `// Flow uphill from both ocean borders and intersect sets`,
    },
    testCasesJson: [
      { input: '[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]', expected: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Reverse Flow Trick**: Instead of checking if water flows down from each internal cell to the ocean, start from the ocean borders and flow **uphill** (\`heights[next] >= heights[curr]\`).
- The answer is the intersection of cells reachable from both Pacific and Atlantic: \`pac & atl\`.`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-5',
    slug: 'surrounded-regions',
    title: 'Surrounded Regions',
    difficulty: 'MEDIUM',
    category: 'Graphs',
    companyTags: ['Amazon', 'Google'],
    orderIndex: 95,
    descriptionMdx: `Given an \`m x n\` matrix \`board\` containing \`'X'\` and \`'O'\`, capture all regions that are 4-directionally surrounded by \`'X'\`.

A region is captured by flipping all \`'O'\`s into \`'X'\`s in that surrounded region. Any \`'O'\` on the border cannot be captured.`,
    constraints: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 200', 'board[i][j] is \'X\' or \'O\''],
    starterCodeJson: {
      python: `def solve(board: list[list[str]]) -> None:
    R, C = len(board), len(board[0])
    
    def dfs(r, c):
        if r < 0 or r >= R or c < 0 or c >= C or board[r][c] != 'O':
            return
        board[r][c] = 'T' # Mark safe
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)
        
    # Mark border connected 'O's
    for r in range(R):
        for c in range(C):
            if (r in [0, R - 1] or c in [0, C - 1]) and board[r][c] == 'O':
                dfs(r, c)
                
    # Flip remaining 'O' to 'X', restore 'T' to 'O'
    for r in range(R):
        for c in range(C):
            if board[r][c] == 'O':
                board[r][c] = 'X'
            elif board[r][c] == 'T':
                board[r][c] = 'O'`,
      javascript: `// Mark border O's as safe ('T'), flip rest, revert 'T'`,
    },
    testCasesJson: [
      { input: '[["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]', expected: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Invert Problem**: Any \`'O'\` connected to the grid boundary can never be surrounded.
- Flood-fill starting only from border \`'O'\`s, changing them to a temporary tag \`'T'\`.
- In a final pass: change remaining \`'O'\`s to \`'X'\` (they were truly surrounded) and \`'T'\` back to \`'O'\`.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-6',
    slug: 'rotting-oranges',
    title: 'Rotting Oranges',
    difficulty: 'MEDIUM',
    category: 'Graphs',
    companyTags: ['Amazon', 'Microsoft', 'Bloomberg', 'Google'],
    orderIndex: 96,
    descriptionMdx: `You are given an \`m x n\` grid where each cell has:
- \`0\` representing an empty cell,
- \`1\` representing a fresh orange, or
- \`2\` representing a rotten orange.

Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return *minimum minutes until no fresh orange remains*, or \`-1\` if impossible.`,
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 10', 'grid[i][j] is 0, 1, or 2'],
    starterCodeJson: {
      python: `from collections import deque

def orangesRotting(grid: list[list[int]]) -> int:
    R, C = len(grid), len(grid[0])
    q = deque()
    fresh = 0
    for r in range(R):
        for c in range(C):
            if grid[r][c] == 2:
                q.append((r, c))
            elif grid[r][c] == 1:
                fresh += 1
    if fresh == 0: return 0
    time = 0
    while q and fresh > 0:
        for _ in range(len(q)):
            r, c = q.popleft()
            for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    q.append((nr, nc))
        time += 1
    return time if fresh == 0 else -1`,
      javascript: `// Multi-source BFS tracking elapsed time`,
    },
    testCasesJson: [
      { input: '[[2,1,1],[1,1,0],[0,1,1]]', expected: '4', hidden: false },
      { input: '[[2,1,1],[0,1,1],[1,0,1]]', expected: '-1', hidden: false },
      { input: '[[0,2]]', expected: '0', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Multi-Source BFS**: Initialize the queue with *all* rotten oranges initially present at $t=0$.
- Each BFS layer represents 1 minute.
- Stop when \`fresh == 0\` to avoid counting an unnecessary extra minute!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-7',
    slug: 'course-schedule',
    title: 'Course Schedule (Cycle Detection in DAG)',
    difficulty: 'MEDIUM',
    category: 'Graphs',
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    orderIndex: 97,
    descriptionMdx: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a, b]\` indicates that you must take course \`b\` first if you want to take course \`a\`.

Return \`true\` if you can finish all courses. Otherwise, return \`false\`.`,
    constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= 5000', 'prerequisites[i].length == 2', 'All the pairs prerequisites[i] are unique'],
    starterCodeJson: {
      python: `from collections import defaultdict, deque

def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    in_degree = [0] * numCourses
    adj = defaultdict(list)
    for crs, pre in prerequisites:
        adj[pre].append(crs)
        in_degree[crs] += 1
        
    q = deque([i for i in range(numCourses) if in_degree[i] == 0])
    completed = 0
    while q:
        node = q.popleft()
        completed += 1
        for nei in adj[node]:
            in_degree[nei] -= 1
            if in_degree[nei] == 0:
                q.append(nei)
    return completed == numCourses`,
      javascript: `// Kahn's algorithm using in-degree array and queue`,
    },
    testCasesJson: [
      { input: '2, [[1,0]]', expected: 'true', hidden: false },
      { input: '2, [[1,0],[0,1]]', expected: 'false', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Kahn's Algorithm (In-Degree BFS)**:
  - Track how many prerequisites each course has (\`in_degree\`).
  - Push all courses with \`in_degree == 0\` into a queue.
  - Decrement prerequisites for neighbors when a course is popped.
  - If \`completed == numCourses\`, the graph has no cycle!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-8',
    slug: 'course-schedule-ii',
    title: 'Course Schedule II (Topological Sort)',
    difficulty: 'MEDIUM',
    category: 'Graphs',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 98,
    descriptionMdx: `Return the ordering of courses you should take to finish all courses. If there are many valid answers, return **any** of them. If it is impossible to finish all courses, return an **empty array**.`,
    constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= numCourses * (numCourses - 1)'],
    starterCodeJson: {
      python: `from collections import defaultdict, deque

def findOrder(numCourses: int, prerequisites: list[list[int]]) -> list[int]:
    adj = defaultdict(list)
    in_degree = [0] * numCourses
    for crs, pre in prerequisites:
        adj[pre].append(crs)
        in_degree[crs] += 1
    
    q = deque([i for i in range(numCourses) if in_degree[i] == 0])
    order = []
    while q:
        curr = q.popleft()
        order.append(curr)
        for nei in adj[curr]:
            in_degree[nei] -= 1
            if in_degree[nei] == 0:
                q.append(nei)
    return order if len(order) == numCourses else []`,
      javascript: `// Kahn's Topological Sort appending to result list`,
    },
    testCasesJson: [
      { input: '2, [[1,0]]', expected: '[0,1]', hidden: false },
      { input: '4, [[1,0],[2,0],[3,1],[3,2]]', expected: '[0,2,1,3]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- As nodes with \`in_degree == 0\` are popped from the queue, append them to the \`order\` list.
- Return \`order\` if length equals \`numCourses\`, else \`[]\` (cycle prevented full ordering).`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-9',
    slug: 'redundant-connection',
    title: 'Redundant Connection (DSU)',
    difficulty: 'MEDIUM',
    category: 'Graphs & DSU',
    companyTags: ['Amazon', 'Google'],
    orderIndex: 99,
    descriptionMdx: `In this problem, a tree is an undirected graph that is connected and has no cycles.

You are given a graph that started as a tree with \`n\` nodes labeled from 1 to \`n\`, with one additional edge added. Return an edge that can be removed so that the resulting graph is a tree of \`n\` nodes. If there are multiple answers, return the answer that occurs last in the input.`,
    constraints: ['n == edges.length', '3 <= n <= 1000', 'edges[i].length == 2', '1 <= ai < bi <= edges.length'],
    starterCodeJson: {
      python: `def findRedundantConnection(edges: list[list[int]]) -> list[int]:
    parent = list(range(len(edges) + 1))
    rank = [1] * (len(edges) + 1)
    
    def find(n):
        p = parent[n]
        while p != parent[p]:
            parent[p] = parent[parent[p]] # path compression
            p = parent[p]
        return p
        
    def union(n1, n2):
        p1, p2 = find(n1), find(n2)
        if p1 == p2:
            return False # cycle detected!
        if rank[p1] > rank[p2]:
            parent[p2] = p1
            rank[p1] += rank[p2]
        else:
            parent[p1] = p2
            rank[p2] += rank[p1]
        return True
        
    for u, v in edges:
        if not union(u, v):
            return [u, v]
    return []`,
      javascript: `// Disjoint Set Union (DSU) with path compression and rank`,
    },
    testCasesJson: [
      { input: '[[1,2],[1,3],[2,3]]', expected: '[2,3]', hidden: false },
      { input: '[[1,2],[2,3],[3,4],[1,4],[1,5]]', expected: '[1,4]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Disjoint Set Union (DSU)**:
  - If two vertices already share the same root representative in \`find()\`, adding an edge between them creates a cycle!
  - Return that redundant edge immediately. Amortized nearly $O(N \\times \\alpha(N)) \\approx O(N)$.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-10',
    slug: 'network-delay-time',
    title: 'Network Delay Time (Dijkstra)',
    difficulty: 'MEDIUM',
    category: 'Graphs & Shortest Path',
    companyTags: ['Amazon', 'Google'],
    orderIndex: 100,
    descriptionMdx: `You are given a network of \`n\` nodes, labeled from 1 to \`n\`. You are also given \`times\`, a list of travel times as directed edges \`times[i] = (ui, vi, wi)\`.

We send a signal from a given node \`k\`. Return the **minimum time** it takes for all \`n\` nodes to receive the signal. If impossible, return \`-1\`.`,
    constraints: ['1 <= k <= n <= 100', '1 <= times.length <= 6000', '0 <= wi <= 100'],
    starterCodeJson: {
      python: `import heapq
from collections import defaultdict

def networkDelayTime(times: list[list[int]], n: int, k: int) -> int:
    adj = defaultdict(list)
    for u, v, w in times:
        adj[u].append((v, w))
        
    min_heap = [(0, k)] # (time, node)
    shortest = {}
    
    while min_heap:
        w1, n1 = heapq.heappop(min_heap)
        if n1 in shortest:
            continue
        shortest[n1] = w1
        for n2, w2 in adj[n1]:
            if n2 not in shortest:
                heapq.heappush(min_heap, (w1 + w2, n2))
                
    return max(shortest.values()) if len(shortest) == n else -1`,
      javascript: `// Dijkstra's algorithm with PriorityQueue`,
    },
    testCasesJson: [
      { input: '[[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2', expected: '2', hidden: false },
      { input: '[[1,2,1]], n = 2, k = 1', expected: '1', hidden: false },
      { input: '[[1,2,1]], n = 2, k = 2', expected: '-1', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Standard **Dijkstra's Algorithm**:
  - Pop vertex with minimal accumulated latency from Min-Heap.
  - Skip if already finalized in \`shortest\` dict.
  - At termination, answer is $\\max(\\text{distances})$. If $|\text{visited}| < n$, return \`-1\`. Runtime: $O(E \\log V)$.`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-11',
    slug: 'word-ladder',
    title: 'Word Ladder (Shortest Path BFS)',
    difficulty: 'HARD',
    category: 'Graphs & BFS',
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    orderIndex: 101,
    descriptionMdx: `A **transformation sequence** from word \`beginWord\` to word \`endWord\` using a dictionary \`wordList\` is a sequence of words $beginWord \\to s_1 \\to s_2 \\dots \\to endWord$ such that every adjacent pair differs by a single letter.

Return the *number of words in the **shortest transformation sequence***, or \`0\` if no such sequence exists.`,
    constraints: ['1 <= beginWord.length <= 10', '1 <= wordList.length <= 5000', 'All strings consist of lowercase letters'],
    starterCodeJson: {
      python: `from collections import defaultdict, deque

def ladderLength(beginWord: str, endWord: str, wordList: list[str]) -> int:
    if endWord not in wordList:
        return 0
    nei = defaultdict(list)
    for word in wordList + [beginWord]:
        for j in range(len(word)):
            pattern = word[:j] + "*" + word[j+1:]
            nei[pattern].append(word)
            
    q = deque([beginWord])
    visited = {beginWord}
    res = 1
    while q:
        for _ in range(len(q)):
            word = q.popleft()
            if word == endWord:
                return res
            for j in range(len(word)):
                pattern = word[:j] + "*" + word[j+1:]
                for nei_word in nei[pattern]:
                    if nei_word not in visited:
                        visited.add(nei_word)
                        q.append(nei_word)
        res += 1
    return 0`,
      javascript: `// Wildcard pattern map: h*t -> [hit, hot] + BFS`,
    },
    testCasesJson: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', expected: '5', hidden: false },
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]', expected: '0', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Wildcard Generic States**: Group words by intermediate wildcards like \`"h*t"\` $\\to$ \`["hot", "hit"]\`.
- This avoids $O(N^2)$ pairwise string comparison, lowering edge creation to $O(N \\times L^2)$.
- BFS ensures the first discovery of \`endWord\` is the strictly shortest path.`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-12',
    slug: 'cheapest-flights-within-k-stops',
    title: 'Cheapest Flights Within K Stops',
    difficulty: 'MEDIUM',
    category: 'Graphs & Shortest Path',
    companyTags: ['Amazon', 'Google', 'Airbnb'],
    orderIndex: 102,
    descriptionMdx: `There are \`n\` cities connected by some number of flights. You are given an array \`flights\` where \`flights[i] = [fromi, toi, pricei]\`.

Given \`src\`, \`dst\`, and \`k\`, return the **cheapest price** from \`src\` to \`dst\` with at most \`k\` stops. If there is no such route, return \`-1\`.`,
    constraints: ['1 <= n <= 100', '0 <= flights.length <= (n * (n - 1) / 2)', '0 <= k < n'],
    starterCodeJson: {
      python: `def findCheapestPrice(n: int, flights: list[list[int]], src: int, dst: int, k: int) -> int:
    prices = [float('inf')] * n
    prices[src] = 0
    
    for _ in range(k + 1):
        tmp_prices = prices.copy()
        for u, v, w in flights:
            if prices[u] == float('inf'):
                continue
            if prices[u] + w < tmp_prices[v]:
                tmp_prices[v] = prices[u] + w
        prices = tmp_prices
        
    return prices[dst] if prices[dst] != float('inf') else -1`,
      javascript: `// Bellman-Ford relaxed up to k+1 iterations using snapshot array`,
    },
    testCasesJson: [
      { input: 'n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1', expected: '700', hidden: false },
      { input: 'n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1', expected: '200', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Bellman-Ford with Copy Array**:
  - Run exactly $k + 1$ relaxation steps.
  - Crucial: read previous distances from \`prices\` and write updates to a temporary clone \`tmp_prices\` so a single iteration cannot chain multiple hops at once!`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-13',
    slug: 'graph-valid-tree',
    title: 'Graph Valid Tree',
    difficulty: 'MEDIUM',
    category: 'Graphs & DSU',
    companyTags: ['Google', 'Meta', 'Amazon'],
    orderIndex: 103,
    descriptionMdx: `Given \`n\` nodes labeled from \`0\` to \`n - 1\` and a list of undirected edges, write a function to check whether these edges make up a valid tree.`,
    constraints: ['1 <= n <= 2000', '0 <= edges.length <= 5000'],
    starterCodeJson: {
      python: `def validTree(n: int, edges: list[list[int]]) -> bool:
    if len(edges) != n - 1:
        return False
    parent = list(range(n))
    def find(i):
        if parent[i] == i: return i
        parent[i] = find(parent[i])
        return parent[i]
    for u, v in edges:
        root_u, root_v = find(u), find(v)
        if root_u == root_v:
            return False
        parent[root_u] = root_v
    return True`,
      javascript: `// Graph is tree iff edges == n - 1 and connected (no cycle)`,
    },
    testCasesJson: [
      { input: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]', expected: 'true', hidden: false },
      { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]', expected: 'false', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- A tree of $n$ nodes must have **exactly $n-1$ edges** and **no cycles**.
- First check \`len(edges) == n - 1\`. If valid, verify no cycle via DSU \`union-find\`.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-14',
    slug: 'number-of-connected-components-in-an-undirected-graph',
    title: 'Number of Connected Components',
    difficulty: 'MEDIUM',
    category: 'Graphs & DSU',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 104,
    descriptionMdx: `You have a graph of \`n\` nodes. You are given an integer \`n\` and an array \`edges\` where \`edges[i] = [ai, bi]\` indicates that there is an edge between \`ai\` and \`bi\` in the graph.

Return the number of **connected components** in the graph.`,
    constraints: ['1 <= n <= 2000', '1 <= edges.length <= 5000'],
    starterCodeJson: {
      python: `def countComponents(n: int, edges: list[list[int]]) -> int:
    parent = list(range(n))
    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]
    
    count = n
    for u, v in edges:
        root_u, root_v = find(u), find(v)
        if root_u != root_v:
            parent[root_u] = root_v
            count -= 1
    return count`,
      javascript: `// DSU initializing count = n, decrementing on every successful union`,
    },
    testCasesJson: [
      { input: 'n = 5, edges = [[0,1],[1,2],[3,4]]', expected: '2', hidden: false },
      { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]', expected: '1', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Start with \`count = n\` isolated components.
- Each time an edge connects two previously disjoint sets, decrement \`count -= 1\`.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-15',
    slug: 'min-cost-to-connect-all-points',
    title: 'Min Cost to Connect All Points (Prim\'s MST)',
    difficulty: 'MEDIUM',
    category: 'Graphs & MST',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 105,
    descriptionMdx: `You are given an array \`points\` representing integer coordinates of some points on a 2D-plane, where \`points[i] = [xi, yi]\`.

The cost of connecting two points \`[xi, yi]\` and \`[xj, yj]\` is the **Manhattan distance**: $|xi - xj| + |yi - yj|$.

Return the *minimum cost* to make all points connected.`,
    constraints: ['1 <= points.length <= 1000', '-10^6 <= xi, yi <= 10^6'],
    starterCodeJson: {
      python: `import heapq

def minCostConnectPoints(points: list[list[int]]) -> int:
    n = len(points)
    adj = {i: [] for i in range(n)}
    for i in range(n):
        x1, y1 = points[i]
        for j in range(i + 1, n):
            x2, y2 = points[j]
            dist = abs(x1 - x2) + abs(y1 - y2)
            adj[i].append((dist, j))
            adj[j].append((dist, i))
            
    res = 0
    visit = set()
    min_heap = [(0, 0)] # (cost, point_index)
    while len(visit) < n:
        cost, i = heapq.heappop(min_heap)
        if i in visit:
            continue
        res += cost
        visit.add(i)
        for nei_cost, nei in adj[i]:
            if nei not in visit:
                heapq.heappush(min_heap, (nei_cost, nei))
    return res`,
      javascript: `// Prim's algorithm greedy expansion with Min-Heap`,
    },
    testCasesJson: [
      { input: '[[0,0],[2,2],[3,10],[5,2],[7,0]]', expected: '20', hidden: false },
      { input: '[[3,12],[-2,5],[-4,1]]', expected: '18', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Prim's Algorithm for Minimum Spanning Tree**:
  - Start at any vertex (e.g. index 0).
  - Add cheapest edge connecting a visited vertex to an unvisited vertex using a min-heap.
  - Terminate as soon as all $N$ vertices are in \`visit\` set.`,
    timeLimitMs: 2500,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-16',
    slug: 'is-graph-bipartite',
    title: 'Is Graph Bipartite? (2-Coloring)',
    difficulty: 'MEDIUM',
    category: 'Graphs',
    companyTags: ['Meta', 'Amazon', 'Microsoft'],
    orderIndex: 106,
    descriptionMdx: `There is an undirected graph with \`n\` nodes. Given a 2D array \`graph\` where \`graph[u]\` is an array of nodes that node \`u\` is adjacent to, return \`true\` if and only if it is **bipartite**.`,
    constraints: ['graph.length == n', '1 <= n <= 100', '0 <= graph[u].length < n'],
    starterCodeJson: {
      python: `def isBipartite(graph: list[list[int]]) -> bool:
    color = {} # node -> 0 or 1
    for i in range(len(graph)):
        if i not in color:
            color[i] = 0
            stack = [i]
            while stack:
                node = stack.pop()
                for nei in graph[node]:
                    if nei not in color:
                        color[nei] = 1 - color[node]
                        stack.append(nei)
                    elif color[nei] == color[node]:
                        return False
    return True`,
      javascript: `// 2-color BFS/DFS check`,
    },
    testCasesJson: [
      { input: '[[1,2,3],[0,2],[0,1,3],[0,2]]', expected: 'false', hidden: false },
      { input: '[[1,3],[0,2],[1,3],[0,2]]', expected: 'true', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- A graph is bipartite if and only if it contains **no odd-length cycles**.
- Color nodes alternately with 0 and 1. If an adjacent neighbor already shares the same color, return \`False\`.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-17',
    slug: 'accounts-merge',
    title: 'Accounts Merge (DSU)',
    difficulty: 'MEDIUM',
    category: 'Graphs & DSU',
    companyTags: ['Meta', 'Google', 'Amazon'],
    orderIndex: 107,
    descriptionMdx: `Given a list of \`accounts\` where each element \`accounts[i]\` is a list of strings, where the first element is a name, and the rest are emails.

Now, if two accounts have the same email, they belong to the same person. Merge the accounts. Return merged accounts with sorted emails.`,
    constraints: ['1 <= accounts.length <= 1000', '2 <= accounts[i].length <= 10', '1 <= accounts[i][j].length <= 30'],
    starterCodeJson: {
      python: `from collections import defaultdict

def accountsMerge(accounts: list[list[str]]) -> list[list[str]]:
    parent = {}
    email_to_name = {}
    
    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]
        
    def union(x, y):
        parent[find(x)] = find(y)
        
    for acc in accounts:
        name = acc[0]
        first_email = acc[1]
        for email in acc[1:]:
            if email not in parent:
                parent[email] = email
            email_to_name[email] = name
            union(first_email, email)
            
    groups = defaultdict(list)
    for email in parent:
        groups[find(email)].append(email)
        
    return [[email_to_name[root]] + sorted(emails) for root, emails in groups.items()]`,
      javascript: `// DSU grouping emails by root representative`,
    },
    testCasesJson: [
      { input: '[["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]', expected: '[["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Map each email to the first email of its account list in a Disjoint Set Union (DSU).
- Group emails by \`find(email)\`, sort, and prepend account owner name.`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-18',
    slug: 'shortest-path-in-binary-matrix',
    title: 'Shortest Path in Binary Matrix',
    difficulty: 'MEDIUM',
    category: 'Graphs & BFS',
    companyTags: ['Meta', 'Amazon'],
    orderIndex: 108,
    descriptionMdx: `Given an \`n x n\` binary matrix \`grid\`, return the length of the shortest clear path in the matrix. If there is no clear path, return \`-1\`. A clear path starts at \`(0, 0)\` and ends at \`(n-1, n-1)\` through 8 directions of 0s.`,
    constraints: ['n == grid.length', '1 <= n <= 100', 'grid[i][j] is 0 or 1'],
    starterCodeJson: {
      python: `from collections import deque

def shortestPathBinaryMatrix(grid: list[list[int]]) -> int:
    n = len(grid)
    if grid[0][0] != 0 or grid[n-1][n-1] != 0:
        return -1
    q = deque([(0, 0, 1)])
    grid[0][0] = 1 # mark visited
    
    dirs = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
    while q:
        r, c, dist = q.popleft()
        if r == n - 1 and c == n - 1:
            return dist
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:
                grid[nr][nc] = 1
                q.append((nr, nc, dist + 1))
    return -1`,
      javascript: `// 8-directional BFS in-place grid mutation`,
    },
    testCasesJson: [
      { input: '[[0,1],[1,0]]', expected: '2', hidden: false },
      { input: '[[0,0,0],[1,1,0],[1,1,0]]', expected: '4', hidden: false },
      { input: '[[1,0,0],[1,1,0],[1,1,0]]', expected: '-1', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- 8-directional BFS starting at \`(0, 0)\`.
- Mutate \`grid[nr][nc] = 1\` right upon appending to queue to eliminate duplicate visits!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-19',
    slug: 'word-search',
    title: 'Word Search',
    difficulty: 'MEDIUM',
    category: 'Graphs & Backtracking',
    companyTags: ['Amazon', 'Microsoft', 'Bloomberg'],
    orderIndex: 109,
    descriptionMdx: `Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` if \`word\` exists in the grid.`,
    constraints: ['m == board.length', 'n = board[i].length', '1 <= m, n <= 6', '1 <= word.length <= 15'],
    starterCodeJson: {
      python: `def exist(board: list[list[str]], word: str) -> bool:
    R, C = len(board), len(board[0])
    
    def dfs(r, c, i):
        if i == len(word): return True
        if r < 0 or r >= R or c < 0 or c >= C or board[r][c] != word[i]:
            return False
        board[r][c] = '#'
        res = (dfs(r+1, c, i+1) or dfs(r-1, c, i+1) or
               dfs(r, c+1, i+1) or dfs(r, c-1, i+1))
        board[r][c] = word[i]
        return res
        
    for r in range(R):
        for c in range(C):
            if dfs(r, c, 0): return True
    return False`,
      javascript: `// 2D DFS backtracking with cell restoration`,
    },
    testCasesJson: [
      { input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', expected: 'true', hidden: false },
      { input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"', expected: 'true', hidden: false },
      { input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', expected: 'false', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- In-place masking with \`'#'\` avoids visited sets.
- Restore the original character after backtracking.
- Optimization trick: If \`Counter(word)[c] > Counter(board)[c]\`, return False immediately!`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-20',
    slug: 'swim-in-rising-water',
    title: 'Swim in Rising Water (Min-Heap / Binary Search)',
    difficulty: 'HARD',
    category: 'Graphs & Dijkstra',
    companyTags: ['Google', 'Meta'],
    orderIndex: 110,
    descriptionMdx: `You are given an \`n x n\` integer matrix \`grid\` where each value \`grid[i][j]\` represents the elevation at that point \`(i, j)\`. At time \`t\`, the depth of the water is \`t\`. You can swim from a square to any 4-directionally adjacent square if and only if elevation of both is at most \`t\`.

Return *the least time until you can reach the bottom right square* \`(n - 1, n - 1)\`.`,
    constraints: ['n == grid.length', '1 <= n <= 50', '0 <= grid[i][j] < n^2'],
    starterCodeJson: {
      python: `import heapq

def swimInWater(grid: list[list[int]]) -> int:
    n = len(grid)
    visit = set()
    min_heap = [(grid[0][0], 0, 0)] # (max_elevation_so_far, r, c)
    visit.add((0, 0))
    
    while min_heap:
        t, r, c = heapq.heappop(min_heap)
        if r == n - 1 and c == n - 1:
            return t
        for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in visit:
                visit.add((nr, nc))
                heapq.heappush(min_heap, (max(t, grid[nr][nc]), nr, nc))
    return -1`,
      javascript: `// Dijkstra variant minimizing bottleneck edge`,
    },
    testCasesJson: [
      { input: '[[0,2],[1,3]]', expected: '3', hidden: false },
      { input: '[[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]', expected: '16', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Bottleneck Shortest Path**: Modified Dijkstra where cost along path is $\\max(\\text{elevation})$ instead of sum of weights.
- Always expand the frontier with the smallest accumulated peak elevation!`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-21',
    slug: 'alien-dictionary',
    title: 'Alien Dictionary',
    difficulty: 'HARD',
    category: 'Graphs & Topological Sort',
    companyTags: ['Meta', 'Amazon', 'Google', 'Airbnb', 'Pinterest'],
    orderIndex: 111,
    descriptionMdx: `There is a new alien language that uses the English alphabet. You are given a list of strings \`words\` from the alien language's dictionary, where the strings are **sorted lexicographically** by the rules of this new language.

Derive the order of letters in this language. If the order is invalid, return \`""\`.`,
    constraints: ['1 <= words.length <= 100', '1 <= words[i].length <= 100', 'words[i] consists of only lowercase English letters'],
    starterCodeJson: {
      python: `from collections import defaultdict, deque

def alienOrder(words: list[str]) -> str:
    adj = {c: set() for w in words for c in w}
    in_degree = {c: 0 for c in adj}
    
    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]
        min_len = min(len(w1), len(w2))
        if len(w1) > len(w2) and w1[:min_len] == w2[:min_len]:
            return "" # prefix invalidation rule
        for j in range(min_len):
            if w1[j] != w2[j]:
                if w2[j] not in adj[w1[j]]:
                    adj[w1[j]].add(w2[j])
                    in_degree[w2[j]] += 1
                break
                
    q = deque([c for c in in_degree if in_degree[c] == 0])
    res = []
    while q:
        c = q.popleft()
        res.append(c)
        for nei in adj[c]:
            in_degree[nei] -= 1
            if in_degree[nei] == 0:
                q.append(nei)
                
    return "".join(res) if len(res) == len(in_degree) else ""`,
      javascript: `// Directed graph of character precedence + Kahn's algorithm`,
    },
    testCasesJson: [
      { input: '["wrt","wrf","er","ett","rftt"]', expected: '"wertf"', hidden: false },
      { input: '["z","x"]', expected: '"zx"', hidden: false },
      { input: '["z","x","z"]', expected: '""', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Compare adjacent word pairs \`w1\` and \`w2\`. The first differing character gives directed dependency $w_1[j] \\to w_2[j]$.
- **Edge Trap**: If $w_1$ is longer than $w_2$ and $w_2$ is a prefix of $w_1$ (e.g. \`["apple", "app"]\`), sorting is fundamentally invalid; return \`""\`!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-22',
    slug: 'critical-connections-in-a-network',
    title: 'Critical Connections (Tarjan\'s Bridges)',
    difficulty: 'HARD',
    category: 'Graphs & Tarjan',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 112,
    descriptionMdx: `There are \`n\` servers numbered from 0 to \`n - 1\` connected by undirected server-to-server connections.

A **critical connection** is a connection that, if removed, will make some servers unable to reach some other server. Return all critical connections in the network in any order.`,
    constraints: ['2 <= n <= 10^5', 'n - 1 <= connections.length <= 10^5', '0 <= ai, bi <= n - 1', 'ai != bi'],
    starterCodeJson: {
      python: `from collections import defaultdict

def criticalConnections(n: int, connections: list[list[int]]) -> list[list[int]]:
    adj = defaultdict(list)
    for u, v in connections:
        adj[u].append(v)
        adj[v].append(u)
        
    discovery = [-1] * n
    low = [-1] * n
    time = 0
    bridges = []
    
    def dfs(curr, prev):
        nonlocal time
        discovery[curr] = low[curr] = time
        time += 1
        for nei in adj[curr]:
            if nei == prev:
                continue
            if discovery[nei] != -1:
                low[curr] = min(low[curr], discovery[nei])
            else:
                dfs(nei, curr)
                low[curr] = min(low[curr], low[nei])
                if low[nei] > discovery[curr]:
                    bridges.append([curr, nei])
                    
    dfs(0, -1)
    return bridges`,
      javascript: `// Tarjan's bridge finding with low and discovery times`,
    },
    testCasesJson: [
      { input: 'n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]', expected: '[[1,3]]', hidden: false },
      { input: 'n = 2, connections = [[0,1]]', expected: '[[0,1]]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Tarjan's Bridge Algorithm**:
  - Assign each node a \`discovery\` time and \`low\` link value (earliest reachable ancestor).
  - An edge $(u, v)$ is a critical bridge if and only if \`low[v] > discovery[u]\`, meaning $v$ has no back-edge to reach $u$ or any of $u$'s ancestors without using this edge!
  - Operates in strict $O(V + E)$ linear time.`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-23',
    slug: 'walls-and-gates',
    title: 'Walls and Gates (Multi-Source BFS)',
    difficulty: 'MEDIUM',
    category: 'Graphs & BFS',
    companyTags: ['Meta', 'Amazon', 'Google'],
    orderIndex: 113,
    descriptionMdx: `You are given an \`m x n\` grid \`rooms\` initialized with:
- \`-1\` is a wall or an obstacle.
- \`0\` marks a gate.
- \`INF\` ($2147483647$) marks an empty room.

Fill each empty room with the distance to its nearest gate. If impossible, leave it \`INF\`.`,
    constraints: ['m == rooms.length', 'n == rooms[i].length', '1 <= m, n <= 250', 'rooms[i][j] is -1, 0, or 2147483647'],
    starterCodeJson: {
      python: `from collections import deque

def wallsAndGates(rooms: list[list[int]]) -> None:
    if not rooms: return
    R, C = len(rooms), len(rooms[0])
    q = deque()
    for r in range(R):
        for c in range(C):
            if rooms[r][c] == 0:
                q.append((r, c))
                
    while q:
        r, c = q.popleft()
        for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < R and 0 <= nc < C and rooms[nr][nc] == 2147483647:
                rooms[nr][nc] = rooms[r][c] + 1
                q.append((nr, nc))`,
      javascript: `// Multi-source BFS starting from all 0 gates simultaneously`,
    },
    testCasesJson: [
      { input: '[[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]', expected: '[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Start BFS from **all gates simultaneously** at distance 0.
- When an empty room (\`INF\`) is visited, assign \`rooms[r][c] + 1\` and push to queue.
- Guarantees $O(M \\times N)$ time without running individual BFS per room!`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-24',
    slug: 'reconstruct-itinerary',
    title: 'Reconstruct Itinerary (Eulerian Path)',
    difficulty: 'HARD',
    category: 'Graphs & Eulerian Path',
    companyTags: ['Google', 'Amazon', 'Meta'],
    orderIndex: 114,
    descriptionMdx: `You are given a list of airline \`tickets\` where \`tickets[i] = [fromi, toi]\`. Reconstruct the itinerary in order and return it.

All tickets start from \`"JFK"\`. If multiple itineraries exist, return the one that has the smallest lexical order. You must use all the tickets once and only once.`,
    constraints: ['1 <= tickets.length <= 300', 'tickets[i].length == 2', 'fromi and toi consist of 3 uppercase English letters'],
    starterCodeJson: {
      python: `from collections import defaultdict

def findItinerary(tickets: list[list[str]]) -> list[str]:
    adj = defaultdict(list)
    # Sort reverse so pop() takes smallest lexical element in O(1)
    for src, dst in sorted(tickets, reverse=True):
        adj[src].append(dst)
        
    itinerary = []
    def dfs(src):
        while adj[src]:
            dfs(adj[src].pop())
        itinerary.append(src)
        
    dfs("JFK")
    return itinerary[::-1]`,
      javascript: `// Hierholzer's Eulerian Path algorithm`,
    },
    testCasesJson: [
      { input: '[["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]', expected: '["JFK","MUC","LHR","SFO","SJC"]', hidden: false },
      { input: '[["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]', expected: '["JFK","ATL","JFK","SFO","ATL","SFO"]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Hierholzer's Algorithm**:
  - Pop destinations in lexicographical order.
  - Append vertex to itinerary *after* all outgoing edges are exhausted (post-order).
  - Reverse the final result to get the Eulerian path!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-25',
    slug: 'snakes-and-ladders',
    title: 'Snakes and Ladders',
    difficulty: 'MEDIUM',
    category: 'Graphs & BFS',
    companyTags: ['Amazon', 'Microsoft'],
    orderIndex: 115,
    descriptionMdx: `You are given an \`n x n\` integer matrix \`board\` where the cells are labeled from 1 to \`n^2\` in a Boustrophedon style (alternating left-to-right and right-to-left).

Return the least number of dice rolls required to reach the square \`n^2\`. If not possible, return \`-1\`.`,
    constraints: ['n == board.length == board[i].length', '2 <= n <= 20', 'board[i][j] is -1 or in range [1, n^2]'],
    starterCodeJson: {
      python: `from collections import deque

def snakesAndLadders(board: list[list[int]]) -> int:
    n = len(board)
    def int_to_pos(square):
        r = (square - 1) // n
        c = (square - 1) % n
        if r % 2 == 1:
            c = n - 1 - c
        return n - 1 - r, c
        
    q = deque([(1, 0)]) # (square, moves)
    visited = {1}
    while q:
        sq, moves = q.popleft()
        if sq == n * n:
            return moves
        for i in range(1, 7):
            nxt = sq + i
            if nxt <= n * n:
                r, c = int_to_pos(nxt)
                dest = board[r][c] if board[r][c] != -1 else nxt
                if dest not in visited:
                    visited.add(dest)
                    q.append((dest, moves + 1))
    return -1`,
      javascript: `// BFS finding shortest hops in coordinate transformed grid`,
    },
    testCasesJson: [
      { input: '[[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]', expected: '4', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Map 1D index $1 \\dots n^2$ to 2D coordinates taking zigzag reversal on odd rows: \`if r % 2 == 1: c = n - 1 - c\`.
- Standard unweighted BFS finding the target in minimum steps.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-26',
    slug: 'minimum-genetic-mutation',
    title: 'Minimum Genetic Mutation',
    difficulty: 'MEDIUM',
    category: 'Graphs & BFS',
    companyTags: ['Amazon', 'Google'],
    orderIndex: 116,
    descriptionMdx: `A gene string can be represented by an 8-character long string, with choices from \`'A'\`, \`'C'\`, \`'G'\`, and \`'T'\`.

Given \`startGene\`, \`endGene\`, and \`bank\`, return the minimum number of mutations needed to mutate from \`startGene\` to \`endGene\`. If no such mutation exists, return \`-1\`.`,
    constraints: ['startGene.length == endGene.length == bank[i].length == 8', 'bank[i] contains only A, C, G, T'],
    starterCodeJson: {
      python: `from collections import deque

def minMutation(startGene: str, endGene: str, bank: list[str]) -> int:
    bank_set = set(bank)
    if endGene not in bank_set:
        return -1
    q = deque([(startGene, 0)])
    visited = {startGene}
    while q:
        gene, steps = q.popleft()
        if gene == endGene:
            return steps
        for i in range(8):
            for ch in "ACGT":
                mutated = gene[:i] + ch + gene[i+1:]
                if mutated in bank_set and mutated not in visited:
                    visited.add(mutated)
                    q.append((mutated, steps + 1))
    return -1`,
      javascript: `// BFS over 8-char gene mutations`,
    },
    testCasesJson: [
      { input: 'startGene = "AACCGGTT", endGene = "AACCGGTA", bank = ["AACCGGTA"]', expected: '1', hidden: false },
      { input: 'startGene = "AACCGGTT", endGene = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]', expected: '2', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Branch 4 letters across 8 positions ($4 \\times 8 = 32$ variants per step).
- Standard BFS ensures minimum mutations to target.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-27',
    slug: 'number-of-enclaves',
    title: 'Number of Enclaves',
    difficulty: 'MEDIUM',
    category: 'Graphs',
    companyTags: ['Google', 'Amazon'],
    orderIndex: 117,
    descriptionMdx: `You are given an \`m x n\` binary matrix \`grid\`, where \`0\` represents a sea cell and \`1\` represents a land cell.

A move consists of walking from one land cell to an adjacent land cell or walking off the boundary of the grid. Return the number of land cells in \`grid\` for which we cannot walk off the boundary.`,
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 500', 'grid[i][j] is either 0 or 1'],
    starterCodeJson: {
      python: `def numEnclaves(grid: list[list[int]]) -> int:
    R, C = len(grid), len(grid[0])
    def dfs(r, c):
        if r < 0 or r >= R or c < 0 or c >= C or grid[r][c] == 0:
            return
        grid[r][c] = 0
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)
        
    for r in range(R):
        for c in range(C):
            if (r in [0, R-1] or c in [0, C-1]) and grid[r][c] == 1:
                dfs(r, c)
    return sum(sum(row) for row in grid)`,
      javascript: `// Flood-fill border lands to 0, sum remaining 1s`,
    },
    testCasesJson: [
      { input: '[[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]', expected: '3', hidden: false },
      { input: '[[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]', expected: '0', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Erase all lands connected to the outer boundary with DFS.
- The remaining \`1\`s in the matrix are precisely the enclosed enclaves. Sum them up!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-28',
    slug: 'as-far-from-land-as-possible',
    title: 'As Far from Land as Possible',
    difficulty: 'MEDIUM',
    category: 'Graphs & BFS',
    companyTags: ['Amazon', 'Google'],
    orderIndex: 118,
    descriptionMdx: `Given an \`n x n\` \`grid\` containing only values \`0\` (water) and \`1\` (land), find a water cell such that its distance to the nearest land cell is maximized, and return the distance. If no land or water exists, return \`-1\`.`,
    constraints: ['n == grid.length', '1 <= n <= 100', 'grid[i][j] is 0 or 1'],
    starterCodeJson: {
      python: `from collections import deque

def maxDistance(grid: list[list[int]]) -> int:
    n = len(grid)
    q = deque()
    for r in range(n):
        for c in range(n):
            if grid[r][c] == 1:
                q.append((r, c))
    if len(q) == 0 or len(q) == n * n:
        return -1
    dist = -1
    while q:
        for _ in range(len(q)):
            r, c = q.popleft()
            for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:
                    grid[nr][nc] = 1
                    q.append((nr, nc))
        dist += 1
    return dist`,
      javascript: `// Multi-source BFS from land cells outwards`,
    },
    testCasesJson: [
      { input: '[[1,0,1],[0,0,0],[1,0,1]]', expected: '2', hidden: false },
      { input: '[[1,0,0],[0,0,0],[0,0,0]]', expected: '4', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Multi-source BFS starting with all land cells simultaneously.
- The number of expanding ripple layers until the last water cell is swallowed is the maximum distance!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-29',
    slug: 'bus-routes',
    title: 'Bus Routes (BFS on Routes)',
    difficulty: 'HARD',
    category: 'Graphs & BFS',
    companyTags: ['Google', 'Amazon', 'Meta'],
    orderIndex: 119,
    descriptionMdx: `You are given an array \`routes\` representing bus routes where \`routes[i]\` is a bus route that the \`i\`-th bus repeats forever.

Return *the least number of buses you must take to travel from* \`source\` *to* \`target\`. If impossible, return \`-1\`.`,
    constraints: ['1 <= routes.length <= 500', '1 <= routes[i].length <= 10^5', '0 <= routes[i][j] < 10^6'],
    starterCodeJson: {
      python: `from collections import defaultdict, deque

def numBusesToDestination(routes: list[list[int]], source: int, target: int) -> int:
    if source == target: return 0
    stop_to_buses = defaultdict(set)
    for bus_id, route in enumerate(routes):
        for stop in route:
            stop_to_buses[stop].add(bus_id)
            
    q = deque([source])
    visited_stops = {source}
    visited_buses = set()
    buses_taken = 0
    
    while q:
        buses_taken += 1
        for _ in range(len(q)):
            stop = q.popleft()
            for bus in stop_to_buses[stop]:
                if bus in visited_buses:
                    continue
                visited_buses.add(bus)
                for nxt_stop in routes[bus]:
                    if nxt_stop == target:
                        return buses_taken
                    if nxt_stop not in visited_stops:
                        visited_stops.add(nxt_stop)
                        q.append(nxt_stop)
    return -1`,
      javascript: `// BFS queueing stops, tracking visited buses to avoid duplicate expansions`,
    },
    testCasesJson: [
      { input: 'routes = [[1,2,7],[3,6,7]], source = 1, target = 6', expected: '2', hidden: false },
      { input: 'routes = [[7,12],[4,5,15],[6],[15,19],[9,12,13]], source = 15, target = 12', expected: '-1', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Graph of Buses, Not Stops**: The number of bus lines is at most 500, whereas stops can reach $10^6$.
- Traverse from stop $\\to$ buses passing through it $\\to$ all stops along those routes.
- Once a bus line is boarded, mark \`visited_buses.add(bus)\` so it is never re-scanned!`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
  },
  {
    id: 'grp-30',
    slug: 'making-a-large-island',
    title: 'Making A Large Island',
    difficulty: 'HARD',
    category: 'Graphs & Component Coloring',
    companyTags: ['Meta', 'Google', 'Amazon'],
    orderIndex: 120,
    descriptionMdx: `You are given an \`n x n\` binary matrix grid. You are allowed to change **at most one** \`0\` to be \`1\`.

Return the size of the largest island in \`grid\` after applying this operation.`,
    constraints: ['n == grid.length', '1 <= n <= 500', 'grid[i][j] is either 0 or 1'],
    starterCodeJson: {
      python: `def largestIsland(grid: list[list[int]]) -> int:
    n = len(grid)
    island_id = 2
    area = {0: 0}
    
    def dfs(r, c, label):
        if r < 0 or r >= n or c < 0 or c >= n or grid[r][c] != 1:
            return 0
        grid[r][c] = label
        return 1 + dfs(r+1, c, label) + dfs(r-1, c, label) + dfs(r, c+1, label) + dfs(r, c-1, label)
        
    for r in range(n):
        for c in range(n):
            if grid[r][c] == 1:
                area[island_id] = dfs(r, c, island_id)
                island_id += 1
                
    max_area = max(area.values())
    for r in range(n):
        for c in range(n):
            if grid[r][c] == 0:
                seen = set()
                for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] > 1:
                        seen.add(grid[nr][nc])
                max_area = max(max_area, 1 + sum(area[i] for i in seen))
    return max_area`,
      javascript: `// Color islands with unique IDs (>=2), record areas, test flipping 0s`,
    },
    testCasesJson: [
      { input: '[[1,0],[0,1]]', expected: '3', hidden: false },
      { input: '[[1,1],[1,0]]', expected: '4', hidden: false },
      { input: '[[1,1],[1,1]]', expected: '4', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Two-Pass Coloring**:
  - Pass 1: Tag each separate island with a unique ID ($2, 3, 4, \\dots$) and store its size in a map.
  - Pass 2: Inspect every \`0\` cell. Its resulting size if flipped to \`1\` is $1 + \\sum \\text{unique adjacent island areas}$.
  - $O(N^2)$ optimal without recomputing BFS on each flip!`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
  },
];


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

export const SEED_PROBLEMS: SeedProblem[] = [
  {
    id: 'prob-1',
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'EASY',
    category: 'Arrays & Hashing',
    companyTags: ['Google', 'Amazon', 'Meta'],
    orderIndex: 1,
    descriptionMdx: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice. You can return the answer in any order.`,
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    starterCodeJson: {
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    # Write your solution here
    seen = {}
    for i, n in enumerate(nums):
        diff = target - n
        if diff in seen:
            return [seen[diff], i]
        seen[n] = i
    return []`,
      javascript: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (seen.has(diff)) {
      return [seen.get(diff), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int diff = target - nums[i];
            if (seen.count(diff)) return {seen[diff], i};
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
    },
    testCasesJson: [
      { input: '[2,7,11,15], 9', expected: '[0,1]', hidden: false },
      { input: '[3,2,4], 6', expected: '[1,2]', hidden: false },
      { input: '[3,3], 6', expected: '[0,1]', hidden: true },
    ],
    editorialMdx: `### Optimal Approach: One-Pass Hash Map
Use a hash table to store value-to-index mappings as we iterate through \`nums\`. For each element \`n\`, check if \`target - n\` already exists in the map.
- **Time Complexity:** O(N) where N is the length of nums.
- **Space Complexity:** O(N) to store visited elements in the hash map.`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'prob-2',
    slug: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'EASY',
    category: 'Arrays & Hashing',
    companyTags: ['Uber', 'Meta', 'Amazon'],
    orderIndex: 2,
    descriptionMdx: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    constraints: [
      '1 <= s.length, t.length <= 5 * 10^4',
      's and t consist of lowercase English letters.',
    ],
    starterCodeJson: {
      python: `def isAnagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    count = {}
    for c in s:
        count[c] = count.get(c, 0) + 1
    for c in t:
        if c not in count or count[c] == 0:
            return False
        count[c] -= 1
    return True`,
      javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (const c of s) count[c] = (count[c] || 0) + 1;
  for (const c of t) {
    if (!count[c]) return false;
    count[c]--;
  }
  return true;
}`,
    },
    testCasesJson: [
      { input: '"anagram", "nagaram"', expected: 'true', hidden: false },
      { input: '"rat", "car"', expected: 'false', hidden: false },
    ],
    editorialMdx: `### Optimal Approach: Frequency Count
Count occurrences of each character in \`s\` and decrement with \`t\`.
- **Time Complexity:** O(N)
- **Space Complexity:** O(1) bounded by alphabet size (26 characters).`,
    timeLimitMs: 1500,
    memoryLimitMb: 128,
  },
  {
    id: 'prob-3',
    slug: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'EASY',
    category: 'Sliding Window',
    companyTags: ['Amazon', 'Apple', 'Google'],
    orderIndex: 3,
    descriptionMdx: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`-th day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.`,
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4',
    ],
    starterCodeJson: {
      python: `def maxProfit(prices: list[int]) -> int:
    min_price = float('inf')
    max_p = 0
    for p in prices:
        if p < min_price:
            min_price = p
        elif p - min_price > max_p:
            max_p = p - min_price
    return max_p`,
      javascript: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxP = 0;
  for (const p of prices) {
    if (p < minPrice) minPrice = p;
    else if (p - minPrice > maxP) maxP = p - minPrice;
  }
  return maxP;
}`,
    },
    testCasesJson: [
      { input: '[7,1,5,3,6,4]', expected: '5', hidden: false },
      { input: '[7,6,4,3,1]', expected: '0', hidden: false },
    ],
    editorialMdx: `Track lowest price seen so far and greedily update max profit.
- **Time Complexity:** O(N)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'prob-4',
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'EASY',
    category: 'Stack',
    companyTags: ['Meta', 'Google', 'Microsoft'],
    orderIndex: 4,
    descriptionMdx: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.`,
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only: ()[]{}',
    ],
    starterCodeJson: {
      python: `def isValid(s: str) -> bool:
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in pairs:
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()
        else:
            stack.append(char)
    return len(stack) == 0`,
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const c of s) {
    if (map[c]) {
      if (stack.pop() !== map[c]) return false;
    } else {
      stack.push(c);
    }
  }
  return stack.length === 0;
}`,
    },
    testCasesJson: [
      { input: '"()"', expected: 'true', hidden: false },
      { input: '"()[]{}"', expected: 'true', hidden: false },
      { input: '"(]"', expected: 'false', hidden: false },
    ],
    editorialMdx: `Stack pushes opening brackets and pops to verify corresponding closes.
- **Time Complexity:** O(N)
- **Space Complexity:** O(N)`,
    timeLimitMs: 1500,
    memoryLimitMb: 128,
  },
  {
    id: 'prob-5',
    slug: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'EASY',
    category: 'Linked List',
    companyTags: ['Microsoft', 'Amazon', 'Meta'],
    orderIndex: 5,
    descriptionMdx: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.`,
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000',
    ],
    starterCodeJson: {
      python: `def reverseList(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
      javascript: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
    },
    testCasesJson: [
      { input: '[1,2,3,4,5]', expected: '[5,4,3,2,1]', hidden: false },
      { input: '[1,2]', expected: '[2,1]', hidden: false },
      { input: '[]', expected: '[]', hidden: true },
    ],
    editorialMdx: `Iterative pointer manipulation using three pointers: prev, curr, and next.
- **Time Complexity:** O(N)
- **Space Complexity:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'prob-6',
    slug: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'MEDIUM',
    category: 'Dynamic Programming',
    companyTags: ['Amazon', 'Microsoft', 'Apple'],
    orderIndex: 6,
    descriptionMdx: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum. (Kadane's Algorithm)`,
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
    ],
    starterCodeJson: {
      python: `def maxSubArray(nums: list[int]) -> int:
    curr_sum = 0
    max_sum = nums[0]
    for n in nums:
        curr_sum = max(n, curr_sum + n)
        max_sum = max(max_sum, curr_sum)
    return max_sum`,
      javascript: `function maxSubArray(nums) {
  let curr = 0;
  let max = nums[0];
  for (const n of nums) {
    curr = Math.max(n, curr + n);
    max = Math.max(max, curr);
  }
  return max;
}`,
    },
    testCasesJson: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', expected: '6', hidden: false },
      { input: '[1]', expected: '1', hidden: false },
      { input: '[5,4,-1,7,8]', expected: '23', hidden: true },
    ],
    editorialMdx: `Kadane's Algorithm: At each index, decide whether to continue the existing contiguous subarray or start fresh from the current number.
- **Time:** O(N)
- **Space:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'prob-7',
    slug: '3sum',
    title: '3Sum',
    difficulty: 'MEDIUM',
    category: 'Two Pointers',
    companyTags: ['Meta', 'Amazon', 'Google'],
    orderIndex: 7,
    descriptionMdx: `Given an integer array nums, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets.`,
    constraints: [
      '3 <= nums.length <= 3000',
      '-10^5 <= nums[i] <= 10^5',
    ],
    starterCodeJson: {
      python: `def threeSum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue
        left, right = i + 1, len(nums) - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total == 0:
                res.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
    return res`,
      javascript: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++; r--;
      } else if (sum < 0) l++;
      else r--;
    }
  }
  return res;
}`,
    },
    testCasesJson: [
      { input: '[-1,0,1,2,-1,-4]', expected: '[[-1,-1,2],[-1,0,1]]', hidden: false },
      { input: '[0,1,1]', expected: '[]', hidden: false },
      { input: '[0,0,0]', expected: '[[0,0,0]]', hidden: true },
    ],
    editorialMdx: `Sort array, loop outer index, and apply two-pointer convergence.
- **Time Complexity:** O(N^2)
- **Space Complexity:** O(1) auxiliary (or O(N) for sort).`,
    timeLimitMs: 2500,
    memoryLimitMb: 128,
  },
  {
    id: 'prob-8',
    slug: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'MEDIUM',
    category: 'Sliding Window',
    companyTags: ['Google', 'Amazon', 'Microsoft'],
    orderIndex: 8,
    descriptionMdx: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.',
    ],
    starterCodeJson: {
      python: `def lengthOfLongestSubstring(s: str) -> int:
    char_map = {}
    left = 0
    max_len = 0
    for right, c in enumerate(s):
        if c in char_map and char_map[c] >= left:
            left = char_map[c] + 1
        char_map[c] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
      javascript: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (map.has(c) && map.get(c) >= left) {
      left = map.get(c) + 1;
    }
    map.set(c, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    },
    testCasesJson: [
      { input: '"abcabcbb"', expected: '3', hidden: false },
      { input: '"bbbbb"', expected: '1', hidden: false },
      { input: '"pwwkew"', expected: '3', hidden: true },
    ],
    editorialMdx: `Sliding window with map storing last seen index of each character.
- **Time Complexity:** O(N)
- **Space:** O(min(m, n))`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'prob-9',
    slug: 'lowest-common-ancestor-of-a-bst',
    title: 'Lowest Common Ancestor of a BST',
    difficulty: 'MEDIUM',
    category: 'Trees',
    companyTags: ['Amazon', 'Meta', 'Netflix'],
    orderIndex: 9,
    descriptionMdx: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.`,
    constraints: [
      'The number of nodes in the tree is in the range [2, 10^5].',
      '-10^9 <= Node.val <= 10^9',
      'All Node.val are unique.',
      'p != q and both will exist in the BST.',
    ],
    starterCodeJson: {
      python: `def lowestCommonAncestor(root, p, q):
    curr = root
    while curr:
        if p.val > curr.val and q.val > curr.val:
            curr = curr.right
        elif p.val < curr.val and q.val < curr.val:
            curr = curr.left
        else:
            return curr`,
      javascript: `function lowestCommonAncestor(root, p, q) {
  let curr = root;
  while (curr) {
    if (p.val > curr.val && q.val > curr.val) curr = curr.right;
    else if (p.val < curr.val && q.val < curr.val) curr = curr.left;
    else return curr;
  }
}`,
    },
    testCasesJson: [
      { input: 'root = [6,2,8,0,4,7,9], p = 2, q = 8', expected: '6', hidden: false },
      { input: 'root = [6,2,8,0,4,7,9], p = 2, q = 4', expected: '2', hidden: false },
    ],
    editorialMdx: `Exploit BST properties: If both values are greater, go right; if both are smaller, go left; otherwise the split point is the LCA.
- **Time Complexity:** O(H) where H is tree height.
- **Space:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'prob-10',
    slug: 'merge-k-sorted-lists',
    title: 'Merge k Sorted Lists',
    difficulty: 'HARD',
    category: 'Heap / Priority Queue',
    companyTags: ['Google', 'Meta', 'Amazon'],
    orderIndex: 10,
    descriptionMdx: `You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.`,
    constraints: [
      'k == lists.length',
      '0 <= k <= 10^4',
      '0 <= lists[i].length <= 500',
      '-10^4 <= lists[i][j] <= 10^4',
      'lists[i] is sorted in ascending order.',
    ],
    starterCodeJson: {
      python: `import heapq

def mergeKLists(lists):
    heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))
    dummy = ListNode(0)
    curr = dummy
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next`,
      javascript: `// Use min-heap or divide-and-conquer merge
function mergeKLists(lists) {
  if (!lists || lists.length === 0) return null;
  while (lists.length > 1) {
    const merged = [];
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = i + 1 < lists.length ? lists[i + 1] : null;
      merged.push(mergeTwo(l1, l2));
    }
    lists = merged;
  }
  return lists[0];
}`,
    },
    testCasesJson: [
      { input: '[[1,4,5],[1,3,4],[2,6]]', expected: '[1,1,2,3,4,4,5,6]', hidden: false },
      { input: '[]', expected: '[]', hidden: false },
      { input: '[[]]', expected: '[]', hidden: true },
    ],
    editorialMdx: `Min-Heap or Divide & Conquer merge pairs of lists.
- **Time:** O(N log K) where N is total nodes and K is number of lists.
- **Space:** O(K) heap size.`,
    timeLimitMs: 3000,
    memoryLimitMb: 256,
  },
];

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


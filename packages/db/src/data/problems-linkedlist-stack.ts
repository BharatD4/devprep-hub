import { SeedProblem } from '../data';

export const PROBLEMS_LINKEDLIST_STACK: SeedProblem[] = [
  {
    id: 'lls-1',
    slug: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'EASY',
    category: 'Linked List',
    companyTags: ['Amazon', 'Microsoft', 'Google', 'Apple', 'Meta'],
    orderIndex: 31,
    descriptionMdx: `Given the \`head\` of a singly linked list, reverse the list, and return *the reversed list*.`,
    constraints: ['The number of nodes in the list is the range [0, 5000]', '-5000 <= Node.val <= 5000'],
    starterCodeJson: {
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head: ListNode | None) -> ListNode | None:
    prev, curr = None, head
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
    editorialMdx: `### 💡 Short Trick & Intuition
- **Three-pointer shuffle**: \`prev\`, \`curr\`, \`next\`.
- Store \`curr.next\` first because you are about to overwrite it:
  \`nxt = curr.next; curr.next = prev; prev = curr; curr = nxt;\`
- At the end, \`curr\` is \`None\` and \`prev\` is the new head.

### Complexity
- **Time Complexity**: $O(N)$ single pass.
- **Space Complexity**: $O(1)$ iterative in-place.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-2',
    slug: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'EASY',
    category: 'Linked List',
    companyTags: ['Amazon', 'Apple', 'Microsoft'],
    orderIndex: 32,
    descriptionMdx: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
    constraints: ['The number of nodes in both lists is in the range [0, 50]', '-100 <= Node.val <= 100', 'Both list1 and list2 are sorted in non-decreasing order'],
    starterCodeJson: {
      python: `def mergeTwoLists(l1, l2):
    dummy = ListNode(0)
    tail = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next
    tail.next = l1 if l1 else l2
    return dummy.next`,
      javascript: `function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let tail = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      tail.next = l1;
      l1 = l1.next;
    } else {
      tail.next = l2;
      l2 = l2.next;
    }
    tail = tail.next;
  }
  tail.next = l1 || l2;
  return dummy.next;
}`,
    },
    testCasesJson: [
      { input: '[1,2,4], [1,3,4]', expected: '[1,1,2,3,4,4]', hidden: false },
      { input: '[], []', expected: '[]', hidden: false },
      { input: '[], [0]', expected: '[0]', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Dummy Node Pattern**: Always create a \`dummy = ListNode(0)\` and build via a \`tail\` pointer. This avoids boundary checks for an empty merged list.
- When one list empties, directly point \`tail.next\` to the non-empty list without looping.

### Complexity
- **Time Complexity**: $O(N + M)$
- **Space Complexity**: $O(1)$`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-3',
    slug: 'reorder-list',
    title: 'Reorder List',
    difficulty: 'MEDIUM',
    category: 'Linked List',
    companyTags: ['Amazon', 'Meta', 'Google'],
    orderIndex: 33,
    descriptionMdx: `You are given the head of a singly linked-list: $L_0 \\to L_1 \\to \\dots \\to L_{n-1} \\to L_n$.

Reorder the list to be on the following form:
$L_0 \\to L_n \\to L_1 \\to L_{n-1} \\to L_2 \\to L_{n-2} \\to \\dots$

You may not modify the values in the list's nodes. Only nodes themselves may be changed.`,
    constraints: ['The number of nodes in the list is in the range [1, 5 * 10^4]', '1 <= Node.val <= 1000'],
    starterCodeJson: {
      python: `def reorderList(head):
    if not head or not head.next:
        return
    # 1. Find midpoint (slow/fast)
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    # 2. Reverse second half
    second = slow.next
    slow.next = None
    prev = None
    while second:
        nxt = second.next
        second.next = prev
        prev = second
        second = nxt
    
    # 3. Interleave two halves
    first, second = head, prev
    while second:
        tmp1, tmp2 = first.next, second.next
        first.next = second
        second.next = tmp1
        first = tmp1
        second = tmp2`,
      javascript: `function reorderList(head) {
  if (!head || !head.next) return;
  let slow = head, fast = head.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let second = slow.next;
  slow.next = null;
  let prev = null;
  while (second) {
    let nxt = second.next;
    second.next = prev;
    prev = second;
    second = nxt;
  }
  let first = head;
  second = prev;
  while (second) {
    let t1 = first.next, t2 = second.next;
    first.next = second;
    second.next = t1;
    first = t1;
    second = t2;
  }
}`,
    },
    testCasesJson: [
      { input: '[1,2,3,4]', expected: '[1,4,2,3]', hidden: false },
      { input: '[1,2,3,4,5]', expected: '[1,5,2,4,3]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Three distinct canonical steps:
  1. Find middle with slow/fast pointers.
  2. Reverse the right half.
  3. Zipper-merge the two halves.
- Cut off \`slow.next = None\` cleanly to avoid circular references!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-4',
    slug: 'remove-nth-node-from-end-of-list',
    title: 'Remove Nth Node From End of List',
    difficulty: 'MEDIUM',
    category: 'Linked List',
    companyTags: ['Amazon', 'Meta', 'Microsoft', 'Google'],
    orderIndex: 34,
    descriptionMdx: `Given the \`head\` of a linked list, remove the \`n\`-th node from the end of the list and return its head.`,
    constraints: ['The number of nodes in the list is sz', '1 <= sz <= 30', '0 <= Node.val <= 100', '1 <= n <= sz'],
    starterCodeJson: {
      python: `def removeNthFromEnd(head, n):
    dummy = ListNode(0, head)
    left = dummy
    right = head
    for _ in range(n):
        right = right.next
    while right:
        left = left.next
        right = right.next
    left.next = left.next.next
    return dummy.next`,
      javascript: `function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let left = dummy;
  let right = head;
  for (let i = 0; i < n; i++) right = right.next;
  while (right) {
    left = left.next;
    right = right.next;
  }
  left.next = left.next.next;
  return dummy.next;
}`,
    },
    testCasesJson: [
      { input: '[1,2,3,4,5], 2', expected: '[1,2,3,5]', hidden: false },
      { input: '[1], 1', expected: '[]', hidden: false },
      { input: '[1,2], 1', expected: '[1]', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Two Pointers with Fixed Offset**: Advance \`right\` pointer by \`n\` steps.
- Then move \`left\` (starting at \`dummy\`) and \`right\` together until \`right\` hits null.
- \`left.next\` is now exactly the node to delete! Bypass it with \`left.next = left.next.next\`.

### Complexity
- **Time Complexity**: $O(N)$ in one pass.
- **Space Complexity**: $O(1)$`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-5',
    slug: 'linked-list-cycle',
    title: 'Linked List Cycle',
    difficulty: 'EASY',
    category: 'Linked List',
    companyTags: ['Microsoft', 'Amazon', 'Spotify'],
    orderIndex: 35,
    descriptionMdx: `Given \`head\`, the head of a linked list, determine if the linked list has a cycle in it.

Return \`true\` if there is a cycle in the linked list. Otherwise, return \`false\`.`,
    constraints: ['The number of the nodes in the list is in the range [0, 10^4]', '-10^5 <= Node.val <= 10^5'],
    starterCodeJson: {
      python: `def hasCycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
      javascript: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    },
    testCasesJson: [
      { input: '[3,2,0,-4], pos = 1', expected: 'true', hidden: false },
      { input: '[1,2], pos = 0', expected: 'true', hidden: false },
      { input: '[1], pos = -1', expected: 'false', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Floyd's Tortoise and Hare**:
  - \`slow\` advances 1 node per iteration, \`fast\` advances 2.
  - If there is a cycle of length $C$, the distance between fast and slow decreases by 1 on every step ($2 - 1 = 1$). They are guaranteed to meet inside the loop!

### Complexity
- **Time Complexity**: $O(N)$
- **Space Complexity**: $O(1)$`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-6',
    slug: 'linked-list-cycle-ii',
    title: 'Linked List Cycle II (Find Start of Loop)',
    difficulty: 'MEDIUM',
    category: 'Linked List',
    companyTags: ['Amazon', 'Google', 'Microsoft'],
    orderIndex: 36,
    descriptionMdx: `Given the \`head\` of a linked list, return *the node where the cycle begins*. If there is no cycle, return \`null\`.`,
    constraints: ['The number of the nodes in the list is in the range [0, 10^4]', '-10^5 <= Node.val <= 10^5'],
    starterCodeJson: {
      python: `def detectCycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            slow2 = head
            while slow2 != slow:
                slow2 = slow2.next
                slow = slow.next
            return slow2
    return None`,
      javascript: `function detectCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let slow2 = head;
      while (slow2 !== slow) {
        slow2 = slow2.next;
        slow = slow.next;
      }
      return slow2;
    }
  }
  return null;
}`,
    },
    testCasesJson: [
      { input: '[3,2,0,-4], pos = 1', expected: 'tail connects to node index 1', hidden: false },
      { input: '[1,2], pos = 0', expected: 'tail connects to node index 0', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Math Proof
- Let distance to cycle start be $L$, and distance from start to meeting point be $d$. Cycle length is $C$.
- Slow traveled $L + d$. Fast traveled $L + d + kC$.
- Since fast travels twice as fast: $2(L + d) = L + d + kC \\implies L = kC - d = (k-1)C + (C - d)$.
- Thus, distance from list head to cycle start equals distance from meeting point to cycle start!
- Reset one pointer to \`head\` and step both forward by 1: they will collide at the exact cycle start!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-7',
    slug: 'lru-cache',
    title: 'LRU Cache',
    difficulty: 'MEDIUM',
    category: 'Linked List & Design',
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg', 'Uber'],
    orderIndex: 37,
    descriptionMdx: `Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.

Implement the \`LRUCache\` class:
- \`LRUCache(int capacity)\`: Initialize the LRU cache with positive size \`capacity\`.
- \`int get(int key)\`: Return value of the \`key\` if it exists, otherwise return \`-1\`.
- \`void put(int key, int value)\`: Update or insert value. If capacity exceeded, evict least recently used key.

Both methods must run in $O(1)$ average time complexity.`,
    constraints: ['1 <= capacity <= 3000', '0 <= key <= 10^4', '0 <= value <= 10^5', 'At most 2 * 10^5 calls will be made to get and put'],
    starterCodeJson: {
      python: `class DNode:
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}
        self.head, self.tail = DNode(), DNode()
        self.head.next, self.tail.prev = self.tail, self.head

    def _remove(self, node):
        prev, nxt = node.prev, node.next
        prev.next, nxt.prev = nxt, prev

    def _insert(self, node):
        nxt = self.head.next
        self.head.next = node
        node.prev = self.head
        node.next = nxt
        nxt.prev = node

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._insert(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = DNode(key, value)
        self.cache[key] = node
        self._insert(node)
        if len(self.cache) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]`,
      javascript: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map(); // Map preserves insertion order in JS
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
  }
}`,
    },
    testCasesJson: [
      { input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"], [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]', expected: '[null, null, null, 1, null, -1, null, -1, 3, 4]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Hash Map + Doubly Linked List**:
  - Hash map gives $O(1)$ key lookup to node pointer.
  - Doubly linked list allows $O(1)$ node removal and prepending to front (Most Recently Used).
  - Sentinel \`head\` and \`tail\` nodes remove all null checks.
- In JavaScript, \`Map\` iterates in insertion order, so delete + set simulates LRU in 10 lines!`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-8',
    slug: 'lfu-cache',
    title: 'LFU Cache',
    difficulty: 'HARD',
    category: 'Linked List & Design',
    companyTags: ['Amazon', 'Google', 'Microsoft'],
    orderIndex: 38,
    descriptionMdx: `Design and implement a data structure for a **Least Frequently Used (LFU)** cache.

Implement \`LFUCache(int capacity)\`, \`int get(int key)\`, and \`void put(int key, int value)\`.
When cache reaches capacity, invalidate and remove least frequently used key. If tie, remove least recently used key among them. Both methods must be $O(1)$.`,
    constraints: ['1 <= capacity <= 10^4', '0 <= key <= 10^5', '0 <= value <= 10^9', 'At most 2 * 10^5 calls'],
    starterCodeJson: {
      python: `from collections import defaultdict, OrderedDict

class LFUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.min_freq = 0
        self.key_val = {}
        self.key_freq = {}
        self.freq_keys = defaultdict(OrderedDict)

    def _update_freq(self, key):
        freq = self.key_freq[key]
        self.key_freq[key] = freq + 1
        del self.freq_keys[freq][key]
        if not self.freq_keys[freq] and self.min_freq == freq:
            self.min_freq += 1
        self.freq_keys[freq + 1][key] = True

    def get(self, key: int) -> int:
        if key not in self.key_val:
            return -1
        self._update_freq(key)
        return self.key_val[key]

    def put(self, key: int, value: int) -> None:
        if self.cap <= 0: return
        if key in self.key_val:
            self.key_val[key] = value
            self._update_freq(key)
            return
        if len(self.key_val) >= self.cap:
            evict_key, _ = self.freq_keys[self.min_freq].popitem(last=False)
            del self.key_val[evict_key]
            del self.key_freq[evict_key]
        self.key_val[key] = value
        self.key_freq[key] = 1
        self.freq_keys[1][key] = True
        self.min_freq = 1`,
      javascript: `// LFU using frequency buckets and doubly-linked nodes / Map`,
    },
    testCasesJson: [
      { input: '["LFUCache","put","put","get","put","get","get","put","get","get","get"]', expected: '[null,null,null,1,null,-1,3,null,-1,3,4]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Maintain a \`min_freq\` pointer.
- Map frequency $f \\to$ \`OrderedDict\` (or DoublyLinkedList) of keys having that frequency.
- When accessed, promote key from frequency bucket $f$ to $f+1$. If bucket $f$ becomes empty and $f == min\\_freq$, increment \`min_freq\`.`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-9',
    slug: 'merge-k-sorted-lists',
    title: 'Merge k Sorted Lists',
    difficulty: 'HARD',
    category: 'Linked List & Heap',
    companyTags: ['Amazon', 'Meta', 'Google', 'Microsoft', 'ByteDance'],
    orderIndex: 39,
    descriptionMdx: `You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.`,
    constraints: ['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500', '-10^4 <= lists[i][j] <= 10^4'],
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
      javascript: `// PriorityQueue or Divide and Conquer (Pairwise Merge)`,
    },
    testCasesJson: [
      { input: '[[1,4,5],[1,3,4],[2,6]]', expected: '[1,1,2,3,4,4,5,6]', hidden: false },
      { input: '[]', expected: '[]', hidden: false },
      { input: '[[]]', expected: '[]', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Min-Heap Approach**:
  - Keep a min-heap of size $k$ holding \`(node.val, index, node)\`.
  - Pop the smallest, link it to merged list, and push its \`node.next\` into heap.
  - Runtime: $O(N \\log k)$ where $N$ is total nodes across all lists.
- **Divide and Conquer Alternative**:
  - Merge lists pairwise like Merge Sort ($k/2, k/4, \\dots, 1$). No extra memory needed!`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-10',
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'EASY',
    category: 'Stack',
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    orderIndex: 40,
    descriptionMdx: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only: ()[]{}'],
    starterCodeJson: {
      python: `def isValid(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
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
      { input: '"([)]"', expected: 'false', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Map closing bracket to open bracket: \`{')': '(', '}': '{', ']': '['}\`.
- If open, push to stack. If close, pop and compare.
- At the end, stack must be completely empty!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-11',
    slug: 'min-stack',
    title: 'Min Stack',
    difficulty: 'MEDIUM',
    category: 'Stack',
    companyTags: ['Amazon', 'Microsoft', 'Bloomberg'],
    orderIndex: 41,
    descriptionMdx: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the \`MinStack\` class:
- \`void push(int val)\`
- \`void pop()\`
- \`int top()\`
- \`int getMin()\`

Methods must run in $O(1)$ time complexity.`,
    constraints: ['-2^31 <= val <= 2^31 - 1', 'Methods pop, top and getMin operations will always be called on non-empty stacks'],
    starterCodeJson: {
      python: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        min_val = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(min_val)

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]`,
      javascript: `class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }
  push(val) {
    this.stack.push(val);
    const min = this.minStack.length === 0 ? val : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(min);
  }
  pop() {
    this.stack.pop();
    this.minStack.pop();
  }
  top() { return this.stack[this.stack.length - 1]; }
  getMin() { return this.minStack[this.minStack.length - 1]; }
}`,
    },
    testCasesJson: [
      { input: '["MinStack","push","push","push","getMin","pop","top","getMin"], [[],[-2],[0],[-3],[],[],[],[]]', expected: '[null,null,null,null,-3,null,0,-2]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Two Parallel Stacks**: One records values, the other records the running minimum at that exact depth.
- **Space Optimization Trick**: Only push to \`minStack\` when \`val <= minStack[-1]\`, and only pop from \`minStack\` when \`val == minStack[-1]\`.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-12',
    slug: 'evaluate-reverse-polish-notation',
    title: 'Evaluate Reverse Polish Notation',
    difficulty: 'MEDIUM',
    category: 'Stack',
    companyTags: ['Amazon', 'Google', 'LinkedIn'],
    orderIndex: 42,
    descriptionMdx: `You are given an array of strings \`tokens\` that represents an arithmetic expression in a Reverse Polish Notation.

Evaluate the expression. Return an integer that represents the value of the expression. Valid operators are \`+\`, \`-\`, \`*\`, and \`/\`. Division truncates toward zero.`,
    constraints: ['1 <= tokens.length <= 10^4', 'tokens[i] is either an operator or an integer in [-200, 200]'],
    starterCodeJson: {
      python: `def evalRPN(tokens: list[str]) -> int:
    stack = []
    for t in tokens:
        if t in "+-*/":
            b = stack.pop()
            a = stack.pop()
            if t == '+': stack.append(a + b)
            elif t == '-': stack.append(a - b)
            elif t == '*': stack.append(a * b)
            elif t == '/': stack.append(int(a / b))
        else:
            stack.append(int(t))
    return stack[0]`,
      javascript: `function evalRPN(tokens) {
  const stack = [];
  for (const t of tokens) {
    if (t === '+') stack.push(stack.pop() + stack.pop());
    else if (t === '*') stack.push(stack.pop() * stack.pop());
    else if (t === '-') {
      const b = stack.pop(), a = stack.pop();
      stack.push(a - b);
    } else if (t === '/') {
      const b = stack.pop(), a = stack.pop();
      stack.push(Math.trunc(a / b));
    } else {
      stack.push(Number(t));
    }
  }
  return stack[0];
}`,
    },
    testCasesJson: [
      { input: '["2","1","+","3","*"]', expected: '9', hidden: false },
      { input: '["4","13","5","/","+"]', expected: '6', hidden: false },
      { input: '["10","6","9","3","+","-11","*","/","*","17","+","5","+"]', expected: '22', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- In Postfix (RPN), operators act on the preceding two operands: $a$ and $b$.
- Pay attention to order: \`b = stack.pop()\`, \`a = stack.pop()\`, result is \`a - b\` and \`int(a / b)\`.
- Note: Python's \`//\` operator floors toward negative infinity; use \`int(a / b)\` to truncate toward zero!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-13',
    slug: 'daily-temperatures',
    title: 'Daily Temperatures (Monotonic Stack)',
    difficulty: 'MEDIUM',
    category: 'Stack',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 43,
    descriptionMdx: `Given an array of integers \`temperatures\` represents the daily temperatures, return an array \`answer\` such that \`answer[i]\` is the number of days you have to wait after the \`i\`-th day to get a warmer temperature. If there is no future day for which this is possible, keep \`answer[i] == 0\` instead.`,
    constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
    starterCodeJson: {
      python: `def dailyTemperatures(temperatures: list[int]) -> list[int]:
    res = [0] * len(temperatures)
    stack = []  # store index (monotonic decreasing)
    for i, t in enumerate(temperatures):
        while stack and t > temperatures[stack[-1]]:
            prev_i = stack.pop()
            res[prev_i] = i - prev_i
        stack.append(i)
    return res`,
      javascript: `function dailyTemperatures(temps) {
  const res = new Array(temps.length).fill(0);
  const stack = []; // indices
  for (let i = 0; i < temps.length; i++) {
    while (stack.length && temps[i] > temps[stack[stack.length - 1]]) {
      const prev = stack.pop();
      res[prev] = i - prev;
    }
    stack.push(i);
  }
  return res;
}`,
    },
    testCasesJson: [
      { input: '[73,74,75,71,69,72,76,73]', expected: '[1,1,4,2,1,1,0,0]', hidden: false },
      { input: '[30,40,50,60]', expected: '[1,1,1,0]', hidden: false },
      { input: '[30,60,90]', expected: '[1,1,0]', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Monotonic Decreasing Stack**: Whenever you encounter a temperature warmer than \`stack[-1]\`, you have found the *Next Greater Element* for all pending cooler days in the stack.
- Pop them, resolve their wait time: \`res[prev] = curr - prev\`.
- Every element enters and leaves the stack at most once $\\implies O(N)$ time!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-14',
    slug: 'largest-rectangle-in-histogram',
    title: 'Largest Rectangle in Histogram',
    difficulty: 'HARD',
    category: 'Stack',
    companyTags: ['Amazon', 'Google', 'Meta', 'Netflix'],
    orderIndex: 44,
    descriptionMdx: `Given an array of integers \`heights\` representing the histogram's bar height where the width of each bar is 1, return *the area of the largest rectangle in the histogram*.`,
    constraints: ['1 <= heights.length <= 10^5', '0 <= heights[i] <= 10^4'],
    starterCodeJson: {
      python: `def largestRectangleArea(heights: list[int]) -> int:
    max_area = 0
    stack = [] # (index, height)
    for i, h in enumerate(heights):
        start = i
        while stack and stack[-1][1] > h:
            idx, height = stack.pop()
            max_area = max(max_area, height * (i - idx))
            start = idx
        stack.append((start, h))
    for idx, height in stack:
        max_area = max(max_area, height * (len(heights) - idx))
    return max_area`,
      javascript: `function largestRectangleArea(heights) {
  let maxArea = 0;
  const stack = []; // [index, height]
  for (let i = 0; i < heights.length; i++) {
    let start = i;
    while (stack.length && stack[stack.length - 1][1] > heights[i]) {
      const [idx, h] = stack.pop();
      maxArea = Math.max(maxArea, h * (i - idx));
      start = idx;
    }
    stack.push([start, heights[i]]);
  }
  for (const [idx, h] of stack) {
    maxArea = Math.max(maxArea, h * (heights.length - idx));
  }
  return maxArea;
}`,
    },
    testCasesJson: [
      { input: '[2,1,5,6,2,3]', expected: '10', hidden: false },
      { input: '[2,4]', expected: '4', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Monotonic Increasing Stack**: A bar can extend backwards to the index of any popped taller bar.
- When popping a taller bar $H$, its bounded width is $(i - \\text{start})$.
- Compute remaining elements in stack using $(\\text{total\\_length} - \\text{start})$.
- Total time: $O(N)$ with $O(N)$ space.`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-15',
    slug: 'car-fleet',
    title: 'Car Fleet',
    difficulty: 'MEDIUM',
    category: 'Stack',
    companyTags: ['Google', 'Amazon'],
    orderIndex: 45,
    descriptionMdx: `There are \`n\` cars at given miles away from the starting mile 0, travelling towards \`target\` at given speeds.

A car can never pass another car ahead of it, but it can catch up to it and drive bumper to bumper at the same speed. A **car fleet** is some non-empty set of cars driving at the same position and speed.

Return the *number of car fleets* that will arrive at the destination.`,
    constraints: ['n == position.length == speed.length', '1 <= n <= 10^5', '0 < target <= 10^6', '0 <= position[i] < target', '0 < speed[i] <= 10^6'],
    starterCodeJson: {
      python: `def carFleet(target: int, position: list[int], speed: list[int]) -> int:
    pair = sorted(zip(position, speed), reverse=True)
    stack = []
    for p, s in pair:
        time = (target - p) / s
        stack.append(time)
        if len(stack) >= 2 and stack[-1] <= stack[-2]:
            stack.pop() # caught up to the fleet ahead
    return len(stack)`,
      javascript: `function carFleet(target, position, speed) {
  const cars = position.map((p, i) => [p, speed[i]]).sort((a, b) => b[0] - a[0]);
  const stack = [];
  for (const [p, s] of cars) {
    const time = (target - p) / s;
    stack.push(time);
    if (stack.length >= 2 && stack[stack.length - 1] <= stack[stack.length - 2]) {
      stack.pop();
    }
  }
  return stack.length;
}`,
    },
    testCasesJson: [
      { input: '12, [10,8,0,5,3], [2,4,1,1,3]', expected: '3', hidden: false },
      { input: '10, [3], [3]', expected: '1', hidden: false },
      { input: '100, [0,2,4], [4,2,1]', expected: '1', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Sort cars by starting position in **descending order** (closest to target first).
- Calculate arrival time: $t = (\\text{target} - p) / s$.
- If a trailing car takes less or equal time than the car ahead of it, it will collide and become part of that fleet. Pop it from the stack!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-16',
    slug: 'asteroid-collision',
    title: 'Asteroid Collision',
    difficulty: 'MEDIUM',
    category: 'Stack',
    companyTags: ['Amazon', 'Uber', 'DoorDash'],
    orderIndex: 46,
    descriptionMdx: `We are given an array \`asteroids\` of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive = right, negative = left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.`,
    constraints: ['2 <= asteroids.length <= 10^4', '-1000 <= asteroids[i] <= 1000', 'asteroids[i] != 0'],
    starterCodeJson: {
      python: `def asteroidCollision(asteroids: list[int]) -> list[int]:
    stack = []
    for a in asteroids:
        while stack and a < 0 < stack[-1]:
            diff = a + stack[-1]
            if diff < 0:
                stack.pop() # top asteroid explodes, continue while
            elif diff > 0:
                a = 0       # current asteroid explodes
            else:
                a = 0
                stack.pop() # both explode
        if a:
            stack.append(a)
    return stack`,
      javascript: `function asteroidCollision(asteroids) {
  const stack = [];
  for (let a of asteroids) {
    while (stack.length && a < 0 && stack[stack.length - 1] > 0) {
      const diff = a + stack[stack.length - 1];
      if (diff < 0) {
        stack.pop();
      } else if (diff > 0) {
        a = 0;
      } else {
        a = 0;
        stack.pop();
      }
    }
    if (a) stack.push(a);
  }
  return stack;
}`,
    },
    testCasesJson: [
      { input: '[5,10,-5]', expected: '[5,10]', hidden: false },
      { input: '[8,-8]', expected: '[]', hidden: false },
      { input: '[10,2,-5]', expected: '[10]', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Collision only happens when: \`current < 0\` and \`stack[-1] > 0\` (they move towards each other).
- \`diff = a + stack[-1]\`:
  - \`diff < 0\`: Top is smaller $\\implies$ \`stack.pop()\`, loop continues!
  - \`diff > 0\`: Current is smaller $\\implies$ set \`a = 0\`, break.
  - \`diff == 0\`: Both equal $\\implies$ set \`a = 0\`, \`stack.pop()\`, break.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-17',
    slug: 'online-stock-span',
    title: 'Online Stock Span',
    difficulty: 'MEDIUM',
    category: 'Stack',
    companyTags: ['Amazon', 'Bloomberg'],
    orderIndex: 47,
    descriptionMdx: `Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day.

The **span** of the stock's price in one day is the maximum number of consecutive days (starting today and going backwards) for which stock price was $\\le$ today's price.

Implement \`StockSpanner.next(int price)\` returning the span.`,
    constraints: ['1 <= price <= 10^5', 'At most 10^4 calls will be made to next'],
    starterCodeJson: {
      python: `class StockSpanner:
    def __init__(self):
        self.stack = [] # (price, span)

    def next(self, price: int) -> int:
        span = 1
        while self.stack and self.stack[-1][0] <= price:
            span += self.stack.pop()[1]
        self.stack.append((price, span))
        return span`,
      javascript: `class StockSpanner {
  constructor() {
    this.stack = []; // [price, span]
  }
  next(price) {
    let span = 1;
    while (this.stack.length && this.stack[this.stack.length - 1][0] <= price) {
      span += this.stack.pop()[1];
    }
    this.stack.push([price, span]);
    return span;
  }
}`,
    },
    testCasesJson: [
      { input: '["StockSpanner","next","next","next","next","next","next","next"], [[],[100],[80],[60],[70],[60],[75],[85]]', expected: '[null,1,1,1,2,1,4,6]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Store pairs of \`(price, aggregated_span)\` in a monotonic decreasing stack.
- When a price is $\\ge$ top of stack, pop it and **add its precomputed span** directly!
- Amortized $O(1)$ per query!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-18',
    slug: 'implement-queue-using-stacks',
    title: 'Implement Queue using Stacks',
    difficulty: 'EASY',
    category: 'Stack',
    companyTags: ['Amazon', 'Microsoft'],
    orderIndex: 48,
    descriptionMdx: `Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support \`push\`, \`pop\`, \`peek\`, and \`empty\`.`,
    constraints: ['1 <= x <= 9', 'At most 100 calls will be made to push, pop, peek, and empty'],
    starterCodeJson: {
      python: `class MyQueue:
    def __init__(self):
        self.s_in = []
        self.s_out = []

    def push(self, x: int) -> None:
        self.s_in.append(x)

    def _shift(self):
        if not self.s_out:
            while self.s_in:
                self.s_out.append(self.s_in.pop())

    def pop(self) -> int:
        self._shift()
        return self.s_out.pop()

    def peek(self) -> int:
        self._shift()
        return self.s_out[-1]

    def empty(self) -> bool:
        return not self.s_in and not self.s_out`,
      javascript: `// Two stacks: inStack & outStack with lazy shifting`,
    },
    testCasesJson: [
      { input: '["MyQueue", "push", "push", "peek", "pop", "empty"], [[], [1], [2], [], [], []]', expected: '[null, null, null, 1, 1, false]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Lazy Transfer**: Elements only move from \`s_in\` to \`s_out\` when \`s_out\` is empty.
- Every element is pushed into \`s_in\`, popped to \`s_out\`, and popped from \`s_out\` once.
- Amortized $O(1)$ time per operation!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-19',
    slug: 'next-greater-element-i',
    title: 'Next Greater Element I',
    difficulty: 'EASY',
    category: 'Stack',
    companyTags: ['Amazon', 'Google'],
    orderIndex: 49,
    descriptionMdx: `The **next greater element** of some element \`x\` in an array is the first greater element that is to the right of \`x\` in the same array.

You are given two distinct 0-indexed integer arrays \`nums1\` and \`nums2\`, where \`nums1\` is a subset of \`nums2\`. Return an array \`ans\` of length \`nums1.length\` such that \`ans[i]\` is the next greater element as described above.`,
    constraints: ['1 <= nums1.length <= nums2.length <= 1000', '0 <= nums1[i], nums2[i] <= 10^4', 'All integers in nums1 and nums2 are unique'],
    starterCodeJson: {
      python: `def nextGreaterElement(nums1: list[int], nums2: list[int]) -> list[int]:
    nxt_greater = {}
    stack = []
    for n in nums2:
        while stack and n > stack[-1]:
            nxt_greater[stack.pop()] = n
        stack.append(n)
    return [nxt_greater.get(n, -1) for n in nums1]`,
      javascript: `function nextGreaterElement(nums1, nums2) {
  const map = new Map();
  const stack = [];
  for (const n of nums2) {
    while (stack.length && n > stack[stack.length - 1]) {
      map.set(stack.pop(), n);
    }
    stack.push(n);
  }
  return nums1.map(n => map.get(n) ?? -1);
}`,
    },
    testCasesJson: [
      { input: '[4,1,2], [1,3,4,2]', expected: '[-1,3,-1]', hidden: false },
      { input: '[2,4], [1,2,3,4]', expected: '[3,-1]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Compute next greater for all elements in \`nums2\` via Monotonic Decreasing Stack into a Hash Map.
- Then map \`nums1\` lookups directly in $O(1)$. Total time: $O(N_1 + N_2)$.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-20',
    slug: 'next-greater-element-ii',
    title: 'Next Greater Element II (Circular Array)',
    difficulty: 'MEDIUM',
    category: 'Stack',
    companyTags: ['Amazon', 'Microsoft'],
    orderIndex: 50,
    descriptionMdx: `Given a circular integer array \`nums\` (i.e., the next element of \`nums[nums.length - 1]\` is \`nums[0]\`), return the *next greater number* for every element in \`nums\`.`,
    constraints: ['1 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9'],
    starterCodeJson: {
      python: `def nextGreaterElements(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [-1] * n
    stack = []
    for i in range(2 * n):
        val = nums[i % n]
        while stack and val > nums[stack[-1]]:
            res[stack.pop()] = val
        if i < n:
            stack.append(i)
    return res`,
      javascript: `function nextGreaterElements(nums) {
  const n = nums.length;
  const res = new Array(n).fill(-1);
  const stack = [];
  for (let i = 0; i < 2 * n; i++) {
    const val = nums[i % n];
    while (stack.length && val > nums[stack[stack.length - 1]]) {
      res[stack.pop()] = val;
    }
    if (i < n) stack.push(i);
  }
  return res;
}`,
    },
    testCasesJson: [
      { input: '[1,2,1]', expected: '[2,-1,2]', hidden: false },
      { input: '[1,2,3,4,3]', expected: '[2,3,4,-1,4]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Simulate Circular with $2N$ Loop**: Iterate from $0$ to $2N-1$ using modulo index \`i % n\`.
- Only push indices into stack during the first pass (\`i < n\`). The second pass resolves remaining circular elements!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-21',
    slug: 'copy-list-with-random-pointer',
    title: 'Copy List with Random Pointer',
    difficulty: 'MEDIUM',
    category: 'Linked List',
    companyTags: ['Amazon', 'Meta', 'Microsoft', 'Bloomberg'],
    orderIndex: 51,
    descriptionMdx: `A linked list of length \`n\` is given such that each node contains an additional random pointer, which could point to any node in the list, or null.

Construct a **deep copy** of the list. The deep copy should consist of exactly \`n\` brand new nodes.`,
    constraints: ['0 <= n <= 1000', '-10^4 <= Node.val <= 10^4'],
    starterCodeJson: {
      python: `def copyRandomList(head):
    if not head: return None
    # Pass 1: weave clone nodes right after originals
    curr = head
    while curr:
        nxt = curr.next
        clone = Node(curr.val, nxt, None)
        curr.next = clone
        curr = nxt
    # Pass 2: assign random pointers
    curr = head
    while curr:
        if curr.random:
            curr.next.random = curr.random.next
        curr = curr.next.next
    # Pass 3: unweave the two lists
    curr = head
    copy_head = head.next
    while curr:
        clone = curr.next
        curr.next = clone.next
        clone.next = clone.next.next if clone.next else None
        curr = curr.next
    return copy_head`,
      javascript: `// Two passes with Map or $O(1)$ space interleaving`,
    },
    testCasesJson: [
      { input: '[[7,null],[13,0],[11,4],[10,2],[1,0]]', expected: '[[7,null],[13,0],[11,4],[10,2],[1,0]]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **$O(1)$ Space Interleaving Trick**:
  - Insert cloned node between current and next: $A \\to A' \\to B \\to B'$.
  - Set \`clone.random = curr.random.next\`.
  - Unzip original and cloned lists in the final pass!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-22',
    slug: 'palindrome-linked-list',
    title: 'Palindrome Linked List',
    difficulty: 'EASY',
    category: 'Linked List',
    companyTags: ['Amazon', 'Google', 'Microsoft'],
    orderIndex: 52,
    descriptionMdx: `Given the \`head\` of a singly linked list, return \`true\` if it is a palindrome or \`false\` otherwise.`,
    constraints: ['The number of nodes in the list is in the range [1, 10^5]', '0 <= Node.val <= 9'],
    starterCodeJson: {
      python: `def isPalindrome(head) -> bool:
    # 1. Fast & Slow pointer to find middle
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    # 2. Reverse second half
    prev = None
    while slow:
        nxt = slow.next
        slow.next = prev
        prev = slow
        slow = nxt
    # 3. Check palindrome
    left, right = head, prev
    while right:
        if left.val != right.val:
            return False
        left = left.next
        right = right.next
    return True`,
      javascript: `function isPalindrome(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let prev = null;
  while (slow) {
    let nxt = slow.next;
    slow.next = prev;
    prev = slow;
    slow = nxt;
  }
  let left = head, right = prev;
  while (right) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }
  return true;
}`,
    },
    testCasesJson: [
      { input: '[1,2,2,1]', expected: 'true', hidden: false },
      { input: '[1,2]', expected: 'false', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Find middle with slow/fast pointers in $O(N)$.
- Reverse right half in-place in $O(1)$ space.
- Compare heads of both halves.
- Space Complexity: $O(1)$, Time Complexity: $O(N)$.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-23',
    slug: 'odd-even-linked-list',
    title: 'Odd Even Linked List',
    difficulty: 'MEDIUM',
    category: 'Linked List',
    companyTags: ['Amazon', 'Microsoft'],
    orderIndex: 53,
    descriptionMdx: `Given the \`head\` of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.`,
    constraints: ['The number of nodes in the linked list is in the range [0, 10^4]', '-10^6 <= Node.val <= 10^6'],
    starterCodeJson: {
      python: `def oddEvenList(head):
    if not head or not head.next: return head
    odd = head
    even = head.next
    even_head = even
    while even and even.next:
        odd.next = even.next
        odd = odd.next
        even.next = odd.next
        even = even.next
    odd.next = even_head
    return head`,
      javascript: `function oddEvenList(head) {
  if (!head || !head.next) return head;
  let odd = head, even = head.next, evenHead = even;
  while (even && even.next) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHead;
  return head;
}`,
    },
    testCasesJson: [
      { input: '[1,2,3,4,5]', expected: '[1,3,5,2,4]', hidden: false },
      { input: '[2,1,3,5,6,4,7]', expected: '[2,3,6,7,1,5,4]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Keep two pointers: \`odd\` and \`even\` with \`evenHead = even\`.
- Advance in tandem: \`odd.next = even.next; odd = odd.next; even.next = odd.next; even = even.next\`.
- At the end, stitch \`odd.next = evenHead\`. Zero allocations!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-24',
    slug: 'swap-nodes-in-pairs',
    title: 'Swap Nodes in Pairs',
    difficulty: 'MEDIUM',
    category: 'Linked List',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 54,
    descriptionMdx: `Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)`,
    constraints: ['The number of nodes in the list is in the range [0, 100]', '0 <= Node.val <= 100'],
    starterCodeJson: {
      python: `def swapPairs(head):
    dummy = ListNode(0, head)
    prev = dummy
    while prev.next and prev.next.next:
        first = prev.next
        second = prev.next.next
        # Swap
        first.next = second.next
        second.next = first
        prev.next = second
        # Advance
        prev = first
    return dummy.next`,
      javascript: `function swapPairs(head) {
  const dummy = new ListNode(0, head);
  let prev = dummy;
  while (prev.next && prev.next.next) {
    const first = prev.next;
    const second = prev.next.next;
    first.next = second.next;
    second.next = first;
    prev.next = second;
    prev = first;
  }
  return dummy.next;
}`,
    },
    testCasesJson: [
      { input: '[1,2,3,4]', expected: '[2,1,4,3]', hidden: false },
      { input: '[]', expected: '[]', hidden: false },
      { input: '[1]', expected: '[1]', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Use a \`dummy\` node: \`first = prev.next\`, \`second = prev.next.next\`.
- Point \`first.next = second.next\`, \`second.next = first\`, \`prev.next = second\`.
- Move \`prev = first\` and repeat.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-25',
    slug: 'reverse-nodes-in-k-group',
    title: 'Reverse Nodes in k-Group',
    difficulty: 'HARD',
    category: 'Linked List',
    companyTags: ['Amazon', 'Microsoft', 'Google', 'Meta', 'ByteDance'],
    orderIndex: 55,
    descriptionMdx: `Given the \`head\` of a linked list, reverse the nodes of the list \`k\` at a time, and return *the modified list*.

\`k\` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of \`k\` then left-out nodes, in the end, should remain as it is.`,
    constraints: ['The number of nodes in the list is n', '1 <= k <= n <= 5000', '0 <= Node.val <= 1000'],
    starterCodeJson: {
      python: `def reverseKGroup(head, k):
    dummy = ListNode(0, head)
    group_prev = dummy
    while True:
        # Check if k nodes exist
        kth = group_prev
        for _ in range(k):
            kth = kth.next
            if not kth:
                return dummy.next
        group_next = kth.next
        # Reverse group
        prev, curr = kth.next, group_prev.next
        while curr != group_next:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        tmp = group_prev.next
        group_prev.next = kth
        group_prev = tmp`,
      javascript: `// In-place group reversal with kth checkpoint`,
    },
    testCasesJson: [
      { input: '[1,2,3,4,5], 2', expected: '[2,1,4,3,5]', hidden: false },
      { input: '[1,2,3,4,5], 3', expected: '[3,2,1,4,5]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Find the $k$-th node first; if there aren't $k$ nodes left, break and return!
- Reverse the slice between \`groupPrev.next\` and \`groupNext\` using standard 3-pointer reversal initialized with \`prev = groupNext\`.
- Rewire \`groupPrev.next = kth\` and update \`groupPrev\`.`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-26',
    slug: 'add-two-numbers',
    title: 'Add Two Numbers',
    difficulty: 'MEDIUM',
    category: 'Linked List',
    companyTags: ['Amazon', 'Google', 'Meta', 'Apple'],
    orderIndex: 56,
    descriptionMdx: `You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.`,
    constraints: ['The number of nodes in each linked list is in the range [1, 100]', '0 <= Node.val <= 9', 'It is guaranteed that the list represents a number that does not have leading zeros'],
    starterCodeJson: {
      python: `def addTwoNumbers(l1, l2):
    dummy = ListNode()
    curr = dummy
    carry = 0
    while l1 or l2 or carry:
        v1 = l1.val if l1 else 0
        v2 = l2.val if l2 else 0
        val = v1 + v2 + carry
        carry = val // 10
        curr.next = ListNode(val % 10)
        curr = curr.next
        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None
    return dummy.next`,
      javascript: `function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let curr = dummy, carry = 0;
  while (l1 || l2 || carry) {
    const sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
    carry = Math.floor(sum / 10);
    curr.next = new ListNode(sum % 10);
    curr = curr.next;
    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
  }
  return dummy.next;
}`,
    },
    testCasesJson: [
      { input: '[2,4,3], [5,6,4]', expected: '[7,0,8]', hidden: false },
      { input: '[0], [0]', expected: '[0]', hidden: false },
      { input: '[9,9,9,9,9,9,9], [9,9,9,9]', expected: '[8,9,9,9,0,0,0,1]', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Keep a single \`while l1 or l2 or carry:\` loop.
- Modulo \`val % 10\` gives node digit, integer division \`val // 10\` carries forward.
- Safe ternary fallback handles unequal list lengths gracefully.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-27',
    slug: 'basic-calculator',
    title: 'Basic Calculator',
    difficulty: 'HARD',
    category: 'Stack',
    companyTags: ['Meta', 'Google', 'Amazon', 'Microsoft'],
    orderIndex: 57,
    descriptionMdx: `Given a string \`s\` representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation. Supports \`+\`, \`-\`, \`(\`, \`)\`, and spaces.`,
    constraints: ['1 <= s.length <= 3 * 10^5', 's consists of digits, \'+\', \'-\', \'(\', \')\', and \' \''],
    starterCodeJson: {
      python: `def calculate(s: str) -> int:
    stack = []
    res = 0
    curr_num = 0
    sign = 1  # 1 for +, -1 for -
    for ch in s:
        if ch.isdigit():
            curr_num = curr_num * 10 + int(ch)
        elif ch in "+-":
            res += sign * curr_num
            curr_num = 0
            sign = 1 if ch == '+' else -1
        elif ch == '(':
            stack.append(res)
            stack.append(sign)
            res = 0
            sign = 1
        elif ch == ')':
            res += sign * curr_num
            curr_num = 0
            res *= stack.pop() # multiply sign
            res += stack.pop() # add prev result
    return res + (sign * curr_num)`,
      javascript: `// Stack saving [prevResult, prevSign] on '('`,
    },
    testCasesJson: [
      { input: '"1 + 1"', expected: '2', hidden: false },
      { input: '" 2-1 + 2 "', expected: '3', hidden: false },
      { input: '"(1+(4+5+2)-3)+(6+8)"', expected: '23', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Store running \`res\` and \`sign\` (+1 / -1).
- When seeing \`'('\`: push \`res\` then \`sign\` to stack; reset \`res = 0\`, \`sign = 1\`.
- When seeing \`')'\`: finalize inside expression, multiply by popped sign, add popped outer result!`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-28',
    slug: 'simplify-path',
    title: 'Simplify Path',
    difficulty: 'MEDIUM',
    category: 'Stack',
    companyTags: ['Meta', 'Amazon'],
    orderIndex: 58,
    descriptionMdx: `Given an absolute path for a Unix-style file system, simplify it. In Unix:
- A period \`'.'\` refers to the current directory.
- A double period \`'..'\` moves up a level.
- Multiple slashes \`'//'\` treated as a single slash.`,
    constraints: ['1 <= path.length <= 3000', 'path consists of English letters, digits, period \'.\', slash \'/\' or \'_\''],
    starterCodeJson: {
      python: `def simplifyPath(path: str) -> str:
    stack = []
    for part in path.split('/'):
        if part == '..':
            if stack: stack.pop()
        elif part and part != '.':
            stack.append(part)
    return '/' + '/'.join(stack)`,
      javascript: `function simplifyPath(path) {
  const stack = [];
  for (const part of path.split('/')) {
    if (part === '..') {
      if (stack.length) stack.pop();
    } else if (part && part !== '.') {
      stack.push(part);
    }
  }
  return '/' + stack.join('/');
}`,
    },
    testCasesJson: [
      { input: '"/home/"', expected: '"/home"', hidden: false },
      { input: '"/../"', expected: '"/"', hidden: false },
      { input: '"/home//foo/"', expected: '"/home/foo"', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Split path by \`'/'\`.
- Ignore empty strings and \`'.'\`.
- Pop on \`'..'\`. Push everything else.
- Join with \`'/'\` and prepend root slash.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-29',
    slug: 'decode-string',
    title: 'Decode String',
    difficulty: 'MEDIUM',
    category: 'Stack',
    companyTags: ['Google', 'Bloomberg', 'Amazon'],
    orderIndex: 59,
    descriptionMdx: `Given an encoded string, return its decoded string.

The encoding rule is: \`k[encoded_string]\`, where the \`encoded_string\` inside the square brackets is being repeated exactly \`k\` times. Note that \`k\` is guaranteed to be a positive integer.`,
    constraints: ['1 <= s.length <= 30', 's consists of lowercase English letters, digits, and square brackets \'[]\''],
    starterCodeJson: {
      python: `def decodeString(s: str) -> str:
    stack = []
    curr_str = ""
    curr_num = 0
    for ch in s:
        if ch.isdigit():
            curr_num = curr_num * 10 + int(ch)
        elif ch == '[':
            stack.append((curr_str, curr_num))
            curr_str = ""
            curr_num = 0
        elif ch == ']':
            prev_str, num = stack.pop()
            curr_str = prev_str + curr_str * num
        else:
            curr_str += ch
    return curr_str`,
      javascript: `function decodeString(s) {
  const stack = [];
  let currStr = '';
  let currNum = 0;
  for (const ch of s) {
    if (/\\d/.test(ch)) {
      currNum = currNum * 10 + Number(ch);
    } else if (ch === '[') {
      stack.push([currStr, currNum]);
      currStr = '';
      currNum = 0;
    } else if (ch === ']') {
      const [prevStr, num] = stack.pop();
      currStr = prevStr + currStr.repeat(num);
    } else {
      currStr += ch;
    }
  }
  return currStr;
}`,
    },
    testCasesJson: [
      { input: '"3[a]2[bc]"', expected: '"aaabcbc"', hidden: false },
      { input: '"3[a2[c]]"', expected: '"accaccacc"', hidden: false },
      { input: '"2[abc]3[cd]ef"', expected: '"abcabccdcdcdef"', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- On \`'['\`, push \`(current_string, multiplier)\` to stack and reset.
- On \`']'\`, pop \`(prev_string, k)\` and compute \`prev_string + current_string * k\`.
- Handles arbitrary nesting in $O(N)$!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'lls-30',
    slug: 'flatten-multilevel-doubly-linked-list',
    title: 'Flatten a Multilevel Doubly Linked List',
    difficulty: 'MEDIUM',
    category: 'Linked List',
    companyTags: ['Bloomberg', 'Microsoft', 'Amazon'],
    orderIndex: 60,
    descriptionMdx: `You are given a doubly linked list, which contains nodes that have a next pointer, a previous pointer, and an additional **child pointer**.

Flatten the list so that all the nodes appear in a single-level, doubly linked list. The nodes in the list should appear in a depth-first traversal of the multilevel structure.`,
    constraints: ['The number of Nodes will not exceed 1000', '1 <= Node.val <= 10^5'],
    starterCodeJson: {
      python: `def flatten(head):
    if not head: return None
    curr = head
    while curr:
        if curr.child:
            nxt = curr.next
            child = curr.child
            while child.next:
                child = child.next
            curr.next = curr.child
            curr.child.prev = curr
            curr.child = None
            if nxt:
                child.next = nxt
                nxt.prev = child
        curr = curr.next
    return head`,
      javascript: `// DFS or iterative child-tail splicing`,
    },
    testCasesJson: [
      { input: '[1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]', expected: '[1,2,3,7,8,11,12,9,10,4,5,6]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Whenever a node has a \`child\`:
  - Find the tail of that child's list.
  - Splice child list between \`curr\` and \`curr.next\`.
  - Set \`curr.child = None\` and continue advancing \`curr.next\`!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
];


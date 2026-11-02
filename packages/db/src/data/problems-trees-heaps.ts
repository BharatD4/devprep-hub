import { SeedProblem } from '../data';

export const PROBLEMS_TREES_HEAPS: SeedProblem[] = [
  {
    id: 'th-1',
    slug: 'invert-binary-tree',
    title: 'Invert Binary Tree',
    difficulty: 'EASY',
    category: 'Trees',
    companyTags: ['Google', 'Amazon', 'Meta'],
    orderIndex: 61,
    descriptionMdx: `Given the \`root\` of a binary tree, invert the tree, and return *its root*.`,
    constraints: ['The number of nodes in the tree is in the range [0, 100]', '-100 <= Node.val <= 100'],
    starterCodeJson: {
      python: `def invertTree(root):
    if not root:
        return None
    root.left, root.right = invertTree(root.right), invertTree(root.left)
    return root`,
      javascript: `function invertTree(root) {
  if (!root) return null;
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
}`,
    },
    testCasesJson: [
      { input: '[4,2,7,1,3,6,9]', expected: '[4,7,2,9,6,3,1]', hidden: false },
      { input: '[2,1,3]', expected: '[2,3,1]', hidden: false },
      { input: '[]', expected: '[]', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Base case: \`if not root: return None\`.
- Swap children: \`root.left, root.right = invertTree(root.right), invertTree(root.left)\`.
- Both BFS (queue) and DFS work in $O(N)$ time and $O(H)$ stack space.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-2',
    slug: 'maximum-depth-of-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'EASY',
    category: 'Trees',
    companyTags: ['Amazon', 'Google', 'Meta', 'LinkedIn'],
    orderIndex: 62,
    descriptionMdx: `Given the \`root\` of a binary tree, return *its maximum depth*.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    constraints: ['The number of nodes in the tree is in the range [0, 10^4]', '-100 <= Node.val <= 100'],
    starterCodeJson: {
      python: `def maxDepth(root) -> int:
    if not root:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))`,
      javascript: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    },
    testCasesJson: [
      { input: '[3,9,20,null,null,15,7]', expected: '3', hidden: false },
      { input: '[1,null,2]', expected: '2', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Post-order traversal: compute height of left and right child, return \`1 + max(left, right)\`.
- Time Complexity: $O(N)$, Space Complexity: $O(H)$.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-3',
    slug: 'diameter-of-binary-tree',
    title: 'Diameter of Binary Tree',
    difficulty: 'EASY',
    category: 'Trees',
    companyTags: ['Amazon', 'Meta', 'Google', 'Microsoft'],
    orderIndex: 63,
    descriptionMdx: `Given the \`root\` of a binary tree, return *the length of the diameter of the tree*.

The **diameter** of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.`,
    constraints: ['The number of nodes in the tree is in the range [1, 10^4]', '-100 <= Node.val <= 100'],
    starterCodeJson: {
      python: `def diameterOfBinaryTree(root) -> int:
    diameter = 0
    def dfs(node):
        nonlocal diameter
        if not node:
            return 0
        left = dfs(node.left)
        right = dfs(node.right)
        diameter = max(diameter, left + right)
        return 1 + max(left, right)
    dfs(root)
    return diameter`,
      javascript: `function diameterOfBinaryTree(root) {
  let diameter = 0;
  function dfs(node) {
    if (!node) return 0;
    const left = dfs(node.left);
    const right = dfs(node.right);
    diameter = Math.max(diameter, left + right);
    return 1 + Math.max(left, right);
  }
  dfs(root);
  return diameter;
}`,
    },
    testCasesJson: [
      { input: '[1,2,3,4,5]', expected: '3', hidden: false },
      { input: '[1,2]', expected: '1', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- The longest path passing through any node as the apex is \`left_height + right_height\`.
- Update a global maximum variable \`diameter\` inside the height-computing DFS.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-4',
    slug: 'balanced-binary-tree',
    title: 'Balanced Binary Tree',
    difficulty: 'EASY',
    category: 'Trees',
    companyTags: ['Amazon', 'Google', 'Microsoft'],
    orderIndex: 64,
    descriptionMdx: `Given a binary tree, determine if it is **height-balanced** (depth of the two subtrees of every node never differs by more than one).`,
    constraints: ['The number of nodes in the tree is in the range [0, 5000]', '-10^4 <= Node.val <= 10^4'],
    starterCodeJson: {
      python: `def isBalanced(root) -> bool:
    def check(node):
        if not node:
            return 0
        left = check(node.left)
        if left == -1: return -1
        right = check(node.right)
        if right == -1: return -1
        if abs(left - right) > 1:
            return -1
        return 1 + max(left, right)
    return check(root) != -1`,
      javascript: `function isBalanced(root) {
  function check(node) {
    if (!node) return 0;
    const l = check(node.left);
    if (l === -1) return -1;
    const r = check(node.right);
    if (r === -1) return -1;
    if (Math.abs(l - r) > 1) return -1;
    return 1 + Math.max(l, r);
  }
  return check(root) !== -1;
}`,
    },
    testCasesJson: [
      { input: '[3,9,20,null,null,15,7]', expected: 'true', hidden: false },
      { input: '[1,2,2,3,3,null,null,4,4]', expected: 'false', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Bottom-Up Early Exit**: Return \`-1\` immediately when any subtree is unbalanced.
- Avoids the naive $O(N^2)$ top-down recalculation, reducing runtime to $O(N)$.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-5',
    slug: 'same-tree',
    title: 'Same Tree',
    difficulty: 'EASY',
    category: 'Trees',
    companyTags: ['Amazon', 'Google'],
    orderIndex: 65,
    descriptionMdx: `Given the roots of two binary trees \`p\` and \`q\`, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.`,
    constraints: ['The number of nodes in both trees is in the range [0, 100]', '-10^4 <= Node.val <= 10^4'],
    starterCodeJson: {
      python: `def isSameTree(p, q) -> bool:
    if not p and not q:
        return True
    if not p or not q or p.val != q.val:
        return False
    return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)`,
      javascript: `function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
    },
    testCasesJson: [
      { input: '[1,2,3], [1,2,3]', expected: 'true', hidden: false },
      { input: '[1,2], [1,null,2]', expected: 'false', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- If both null $\\implies$ \`True\`.
- If one null or values differ $\\implies$ \`False\`.
- Check subtrees: \`isSameTree(p.left, q.left) and isSameTree(p.right, q.right)\`.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-6',
    slug: 'subtree-of-another-tree',
    title: 'Subtree of Another Tree',
    difficulty: 'EASY',
    category: 'Trees',
    companyTags: ['Amazon', 'Meta'],
    orderIndex: 66,
    descriptionMdx: `Given the roots of two binary trees \`root\` and \`subRoot\`, return \`true\` if there is a subtree of \`root\` with the same structure and node values of \`subRoot\` and \`false\` otherwise.`,
    constraints: ['The number of nodes in the root tree is in the range [1, 2000]', 'The number of nodes in the subRoot tree is in the range [1, 1000]'],
    starterCodeJson: {
      python: `def isSubtree(root, subRoot) -> bool:
    if not subRoot: return True
    if not root: return False
    if isSameTree(root, subRoot): return True
    return isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot)`,
      javascript: `function isSubtree(root, subRoot) {
  if (!subRoot) return true;
  if (!root) return false;
  if (isSame(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}`,
    },
    testCasesJson: [
      { input: '[3,4,5,1,2], [4,1,2]', expected: 'true', hidden: false },
      { input: '[3,4,5,1,2,null,null,null,null,0], [4,1,2]', expected: 'false', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Double recursion: \`isSubtree\` checks every node in \`root\` as a potential match; helper \`isSame\` verifies exact matching from that node.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-7',
    slug: 'lowest-common-ancestor-of-a-binary-search-tree',
    title: 'Lowest Common Ancestor of a Binary Search Tree',
    difficulty: 'MEDIUM',
    category: 'Trees',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 67,
    descriptionMdx: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.`,
    constraints: ['The number of nodes in the tree is in the range [2, 10^5]', '-10^9 <= Node.val <= 10^9', 'All Node.val are unique', 'p != q'],
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
  return null;
}`,
    },
    testCasesJson: [
      { input: '[6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', expected: '6', hidden: false },
      { input: '[6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', expected: '2', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **BST Splitting Property**:
  - If both $p$ and $q$ are greater than current, LCA is in the right subtree.
  - If both are smaller, LCA is in the left subtree.
  - The instant they split (or one equals current), current node is the LCA! $O(H)$ time, $O(1)$ space.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-8',
    slug: 'lowest-common-ancestor-of-a-binary-tree',
    title: 'Lowest Common Ancestor of a Binary Tree',
    difficulty: 'MEDIUM',
    category: 'Trees',
    companyTags: ['Meta', 'Amazon', 'Microsoft', 'Google'],
    orderIndex: 68,
    descriptionMdx: `Given a binary tree, find the lowest common ancestor (LCA) of two given nodes \`p\` and \`q\`.`,
    constraints: ['The number of nodes in the tree is in the range [2, 10^5]', '-10^9 <= Node.val <= 10^9', 'All Node.val are unique', 'p != q'],
    starterCodeJson: {
      python: `def lowestCommonAncestor(root, p, q):
    if not root or root == p or root == q:
        return root
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)
    if left and right:
        return root
    return left or right`,
      javascript: `function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}`,
    },
    testCasesJson: [
      { input: '[3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1', expected: '3', hidden: false },
      { input: '[3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4', expected: '5', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- If current node matches $p$ or $q$, return it immediately.
- If both left and right recursive calls return non-null, this node is their convergence point (LCA).
- Otherwise, bubble up whichever non-null child was found.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-9',
    slug: 'binary-tree-level-order-traversal',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'MEDIUM',
    category: 'Trees',
    companyTags: ['Amazon', 'Meta', 'Google', 'Microsoft'],
    orderIndex: 69,
    descriptionMdx: `Given the \`root\` of a binary tree, return *the level order traversal of its nodes' values*. (i.e., from left to right, level by level).`,
    constraints: ['The number of nodes in the tree is in the range [0, 2000]', '-1000 <= Node.val <= 1000'],
    starterCodeJson: {
      python: `from collections import deque

def levelOrder(root):
    if not root: return []
    res = []
    q = deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)
    return res`,
      javascript: `function levelOrder(root) {
  if (!root) return [];
  const res = [];
  const q = [root];
  while (q.length) {
    const len = q.length;
    const level = [];
    for (let i = 0; i < len; i++) {
      const node = q.shift();
      level.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(level);
  }
  return res;
}`,
    },
    testCasesJson: [
      { input: '[3,9,20,null,null,15,7]', expected: '[[3],[9,20],[15,7]]', hidden: false },
      { input: '[1]', expected: '[[1]]', hidden: false },
      { input: '[]', expected: '[]', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Snapshot Loop**: Loop \`for _ in range(len(q))\` to process all nodes of the current depth level in a single batch before advancing to child nodes.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-10',
    slug: 'binary-tree-right-side-view',
    title: 'Binary Tree Right Side View',
    difficulty: 'MEDIUM',
    category: 'Trees',
    companyTags: ['Meta', 'Amazon'],
    orderIndex: 70,
    descriptionMdx: `Given the \`root\` of a binary tree, imagine yourself standing on the **right side** of it, return the values of the nodes you can see ordered from top to bottom.`,
    constraints: ['The number of nodes in the tree is in the range [0, 100]', '-100 <= Node.val <= 100'],
    starterCodeJson: {
      python: `from collections import deque

def rightSideView(root):
    if not root: return []
    res = []
    q = deque([root])
    while q:
        right_val = None
        for _ in range(len(q)):
            node = q.popleft()
            right_val = node.val
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(right_val)
    return res`,
      javascript: `// BFS taking last node of each level or DFS (right before left)`,
    },
    testCasesJson: [
      { input: '[1,2,3,null,5,null,4]', expected: '[1,3,4]', hidden: false },
      { input: '[1,null,3]', expected: '[1,3]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- In level-order BFS, the last node popped at each depth layer is the visible node from the right!
- Alternatively, DFS with \`right\` visited before \`left\`: record \`node.val\` when \`depth == len(res)\`.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-11',
    slug: 'count-good-nodes-in-binary-tree',
    title: 'Count Good Nodes in Binary Tree',
    difficulty: 'MEDIUM',
    category: 'Trees',
    companyTags: ['Microsoft', 'Amazon'],
    orderIndex: 71,
    descriptionMdx: `Given a binary tree \`root\`, a node *X* in the tree is named **good** if in the path from the root to the node *X*, there are no nodes with a value greater than *X*.

Return the number of **good** nodes in the binary tree.`,
    constraints: ['The number of nodes in the binary tree is in the range [1, 10^5]', '-10^4 <= Node.val <= 10^4'],
    starterCodeJson: {
      python: `def goodNodes(root) -> int:
    def dfs(node, max_val):
        if not node:
            return 0
        good = 1 if node.val >= max_val else 0
        max_val = max(max_val, node.val)
        return good + dfs(node.left, max_val) + dfs(node.right, max_val)
    return dfs(root, root.val)`,
      javascript: `function goodNodes(root) {
  function dfs(node, maxVal) {
    if (!node) return 0;
    const good = node.val >= maxVal ? 1 : 0;
    const nextMax = Math.max(maxVal, node.val);
    return good + dfs(node.left, nextMax) + dfs(node.right, nextMax);
  }
  return dfs(root, root.val);
}`,
    },
    testCasesJson: [
      { input: '[3,1,4,3,null,1,5]', expected: '4', hidden: false },
      { input: '[3,3,null,4,2]', expected: '3', hidden: false },
      { input: '[1]', expected: '1', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Pass down the maximum value encountered so far along the current path.
- If \`node.val >= max_val\`, increment count and update \`max_val\`.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-12',
    slug: 'validate-binary-search-tree',
    title: 'Validate Binary Search Tree',
    difficulty: 'MEDIUM',
    category: 'Trees',
    companyTags: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Bloomberg'],
    orderIndex: 72,
    descriptionMdx: `Given the \`root\` of a binary tree, *determine if it is a valid binary search tree (BST)*.`,
    constraints: ['The number of nodes in the tree is in the range [1, 10^4]', '-2^31 <= Node.val <= 2^31 - 1'],
    starterCodeJson: {
      python: `def isValidBST(root) -> bool:
    def validate(node, low=float('-inf'), high=float('inf')):
        if not node:
            return True
        if not (low < node.val < high):
            return False
        return validate(node.left, low, node.val) and validate(node.right, node.val, high)
    return validate(root)`,
      javascript: `function isValidBST(root) {
  function validate(node, low, high) {
    if (!node) return true;
    if (node.val <= low || node.val >= high) return false;
    return validate(node.left, low, node.val) && validate(node.right, node.val, high);
  }
  return validate(root, -Infinity, Infinity);
}`,
    },
    testCasesJson: [
      { input: '[2,1,3]', expected: 'true', hidden: false },
      { input: '[5,1,4,null,null,3,6]', expected: 'false', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Bounding Interval**: Every node must satisfy $\\text{low} < \\text{val} < \\text{high}$.
- When going left: update upper bound \`high = node.val\`.
- When going right: update lower bound \`low = node.val\`.
- Beware: Checking only \`node.left < node\` is insufficient because all descendant nodes must obey bounds!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-13',
    slug: 'kth-smallest-element-in-a-bst',
    title: 'Kth Smallest Element in a BST',
    difficulty: 'MEDIUM',
    category: 'Trees',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 73,
    descriptionMdx: `Given the \`root\` of a binary search tree, and an integer \`k\`, return *the* \`k\`-th *smallest value (1-indexed) of all the values of the nodes in the tree*.`,
    constraints: ['The number of nodes in the tree is n', '1 <= k <= n <= 10^4', '0 <= Node.val <= 10^4'],
    starterCodeJson: {
      python: `def kthSmallest(root, k: int) -> int:
    stack = []
    curr = root
    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        k -= 1
        if k == 0:
            return curr.val
        curr = curr.right`,
      javascript: `function kthSmallest(root, k) {
  const stack = [];
  let curr = root;
  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    k--;
    if (k === 0) return curr.val;
    curr = curr.right;
  }
}`,
    },
    testCasesJson: [
      { input: '[3,1,4,null,2], k = 1', expected: '1', hidden: false },
      { input: '[5,3,6,2,4,null,null,1], k = 3', expected: '3', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- In-order traversal (Left $\\to$ Root $\\to$ Right) visits BST nodes in strict sorted ascending order.
- Stop iteration the moment $k$ reaches 0! No need to traverse the rest of the tree.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-14',
    slug: 'construct-binary-tree-from-preorder-and-inorder-traversal',
    title: 'Construct Tree from Preorder & Inorder',
    difficulty: 'MEDIUM',
    category: 'Trees',
    companyTags: ['Amazon', 'Meta', 'Microsoft', 'Google'],
    orderIndex: 74,
    descriptionMdx: `Given two integer arrays \`preorder\` and \`inorder\` where \`preorder\` is the preorder traversal of a binary tree and \`inorder\` is the inorder traversal of the same tree, construct and return *the binary tree*.`,
    constraints: ['1 <= preorder.length <= 3000', 'inorder.length == preorder.length', 'All values are unique'],
    starterCodeJson: {
      python: `def buildTree(preorder: list[int], inorder: list[int]):
    idx_map = {val: i for i, val in enumerate(inorder)}
    pre_idx = 0
    def helper(left, right):
        nonlocal pre_idx
        if left > right: return None
        val = preorder[pre_idx]
        pre_idx += 1
        root = TreeNode(val)
        mid = idx_map[val]
        root.left = helper(left, mid - 1)
        root.right = helper(mid + 1, right)
        return root
    return helper(0, len(inorder) - 1)`,
      javascript: `// Hash map on inorder indices + pointer recursion`,
    },
    testCasesJson: [
      { input: '[3,9,20,15,7], [9,3,15,20,7]', expected: '[3,9,20,null,null,15,7]', hidden: false },
      { input: '[-1], [-1]', expected: '[-1]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Preorder always provides the **root** first.
- Inorder splits elements into the **left subtree** and **right subtree** around that root.
- Use a hash map for $O(1)$ inorder index lookups to achieve overall $O(N)$ runtime.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-15',
    slug: 'binary-tree-maximum-path-sum',
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'HARD',
    category: 'Trees',
    companyTags: ['Meta', 'Amazon', 'Google', 'DoorDash'],
    orderIndex: 75,
    descriptionMdx: `A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once.

Given the \`root\` of a binary tree, return *the maximum **path sum** of any non-empty path*.`,
    constraints: ['The number of nodes in the tree is in the range [1, 3 * 10^4]', '-1000 <= Node.val <= 1000'],
    starterCodeJson: {
      python: `def maxPathSum(root) -> int:
    max_sum = float('-inf')
    def dfs(node):
        nonlocal max_sum
        if not node:
            return 0
        left = max(dfs(node.left), 0)
        right = max(dfs(node.right), 0)
        # Path with current node as apex
        max_sum = max(max_sum, node.val + left + right)
        # Return path extending to parent
        return node.val + max(left, right)
    dfs(root)
    return max_sum`,
      javascript: `function maxPathSum(root) {
  let maxSum = -Infinity;
  function dfs(node) {
    if (!node) return 0;
    const left = Math.max(0, dfs(node.left));
    const right = Math.max(0, dfs(node.right));
    maxSum = Math.max(maxSum, node.val + left + right);
    return node.val + Math.max(left, right);
  }
  dfs(root);
  return maxSum;
}`,
    },
    testCasesJson: [
      { input: '[1,2,3]', expected: '6', hidden: false },
      { input: '[-10,9,20,null,null,15,7]', expected: '42', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Subtrees with negative sum should be truncated to \`0\` via \`max(dfs(...), 0)\`.
- A path through node as apex: \`node.val + left + right\`.
- What to return to caller: only one branch can be extended $\\implies$ \`node.val + max(left, right)\`.`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'th-16',
    slug: 'serialize-and-deserialize-binary-tree',
    title: 'Serialize and Deserialize Binary Tree',
    difficulty: 'HARD',
    category: 'Trees',
    companyTags: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Uber'],
    orderIndex: 76,
    descriptionMdx: `Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work.`,
    constraints: ['The number of nodes in the tree is in the range [0, 10^4]', '-1000 <= Node.val <= 1000'],
    starterCodeJson: {
      python: `class Codec:
    def serialize(self, root) -> str:
        vals = []
        def dfs(node):
            if not node:
                vals.append("N")
                return
            vals.append(str(node.val))
            dfs(node.left)
            dfs(node.right)
        dfs(root)
        return ",".join(vals)

    def deserialize(self, data: str):
        vals = iter(data.split(","))
        def dfs():
            val = next(vals)
            if val == "N":
                return None
            node = TreeNode(int(val))
            node.left = dfs()
            node.right = dfs()
            return node
        return dfs()`,
      javascript: `// Preorder traversal with "N" null markers`,
    },
    testCasesJson: [
      { input: '[1,2,3,null,null,4,5]', expected: '[1,2,3,null,null,4,5]', hidden: false },
      { input: '[]', expected: '[]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Preorder with Sentinel Nulls**: Serializing preorder \`[Root, Left, Right]\` with \`"N"\` for null nodes allows unique deterministic reconstruction using an iterator in $O(N)$ time.`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-17',
    slug: 'kth-largest-element-in-an-array',
    title: 'Kth Largest Element in an Array',
    difficulty: 'MEDIUM',
    category: 'Heaps',
    companyTags: ['Meta', 'Amazon', 'Google', 'Microsoft'],
    orderIndex: 77,
    descriptionMdx: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\`-th largest element in the array. Can you solve it in $O(N)$ average time?`,
    constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    starterCodeJson: {
      python: `import heapq

def findKthLargest(nums: list[int], k: int) -> int:
    # Min-heap of size k
    heap = []
    for n in nums:
        heapq.heappush(heap, n)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,
      javascript: `// Min-Heap of size k or QuickSelect partition`,
    },
    testCasesJson: [
      { input: '[3,2,1,5,6,4], k = 2', expected: '5', hidden: false },
      { input: '[3,2,3,1,2,4,5,5,6], k = 4', expected: '4', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Min-Heap of Size $k$**: Keep the $k$ largest elements seen. The root of the min-heap is always the $k$-th largest! Runtime: $O(N \\log k)$, Space: $O(k)$.
- **QuickSelect**: Average $O(N)$ time, $O(1)$ extra space.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-18',
    slug: 'top-k-frequent-elements',
    title: 'Top K Frequent Elements (Heap & Bucket)',
    difficulty: 'MEDIUM',
    category: 'Heaps',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 78,
    descriptionMdx: `Given an integer array \`nums\` and an integer \`k\`, return *the* \`k\` *most frequent elements*. You may return the answer in **any order**.`,
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', 'k is in the range [1, the number of unique elements in the array]'],
    starterCodeJson: {
      python: `from collections import Counter

def topKFrequent(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, freq in count.items():
        buckets[freq].append(num)
    res = []
    for i in range(len(buckets) - 1, 0, -1):
        for num in buckets[i]:
            res.append(num)
            if len(res) == k:
                return res
    return res`,
      javascript: `// Bucket sort indexed by frequency: O(N) linear time`,
    },
    testCasesJson: [
      { input: '[1,1,1,2,2,3], k = 2', expected: '[1,2]', hidden: false },
      { input: '[1], k = 1', expected: '[1]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Bucket Sort by Frequency**: Maximum possible frequency is $N$. Create an array of $N+1$ lists where index represents frequency.
- Scan backwards from $N$ down to 1.
- Total time: strictly $O(N)$ without any comparison sorting!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-19',
    slug: 'find-median-from-data-stream',
    title: 'Find Median from Data Stream',
    difficulty: 'HARD',
    category: 'Heaps',
    companyTags: ['Google', 'Amazon', 'Meta', 'Apple'],
    orderIndex: 79,
    descriptionMdx: `The **median** is the middle value in an ordered integer list.

Implement the \`MedianFinder\` class:
- \`void addNum(int num)\`: Adds the integer \`num\` from the data stream.
- \`double findMedian()\`: Returns the median of all elements so far.`,
    constraints: ['-10^5 <= num <= 10^5', 'At most 5 * 10^4 calls will be made to addNum and findMedian'],
    starterCodeJson: {
      python: `import heapq

class MedianFinder:
    def __init__(self):
        # small is a max-heap (invert signs), large is a min-heap
        self.small = []
        self.large = []

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)
        # Ensure every small <= every large
        if self.small and self.large and (-self.small[0] > self.large[0]):
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        # Balance sizes (len(small) == len(large) or len(small) == len(large) + 1)
        if len(self.small) > len(self.large) + 1:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        if len(self.large) > len(self.small):
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0`,
      javascript: `// Two heaps: MaxHeap for lower half, MinHeap for upper half`,
    },
    testCasesJson: [
      { input: '["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"], [[],[1],[2],[],[3],[]]', expected: '[null,null,null,1.5,null,2.0]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Two Balanced Heaps**:
  - Max-Heap (\`small\`) stores smaller half.
  - Min-Heap (\`large\`) stores larger half.
  - Size difference never exceeds 1.
  - If total elements is odd, top of \`small\` is median. If even, average of both roots!
  - Add: $O(\\log N)$, Query: $O(1)$!`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'th-20',
    slug: 'task-scheduler',
    title: 'Task Scheduler',
    difficulty: 'MEDIUM',
    category: 'Heaps & Greedy',
    companyTags: ['Meta', 'Amazon', 'Google'],
    orderIndex: 80,
    descriptionMdx: `Given a characters array \`tasks\`, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer \`n\` that represents the cooldown period between two **same tasks**.

Return the *least number of units of times* that the CPU will take to finish all the given tasks.`,
    constraints: ['1 <= task.length <= 10^4', 'tasks[i] is uppercase English letter', '0 <= n <= 100'],
    starterCodeJson: {
      python: `from collections import Counter

def leastInterval(tasks: list[str], n: int) -> int:
    count = Counter(tasks)
    max_freq = max(count.values())
    max_count = sum(1 for v in count.values() if v == max_freq)
    # Math formula: (max_freq - 1) * (n + 1) + max_count
    return max(len(tasks), (max_freq - 1) * (n + 1) + max_count)`,
      javascript: `function leastInterval(tasks, n) {
  const map = {};
  for (const t of tasks) map[t] = (map[t] || 0) + 1;
  const maxFreq = Math.max(...Object.values(map));
  const maxCount = Object.values(map).filter(v => v === maxFreq).length;
  return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
}`,
    },
    testCasesJson: [
      { input: '["A","A","A","B","B","B"], n = 2', expected: '8', hidden: false },
      { input: '["A","C","A","B","D","B"], n = 1', expected: '6', hidden: false },
      { input: '["A","A","A","B","B","B"], n = 0', expected: '6', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Greedy Math Slot Trick**:
  - The task with the highest frequency \`max_freq\` dictates the structure:
    it forms $(max\\_freq - 1)$ chunk frames of length $(n + 1)$.
  - The final frame holds only the tasks with this highest frequency.
  - Formula: $\\max(\\text{len}(tasks), (max\\_freq - 1) \\times (n + 1) + max\\_count)$.
  - Solves in $O(N)$ without simulating heap ticks!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-21',
    slug: 'k-closest-points-to-origin',
    title: 'K Closest Points to Origin',
    difficulty: 'MEDIUM',
    category: 'Heaps',
    companyTags: ['Amazon', 'Meta', 'Google'],
    orderIndex: 81,
    descriptionMdx: `Given an array of \`points\` where \`points[i] = [xi, yi]\` represents a point on the X-Y plane and an integer \`k\`, return the \`k\` closest points to the origin \`(0, 0)\`.`,
    constraints: ['1 <= k <= points.length <= 10^4', '-10^4 <= xi, yi <= 10^4'],
    starterCodeJson: {
      python: `import heapq

def kClosest(points: list[list[int]], k: int) -> list[list[int]]:
    # Max-heap of size k storing (-dist, point)
    max_heap = []
    for x, y in points:
        dist = -(x*x + y*y)
        heapq.heappush(max_heap, (dist, [x, y]))
        if len(max_heap) > k:
            heapq.heappop(max_heap)
    return [p for _, p in max_heap]`,
      javascript: `// Max heap or Quickselect on Euclidean squared distance`,
    },
    testCasesJson: [
      { input: '[[1,3],[-2,2]], k = 1', expected: '[[-2,2]]', hidden: false },
      { input: '[[3,3],[5,-1],[-2,4]], k = 2', expected: '[[3,3],[-2,4]]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Avoid square root: compare $x^2 + y^2$.
- Max-heap of size $k$ maintains the $k$ smallest distances in $O(N \\log k)$ time and $O(k)$ space.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-22',
    slug: 'last-stone-weight',
    title: 'Last Stone Weight',
    difficulty: 'EASY',
    category: 'Heaps',
    companyTags: ['Amazon'],
    orderIndex: 82,
    descriptionMdx: `You are given an array of integers \`stones\` where \`stones[i]\` is the weight of the \`i\`-th stone.

We play a game with the stones. On each turn, we choose the **heaviest two stones** and smash them together. If $x == y$, both stones are destroyed. If $x < y$, stone $x$ is destroyed and stone $y$ has new weight $y - x$. Return the weight of the last remaining stone or 0.`,
    constraints: ['1 <= stones.length <= 30', '1 <= stones[i] <= 1000'],
    starterCodeJson: {
      python: `import heapq

def lastStoneWeight(stones: list[int]) -> int:
    heap = [-s for s in stones]
    heapq.heapify(heap)
    while len(heap) > 1:
        s1 = -heapq.heappop(heap)
        s2 = -heapq.heappop(heap)
        if s1 != s2:
            heapq.heappush(heap, -(s1 - s2))
    return -heap[0] if heap else 0`,
      javascript: `// Max heap simulation with negative values in MinHeap`,
    },
    testCasesJson: [
      { input: '[2,7,4,1,8,1]', expected: '1', hidden: false },
      { input: '[1]', expected: '1', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Store negative stone weights in Python's \`heapq\` to create a Max-Heap.
- Pop top 2, if unequal, push difference back. $O(N \\log N)$ simulation.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-23',
    slug: 'implement-trie-prefix-tree',
    title: 'Implement Trie (Prefix Tree)',
    difficulty: 'MEDIUM',
    category: 'Tries',
    companyTags: ['Amazon', 'Google', 'Microsoft', 'Meta'],
    orderIndex: 83,
    descriptionMdx: `A **trie** (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.

Implement the Trie class:
- \`Trie()\`: Initializes the trie object.
- \`void insert(String word)\`: Inserts the string \`word\` into the trie.
- \`boolean search(String word)\`: Returns true if string \`word\` is in the trie.
- \`boolean startsWith(String prefix)\`: Returns true if there is a previously inserted string \`word\` that has the prefix.`,
    constraints: ['1 <= word.length, prefix.length <= 2000', 'word and prefix consist only of lowercase English letters', 'At most 3 * 10^4 calls in total'],
    starterCodeJson: {
      python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for c in word:
            if c not in curr.children:
                curr.children[c] = TrieNode()
            curr = curr.children[c]
        curr.is_word = True

    def search(self, word: str) -> bool:
        curr = self.root
        for c in word:
            if c not in curr.children:
                return False
            curr = curr.children[c]
        return curr.is_word

    def startsWith(self, prefix: str) -> bool:
        curr = self.root
        for c in prefix:
            if c not in curr.children:
                return False
            curr = curr.children[c]
        return True`,
      javascript: `class TrieNode {
  constructor() {
    this.children = {};
    this.isWord = false;
  }
}
class Trie {
  constructor() { this.root = new TrieNode(); }
  insert(word) {
    let curr = this.root;
    for (const c of word) {
      if (!curr.children[c]) curr.children[c] = new TrieNode();
      curr = curr.children[c];
    }
    curr.isWord = true;
  }
  search(word) {
    let curr = this.root;
    for (const c of word) {
      if (!curr.children[c]) return false;
      curr = curr.children[c];
    }
    return curr.isWord;
  }
  startsWith(prefix) {
    let curr = this.root;
    for (const c of prefix) {
      if (!curr.children[c]) return false;
      curr = curr.children[c];
    }
    return true;
  }
}`,
    },
    testCasesJson: [
      { input: '["Trie", "insert", "search", "search", "startsWith", "insert", "search"], [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]', expected: '[null, null, true, false, true, null, true]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Each Trie node contains a map of character children and a boolean flag \`is_word\`.
- Both \`search\` and \`startsWith\` take $O(L)$ time where $L$ is word length.
- The only difference: \`search\` requires \`curr.is_word == True\`, while \`startsWith\` only requires traversal to succeed.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-24',
    slug: 'design-add-and-search-words-data-structure',
    title: 'Design Add and Search Words (Wildcard Trie)',
    difficulty: 'MEDIUM',
    category: 'Tries',
    companyTags: ['Meta', 'Amazon'],
    orderIndex: 84,
    descriptionMdx: `Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement \`WordDictionary\` with \`addWord(word)\` and \`search(word)\` where \`word\` in search may contain \`'.'\` to represent any one letter.`,
    constraints: ['1 <= word.length <= 25', 'word in addWord consists of lowercase English letters', 'word in search consists of \'.\' or lowercase English letters'],
    starterCodeJson: {
      python: `class WordDictionary:
    def __init__(self):
        self.root = {}

    def addWord(self, word: str) -> None:
        curr = self.root
        for c in word:
            curr = curr.setdefault(c, {})
        curr['#'] = True

    def search(self, word: str) -> bool:
        def dfs(node, i):
            if i == len(word):
                return '#' in node
            if word[i] == '.':
                for k, child in node.items():
                    if k != '#' and dfs(child, i + 1):
                        return True
                return False
            if word[i] in node:
                return dfs(node[word[i]], i + 1)
            return False
        return dfs(self.root, 0)`,
      javascript: `// Trie DFS matching '.' against any key`,
    },
    testCasesJson: [
      { input: '["WordDictionary","addWord","addWord","addWord","search","search","search","search"], [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]', expected: '[null,null,null,null,false,true,true,true]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- When encountering \`'.'\`, branch across all existing children via DFS!
- Dict-based nested trie representation (\`curr.setdefault(c, {})\`) requires zero custom class overhead.`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'th-25',
    slug: 'word-search-ii',
    title: 'Word Search II (Trie + Backtracking)',
    difficulty: 'HARD',
    category: 'Tries & Backtracking',
    companyTags: ['Amazon', 'Microsoft', 'Google', 'Meta'],
    orderIndex: 85,
    descriptionMdx: `Given an \`m x n\` \`board\` of characters and a list of strings \`words\`, return *all words on the board*.

Each word must be constructed from letters of sequentially adjacent cells (horizontally or vertically neighboring). The same letter cell may not be used more than once in a word.`,
    constraints: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 12', '1 <= words.length <= 3 * 10^4', '1 <= words[i].length <= 10'],
    starterCodeJson: {
      python: `def findWords(board: list[list[str]], words: list[str]) -> list[str]:
    # Build Trie
    trie = {}
    for w in words:
        curr = trie
        for c in w:
            curr = curr.setdefault(c, {})
        curr['$'] = w # store completed word directly

    R, C = len(board), len(board[0])
    res = []

    def dfs(r, c, parent):
        char = board[r][c]
        curr = parent[char]
        if '$' in curr:
            res.append(curr.pop('$')) # Avoid duplicate additions
        board[r][c] = '#' # mark visited
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < R and 0 <= nc < C and board[nr][nc] in curr:
                dfs(nr, nc, curr)
        board[r][c] = char

    for r in range(R):
        for c in range(C):
            if board[r][c] in trie:
                dfs(r, c, trie)
    return res`,
      javascript: `// Trie pruning + 2D DFS backtracking`,
    },
    testCasesJson: [
      { input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]', expected: '["eat","oath"]', hidden: false },
      { input: 'board = [["a","b"],["c","d"]], words = ["abcd"]', expected: '[]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Store the full word at Trie leaf node**: Avoids rebuilding string via accumulator during DFS!
- **Trie Pruning / Popping**: Pop \`'$'\` immediately upon discovery to prevent duplicate entries and prune useless branches.`,
    timeLimitMs: 2500,
    memoryLimitMb: 256,
  },
  {
    id: 'th-26',
    slug: 'reorganize-string',
    title: 'Reorganize String',
    difficulty: 'MEDIUM',
    category: 'Heaps & Greedy',
    companyTags: ['Meta', 'Amazon', 'Google'],
    orderIndex: 86,
    descriptionMdx: `Given a string \`s\`, rearrange the characters of \`s\` so that any two adjacent characters are not the same.

Return *any possible rearrangement of* \`s\` *or return* \`""\` *if not possible*.`,
    constraints: ['1 <= s.length <= 500', 's consists of lowercase English letters'],
    starterCodeJson: {
      python: `from collections import Counter
import heapq

def reorganizeString(s: str) -> str:
    count = Counter(s)
    max_heap = [(-cnt, char) for char, cnt in count.items()]
    heapq.heapify(max_heap)
    res = []
    prev_cnt, prev_char = 0, ""
    while max_heap:
        cnt, char = heapq.heappop(max_heap)
        res.append(char)
        if prev_cnt < 0:
            heapq.heappush(max_heap, (prev_cnt, prev_char))
        prev_cnt, prev_char = cnt + 1, char
    ans = "".join(res)
    return ans if len(ans) == len(s) else ""`,
      javascript: `// Max heap pairing adjacent distinct chars`,
    },
    testCasesJson: [
      { input: '"aab"', expected: '"aba"', hidden: false },
      { input: '"aaab"', expected: '""', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Greedy choice with Max-Heap: always pop the character with highest remaining frequency.
- Hold the previous character in a temporary variable so it cannot be placed next to itself. Push it back on the next round!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-27',
    slug: 'path-sum',
    title: 'Path Sum',
    difficulty: 'EASY',
    category: 'Trees',
    companyTags: ['Amazon', 'Microsoft'],
    orderIndex: 87,
    descriptionMdx: `Given the \`root\` of a binary tree and an integer \`targetSum\`, return \`true\` if the tree has a **root-to-leaf** path such that adding up all the values along the path equals \`targetSum\`.`,
    constraints: ['The number of nodes in the tree is in the range [0, 5000]', '-1000 <= Node.val <= 1000', '-1000 <= targetSum <= 1000'],
    starterCodeJson: {
      python: `def hasPathSum(root, targetSum: int) -> bool:
    if not root:
        return False
    if not root.left and not root.right:
        return root.val == targetSum
    return (hasPathSum(root.left, targetSum - root.val) or 
            hasPathSum(root.right, targetSum - root.val))`,
      javascript: `function hasPathSum(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) return root.val === targetSum;
  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
}`,
    },
    testCasesJson: [
      { input: '[5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22', expected: 'true', hidden: false },
      { input: '[1,2,3], targetSum = 5', expected: 'false', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Subtract \`root.val\` from target at each level.
- Check leaf condition: \`not root.left and not root.right\`.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-28',
    slug: 'binary-tree-zigzag-level-order-traversal',
    title: 'Binary Tree Zigzag Level Order Traversal',
    difficulty: 'MEDIUM',
    category: 'Trees',
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    orderIndex: 88,
    descriptionMdx: `Given the \`root\` of a binary tree, return *the zigzag level order traversal of its nodes' values*. (i.e., from left to right, then right to left for the next level and alternate between).`,
    constraints: ['The number of nodes in the tree is in the range [0, 2000]', '-100 <= Node.val <= 100'],
    starterCodeJson: {
      python: `from collections import deque

def zigzagLevelOrder(root):
    if not root: return []
    res = []
    q = deque([root])
    left_to_right = True
    while q:
        level = deque()
        for _ in range(len(q)):
            node = q.popleft()
            if left_to_right:
                level.append(node.val)
            else:
                level.appendleft(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(list(level))
        left_to_right = not left_to_right
    return res`,
      javascript: `// Deque appending or unshifting based on flag`,
    },
    testCasesJson: [
      { input: '[3,9,20,null,null,15,7]', expected: '[[3],[20,9],[15,7]]', hidden: false },
      { input: '[1]', expected: '[[1]]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Standard BFS queue for traversal, but use a double-ended queue (\`deque\`) for the current level's results.
- If \`left_to_right == False\`, append elements to front (\`appendleft\`) in $O(1)$.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-29',
    slug: 'flatten-binary-tree-to-linked-list',
    title: 'Flatten Binary Tree to Linked List',
    difficulty: 'MEDIUM',
    category: 'Trees',
    companyTags: ['Meta', 'Amazon', 'Microsoft'],
    orderIndex: 89,
    descriptionMdx: `Given the \`root\` of a binary tree, flatten the tree into a "linked list":
- The "linked list" should use the same \`TreeNode\` class where the \`right\` child pointer points to the next node, and \`left\` child pointer is always \`null\`.
- The "linked list" should be in the same order as a **pre-order traversal** of the binary tree.`,
    constraints: ['The number of nodes in the tree is in the range [0, 2000]', '-100 <= Node.val <= 100'],
    starterCodeJson: {
      python: `def flatten(root) -> None:
    curr = root
    while curr:
        if curr.left:
            # Find predecessor
            prev = curr.left
            while prev.right:
                prev = prev.right
            # Rewire
            prev.right = curr.right
            curr.right = curr.left
            curr.left = None
        curr = curr.right`,
      javascript: `function flatten(root) {
  let curr = root;
  while (curr) {
    if (curr.left) {
      let prev = curr.left;
      while (prev.right) prev = prev.right;
      prev.right = curr.right;
      curr.right = curr.left;
      curr.left = null;
    }
    curr = curr.right;
  }
}`,
    },
    testCasesJson: [
      { input: '[1,2,5,3,4,null,6]', expected: '[1,null,2,null,3,null,4,null,5,null,6]', hidden: false },
      { input: '[]', expected: '[]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Morris Traversal In-Place $O(1)$ Space**:
  - For each node with a left child, find the rightmost node of that left subtree (its in-order predecessor).
  - Connect predecessor's \`right\` to \`curr.right\`.
  - Move left child to \`curr.right\` and set \`curr.left = None\`.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'th-30',
    slug: 'merge-k-sorted-arrays',
    title: 'Merge K Sorted Arrays',
    difficulty: 'MEDIUM',
    category: 'Heaps',
    companyTags: ['Google', 'Amazon', 'Bloomberg'],
    orderIndex: 90,
    descriptionMdx: `Given \`k\` sorted arrays of possibly different sizes, merge them and return the sorted output.`,
    constraints: ['1 <= k <= 1000', '1 <= total elements <= 10^5'],
    starterCodeJson: {
      python: `import heapq

def mergeKSortedArrays(arrays: list[list[int]]) -> list[int]:
    heap = [] # (val, array_idx, element_idx)
    for i, arr in enumerate(arrays):
        if arr:
            heapq.heappush(heap, (arr[0], i, 0))
    res = []
    while heap:
        val, arr_i, elem_i = heapq.heappop(heap)
        res.append(val)
        if elem_i + 1 < len(arrays[arr_i]):
            heapq.heappush(heap, (arrays[arr_i][elem_i + 1], arr_i, elem_i + 1))
    return res`,
      javascript: `// Min-heap tracking array index and position`,
    },
    testCasesJson: [
      { input: '[[1, 5, 9], [4, 8, 12], [2, 6, 10], [3, 7, 11]]', expected: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Maintain a Min-Heap containing the head elements of each array: \`(val, array_index, element_index)\`.
- Pop smallest, push next element from that array.
- Runtime: $O(N \\log k)$ where $N$ is total elements and $k$ is number of arrays.`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
];


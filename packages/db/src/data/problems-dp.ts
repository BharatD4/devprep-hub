import { SeedProblem } from '../data';

export const PROBLEMS_DP: SeedProblem[] = [
  {
    id: 'dp-1',
    slug: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'EASY',
    category: 'Dynamic Programming',
    companyTags: ['Amazon', 'Google', 'Apple', 'Meta'],
    orderIndex: 121,
    descriptionMdx: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    constraints: ['1 <= n <= 45'],
    starterCodeJson: {
      python: `def climbStairs(n: int) -> int:
    one, two = 1, 1
    for _ in range(n - 1):
        one, two = one + two, one
    return one`,
      javascript: `function climbStairs(n) {
  let a = 1, b = 1;
  for (let i = 0; i < n - 1; i++) {
    const temp = a + b;
    b = a;
    a = temp;
  }
  return a;
}`,
    },
    testCasesJson: [
      { input: '2', expected: '2', hidden: false },
      { input: '3', expected: '3', hidden: false },
      { input: '5', expected: '8', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Classic Fibonacci recurrence: $dp[i] = dp[i-1] + dp[i-2]$.
- Maintain two running variables for $O(N)$ time and $O(1)$ space.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-2',
    slug: 'min-cost-climbing-stairs',
    title: 'Min Cost Climbing Stairs',
    difficulty: 'EASY',
    category: 'Dynamic Programming',
    companyTags: ['Amazon'],
    orderIndex: 122,
    descriptionMdx: `You are given an integer array \`cost\` where \`cost[i]\` is the cost of \`i\`-th step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index \`0\`, or the step with index \`1\`. Return *the minimum cost to reach the top of the floor*.`,
    constraints: ['2 <= cost.length <= 1000', '0 <= cost[i] <= 999'],
    starterCodeJson: {
      python: `def minCostClimbingStairs(cost: list[int]) -> int:
    n = len(cost)
    for i in range(2, n):
        cost[i] += min(cost[i - 1], cost[i - 2])
    return min(cost[n - 1], cost[n - 2])`,
      javascript: `function minCostClimbingStairs(cost) {
  for (let i = 2; i < cost.length; i++) {
    cost[i] += Math.min(cost[i - 1], cost[i - 2]);
  }
  return Math.min(cost[cost.length - 1], cost[cost.length - 2]);
}`,
    },
    testCasesJson: [
      { input: '[10,15,20]', expected: '15', hidden: false },
      { input: '[1,100,1,1,1,100,1,1,100,1]', expected: '6', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- In-place DP: \`cost[i] += min(cost[i-1], cost[i-2])\`.
- Answer is \`min(cost[-1], cost[-2])\`. $O(1)$ space.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-3',
    slug: 'house-robber',
    title: 'House Robber',
    difficulty: 'MEDIUM',
    category: 'Dynamic Programming',
    companyTags: ['Amazon', 'Google', 'Meta', 'Apple'],
    orderIndex: 123,
    descriptionMdx: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected that will automatically contact the police if two adjacent houses were broken into on the same night.

Return the maximum amount of money you can rob tonight without alerting the police.`,
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'],
    starterCodeJson: {
      python: `def rob(nums: list[int]) -> int:
    rob1, rob2 = 0, 0
    for n in nums:
        temp = max(n + rob1, rob2)
        rob1 = rob2
        rob2 = temp
    return rob2`,
      javascript: `function rob(nums) {
  let rob1 = 0, rob2 = 0;
  for (const n of nums) {
    const temp = Math.max(n + rob1, rob2);
    rob1 = rob2;
    rob2 = temp;
  }
  return rob2;
}`,
    },
    testCasesJson: [
      { input: '[1,2,3,1]', expected: '4', hidden: false },
      { input: '[2,7,9,3,1]', expected: '12', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- State transition: Choice at house $i$ is either rob it (\`n + rob1\`) or skip it (\`rob2\`).
- Keep rolling two values: \`rob2 = max(n + rob1, rob2)\`. $O(1)$ space.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-4',
    slug: 'house-robber-ii',
    title: 'House Robber II (Circular Street)',
    difficulty: 'MEDIUM',
    category: 'Dynamic Programming',
    companyTags: ['Amazon', 'Google', 'Microsoft'],
    orderIndex: 124,
    descriptionMdx: `All houses at this place are arranged in a **circle**. That means the first house is the neighbor of the last one.

Return the maximum amount of money you can rob tonight without alerting the police.`,
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 1000'],
    starterCodeJson: {
      python: `def rob(nums: list[int]) -> int:
    if len(nums) == 1: return nums[0]
    
    def helper(arr):
        r1, r2 = 0, 0
        for n in arr:
            r1, r2 = r2, max(n + r1, r2)
        return r2
        
    return max(helper(nums[:-1]), helper(nums[1:]))`,
      javascript: `// Compare robbing [0..n-2] vs [1..n-1]`,
    },
    testCasesJson: [
      { input: '[2,3,2]', expected: '3', hidden: false },
      { input: '[1,2,3,1]', expected: '4', hidden: false },
      { input: '[1,2,3]', expected: '3', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Because house 0 and house $n-1$ are adjacent, you can never rob both.
- Solve two standard linear House Robber subproblems:
  1. \`nums[0 : n-1]\` (exclude last house)
  2. \`nums[1 : n]\` (exclude first house)
- Result is the maximum of the two!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-5',
    slug: 'longest-palindromic-substring',
    title: 'Longest Palindromic Substring',
    difficulty: 'MEDIUM',
    category: 'Dynamic Programming',
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    orderIndex: 125,
    descriptionMdx: `Given a string \`s\`, return *the longest palindromic substring* in \`s\`.`,
    constraints: ['1 <= s.length <= 1000', 's consist of only digits and English letters'],
    starterCodeJson: {
      python: `def longestPalindrome(s: str) -> str:
    res = ""
    for i in range(len(s)):
        # Odd length palindrome
        l, r = i, i
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if (r - l + 1) > len(res):
                res = s[l:r+1]
            l -= 1
            r += 1
        # Even length palindrome
        l, r = i, i + 1
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if (r - l + 1) > len(res):
                res = s[l:r+1]
            l -= 1
            r += 1
    return res`,
      javascript: `// Expand from centers (odd & even)`,
    },
    testCasesJson: [
      { input: '"babad"', expected: '"bab"', hidden: false },
      { input: '"cbbd"', expected: '"bb"', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Expand Around Centers**:
  - There are $2N - 1$ centers (each character for odd palindromes, each space between characters for even palindromes).
  - Expand outwards while \`s[l] == s[r]\`.
  - $O(N^2)$ time with strictly $O(1)$ auxiliary space!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-6',
    slug: 'palindromic-substrings',
    title: 'Palindromic Substrings (Count All)',
    difficulty: 'MEDIUM',
    category: 'Dynamic Programming',
    companyTags: ['Meta', 'Amazon'],
    orderIndex: 126,
    descriptionMdx: `Given a string \`s\`, return *the number of **palindromic substrings** in it*.`,
    constraints: ['1 <= s.length <= 1000', 's consists of lowercase English letters'],
    starterCodeJson: {
      python: `def countSubstrings(s: str) -> int:
    count = 0
    for i in range(len(s)):
        # Odd centers
        l, r = i, i
        while l >= 0 and r < len(s) and s[l] == s[r]:
            count += 1
            l -= 1
            r += 1
        # Even centers
        l, r = i, i + 1
        while l >= 0 and r < len(s) and s[l] == s[r]:
            count += 1
            l -= 1
            r += 1
    return count`,
      javascript: `// Expand around center incrementing count`,
    },
    testCasesJson: [
      { input: '"abc"', expected: '3', hidden: false },
      { input: '"aaa"', expected: '6', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Expand around each of the $2N - 1$ centers. Increment \`count\` on every successful symmetric character match. $O(N^2)$ time, $O(1)$ space.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-7',
    slug: 'decode-ways',
    title: 'Decode Ways',
    difficulty: 'MEDIUM',
    category: 'Dynamic Programming',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 127,
    descriptionMdx: `A message containing letters from A-Z can be encoded into numbers using the mapping 'A' -> "1" ... 'Z' -> "26".

Given a string \`s\` containing only digits, return the **number of ways** to decode it.`,
    constraints: ['1 <= s.length <= 100', 's contains only digits and may contain leading zero(s)'],
    starterCodeJson: {
      python: `def numDecodings(s: str) -> int:
    if not s or s[0] == '0':
        return 0
    dp = [0] * (len(s) + 1)
    dp[0] = 1
    dp[1] = 1
    for i in range(2, len(s) + 1):
        # Single digit decode
        if s[i - 1] != '0':
            dp[i] += dp[i - 1]
        # Two digit decode
        two_digit = int(s[i-2:i])
        if 10 <= two_digit <= 26:
            dp[i] += dp[i - 2]
    return dp[len(s)]`,
      javascript: `// DP checking single digit (1-9) and double digit (10-26)`,
    },
    testCasesJson: [
      { input: '"12"', expected: '2', hidden: false },
      { input: '"226"', expected: '3', hidden: false },
      { input: '"06"', expected: '0', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Two cases at index $i$:
  1. Single digit \`s[i-1] != '0'\` adds \`dp[i-1]\`.
  2. Double digit \`10 <= int(s[i-2:i]) <= 26\` adds \`dp[i-2]\`.
- Immediate \`return 0\` if starts with \`'0'\`.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-8',
    slug: 'coin-change',
    title: 'Coin Change (Fewest Coins)',
    difficulty: 'MEDIUM',
    category: 'Dynamic Programming',
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    orderIndex: 128,
    descriptionMdx: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount cannot be made up by any combination of coins, return \`-1\`. You may assume you have an infinite number of each kind of coin.`,
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
    starterCodeJson: {
      python: `def coinChange(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if a - c >= 0:
                dp[a] = min(dp[a], 1 + dp[a - c])
    return dp[amount] if dp[amount] != float('inf') else -1`,
      javascript: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (a - c >= 0) dp[a] = Math.min(dp[a], 1 + dp[a - c]);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    },
    testCasesJson: [
      { input: '[1,2,5], 11', expected: '3', hidden: false },
      { input: '[2], 3', expected: '-1', hidden: false },
      { input: '[1], 0', expected: '0', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Bottom-Up Unbounded Knapsack**:
  - $dp[a] = \\min_{c \\in coins}(1 + dp[a - c])$.
  - Initialize with $\\infty$ and $dp[0] = 0$.
  - Time Complexity: $O(\\text{amount} \\times |\\text{coins}|)$.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-9',
    slug: 'coin-change-ii',
    title: 'Coin Change II (Number of Ways)',
    difficulty: 'MEDIUM',
    category: 'Dynamic Programming',
    companyTags: ['Amazon', 'Google'],
    orderIndex: 129,
    descriptionMdx: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.`,
    constraints: ['1 <= coins.length <= 300', '1 <= coins[i] <= 5000', '0 <= amount <= 5000'],
    starterCodeJson: {
      python: `def change(amount: int, coins: list[int]) -> int:
    dp = [0] * (amount + 1)
    dp[0] = 1
    for c in coins:
        for a in range(c, amount + 1):
            dp[a] += dp[a - c]
    return dp[amount]`,
      javascript: `// Outer loop on coins to prevent permutations/order duplicates`,
    },
    testCasesJson: [
      { input: '5, [1,2,5]', expected: '4', hidden: false },
      { input: '3, [2]', expected: '0', hidden: false },
      { input: '10, [10]', expected: '1', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Outer Loop on Coins**: To count **combinations** (not permutations), iterate through each coin first, then amount from $c \\to amount$.
- \`dp[a] += dp[a - c]\`. Single 1D array is sufficient!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-10',
    slug: 'maximum-product-subarray',
    title: 'Maximum Product Subarray',
    difficulty: 'MEDIUM',
    category: 'Dynamic Programming',
    companyTags: ['Amazon', 'Google', 'Meta', 'LinkedIn'],
    orderIndex: 130,
    descriptionMdx: `Given an integer array \`nums\`, find a subarray that has the largest product, and return *the product*.`,
    constraints: ['1 <= nums.length <= 2 * 10^4', '-10 <= nums[i] <= 10'],
    starterCodeJson: {
      python: `def maxProduct(nums: list[int]) -> int:
    res = max(nums)
    cur_min, cur_max = 1, 1
    for n in nums:
        if n == 0:
            cur_min, cur_max = 1, 1
            continue
        tmp = cur_max * n
        cur_max = max(n * cur_max, n * cur_min, n)
        cur_min = min(tmp, n * cur_min, n)
        res = max(res, cur_max)
    return res`,
      javascript: `// Track both curMin and curMax because negative * negative = positive`,
    },
    testCasesJson: [
      { input: '[2,3,-2,4]', expected: '6', hidden: false },
      { input: '[-2,0,-1]', expected: '0', hidden: false },
      { input: '[-2,3,-4]', expected: '24', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Track both \`cur_max\` and \`cur_min\` because multiplying a negative number by \`cur_min\` can suddenly produce the maximum product!
- Reset to 1 on zero. $O(N)$ time, $O(1)$ space.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-11',
    slug: 'word-break',
    title: 'Word Break',
    difficulty: 'MEDIUM',
    category: 'Dynamic Programming',
    companyTags: ['Amazon', 'Meta', 'Google', 'Bloomberg'],
    orderIndex: 131,
    descriptionMdx: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.`,
    constraints: ['1 <= s.length <= 300', '1 <= wordDict.length <= 1000', '1 <= wordDict[i].length <= 20'],
    starterCodeJson: {
      python: `def wordBreak(s: str, wordDict: list[str]) -> bool:
    dp = [False] * (len(s) + 1)
    dp[len(s)] = True # base case
    for i in range(len(s) - 1, -1, -1):
        for w in wordDict:
            if (i + len(w)) <= len(s) and s[i : i + len(w)] == w:
                dp[i] = dp[i + len(w)]
            if dp[i]:
                break
    return dp[0]`,
      javascript: `// Bottom-up DP from back of string`,
    },
    testCasesJson: [
      { input: '"leetcode", ["leet","code"]', expected: 'true', hidden: false },
      { input: '"applepenapple", ["apple","pen"]', expected: 'true', hidden: false },
      { input: '"catsandog", ["cats","dog","sand","and","cat"]', expected: 'false', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Bottom-up DP: \`dp[i]\` means substring starting at $i$ can be segmented.
- If \`s[i:i+len(w)] == w\` and \`dp[i+len(w)] == True\`, set \`dp[i] = True\` and break.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-12',
    slug: 'longest-increasing-subsequence',
    title: 'Longest Increasing Subsequence (LIS)',
    difficulty: 'MEDIUM',
    category: 'Dynamic Programming',
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    orderIndex: 132,
    descriptionMdx: `Given an integer array \`nums\`, return the length of the longest strictly increasing subsequence. Can you solve it in $O(N \\log N)$ time?`,
    constraints: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4'],
    starterCodeJson: {
      python: `import bisect

def lengthOfLIS(nums: list[int]) -> int:
    sub = []
    for x in nums:
        idx = bisect.bisect_left(sub, x)
        if idx == len(sub):
            sub.append(x)
        else:
            sub[idx] = x
    return len(sub)`,
      javascript: `// Patience sorting with binary search in O(N log N)`,
    },
    testCasesJson: [
      { input: '[10,9,2,5,3,7,101,18]', expected: '4', hidden: false },
      { input: '[0,1,0,3,2,3]', expected: '4', hidden: false },
      { input: '[7,7,7,7,7,7,7]', expected: '1', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Patience Sorting / Binary Search**:
  - Maintain array \`sub\` where \`sub[i]\` is the smallest tail element of all increasing subsequences of length $i+1$.
  - Use \`bisect_left\` to replace the first element $\\ge x$, or append if larger than all.
  - Length of \`sub\` is the LIS length in $O(N \\log N)$ time!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-13',
    slug: 'partition-equal-subset-sum',
    title: 'Partition Equal Subset Sum (0/1 Knapsack)',
    difficulty: 'MEDIUM',
    category: 'Dynamic Programming',
    companyTags: ['Amazon', 'Meta', 'Google'],
    orderIndex: 133,
    descriptionMdx: `Given an integer array \`nums\`, return \`true\` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or \`false\` otherwise.`,
    constraints: ['1 <= nums.length <= 200', '1 <= nums[i] <= 100'],
    starterCodeJson: {
      python: `def canPartition(nums: list[int]) -> bool:
    total = sum(nums)
    if total % 2 != 0:
        return False
    target = total // 2
    dp = set([0])
    for n in nums:
        dp |= {t + n for t in dp if t + n <= target}
        if target in dp:
            return True
    return target in dp`,
      javascript: `// Set of attainable sums up to target = sum / 2`,
    },
    testCasesJson: [
      { input: '[1,5,11,5]', expected: 'true', hidden: false },
      { input: '[1,2,3,5]', expected: 'false', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Total sum must be even; target sum for each subset is $\\text{sum} / 2$.
- Accumulate attainable subset sums in a set: \`dp |= {t + n for t in dp}\`.
- If \`target in dp\`, return True immediately!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-14',
    slug: 'unique-paths',
    title: 'Unique Paths',
    difficulty: 'MEDIUM',
    category: 'Dynamic Programming',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 134,
    descriptionMdx: `There is a robot on an \`m x n\` grid. The robot is initially located at the top-left corner. The robot tries to move to the bottom-right corner. The robot can only move either down or right at any point in time.

Given the two integers \`m\` and \`n\`, return *the number of possible unique paths*.`,
    constraints: ['1 <= m, n <= 100'],
    starterCodeJson: {
      python: `def uniquePaths(m: int, n: int) -> int:
    row = [1] * n
    for _ in range(m - 1):
        new_row = [1] * n
        for j in range(n - 2, -1, -1):
            new_row[j] = new_row[j + 1] + row[j]
        row = new_row
    return row[0]`,
      javascript: `function uniquePaths(m, n) {
  let row = new Array(n).fill(1);
  for (let i = 0; i < m - 1; i++) {
    for (let j = n - 2; j >= 0; j--) {
      row[j] += row[j + 1];
    }
  }
  return row[0];
}`,
    },
    testCasesJson: [
      { input: '3, 7', expected: '28', hidden: false },
      { input: '3, 2', expected: '3', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Combinatorics
- Combinatorics formula: $\\binom{(m-1) + (n-1)}{m-1} = \\frac{(m+n-2)!}{(m-1)!(n-1)!}$.
- Or 1D rolling array: \`row[j] += row[j + 1]\` in $O(m \\times n)$ time and $O(n)$ space.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-15',
    slug: 'longest-common-subsequence',
    title: 'Longest Common Subsequence (LCS)',
    difficulty: 'MEDIUM',
    category: 'Dynamic Programming',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 135,
    descriptionMdx: `Given two strings \`text1\` and \`text2\`, return *the length of their longest **common subsequence***. If there is no common subsequence, return \`0\`.`,
    constraints: ['1 <= text1.length, text2.length <= 1000', 'text1 and text2 consist of only lowercase English characters'],
    starterCodeJson: {
      python: `def longestCommonSubsequence(text1: str, text2: str) -> int:
    dp = [[0] * (len(text2) + 1) for _ in range(len(text1) + 1)]
    for i in range(len(text1) - 1, -1, -1):
        for j in range(len(text2) - 1, -1, -1):
            if text1[i] == text2[j]:
                dp[i][j] = 1 + dp[i + 1][j + 1]
            else:
                dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])
    return dp[0][0]`,
      javascript: `// 2D DP grid matching characters diagonally or taking max of right/down`,
    },
    testCasesJson: [
      { input: '"abcde", "ace"', expected: '3', hidden: false },
      { input: '"abc", "abc"', expected: '3', hidden: false },
      { input: '"abc", "def"', expected: '0', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- If \`text1[i] == text2[j]\`: match character $\\implies$ \`1 + dp[i+1][j+1]\`.
- Else: take \`max(dp[i+1][j], dp[i][j+1])\`.
- Can be optimized to 1D row memory $O(\\min(N, M))$.`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-16',
    slug: 'edit-distance',
    title: 'Edit Distance (Levenshtein)',
    difficulty: 'HARD',
    category: 'Dynamic Programming',
    companyTags: ['Google', 'Amazon', 'Meta', 'Microsoft'],
    orderIndex: 136,
    descriptionMdx: `Given two strings \`word1\` and \`word2\`, return *the minimum number of operations required to convert* \`word1\` *to* \`word2\`. Allowed operations: Insert, Delete, Replace.`,
    constraints: ['0 <= word1.length, word2.length <= 500', 'word1 and word2 consist of lowercase English letters'],
    starterCodeJson: {
      python: `def minDistance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1): dp[i][0] = i
    for j in range(n + 1): dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j],     # delete
                                   dp[i][j - 1],     # insert
                                   dp[i - 1][j - 1]) # replace
    return dp[m][n]`,
      javascript: `// Classic Levenshtein DP table`,
    },
    testCasesJson: [
      { input: '"horse", "ros"', expected: '3', hidden: false },
      { input: '"intention", "execution"', expected: '5', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- If characters match: \`dp[i][j] = dp[i-1][j-1]\`.
- If distinct: $1 + \\min(\\text{delete } dp[i-1][j], \\text{insert } dp[i][j-1], \\text{replace } dp[i-1][j-1])$.
- Runtime: $O(M \\times N)$.`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-17',
    slug: 'target-sum',
    title: 'Target Sum',
    difficulty: 'MEDIUM',
    category: 'Dynamic Programming',
    companyTags: ['Meta', 'Amazon', 'Google'],
    orderIndex: 137,
    descriptionMdx: `You are given an integer array \`nums\` and an integer \`target\`.

You want to build an expression out of \`nums\` by adding one of the symbols \`'+'\` and \`'-'\` before each integer in \`nums\` and concatenate them. Return the number of different expressions that evaluate to \`target\`.`,
    constraints: ['1 <= nums.length <= 20', '0 <= nums[i] <= 1000', '0 <= sum(nums[i]) <= 1000', '-1000 <= target <= 1000'],
    starterCodeJson: {
      python: `def findTargetSumWays(nums: list[int], target: int) -> int:
    total = sum(nums)
    if (total + target) % 2 != 0 or total < abs(target):
        return 0
    s1 = (total + target) // 2
    dp = [0] * (s1 + 1)
    dp[0] = 1
    for n in nums:
        for a in range(s1, n - 1, -1):
            dp[a] += dp[a - n]
    return dp[s1]`,
      javascript: `// Math reduction: P - N = target, P + N = sum => P = (sum + target) / 2`,
    },
    testCasesJson: [
      { input: '[1,1,1,1,1], 3', expected: '5', hidden: false },
      { input: '[1], 1', expected: '1', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Math Reduction
- Let positive partition sum be $P$ and negative partition sum be $N$.
- $P - N = \\text{target}$ and $P + N = \\text{total}$.
- Adding them: $2P = \\text{total} + \\text{target} \\implies P = (\\text{total} + \\text{target}) / 2$.
- Exactly reduces to Subset Sum counting problem in $O(N \\times P)$ time!`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-18',
    slug: 'burst-balloons',
    title: 'Burst Balloons (Interval DP)',
    difficulty: 'HARD',
    category: 'Dynamic Programming',
    companyTags: ['Google', 'Amazon'],
    orderIndex: 138,
    descriptionMdx: `You are given \`n\` balloons, indexed from \`0\` to \`n - 1\`. Each balloon is painted with a number on it represented by an array \`nums\`. You are asked to burst all the balloons.

If you burst balloon \`i\`, you get \`nums[i - 1] * nums[i] * nums[i + 1]\` coins. Return the maximum coins you can collect.`,
    constraints: ['n == nums.length', '1 <= n <= 300', '0 <= nums[i] <= 100'],
    starterCodeJson: {
      python: `def maxCoins(nums: list[int]) -> int:
    nums = [1] + [n for n in nums if n > 0] + [1]
    n = len(nums)
    dp = [[0] * n for _ in range(n)]
    
    for length in range(2, n):
        for left in range(n - length):
            right = left + length
            for i in range(left + 1, right):
                coins = nums[left] * nums[i] * nums[right] + dp[left][i] + dp[i][right]
                dp[left][right] = max(dp[left][right], coins)
    return dp[0][n - 1]`,
      javascript: `// Interval DP choosing the LAST balloon to burst`,
    },
    testCasesJson: [
      { input: '[3,1,5,8]', expected: '167', hidden: false },
      { input: '[1,5]', expected: '10', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- **Think in Reverse (Last Balloon Bursted)**:
  - If balloon $i$ is chosen to be the *last* balloon bursted in range $(left, right)$, its neighbors are guaranteed to be \`nums[left]\` and \`nums[right]\`!
  - State: $dp[left][right] = \\max_i(nums[left] \\times nums[i] \\times nums[right] + dp[left][i] + dp[i][right])$.
  - Runtime: $O(N^3)$.`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-19',
    slug: 'regular-expression-matching',
    title: 'Regular Expression Matching',
    difficulty: 'HARD',
    category: 'Dynamic Programming',
    companyTags: ['Meta', 'Google', 'Amazon'],
    orderIndex: 139,
    descriptionMdx: `Given an input string \`s\` and a pattern \`p\`, implement regular expression matching with support for \`'.'\` (matches any single character) and \`'*'\` (matches zero or more of the preceding element).`,
    constraints: ['1 <= s.length <= 20', '1 <= p.length <= 20'],
    starterCodeJson: {
      python: `def isMatch(s: str, p: str) -> bool:
    memo = {}
    def dfs(i, j):
        if (i, j) in memo: return memo[(i, j)]
        if i >= len(s) and j >= len(p): return True
        if j >= len(p): return False
        
        match = i < len(s) and (s[i] == p[j] or p[j] == ".")
        if (j + 1) < len(p) and p[j + 1] == "*":
            res = (dfs(i, j + 2) or # use 0 of preceding
                   (match and dfs(i + 1, j))) # use >=1 of preceding
            memo[(i, j)] = res
            return res
            
        if match:
            res = dfs(i + 1, j + 1)
            memo[(i, j)] = res
            return res
            
        memo[(i, j)] = False
        return False
    return dfs(0, 0)`,
      javascript: `// Memoized DFS with wildcard '*' logic`,
    },
    testCasesJson: [
      { input: 's = "aa", p = "a"', expected: 'false', hidden: false },
      { input: 's = "aa", p = "a*"', expected: 'true', hidden: false },
      { input: 's = "ab", p = ".*"', expected: 'true', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- When \`p[j+1] == '*'\`:
  - Choice 1: Don't use character $\\implies$ \`dfs(i, j + 2)\`.
  - Choice 2: If \`match\`, consume 1 character of \`s\` $\\implies$ \`dfs(i + 1, j)\`.
- Memoize with tuple \`(i, j)\`. Runtime: $O(M \\times N)$.`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-20',
    slug: 'subsets',
    title: 'Subsets (Power Set Backtracking)',
    difficulty: 'MEDIUM',
    category: 'Backtracking',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 140,
    descriptionMdx: `Given an integer array \`nums\` of **unique** elements, return *all possible subsets (the power set)*. The solution set must not contain duplicate subsets.`,
    constraints: ['1 <= nums.length <= 10', '-10 <= nums[i] <= 10', 'All the numbers of nums are unique'],
    starterCodeJson: {
      python: `def subsets(nums: list[int]) -> list[list[int]]:
    res = []
    subset = []
    def dfs(i):
        if i >= len(nums):
            res.append(subset.copy())
            return
        # Include nums[i]
        subset.append(nums[i])
        dfs(i + 1)
        # Exclude nums[i]
        subset.pop()
        dfs(i + 1)
    dfs(0)
    return res`,
      javascript: `function subsets(nums) {
  const res = [], sub = [];
  function dfs(i) {
    if (i >= nums.length) { res.push([...sub]); return; }
    sub.push(nums[i]); dfs(i + 1);
    sub.pop(); dfs(i + 1);
  }
  dfs(0); return res;
}`,
    },
    testCasesJson: [
      { input: '[1,2,3]', expected: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]', hidden: false },
      { input: '[0]', expected: '[[],[0]]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Binary decision tree at each index: either **include** \`nums[i]\` or **exclude** \`nums[i]\`.
- Generates all $2^N$ subsets in $O(N \\times 2^N)$ time.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-21',
    slug: 'combination-sum',
    title: 'Combination Sum',
    difficulty: 'MEDIUM',
    category: 'Backtracking',
    companyTags: ['Amazon', 'Google', 'Meta', 'Airbnb'],
    orderIndex: 141,
    descriptionMdx: `Given an array of distinct integers \`candidates\` and a target integer \`target\`, return a list of all unique combinations of \`candidates\` where the chosen numbers sum to \`target\`. You may return the combinations in any order. The same number may be chosen unlimited times.`,
    constraints: ['1 <= candidates.length <= 30', '2 <= candidates[i] <= 40', '1 <= target <= 40'],
    starterCodeJson: {
      python: `def combinationSum(candidates: list[int], target: int) -> list[list[int]]:
    res = []
    def dfs(i, cur, total):
        if total == target:
            res.append(cur.copy())
            return
        if i >= len(candidates) or total > target:
            return
        # Pick candidate[i] (can reuse i)
        cur.append(candidates[i])
        dfs(i, cur, total + candidates[i])
        # Skip candidate[i]
        cur.pop()
        dfs(i + 1, cur, total)
    dfs(0, [], 0)
    return res`,
      javascript: `// DFS choosing to stay at i or advance to i + 1`,
    },
    testCasesJson: [
      { input: '[2,3,6,7], 7', expected: '[[2,2,3],[7]]', hidden: false },
      { input: '[2,3,5], 8', expected: '[[2,2,2,2],[2,3,3],[3,5]]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- When picking \`candidates[i]\`, recurse with the **same index** \`i\` since the number can be reused unlimited times.
- When skipping, advance to \`i + 1\` to prevent duplicate combination sets.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-22',
    slug: 'permutations',
    title: 'Permutations',
    difficulty: 'MEDIUM',
    category: 'Backtracking',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 142,
    descriptionMdx: `Given an array \`nums\` of distinct integers, return *all the possible permutations*. You can return the answer in **any order**.`,
    constraints: ['1 <= nums.length <= 6', '-10 <= nums[i] <= 10', 'All the integers of nums are unique'],
    starterCodeJson: {
      python: `def permute(nums: list[int]) -> list[list[int]]:
    res = []
    def backtrack(curr, remaining):
        if not remaining:
            res.append(curr)
            return
        for i in range(len(remaining)):
            backtrack(curr + [remaining[i]], remaining[:i] + remaining[i+1:])
    backtrack([], nums)
    return res`,
      javascript: `// Recursive backtracking over remaining slice`,
    },
    testCasesJson: [
      { input: '[1,2,3]', expected: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]', hidden: false },
      { input: '[0,1]', expected: '[[0,1],[1,0]]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Pick each element in turn as the next position, and recurse on the remaining $N-1$ elements.
- Produces $N!$ permutations in $O(N \\times N!)$ total time.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-23',
    slug: 'n-queens',
    title: 'N-Queens',
    difficulty: 'HARD',
    category: 'Backtracking',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 143,
    descriptionMdx: `The **n-queens** puzzle is the problem of placing \`n\` queens on an \`n x n\` chessboard such that no two queens attack each other.

Given an integer \`n\`, return *all distinct solutions to the **n-queens puzzle***.`,
    constraints: ['1 <= n <= 9'],
    starterCodeJson: {
      python: `def solveNQueens(n: int) -> list[list[str]]:
    col = set()
    pos_diag = set() # (r + c)
    neg_diag = set() # (r - c)
    res = []
    board = [["."] * n for _ in range(n)]
    
    def backtrack(r):
        if r == n:
            res.append(["".join(row) for row in board])
            return
        for c in range(n):
            if c in col or (r + c) in pos_diag or (r - c) in neg_diag:
                continue
            col.add(c)
            pos_diag.add(r + c)
            neg_diag.add(r - c)
            board[r][c] = "Q"
            
            backtrack(r + 1)
            
            col.remove(c)
            pos_diag.remove(r + c)
            neg_diag.remove(r - c)
            board[r][c] = "."
            
    backtrack(0)
    return res`,
      javascript: `// Diagonal tracking with (r + c) and (r - c) sets`,
    },
    testCasesJson: [
      { input: '4', expected: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]', hidden: false },
      { input: '1', expected: '[["Q"]]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Math Property
- **Diagonal Hash Sets**:
  - Positive diagonal: constant $r + c$.
  - Negative diagonal: constant $r - c$.
  - Column: constant $c$.
  - Placing queen takes $O(1)$ collision check instead of scanning diagonal lines!`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-24',
    slug: 'interleaving-string',
    title: 'Interleaving String',
    difficulty: 'MEDIUM',
    category: 'Dynamic Programming',
    companyTags: ['Amazon', 'Google'],
    orderIndex: 144,
    descriptionMdx: `Given strings \`s1\`, \`s2\`, and \`s3\`, find whether \`s3\` is formed by an **interleaving** of \`s1\` and \`s2\`.`,
    constraints: ['0 <= s1.length, s2.length <= 100', '0 <= s3.length <= 200'],
    starterCodeJson: {
      python: `def isInterleave(s1: str, s2: str, s3: str) -> bool:
    if len(s1) + len(s2) != len(s3):
        return False
    memo = {}
    def dfs(i, j):
        if i == len(s1) and j == len(s2):
            return True
        if (i, j) in memo:
            return memo[(i, j)]
        k = i + j
        res = False
        if i < len(s1) and s1[i] == s3[k] and dfs(i + 1, j):
            res = True
        elif j < len(s2) and s2[j] == s3[k] and dfs(i, j + 1):
            res = True
        memo[(i, j)] = res
        return res
    return dfs(0, 0)`,
      javascript: `// Memoized 2D grid matching s3[i+j]`,
    },
    testCasesJson: [
      { input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"', expected: 'true', hidden: false },
      { input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"', expected: 'false', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- At index $k = i + j$ in \`s3\`, match either \`s1[i]\` or \`s2[j]\`.
- Memoize on \`(i, j)\`. Total distinct states: $(|s_1| + 1) \\times (|s_2| + 1)$.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-25',
    slug: 'best-time-to-buy-and-sell-stock-with-cooldown',
    title: 'Stock with Cooldown (State Machine)',
    difficulty: 'MEDIUM',
    category: 'Dynamic Programming',
    companyTags: ['Amazon', 'Google'],
    orderIndex: 145,
    descriptionMdx: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`-th day.

Find the maximum profit you can achieve. You may complete as many transactions as you like with following restrictions:
- After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).`,
    constraints: ['1 <= prices.length <= 5000', '0 <= prices[i] <= 1000'],
    starterCodeJson: {
      python: `def maxProfit(prices: list[int]) -> int:
    sold = 0
    held = -float('inf')
    reset = 0
    for p in prices:
        prev_sold = sold
        sold = held + p
        held = max(held, reset - p)
        reset = max(reset, prev_sold)
    return max(sold, reset)`,
      javascript: `// 3-state state machine: Sold, Held, Reset`,
    },
    testCasesJson: [
      { input: '[1,2,3,0,2]', expected: '3', hidden: false },
      { input: '[1]', expected: '0', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & State Machine
- **Three Finite States**:
  - \`held\`: currently holding stock $\\to \\max(held, reset - p)$
  - \`sold\`: just sold today $\\to held + p$
  - \`reset\`: in cooldown or resting $\\to \\max(reset, prev\\_sold)$
- $O(N)$ time with $O(1)$ space.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-26',
    slug: 'palindrome-partitioning',
    title: 'Palindrome Partitioning',
    difficulty: 'MEDIUM',
    category: 'Backtracking',
    companyTags: ['Amazon', 'Google', 'Meta', 'Bloomberg'],
    orderIndex: 146,
    descriptionMdx: `Given a string \`s\`, partition \`s\` such that every substring of the partition is a **palindrome**. Return all possible palindrome partitioning of \`s\`.`,
    constraints: ['1 <= s.length <= 16', 's contains only lowercase English letters'],
    starterCodeJson: {
      python: `def partition(s: str) -> list[list[str]]:
    res = []
    part = []
    
    def dfs(i):
        if i >= len(s):
            res.append(part.copy())
            return
        for j in range(i, len(s)):
            sub = s[i:j+1]
            if sub == sub[::-1]:
                part.append(sub)
                dfs(j + 1)
                part.pop()
    dfs(0)
    return res`,
      javascript: `// Backtracking checking palindrome slices`,
    },
    testCasesJson: [
      { input: '"aab"', expected: '[["a","a","b"],["aa","b"]]', hidden: false },
      { input: '"a"', expected: '[["a"]]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Partition string into prefix \`s[i:j+1]\`. If palindrome, push to current partition and recurse on remainder starting at $j + 1$. Backtrack by popping.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-27',
    slug: 'letter-combinations-of-a-phone-number',
    title: 'Letter Combinations of a Phone Number',
    difficulty: 'MEDIUM',
    category: 'Backtracking',
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    orderIndex: 147,
    descriptionMdx: `Given a string containing digits from \`2-9\` inclusive, return all possible letter combinations that the number could represent. Return the answer in **any order**.`,
    constraints: ['0 <= digits.length <= 4', 'digits[i] is a digit in range [\'2\', \'9\']'],
    starterCodeJson: {
      python: `def letterCombinations(digits: str) -> list[str]:
    if not digits: return []
    phone = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    }
    res = []
    def backtrack(i, cur):
        if len(cur) == len(digits):
            res.append(cur)
            return
        for ch in phone[digits[i]]:
            backtrack(i + 1, cur + ch)
    backtrack(0, "")
    return res`,
      javascript: `// Digit to char array phone keypad mapping`,
    },
    testCasesJson: [
      { input: '"23"', expected: '["ad","ae","af","bd","be","bf","cd","ce","cf"]', hidden: false },
      { input: '""', expected: '[]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
- Classic Cartesian product DFS across keypad letter buckets.
- Depth matches string length; leaf nodes form the combination list.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-28',
    slug: 'generate-parentheses',
    title: 'Generate Parentheses',
    difficulty: 'MEDIUM',
    category: 'Backtracking',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 148,
    descriptionMdx: `Given \`n\` pairs of parentheses, write a function to *generate all combinations of well-formed parentheses*.`,
    constraints: ['1 <= n <= 8'],
    starterCodeJson: {
      python: `def generateParenthesis(n: int) -> list[str]:
    res = []
    def backtrack(open_c, close_c, cur):
        if open_c == close_c == n:
            res.append(cur)
            return
        if open_c < n:
            backtrack(open_c + 1, close_c, cur + "(")
        if close_c < open_c:
            backtrack(open_c, close_c + 1, cur + ")")
    backtrack(0, 0, "")
    return res`,
      javascript: `// Backtrack only valid prefixes: open < n, close < open`,
    },
    testCasesJson: [
      { input: '3', expected: '["((()))","(()())","(())()","()(())","()()()"]', hidden: false },
      { input: '1', expected: '["()"]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Invariant
- Two golden pruning rules:
  1. Add \`'('\` if and only if \`open_count < n\`.
  2. Add \`')'\` if and only if \`close_count < open_count\`.
- Never generates an invalid parenthesis string! Total combinations given by the $n$-th Catalan number $C_n = \\frac{1}{n+1} \\binom{2n}{n}$.`,
    timeLimitMs: 1000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-29',
    slug: 'sudoku-solver',
    title: 'Sudoku Solver',
    difficulty: 'HARD',
    category: 'Backtracking',
    companyTags: ['Google', 'Amazon', 'Microsoft'],
    orderIndex: 149,
    descriptionMdx: `Write a program to solve a Sudoku puzzle by filling the empty cells. Empty cells are indicated by the character \`'.'\`.`,
    constraints: ['board.length == 9', 'board[i].length == 9', 'board[i][j] is a digit or \'.\'', 'It is guaranteed that the input board has only one solution'],
    starterCodeJson: {
      python: `def solveSudoku(board: list[list[str]]) -> None:
    def is_valid(r, c, ch):
        for i in range(9):
            if board[r][i] == ch: return False
            if board[i][c] == ch: return False
            if board[3 * (r // 3) + i // 3][3 * (c // 3) + i % 3] == ch: return False
        return True
        
    def solve():
        for r in range(9):
            for c in range(9):
                if board[r][c] == '.':
                    for ch in "123456789":
                        if is_valid(r, c, ch):
                            board[r][c] = ch
                            if solve(): return True
                            board[r][c] = '.'
                    return False
        return True
    solve()`,
      javascript: `// In-place Sudoku backtracking with 3x3 block check`,
    },
    testCasesJson: [
      { input: '9x9 board with standard single solution', expected: 'Solved 9x9 valid Sudoku board', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Box Indexing
- 3x3 sub-box check in a single loop: \`3 * (r // 3) + i // 3\` and \`3 * (c // 3) + i % 3\`.
- Return boolean from recursive function so it halts immediately once the board is filled!`,
    timeLimitMs: 3000,
    memoryLimitMb: 256,
  },
  {
    id: 'dp-30',
    slug: 'wildcard-matching',
    title: 'Wildcard Matching',
    difficulty: 'HARD',
    category: 'Dynamic Programming',
    companyTags: ['Meta', 'Google', 'Amazon'],
    orderIndex: 150,
    descriptionMdx: `Given an input string (\`s\`) and a pattern (\`p\`), implement wildcard pattern matching with support for \`'?'\` (matches any single character) and \`'*'\` (matches any sequence of characters including the empty sequence).`,
    constraints: ['0 <= s.length, p.length <= 2000', 's contains only lowercase English letters', 'p contains only lowercase English letters, \'?\' or \'*\''],
    starterCodeJson: {
      python: `def isMatch(s: str, p: str) -> bool:
    s_idx, p_idx = 0, 0
    star_idx, s_temp = -1, -1
    
    while s_idx < len(s):
        if p_idx < len(p) and (p[p_idx] == '?' or p[p_idx] == s[s_idx]):
            s_idx += 1
            p_idx += 1
        elif p_idx < len(p) and p[p_idx] == '*':
            star_idx = p_idx
            s_temp = s_idx
            p_idx += 1
        elif star_idx != -1:
            p_idx = star_idx + 1
            s_temp += 1
            s_idx = s_temp
        else:
            return False
            
    while p_idx < len(p) and p[p_idx] == '*':
        p_idx += 1
    return p_idx == len(p)`,
      javascript: `// Two-pointer greedy backtrack on '*' in O(1) space`,
    },
    testCasesJson: [
      { input: 's = "aa", p = "a"', expected: 'false', hidden: false },
      { input: 's = "aa", p = "*"', expected: 'true', hidden: false },
      { input: 's = "cb", p = "?a"', expected: 'false', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Greedy Backtracking
- Unlike Regex \`.*\` which binds to a specific character, Wildcard \`*\` matches *any* arbitrary string.
- Record the last seen \`star_idx\` and rollback \`s_idx\` greedily if mismatch occurs.
- Runs in $O(1)$ space and $O(S)$ average time!`,
    timeLimitMs: 1500,
    memoryLimitMb: 256,
  },
];


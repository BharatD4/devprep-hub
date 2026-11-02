import { SeedProblem } from '../data';

export const PROBLEMS_ARRAYS: SeedProblem[] = [
  {
    id: 'arr-1',
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'EASY',
    category: 'Arrays & Hashing',
    companyTags: ['Google', 'Amazon', 'Meta'],
    orderIndex: 1,
    descriptionMdx: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.`,
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9'],
    starterCodeJson: {
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
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
    if (seen.has(diff)) return [seen.get(diff), i];
    seen.set(nums[i], i);
  }
  return [];
}`,
    },
    testCasesJson: [
      { input: '[2,7,11,15], 9', expected: '[0,1]', hidden: false },
      { input: '[3,2,4], 6', expected: '[1,2]', hidden: false },
      { input: '[3,3], 6', expected: '[0,1]', hidden: true },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
Trade auxiliary memory for linear time using a Hash Map. Instead of checking every pair with nested loops ($O(N^2)$), compute the complement \`diff = target - nums[i]\` and check if it already exists in the map in $O(1)$ time.
- **Time Complexity:** O(N)
- **Space Complexity:** O(N)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-2',
    slug: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'EASY',
    category: 'Arrays & Hashing',
    companyTags: ['Uber', 'Meta', 'Amazon'],
    orderIndex: 2,
    descriptionMdx: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.`,
    constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters.'],
    starterCodeJson: {
      python: `def isAnagram(s: str, t: str) -> bool:
    if len(s) != len(t): return False
    count = {}
    for c in s: count[c] = count.get(c, 0) + 1
    for c in t:
        if c not in count or count[c] == 0: return False
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
    editorialMdx: `### 💡 Short Trick: Fixed-Size Array Frequency Counter
Use a 26-size integer array \`freq[26]\`. Increment for \`s\` and decrement for \`t\`. Any non-zero entry indicates disparity.
- **Time Complexity:** O(N)
- **Space Complexity:** O(1) (26 characters)`,
    timeLimitMs: 1500,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-3',
    slug: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'MEDIUM',
    category: 'Arrays & Hashing',
    companyTags: ['Amazon', 'Microsoft', 'Apple'],
    orderIndex: 3,
    descriptionMdx: `Given an array of strings \`strs\`, group the anagrams together. You can return the answer in any order.`,
    constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100', 'strs[i] consists of lowercase letters.'],
    starterCodeJson: {
      python: `from collections import defaultdict
def groupAnagrams(strs: list[str]) -> list[list[str]]:
    groups = defaultdict(list)
    for s in strs:
        key = ''.join(sorted(s))
        groups[key].append(s)
    return list(groups.values())`,
      javascript: `function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return Array.from(map.values());
}`,
    },
    testCasesJson: [
      { input: '["eat","tea","tan","ate","nat","bat"]', expected: '[["bat"],["nat","tan"],["ate","eat","tea"]]', hidden: false },
      { input: '[""]', expected: '[[""]]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick & Intuition
Hash canonical signatures! Either sort each string ($O(K \\log K)$) or build a 26-element tuple of character frequencies as the hash map key ($O(K)$).
- **Time Complexity:** O(N * K) where K is max string length
- **Space Complexity:** O(N * K)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-4',
    slug: 'top-k-frequent-elements',
    title: 'Top K Frequent Elements',
    difficulty: 'MEDIUM',
    category: 'Arrays & Hashing',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 4,
    descriptionMdx: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements. You may return the answer in any order.`,
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', 'k is in range [1, number of unique elements].'],
    starterCodeJson: {
      python: `from collections import Counter
def topKFrequent(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]
    for n, freq in count.items():
        buckets[freq].append(n)
    res = []
    for i in range(len(buckets) - 1, 0, -1):
        for n in buckets[i]:
            res.append(n)
            if len(res) == k:
                return res
    return res`,
      javascript: `function topKFrequent(nums, k) {
  const map = new Map();
  for (const n of nums) map.set(n, (map.get(n) || 0) + 1);
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [n, count] of map.entries()) buckets[count].push(n);
  const res = [];
  for (let i = buckets.length - 1; i > 0 && res.length < k; i--) {
    for (const num of buckets[i]) {
      res.push(num);
      if (res.length === k) return res;
    }
  }
  return res;
}`,
    },
    testCasesJson: [
      { input: '[1,1,1,2,2,3], 2', expected: '[1,2]', hidden: false },
      { input: '[1], 1', expected: '[1]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Bucket Sort by Frequency
Instead of a min-heap which takes $O(N \\log K)$, use Bucket Sort where the index represents frequency (from 0 to N). Iterate backwards from index N to 1 to pick elements in $O(N)$ linear time!
- **Time Complexity:** O(N)
- **Space Complexity:** O(N)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-5',
    slug: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'MEDIUM',
    category: 'Arrays & Hashing',
    companyTags: ['Amazon', 'Apple', 'Meta'],
    orderIndex: 5,
    descriptionMdx: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

You must write an algorithm that runs in **O(n)** time and without using the division operation.`,
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30', 'Product fits in a 32-bit integer.'],
    starterCodeJson: {
      python: `def productExceptSelf(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [1] * n
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
    postfix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= postfix
        postfix *= nums[i]
    return res`,
      javascript: `function productExceptSelf(nums) {
  const n = nums.length;
  const res = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }
  let postfix = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= postfix;
    postfix *= nums[i];
  }
  return res;
}`,
    },
    testCasesJson: [
      { input: '[1,2,3,4]', expected: '[24,12,8,6]', hidden: false },
      { input: '[-1,1,0,-3,3]', expected: '[0,0,9,0,0]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Prefix & Suffix Accumulator
Every \`res[i]\` is the product of everything to its left (prefix) multiplied by everything to its right (postfix). Compute prefix products in the result array, then sweep backwards accumulating postfix into the same array for $O(1)$ extra space!
- **Time:** O(N)
- **Auxiliary Space:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-6',
    slug: 'longest-consecutive-sequence',
    title: 'Longest Consecutive Sequence',
    difficulty: 'MEDIUM',
    category: 'Arrays & Hashing',
    companyTags: ['Google', 'Microsoft', 'Amazon'],
    orderIndex: 6,
    descriptionMdx: `Given an unsorted array of integers \`nums\`, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in **O(n)** time.`,
    constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    starterCodeJson: {
      python: `def longestConsecutive(nums: list[int]) -> int:
    num_set = set(nums)
    longest = 0
    for n in num_set:
        if (n - 1) not in num_set:
            curr = n
            streak = 1
            while (curr + 1) in num_set:
                curr += 1
                streak += 1
            longest = max(longest, streak)
    return longest`,
      javascript: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let maxLen = 0;
  for (const n of set) {
    if (!set.has(n - 1)) {
      let curr = n;
      let streak = 1;
      while (set.has(curr + 1)) {
        curr++;
        streak++;
      }
      maxLen = Math.max(maxLen, streak);
    }
  }
  return maxLen;
}`,
    },
    testCasesJson: [
      { input: '[100,4,200,1,3,2]', expected: '4', hidden: false },
      { input: '[0,3,7,2,5,8,4,6,0,1]', expected: '9', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Start Only At Sequence Roots!
Convert array to Hash Set. An element is the beginning of a sequence **if and only if** \`n - 1\` is NOT in the set! Only start counting up from sequence roots. Each number is visited at most twice.
- **Time:** O(N)
- **Space:** O(N)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-7',
    slug: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'EASY',
    category: 'Two Pointers',
    companyTags: ['Meta', 'Amazon', 'Spotify'],
    orderIndex: 7,
    descriptionMdx: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.`,
    constraints: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters.'],
    starterCodeJson: {
      python: `def isPalindrome(s: str) -> bool:
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum(): l += 1
        while l < r and not s[r].isalnum(): r -= 1
        if s[l].lower() != s[r].lower(): return False
        l += 1
        r -= 1
    return True`,
      javascript: `function isPalindrome(s) {
  let l = 0, r = s.length - 1;
  const isAlphaNum = c => /[a-zA-Z0-9]/.test(c);
  while (l < r) {
    while (l < r && !isAlphaNum(s[l])) l++;
    while (l < r && !isAlphaNum(s[r])) r--;
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l++; r--;
  }
  return true;
}`,
    },
    testCasesJson: [
      { input: '"A man, a plan, a canal: Panama"', expected: 'true', hidden: false },
      { input: '"race a car"', expected: 'false', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Two Pointers Inward Scan
Converge inward with left and right pointers while skipping non-alphanumeric characters in place without allocating extra memory strings.
- **Time:** O(N)
- **Space:** O(1)`,
    timeLimitMs: 1500,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-8',
    slug: 'two-sum-ii-input-array-is-sorted',
    title: 'Two Sum II - Input Array Is Sorted',
    difficulty: 'MEDIUM',
    category: 'Two Pointers',
    companyTags: ['Amazon', 'Google'],
    orderIndex: 8,
    descriptionMdx: `Given a 1-indexed array of integers \`numbers\` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific \`target\` number.`,
    constraints: ['2 <= numbers.length <= 3 * 10^4', '-1000 <= numbers[i] <= 1000', 'numbers is sorted.'],
    starterCodeJson: {
      python: `def twoSum(numbers: list[int], target: int) -> list[int]:
    l, r = 0, len(numbers) - 1
    while l < r:
        curr = numbers[l] + numbers[r]
        if curr == target: return [l + 1, r + 1]
        elif curr < target: l += 1
        else: r -= 1
    return []`,
      javascript: `function twoSum(numbers, target) {
  let l = 0, r = numbers.length - 1;
  while (l < r) {
    const sum = numbers[l] + numbers[r];
    if (sum === target) return [l + 1, r + 1];
    if (sum < target) l++;
    else r--;
  }
  return [];
}`,
    },
    testCasesJson: [
      { input: '[2,7,11,15], 9', expected: '[1,2]', hidden: false },
      { input: '[2,3,4], 6', expected: '[1,3]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Sorted Boundary Convergence
Because the array is sorted, if \`sum < target\`, the only way to increase the sum is to increment \`left\`. If \`sum > target\`, decrement \`right\`.
- **Time:** O(N)
- **Space:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-9',
    slug: '3sum',
    title: '3Sum',
    difficulty: 'MEDIUM',
    category: 'Two Pointers',
    companyTags: ['Meta', 'Amazon', 'Google'],
    orderIndex: 9,
    descriptionMdx: `Given an integer array nums, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j != k\` and \`nums[i] + nums[j] + nums[k] == 0\`. No duplicate triplets allowed.`,
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    starterCodeJson: {
      python: `def threeSum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]: continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            total = nums[i] + nums[l] + nums[r]
            if total == 0:
                res.append([nums[i], nums[l], nums[r]])
                while l < r and nums[l] == nums[l+1]: l += 1
                while l < r and nums[r] == nums[r-1]: r -= 1
                l += 1
                r -= 1
            elif total < 0: l += 1
            else: r -= 1
    return res`,
      javascript: `function threeSum(nums) {
  nums.sort((a,b)=>a-b);
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
    ],
    editorialMdx: `### 💡 Short Trick: Sort + Deduping Two-Pointer
Sort the array. Fix the first element \`nums[i]\` and run Two Sum II with \`target = -nums[i]\`. Skip duplicates for both \`i\`, \`l\`, and \`r\` to avoid duplicate triplets without allocating an expensive set.
- **Time:** O(N^2)
- **Space:** O(1) auxiliary`,
    timeLimitMs: 2500,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-10',
    slug: 'container-with-most-water',
    title: 'Container With Most Water',
    difficulty: 'MEDIUM',
    category: 'Two Pointers',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 10,
    descriptionMdx: `Given an integer array \`height\` of length \`n\`, find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.`,
    constraints: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
    starterCodeJson: {
      python: `def maxArea(height: list[int]) -> int:
    l, r = 0, len(height) - 1
    max_w = 0
    while l < r:
        w = r - l
        h = min(height[l], height[r])
        max_w = max(max_w, w * h)
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    return max_w`,
      javascript: `function maxArea(height) {
  let l = 0, r = height.length - 1;
  let maxW = 0;
  while (l < r) {
    const area = (r - l) * Math.min(height[l], height[r]);
    maxW = Math.max(maxW, area);
    if (height[l] < height[r]) l++;
    else r--;
  }
  return maxW;
}`,
    },
    testCasesJson: [
      { input: '[1,8,6,2,5,4,8,3,7]', expected: '49', hidden: false },
      { input: '[1,1]', expected: '1', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Greedy Pointer Elimination
Area is bounded by the shorter line: \`Area = (r - l) * min(h[l], h[r])\`. Moving the taller line inward could only reduce width without increasing the bottleneck height! Always increment/decrement the shorter boundary.
- **Time:** O(N)
- **Space:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-11',
    slug: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'HARD',
    category: 'Two Pointers',
    companyTags: ['Google', 'Amazon', 'Goldman Sachs'],
    orderIndex: 11,
    descriptionMdx: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
    starterCodeJson: {
      python: `def trap(height: list[int]) -> int:
    if not height: return 0
    l, r = 0, len(height) - 1
    left_max, right_max = height[l], height[r]
    water = 0
    while l < r:
        if left_max < right_max:
            l += 1
            left_max = max(left_max, height[l])
            water += left_max - height[l]
        else:
            r -= 1
            right_max = max(right_max, height[r])
            water += right_max - height[r]
    return water`,
      javascript: `function trap(height) {
  let l = 0, r = height.length - 1;
  let leftMax = height[l], rightMax = height[r];
  let water = 0;
  while (l < r) {
    if (leftMax < rightMax) {
      l++;
      leftMax = Math.max(leftMax, height[l]);
      water += leftMax - height[l];
    } else {
      r--;
      rightMax = Math.max(rightMax, height[r]);
      water += rightMax - height[r];
    }
  }
  return water;
}`,
    },
    testCasesJson: [
      { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6', hidden: false },
      { input: '[4,2,0,3,2,5]', expected: '9', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Two-Pointer Water Bottleneck
Water at index \`i\` is \`min(max_left, max_right) - height[i]\`. Using two pointers, if \`left_max < right_max\`, we are guaranteed that \`left_max\` is the true bottleneck, so we can process \`l\` without caring about exact higher barriers to the right!
- **Time:** O(N)
- **Space:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-12',
    slug: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'EASY',
    category: 'Sliding Window',
    companyTags: ['Amazon', 'Apple', 'Google'],
    orderIndex: 12,
    descriptionMdx: `You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock. Return maximum profit.`,
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    starterCodeJson: {
      python: `def maxProfit(prices: list[int]) -> int:
    min_p, max_profit = float('inf'), 0
    for p in prices:
        if p < min_p: min_p = p
        elif p - min_p > max_profit: max_profit = p - min_p
    return max_profit`,
      javascript: `function maxProfit(prices) {
  let minP = Infinity, maxProfit = 0;
  for (const p of prices) {
    if (p < minP) minP = p;
    else if (p - minP > maxProfit) maxProfit = p - minP;
  }
  return maxProfit;
}`,
    },
    testCasesJson: [
      { input: '[7,1,5,3,6,4]', expected: '5', hidden: false },
      { input: '[7,6,4,3,1]', expected: '0', hidden: false },
    ],
    editorialMdx: `Track lowest price seen so far and greedily update max profit.
- **Time:** O(N)
- **Space:** O(1)`,
    timeLimitMs: 1500,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-13',
    slug: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'MEDIUM',
    category: 'Sliding Window',
    companyTags: ['Google', 'Amazon', 'Microsoft'],
    orderIndex: 13,
    descriptionMdx: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    starterCodeJson: {
      python: `def lengthOfLongestSubstring(s: str) -> int:
    last_idx = {}
    l, max_len = 0, 0
    for r, c in enumerate(s):
        if c in last_idx and last_idx[c] >= l:
            l = last_idx[c] + 1
        last_idx[c] = r
        max_len = max(max_len, r - l + 1)
    return max_len`,
      javascript: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let l = 0, maxLen = 0;
  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    if (map.has(c) && map.get(c) >= l) {
      l = map.get(c) + 1;
    }
    map.set(c, r);
    maxLen = Math.max(maxLen, r - l + 1);
  }
  return maxLen;
}`,
    },
    testCasesJson: [
      { input: '"abcabcbb"', expected: '3', hidden: false },
      { input: '"bbbbb"', expected: '1', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Jump Left Pointer on Collision
Store last seen index of each character. When duplicate character is found at \`r\`, fast-forward \`l = last_seen[c] + 1\` without stepping one-by-one!
- **Time:** O(N)
- **Space:** O(min(m, n))`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-14',
    slug: 'longest-repeating-character-replacement',
    title: 'Longest Repeating Character Replacement',
    difficulty: 'MEDIUM',
    category: 'Sliding Window',
    companyTags: ['Google', 'Amazon'],
    orderIndex: 14,
    descriptionMdx: `You are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character at most \`k\` times. Return the length of the longest substring containing the same letter you can get.`,
    constraints: ['1 <= s.length <= 10^5', 's consists of only uppercase English letters.', '0 <= k <= s.length'],
    starterCodeJson: {
      python: `def characterReplacement(s: str, k: int) -> int:
    counts = {}
    l, max_freq, max_len = 0, 0, 0
    for r in range(len(s)):
        counts[s[r]] = counts.get(s[r], 0) + 1
        max_freq = max(max_freq, counts[s[r]])
        while (r - l + 1) - max_freq > k:
            counts[s[l]] -= 1
            l += 1
        max_len = max(max_len, r - l + 1)
    return max_len`,
      javascript: `function characterReplacement(s, k) {
  const counts = {};
  let l = 0, maxFreq = 0, maxLen = 0;
  for (let r = 0; r < s.length; r++) {
    counts[s[r]] = (counts[s[r]] || 0) + 1;
    maxFreq = Math.max(maxFreq, counts[s[r]]);
    while ((r - l + 1) - maxFreq > k) {
      counts[s[l]]--;
      l++;
    }
    maxLen = Math.max(maxLen, r - l + 1);
  }
  return maxLen;
}`,
    },
    testCasesJson: [
      { input: '"ABAB", 2', expected: '4', hidden: false },
      { input: '"AABABBA", 1', expected: '4', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Window Invariant \`(Window Size) - max_freq <= k\`
Number of characters we need to replace is \`(r - l + 1) - max_freq\`. If this exceeds \`k\`, shrink from left until valid.
- **Time:** O(N)
- **Space:** O(1) (26 uppercase letters)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-15',
    slug: 'permutation-in-string',
    title: 'Permutation in String',
    difficulty: 'MEDIUM',
    category: 'Sliding Window',
    companyTags: ['Microsoft', 'Amazon'],
    orderIndex: 15,
    descriptionMdx: `Given two strings \`s1\` and \`s2\`, return \`true\` if \`s2\` contains a permutation of \`s1\`, or \`false\` otherwise.`,
    constraints: ['1 <= s1.length, s2.length <= 10^4', 's1 and s2 consist of lowercase English letters.'],
    starterCodeJson: {
      python: `def checkInclusion(s1: str, s2: str) -> bool:
    if len(s1) > len(s2): return False
    c1, c2 = [0]*26, [0]*26
    for i in range(len(s1)):
        c1[ord(s1[i]) - 97] += 1
        c2[ord(s2[i]) - 97] += 1
    matches = sum(1 for i in range(26) if c1[i] == c2[i])
    for i in range(len(s1), len(s2)):
        if matches == 26: return True
        r_idx = ord(s2[i]) - 97
        c2[r_idx] += 1
        if c1[r_idx] == c2[r_idx]: matches += 1
        elif c1[r_idx] + 1 == c2[r_idx]: matches -= 1
        l_idx = ord(s2[i - len(s1)]) - 97
        c2[l_idx] -= 1
        if c1[l_idx] == c2[l_idx]: matches += 1
        elif c1[l_idx] - 1 == c2[l_idx]: matches -= 1
    return matches == 26`,
      javascript: `function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;
  const c1 = new Array(26).fill(0), c2 = new Array(26).fill(0);
  for (let i = 0; i < s1.length; i++) {
    c1[s1.charCodeAt(i) - 97]++;
    c2[s2.charCodeAt(i) - 97]++;
  }
  let matches = 0;
  for (let i = 0; i < 26; i++) if (c1[i] === c2[i]) matches++;
  for (let i = s1.length; i < s2.length; i++) {
    if (matches === 26) return true;
    const r = s2.charCodeAt(i) - 97;
    c2[r]++;
    if (c1[r] === c2[r]) matches++;
    else if (c1[r] + 1 === c2[r]) matches--;
    const l = s2.charCodeAt(i - s1.length) - 97;
    c2[l]--;
    if (c1[l] === c2[l]) matches++;
    else if (c1[l] - 1 === c2[l]) matches--;
  }
  return matches === 26;
}`,
    },
    testCasesJson: [
      { input: '"ab", "eidbaooo"', expected: 'true', hidden: false },
      { input: '"ab", "eidboaoo"', expected: 'false', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Fixed Window with 26-Letter Matches Counter
Maintain a sliding window of size \`len(s1)\`. Track the number of exact character matches out of 26. Incremental updates take $O(1)$ per shift!
- **Time:** O(N)
- **Space:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-16',
    slug: 'minimum-window-substring',
    title: 'Minimum Window Substring',
    difficulty: 'HARD',
    category: 'Sliding Window',
    companyTags: ['Meta', 'Amazon', 'Uber'],
    orderIndex: 16,
    descriptionMdx: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the **minimum window substring** of \`s\` such that every character in \`t\` (including duplicates) is included in the window. If there is no such substring, return the empty string \`""\`.`,
    constraints: ['m == s.length', 'n == t.length', '1 <= m, n <= 10^5', 's and t consist of uppercase and lowercase English letters.'],
    starterCodeJson: {
      python: `def minWindow(s: str, t: str) -> str:
    if not t or not s: return ""
    count_t = {}
    for c in t: count_t[c] = count_t.get(c, 0) + 1
    window = {}
    have, need = 0, len(count_t)
    res, res_len = [-1, -1], float('inf')
    l = 0
    for r, c in enumerate(s):
        window[c] = window.get(c, 0) + 1
        if c in count_t and window[c] == count_t[c]:
            have += 1
        while have == need:
            if (r - l + 1) < res_len:
                res = [l, r]
                res_len = r - l + 1
            window[s[l]] -= 1
            if s[l] in count_t and window[s[l]] < count_t[s[l]]:
                have -= 1
            l += 1
    l, r = res
    return s[l:r+1] if res_len != float('inf') else ""`,
      javascript: `function minWindow(s, t) {
  if (!s || !t) return "";
  const countT = new Map();
  for (const c of t) countT.set(c, (countT.get(c) || 0) + 1);
  const window = new Map();
  let have = 0, need = countT.size;
  let res = [-1, -1], resLen = Infinity;
  let l = 0;
  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    window.set(c, (window.get(c) || 0) + 1);
    if (countT.has(c) && window.get(c) === countT.get(c)) have++;
    while (have === need) {
      if (r - l + 1 < resLen) {
        res = [l, r];
        resLen = r - l + 1;
      }
      window.set(s[l], window.get(s[l]) - 1);
      if (countT.has(s[l]) && window.get(s[l]) < countT.get(s[l])) have--;
      l++;
    }
  }
  return resLen === Infinity ? "" : s.substring(res[0], res[1] + 1);
}`,
    },
    testCasesJson: [
      { input: '"ADOBECODEBANC", "ABC"', expected: '"BANC"', hidden: false },
      { input: '"a", "a"', expected: '"a"', hidden: false },
      { input: '"a", "aa"', expected: '""', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: \`have == need\` Two-Pointer Contraction
Track \`need = len(distinct t)\` and increment \`have\` only when \`window[c] == count_t[c]\`. Once \`have == need\`, aggressively contract \`l\` to minimize the window.
- **Time:** O(M + N)
- **Space:** O(M + N)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-17',
    slug: 'sliding-window-maximum',
    title: 'Sliding Window Maximum',
    difficulty: 'HARD',
    category: 'Sliding Window',
    companyTags: ['Amazon', 'Google', 'Meta'],
    orderIndex: 17,
    descriptionMdx: `You are given an array of integers \`nums\`, there is a sliding window of size \`k\` which is moving from the very left of the array to the very right. Return the max sliding window.`,
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', '1 <= k <= nums.length'],
    starterCodeJson: {
      python: `from collections import deque
def maxSlidingWindow(nums: list[int], k: int) -> list[int]:
    q = deque() # stores indices, monotonic decreasing values
    res = []
    for i, n in enumerate(nums):
        while q and nums[q[-1]] < n:
            q.pop()
        q.append(i)
        if q[0] <= i - k:
            q.popleft()
        if i >= k - 1:
            res.append(nums[q[0]])
    return res`,
      javascript: `function maxSlidingWindow(nums, k) {
  const q = []; // monotonic deque of indices
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    while (q.length && nums[q[q.length - 1]] < nums[i]) q.pop();
    q.push(i);
    if (q[0] <= i - k) q.shift();
    if (i >= k - 1) res.push(nums[q[0]]);
  }
  return res;
}`,
    },
    testCasesJson: [
      { input: '[1,3,-1,-3,5,3,6,7], 3', expected: '[3,3,5,5,6,7]', hidden: false },
      { input: '[1], 1', expected: '[1]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Monotonic Decreasing Deque
Maintain a deque where values are strictly decreasing. Smaller elements before the current element can never be the maximum of any future window, so pop them! The front \`q[0]\` always holds the current maximum index.
- **Time:** O(N) amortized
- **Space:** O(K)`,
    timeLimitMs: 2500,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-18',
    slug: 'maximum-subarray',
    title: 'Maximum Subarray (Kadane\'s Algorithm)',
    difficulty: 'MEDIUM',
    category: 'Arrays & Hashing',
    companyTags: ['Amazon', 'Microsoft', 'Apple'],
    orderIndex: 18,
    descriptionMdx: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.`,
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    starterCodeJson: {
      python: `def maxSubArray(nums: list[int]) -> int:
    curr_sum = 0
    max_sum = nums[0]
    for n in nums:
        curr_sum = max(n, curr_sum + n)
        max_sum = max(max_sum, curr_sum)
    return max_sum`,
      javascript: `function maxSubArray(nums) {
  let curr = 0, max = nums[0];
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
      { input: '[5,4,-1,7,8]', expected: '23', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Kadane's Reset Rule
If your running sum becomes negative, it can only drag down any future subarray. Reset \`curr_sum = 0\` whenever it drops below zero.
- **Time:** O(N)
- **Space:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-19',
    slug: 'maximum-product-subarray',
    title: 'Maximum Product Subarray',
    difficulty: 'MEDIUM',
    category: 'Dynamic Programming',
    companyTags: ['Amazon', 'Google'],
    orderIndex: 19,
    descriptionMdx: `Given an integer array \`nums\`, find a subarray that has the largest product, and return the product.`,
    constraints: ['1 <= nums.length <= 2 * 10^4', '-10 <= nums[i] <= 10'],
    starterCodeJson: {
      python: `def maxProduct(nums: list[int]) -> int:
    res = max(nums)
    curr_min, curr_max = 1, 1
    for n in nums:
        if n == 0:
            curr_min, curr_max = 1, 1
            continue
        tmp = curr_max * n
        curr_max = max(n * curr_max, n * curr_min, n)
        curr_min = min(tmp, n * curr_min, n)
        res = max(res, curr_max)
    return res`,
      javascript: `function maxProduct(nums) {
  let res = Math.max(...nums);
  let curMin = 1, curMax = 1;
  for (const n of nums) {
    if (n === 0) {
      curMin = 1; curMax = 1;
      continue;
    }
    const tmp = curMax * n;
    curMax = Math.max(n * curMax, n * curMin, n);
    curMin = Math.min(tmp, n * curMin, n);
    res = Math.max(res, curMax);
  }
  return res;
}`,
    },
    testCasesJson: [
      { input: '[2,3,-2,4]', expected: '6', hidden: false },
      { input: '[-2,0,-1]', expected: '0', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Track Both Min & Max Products
Negative numbers flip signs! A huge negative multiplied by another negative yields the maximum positive product. Track both \`curr_min\` and \`curr_max\` at each step.
- **Time:** O(N)
- **Space:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-20',
    slug: 'find-minimum-in-rotated-sorted-array',
    title: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'MEDIUM',
    category: 'Binary Search',
    companyTags: ['Amazon', 'Microsoft', 'Bloomberg'],
    orderIndex: 20,
    descriptionMdx: `Given the sorted rotated array \`nums\` of unique elements, return the minimum element of this array in **O(log n)** time.`,
    constraints: ['n == nums.length', '1 <= n <= 5000', '-5000 <= nums[i] <= 5000', 'All integers are unique.'],
    starterCodeJson: {
      python: `def findMin(nums: list[int]) -> int:
    l, r = 0, len(nums) - 1
    while l < r:
        mid = (l + r) // 2
        if nums[mid] > nums[r]:
            l = mid + 1
        else:
            r = mid
    return nums[l]`,
      javascript: `function findMin(nums) {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] > nums[r]) l = mid + 1;
    else r = mid;
  }
  return nums[l];
}`,
    },
    testCasesJson: [
      { input: '[3,4,5,1,2]', expected: '1', hidden: false },
      { input: '[4,5,6,7,0,1,2]', expected: '0', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Compare Mid with Rightmost Element
If \`nums[mid] > nums[r]\`, the pivot (inflection point) must lie to the right of \`mid\`, so \`l = mid + 1\`. Otherwise, the minimum is at or left of \`mid\`, so \`r = mid\`.
- **Time:** O(log N)
- **Space:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-21',
    slug: 'search-in-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'MEDIUM',
    category: 'Binary Search',
    companyTags: ['Amazon', 'Meta', 'Apple'],
    orderIndex: 21,
    descriptionMdx: `Given the array \`nums\` after the possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.`,
    constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i] <= 10^4', 'All values of nums are unique.'],
    starterCodeJson: {
      python: `def search(nums: list[int], target: int) -> int:
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = (l + r) // 2
        if nums[mid] == target: return mid
        # Left half sorted
        if nums[l] <= nums[mid]:
            if nums[l] <= target < nums[mid]: r = mid - 1
            else: l = mid + 1
        # Right half sorted
        else:
            if nums[mid] < target <= nums[r]: l = mid + 1
            else: r = mid - 1
    return -1`,
      javascript: `function search(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] === target) return mid;
    if (nums[l] <= nums[mid]) {
      if (nums[l] <= target && target < nums[mid]) r = mid - 1;
      else l = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[r]) l = mid + 1;
      else r = mid - 1;
    }
  }
  return -1;
}`,
    },
    testCasesJson: [
      { input: '[4,5,6,7,0,1,2], 0', expected: '4', hidden: false },
      { input: '[4,5,6,7,0,1,2], 3', expected: '-1', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Identify the Sorted Half
In any rotated sorted array, splitting at \`mid\` always yields at least one perfectly sorted half! Check if target lies within the boundaries of the sorted half; if not, discard that entire half.
- **Time:** O(log N)
- **Space:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-22',
    slug: 'subarray-sum-equals-k',
    title: 'Subarray Sum Equals K',
    difficulty: 'MEDIUM',
    category: 'Arrays & Hashing',
    companyTags: ['Meta', 'Amazon', 'Google'],
    orderIndex: 22,
    descriptionMdx: `Given an array of integers \`nums\` and an integer \`k\`, return the total number of subarrays whose sum equals to \`k\`.`,
    constraints: ['1 <= nums.length <= 2 * 10^4', '-1000 <= nums[i] <= 1000', '-10^7 <= k <= 10^7'],
    starterCodeJson: {
      python: `def subarraySum(nums: list[int], k: int) -> int:
    prefix_counts = {0: 1}
    curr_sum = 0
    res = 0
    for n in nums:
        curr_sum += n
        diff = curr_sum - k
        res += prefix_counts.get(diff, 0)
        prefix_counts[curr_sum] = prefix_counts.get(curr_sum, 0) + 1
    return res`,
      javascript: `function subarraySum(nums, k) {
  const map = new Map();
  map.set(0, 1);
  let sum = 0, count = 0;
  for (const n of nums) {
    sum += n;
    if (map.has(sum - k)) count += map.get(sum - k);
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
}`,
    },
    testCasesJson: [
      { input: '[1,1,1], 2', expected: '2', hidden: false },
      { input: '[1,2,3], 3', expected: '2', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Prefix Sum Frequency Map
Subarray sum between index \`i\` and \`j\` is \`prefix[j] - prefix[i-1] = k\`. Hence \`prefix[i-1] = prefix[j] - k\`. Store running prefix sum frequencies in a map. Initialize \`map[0] = 1\` for subarrays starting at index 0.
- **Time:** O(N)
- **Space:** O(N)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-23',
    slug: 'rotate-image',
    title: 'Rotate Image (Matrix 90° Clockwise)',
    difficulty: 'MEDIUM',
    category: 'Arrays & Hashing',
    companyTags: ['Amazon', 'Microsoft', 'Bloomberg'],
    orderIndex: 23,
    descriptionMdx: `You are given an \`n x n\` 2D \`matrix\` representing an image, rotate the image by **90 degrees clockwise** in-place without allocating another matrix.`,
    constraints: ['n == matrix.length == matrix[i].length', '1 <= n <= 20', '-1000 <= matrix[i][j] <= 1000'],
    starterCodeJson: {
      python: `def rotate(matrix: list[list[int]]) -> None:
    # 1. Transpose matrix
    n = len(matrix)
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # 2. Reverse each row
    for row in matrix:
        row.reverse()`,
      javascript: `function rotate(matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  for (let i = 0; i < n; i++) matrix[i].reverse();
}`,
    },
    testCasesJson: [
      { input: '[[1,2,3],[4,5,6],[7,8,9]]', expected: '[[7,4,1],[8,5,2],[9,6,3]]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Transpose + Reverse Rows = 90° Clockwise
1. Swap \`matrix[i][j]\` with \`matrix[j][i]\` (transpose along main diagonal).
2. Reverse every row horizontally. Done in-place with zero extra memory!
- **Time:** O(N^2)
- **Space:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-24',
    slug: 'spiral-matrix',
    title: 'Spiral Matrix',
    difficulty: 'MEDIUM',
    category: 'Arrays & Hashing',
    companyTags: ['Microsoft', 'Amazon', 'Apple'],
    orderIndex: 24,
    descriptionMdx: `Given an \`m x n\` matrix, return all elements of the matrix in **spiral order**.`,
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 10'],
    starterCodeJson: {
      python: `def spiralOrder(matrix: list[list[int]]) -> list[int]:
    res = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    while top <= bottom and left <= right:
        for c in range(left, right + 1): res.append(matrix[top][c])
        top += 1
        for r in range(top, bottom + 1): res.append(matrix[r][right])
        right -= 1
        if top <= bottom:
            for c in range(right, left - 1, -1): res.append(matrix[bottom][c])
            bottom -= 1
        if left <= right:
            for r in range(bottom, top - 1, -1): res.append(matrix[r][left])
            left += 1
    return res`,
      javascript: `function spiralOrder(matrix) {
  const res = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) res.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) res.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) res.push(matrix[r][left]);
      left++;
    }
  }
  return res;
}`,
    },
    testCasesJson: [
      { input: '[[1,2,3],[4,5,6],[7,8,9]]', expected: '[1,2,3,6,9,8,7,4,5]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: 4 Bounding Pointers
Maintain \`top\`, \`bottom\`, \`left\`, and \`right\`. Traverse right, shrink top; traverse down, shrink right; traverse left, shrink bottom; traverse up, shrink left. Guard horizontal/vertical passes with bounds checks.
- **Time:** O(M * N)
- **Space:** O(1) auxiliary`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-25',
    slug: 'set-matrix-zeroes',
    title: 'Set Matrix Zeroes',
    difficulty: 'MEDIUM',
    category: 'Arrays & Hashing',
    companyTags: ['Meta', 'Amazon', 'Microsoft'],
    orderIndex: 25,
    descriptionMdx: `Given an \`m x n\` integer matrix \`matrix\`, if an element is \`0\`, set its entire row and column to \`0\`'s in-place.`,
    constraints: ['m == matrix.length', 'n == matrix[0].length', '1 <= m, n <= 200'],
    starterCodeJson: {
      python: `def setZeroes(matrix: list[list[int]]) -> None:
    ROWS, COLS = len(matrix), len(matrix[0])
    row_zero = False
    for r in range(ROWS):
        for c in range(COLS):
            if matrix[r][c] == 0:
                matrix[0][c] = 0
                if r > 0: matrix[r][0] = 0
                else: row_zero = True
    for r in range(1, ROWS):
        for c in range(1, COLS):
            if matrix[0][c] == 0 or matrix[r][0] == 0:
                matrix[r][c] = 0
    if matrix[0][0] == 0:
        for r in range(ROWS): matrix[r][0] = 0
    if row_zero:
        for c in range(COLS): matrix[0][c] = 0`,
      javascript: `function setZeroes(matrix) {
  const ROWS = matrix.length, COLS = matrix[0].length;
  let rowZero = false;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (matrix[r][c] === 0) {
        matrix[0][c] = 0;
        if (r > 0) matrix[r][0] = 0;
        else rowZero = true;
      }
    }
  }
  for (let r = 1; r < ROWS; r++) {
    for (let c = 1; c < COLS; c++) {
      if (matrix[0][c] === 0 || matrix[r][0] === 0) matrix[r][c] = 0;
    }
  }
  if (matrix[0][0] === 0) for (let r = 0; r < ROWS; r++) matrix[r][0] = 0;
  if (rowZero) for (let c = 0; c < COLS; c++) matrix[0][c] = 0;
}`,
    },
    testCasesJson: [
      { input: '[[1,1,1],[1,0,1],[1,1,1]]', expected: '[[1,0,1],[0,0,0],[1,0,1]]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Use First Row & Column as Storage Markers
Use the first row and column of the matrix itself to store whether that row or column needs to be zeroed! Use a single boolean \`row_zero\` to track overlap for cell [0][0].
- **Time:** O(M * N)
- **Space:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-26',
    slug: 'next-permutation',
    title: 'Next Permutation',
    difficulty: 'MEDIUM',
    category: 'Arrays & Hashing',
    companyTags: ['Google', 'Meta'],
    orderIndex: 26,
    descriptionMdx: `A **permutation** of an array of integers is an arrangement of its members into a sequence or linear order. Rearrange numbers into the lexicographically next greater permutation of numbers in-place.`,
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 100'],
    starterCodeJson: {
      python: `def nextPermutation(nums: list[int]) -> None:
    i = len(nums) - 2
    while i >= 0 and nums[i] >= nums[i + 1]: i -= 1
    if i >= 0:
        j = len(nums) - 1
        while nums[j] <= nums[i]: j -= 1
        nums[i], nums[j] = nums[j], nums[i]
    nums[i + 1:] = reversed(nums[i + 1:])`,
      javascript: `function nextPermutation(nums) {
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;
  if (i >= 0) {
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) j--;
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  let l = i + 1, r = nums.length - 1;
  while (l < r) {
    [nums[l], nums[r]] = [nums[r], nums[l]];
    l++; r--;
  }
}`,
    },
    testCasesJson: [
      { input: '[1,2,3]', expected: '[1,3,2]', hidden: false },
      { input: '[3,2,1]', expected: '[1,2,3]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: 3-Step Lexicographical Algorithm
1. Find first decreasing element from right (\`nums[i] < nums[i+1]\`).
2. Find element from right just larger than \`nums[i]\` and swap them.
3. Reverse suffix after \`i\` to make it monotonically increasing (smallest possible suffix).
- **Time:** O(N)
- **Space:** O(1)`,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-27',
    slug: 'majority-element',
    title: 'Majority Element (Boyer-Moore Voting)',
    difficulty: 'EASY',
    category: 'Arrays & Hashing',
    companyTags: ['Amazon', 'Google', 'Microsoft'],
    orderIndex: 27,
    descriptionMdx: `Given an array \`nums\` of size \`n\`, return the majority element. The majority element is the element that appears more than \`⌊n / 2⌋\` times.`,
    constraints: ['n == nums.length', '1 <= n <= 5 * 10^4', '-10^9 <= nums[i] <= 10^9'],
    starterCodeJson: {
      python: `def majorityElement(nums: list[int]) -> int:
    candidate = None
    count = 0
    for n in nums:
        if count == 0:
            candidate = n
        count += (1 if n == candidate else -1)
    return candidate`,
      javascript: `function majorityElement(nums) {
  let candidate = null, count = 0;
  for (const n of nums) {
    if (count === 0) candidate = n;
    count += (n === candidate ? 1 : -1);
  }
  return candidate;
}`,
    },
    testCasesJson: [
      { input: '[3,2,3]', expected: '3', hidden: false },
      { input: '[2,2,1,1,1,2,2]', expected: '2', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Boyer-Moore Voting Algorithm
Pair off distinct elements! If candidate appears $> N/2$ times, it will survive all cancellations when matching with non-majority elements.
- **Time:** O(N)
- **Space:** O(1)`,
    timeLimitMs: 1500,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-28',
    slug: '4sum',
    title: '4Sum',
    difficulty: 'MEDIUM',
    category: 'Two Pointers',
    companyTags: ['Amazon', 'Apple'],
    orderIndex: 28,
    descriptionMdx: `Given an array \`nums\` of \`n\` integers, return an array of all the unique quadruplets \`[nums[a], nums[b], nums[c], nums[d]]\` such that their sum equals \`target\`.`,
    constraints: ['1 <= nums.length <= 200', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9'],
    starterCodeJson: {
      python: `def fourSum(nums: list[int], target: int) -> list[list[int]]:
    nums.sort()
    res = []
    n = len(nums)
    for i in range(n - 3):
        if i > 0 and nums[i] == nums[i - 1]: continue
        for j in range(i + 1, n - 2):
            if j > i + 1 and nums[j] == nums[j - 1]: continue
            l, r = j + 1, n - 1
            while l < r:
                total = nums[i] + nums[j] + nums[l] + nums[r]
                if total == target:
                    res.append([nums[i], nums[j], nums[l], nums[r]])
                    while l < r and nums[l] == nums[l + 1]: l += 1
                    while l < r and nums[r] == nums[r - 1]: r -= 1
                    l += 1; r -= 1
                elif total < target: l += 1
                else: r -= 1
    return res`,
      javascript: `function fourSum(nums, target) {
  nums.sort((a,b)=>a-b);
  const res = [], n = nums.length;
  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let l = j + 1, r = n - 1;
      while (l < r) {
        const sum = nums[i] + nums[j] + nums[l] + nums[r];
        if (sum === target) {
          res.push([nums[i], nums[j], nums[l], nums[r]]);
          while (l < r && nums[l] === nums[l + 1]) l++;
          while (l < r && nums[r] === nums[r - 1]) r--;
          l++; r--;
        } else if (sum < target) l++;
        else r--;
      }
    }
  }
  return res;
}`,
    },
    testCasesJson: [
      { input: '[1,0,-1,0,-2,2], 0', expected: '[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Generalized K-Sum Recursion
Fix first two elements with nested loops and solve the remaining 2Sum with sorted two-pointer convergence. Deduplicate at every layer.
- **Time:** O(N^3)
- **Space:** O(1) auxiliary`,
    timeLimitMs: 2500,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-29',
    slug: 'encode-and-decode-strings',
    title: 'Encode and Decode Strings',
    difficulty: 'MEDIUM',
    category: 'Arrays & Hashing',
    companyTags: ['Google', 'Meta'],
    orderIndex: 29,
    descriptionMdx: `Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.`,
    constraints: ['0 <= strs.length <= 200', '0 <= strs[i].length <= 200', 'strs[i] contains any possible ASCII characters.'],
    starterCodeJson: {
      python: `def encode(strs: list[str]) -> str:
    res = ""
    for s in strs:
        res += f"{len(s)}#{s}"
    return res

def decode(s: str) -> list[str]:
    res = []
    i = 0
    while i < len(s):
        j = i
        while s[j] != '#': j += 1
        length = int(s[i:j])
        res.append(s[j + 1 : j + 1 + length])
        i = j + 1 + length
    return res`,
      javascript: `function encode(strs) {
  return strs.map(s => \`\${s.length}#\${s}\`).join('');
}
function decode(s) {
  const res = [];
  let i = 0;
  while (i < s.length) {
    let j = i;
    while (s[j] !== '#') j++;
    const len = parseInt(s.substring(i, j));
    res.push(s.substring(j + 1, j + 1 + len));
    i = j + 1 + len;
  }
  return res;
}`,
    },
    testCasesJson: [
      { input: '["lint","code","love","you"]', expected: '["lint","code","love","you"]', hidden: false },
      { input: '["we", "say", ":", "yes"]', expected: '["we", "say", ":", "yes"]', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: Length-Prefixed Delimiter (\`length#string\`)
Stateless network framing! Prefix each string with its byte length followed by a sentinel \`#\`. Even if the string itself contains \`#\`, we know exactly how many bytes to read after the delimiter!
- **Time:** O(N)
- **Space:** O(1)`,
    timeLimitMs: 1500,
    memoryLimitMb: 128,
  },
  {
    id: 'arr-30',
    slug: 'valid-sudoku',
    title: 'Valid Sudoku',
    difficulty: 'MEDIUM',
    category: 'Arrays & Hashing',
    companyTags: ['Amazon', 'Apple'],
    orderIndex: 30,
    descriptionMdx: `Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to standard Sudoku rules.`,
    constraints: ['board.length == 9', 'board[i].length == 9', 'board[i][j] is a digit 1-9 or \'.\'.'],
    starterCodeJson: {
      python: `def isValidSudoku(board: list[list[str]]) -> bool:
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    for r in range(9):
        for c in range(9):
            val = board[r][c]
            if val == '.': continue
            box_idx = (r // 3) * 3 + (c // 3)
            if val in rows[r] or val in cols[c] or val in boxes[box_idx]:
                return False
            rows[r].add(val)
            cols[c].add(val)
            boxes[box_idx].add(val)
    return True`,
      javascript: `function isValidSudoku(board) {
  const rows = Array.from({length: 9}, () => new Set());
  const cols = Array.from({length: 9}, () => new Set());
  const boxes = Array.from({length: 9}, () => new Set());
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val === '.') continue;
      const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      if (rows[r].has(val) || cols[c].has(val) || boxes[b].has(val)) return false;
      rows[r].add(val); cols[c].add(val); boxes[b].add(val);
    }
  }
  return true;
}`,
    },
    testCasesJson: [
      { input: '9x9 board with valid numbers', expected: 'true', hidden: false },
    ],
    editorialMdx: `### 💡 Short Trick: 3x3 Subgrid Index Formula
Map 2D coordinates \`(r, c)\` into a flat 3x3 box index via: \`box_idx = (r // 3) * 3 + (c // 3)\`. Check uniqueness across 9 rows, 9 cols, and 9 boxes in a single pass.
- **Time:** O(1) (fixed 81 operations)
- **Space:** O(1)`,
    timeLimitMs: 1500,
    memoryLimitMb: 128,
  },
];


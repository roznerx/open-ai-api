export const OPEN_API = {
  MODELS: {
    DAVINCI: "text-davinci-003",
    EDIT_CODE: "code-davinci-edit-001",
  },
  TEMPERATURE: {
    DETERMINISTIC: 0.1,
    OPTIMAL: 0.2,
    DEFAULT: 0.7,
  },
  MAX_TOKENS: {
    DEFAULT: 2048,
    INCREASED: 4096,
  },
  STREAM: {
    ENABLED: true,
    DISABLED: false,
  },
}

export const AI_MOOD = {
  engineer:
    "You are a robust and cleaver programming software assistant specializing in Javascript and Typescript. But your knowledge extends to a wide variety of programming skills. Follow user instructions to the letter.",
  recomendation:
    "You are an specialized recommendation algorithm, who gives code snippets to the user.",
  leetCode: `
  You are an expert in coding interview questions, like the ones from Hacker Rank or LeetCode.
   Your task as an assistant is to to help engineers understand the problems presented to you and 
   explain those in a friendly manner, to help programmers reason about them. Present code examples in Javascript.
`,
}
export const LEET_CODE = {
  merge: {
    title: "Merge Sorted Array",
    description: `You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers <code>m</code> and <code>n</code>, representing the number of elements in <code>nums1</code> and <code>nums2</code> respectively.
    Merge nums1 and nums2 into a single array sorted in non-decreasing order. The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.
    `,
  },
  topK: {
    title: "Top K Frequent Elements",
    description: `Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.`,
  },
  sortedArray: {
    title: "Squares of an Array",
    description: `Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.`,
  },
  binarySearch: {
    title: 'Find Smallest Letter"',
    description: `You are given an array of characters letters that is sorted in non-decreasing order, and a character target. 
  There are at least two different characters in letters. Return the smallest character in letters that is lexicographically greater than target. If such a character does not exist, return the first character in letters.`,
  },
  binarySearch1: {
    title: "Search Insert Position",
    description: `Given a sorted array of distinct integers and a target value, return the index if the target is found. 
  If not, return the index where it would be if it were inserted in order. You must write an algorithm with O(log n) runtime complexity.`,
  },
  binarySearch2: {
    title: "Find First and Last Position of Element in Sorted Array",
    description: `Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. If target is not found in the array, return [-1, -1]. You must write an algorithm with O(log n) runtime complexity.`,
  },
  binarySearch3: {
    title: "Count Tree Nodes",
    description: `Given the root of a complete binary tree, return the number of the nodes in the tree.
  According to Wikipedia, every level, except possibly the last, is completely filled in a complete binary tree, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h. Design an algorithm that runs in less than O(n) time complexity`,
  },
  commonChars: {
    title: "Common Characters",
    description: `Given a string array words, return an array of all characters that show up in all strings within the words (including duplicates). You may return the answer in any order.`,
  },
}

export const PREMIUM_SUBSCRIPTION_AMOUNT = 6

export const promptResponseTimeout = 6000

export const CREDITS_MODAL_COPY = {
  title: "Get mode credits",
  description:
    "Level up your experience! Add more credits for non-stop access to our awesome features and services. Don't miss out on incredible opportunities!",
  callToAction: "Get Credits",
}

export const SUBSCRIPTION_PRICES = {
  testing: {
    premiumMonthly: "price_1O4SW8KrxiA7kR6c8mXQY4vt",
    premiumAnual: "price_1O4SPQKrxiA7kR6ctFIoIgKV",
  },
  production: {
    premiumMonthly: "price_1O4ScMKrxiA7kR6ctpfyOS1w",
    premiumAnual: "price_1O4SZHKrxiA7kR6c7UE5Aszd",
  },
}

export const LSConfig = {
  user: {
    userId: "userId",
  },
  colorMode: "colorMode",
}

export const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 },
}

export const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
}

export const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
}

export const HOME_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://code-genius.dev"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000"

export const APP_HOSTNAMES = new Set([
  "code-genius.dev",
  "localhost:3000",
  "localhost",
])

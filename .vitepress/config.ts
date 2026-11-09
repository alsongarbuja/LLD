import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Leetcode Learning Documentation",
  base: "/LLD/",
  description: "A static site that documents the leetcode learning process I (Alson Garbuja) have been doing",
  markdown: {
    math: true,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Solutions', link: '/docs/solutions/introduction' }
    ],

    sidebar: [
      {
        text: 'Journey',
        items: [
          { text: 'Start of the Journey', link: '/docs/start-journey' }
        ],
      },
      {
        text: 'Solutions',
        items: [
          { text: 'Introduction', link: '/docs/solutions/introduction' },
          { text: 'Two Sum', link: '/docs/solutions/two-sum' },
          { text: 'Palindrom Number', link: '/docs/solutions/palindrome-number' },
          { text: 'Add Two Numbers', link: '/docs/solutions/add-two-numbers' },
          { text: 'Two Sum II - Input Array Is Sorted', link: '/docs/solutions/two-sum-ii' },
          // { text: 'Longest Substring Without Repeating Characters', link: '/docs/solutions/longest-substring-without-repeating-characters' },
          // { text: 'Median of Two Sorted Arrays', link: '/docs/solutions/median-of-two-sorted-arrays' },
          // { text: 'Longest Palindromic Substring', link: '/docs/solutions/longest-palindromic-substring' },
          // { text: 'Zigzag Conversion', link: '/docs/solutions/zigzag-conversion' },
          // { text: 'Reverse Integer', link: '/docs/solutions/reverse-integer' },
          // { text: 'String to Integer (atoi)', link: '/docs/solutions/string-to-integer-atoi' }
        ],
      },
      {
        text: 'Real World Problems',
        items: [
          { text: 'Introduction', link: '/docs/real-world-problems/introduction' },
          { text: 'Database Scaling', link: '/docs/real-world-problems/database-scaling' },
          // { text: 'Load Balancing', link: '/docs/real-world-problems/load-balancing' },
          // { text: 'Caching', link: '/docs/real-world-problems/caching' },
          // { text: 'Rate Limiting', link: '/docs/real-world-problems/rate-limiting' },
          // { text: 'Message Queues', link: '/docs/real-world-problems/message-queues' },
          // { text: 'Search Engines', link: '/docs/real-world-problems/search-engines' },
          // { text: 'Content Delivery Networks (CDN)', link: '/docs/real-world-problems/content-delivery-networks-cdn' }
        ],
      },
      {
        text: 'DSA and Patterns',
        items: [
          { text: 'Introduction', link: '/docs/dsa-patterns/introduction' },
          { text: 'Two Pointers', link: '/docs/dsa-patterns/two-pointers' },
          // { text: 'Sliding Window', link: '/docs/dsa-and-patterns/sliding-window' },
          // { text: 'Fast and Slow Pointers', link: '/docs/dsa-and-patterns/fast-and-slow-pointers' },
          // { text: 'Merge Intervals', link: '/docs/dsa-and-patterns/merge-intervals' },
          // { text: 'Cyclic Sort', link: '/docs/dsa-and-patterns/cyclic-sort' },
          // { text: 'In-place Reversal of a Linked List', link: '/docs/dsa-and-patterns/in-place-reversal-of-a-linked-list' },
          // { text: 'Tree Breadth First Search', link: '/docs/dsa-and-patterns/tree-breadth-first-search' },
          // { text: 'Tree Depth First Search', link: '/docs/dsa-and-patterns/tree-depth-first-search' },
          // { text: 'Two Heaps', link: '/docs/dsa-and-patterns/two-heaps' },
          // { text: 'Subsets', link: '/docs/dsa-and-patterns/subsets' },
          // { text: 'Modified Binary Search', link: '/docs/dsa-and-patterns/modified-binary-search' },
          // { text: 'Top K Elements', link: '/docs/dsa-and-patterns/top-k-elements' },
          // { text: 'K-way Merge', link: '/docs/dsa-and-patterns/k-way-merge' },
          // { text: '0/1 Knapsack', link: '/docs/dsa-and-patterns/0-1-knapsack' },
          // { text: 'Dynamic Programming Patterns', link: '/docs/dsa-and-patterns/dynamic-programming-patterns' },
          // { text: 'Bitwise XOR', link: '/docs/dsa-and-patterns/bitwise-xor' }
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/alsongarbuja/LLD' }
    ]
  }
})

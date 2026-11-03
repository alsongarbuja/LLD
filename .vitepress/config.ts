import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Leetcode Learning Documentation",
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
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/alsongarbuja/LLD' }
    ]
  }
})

# Two Sum II - Input Array Is Sorted (LC167) `Medium`

You are given a **1-indexed array** of integers numbers that is already **sorted in non-decreasing order**.

Find **two** numbers such that they add up to a specific `target` number. Let these two numbers be $numbers[index_1]$ and $numbers[index_2]$ where $1 <= index_1 < index_2 <= numbers.length$.

Return the indices of the two numbers $index_1$ and $index_2$ as an integer array $[index_1, index_2]$ of length 2.

The tests are generated such that there is exactly one solution. You may not use the same element twice.

Your solution must use only constant extra space.

**Example 1:**

Input: `numbers = [2,7,11,15], target = 9`

Output: `[1,2]`

Explanation: `The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].`

**Example 2:**

Input: `numbers = [2,3,4], target = 6`

Output: `[1,3]`

Explanation: `The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].`

**Example 3:**

Input: `numbers = [-1,0], target = -1`

Output: `[1,2]`

Explanation: `The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].`

**Constraints:**

- $2 <= numbers.length <= 3 * 10^4$
- -1000 <= numbers[i] <= 1000
- numbers is sorted in non-decreasing order.
- -1000 <= target <= 1000
- The tests are generated such that there is exactly one solution.

## Brute force approach

Starting with the navie brute force approach, we do the same outer and inner loop we did in the two sum problem.

```python
def two_sum(nums, target):
  for i in range(len(nums)):
    for j in range(len(nums)):
      if nums[i]+nums[j] == target:
        return [i, j]
  
  return []
```

### Visualization

<video controls width="100%" style="border-radius: 8px;">
  <source src="/videos/twosumbrutesorted.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Hash Map

In the Hash Map method, we do the same thing of adding visited numbers to a Map and instead of looking for two numbers, we look for complement numbers.

```python
def two_sum_hash_map(nums, target):
  visited_nums = {} # A dict in python acts as the Hash Map

  for i, num in enumerate(nums):
    complement_num = target - num # Finding the complement number needed to get the target

    if complement_num in visited_nums:
      return [i, visited_nums[complement_num]]
    
    visited_nums[complement_num] = i # Store the index of the current number (as the key) to the Map
  
  return []
```

### Visualization

<video controls width="100%" style="border-radius: 8px;">
  <source src="/videos/twosumhashsorted.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Two pointer

Now, the real method we are interested in. We want to solve the two sum problem **(with sorted array)** with in `O(N)` time complexity and `O(1)` space complexity. It means we want to keep the single-pass approach as it is but remove the need for extra space by the `map`.

What if we appoint two pointers at each end of the array `(0, len)` and sum those two elements together to check if we have the target.

1. We might find the target, then return the indices of the elements at the pointers.
2. The sum of the two numbers at current pointers might be **less than the target**, then we know for sure we have to **increase the left pointer** (since we have sorted array and decreasing the right pointer will yeild even smaller number)
3. The sum of the two numbers at current pointers might be **greater than the target**, then we do the opposite **decrease the right pointer**

We do the step until both left and right pointers meet with each other, if we still not find the answer then we don't have any solution for the given inputs.

```python
def two_sum(nums, target):
  left = 0 # a pointer to hold the left index
  right = len(target)-1 # a pointer to hold the right index

  # Loop until the left and right pointer meet or cross each other
  while left < right:
    total = nums[left] + nums[right]
    
    # If total is the target found the solution
    if total == target:
      return [left, right]
    
    # If the total is less than target then we increase the
    # left pointer to increase the total sum in next loop
    # as the array is sorted
    if total < target:
      left += 1
    # If the total is greater than target then we decrease the
    # right pointer to decrease the total sum in next loop
    # as the array is sorted
    elif total > target:
      right -= 1

  return []
```

As we can see, here we are only storing three variables at a time **left, right and total** bringing the space complexity from `O(N)` down to `O(1)`

### Visualization

<video controls width="100%" style="border-radius: 8px;">
  <source src="/videos/twosumtwopointersorted.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

::: tip
The main advantage of using the **Two pointer method** to find the two sum from a sorted array is the space complexity `O(1)` which is `O(N)` when we use the **Hash Map method**.

And we were able to use the two pointer approach because the array was already sorted, if we have an unsorted array and have memory limitation then we might want to first sort the array then use the two pointer approach. **But, make sure your sorting algorithm has space complexity with in the limitation and also doesnot affect the time complexity of O(N).**
:::

## Time complexity comparisons

**Algorithm** | **Approach** | **Time Complexity** | **Space Complexity**
--|--|--|--
**Brute Force** | Simply loop through each number and an inner loop to find the complement second number | $O(n^2)$ | $O(1)$
**Hash Map** | Use a Hash Map to store the visited numbers and to find the complement second number | $O(n)$ | $O(n)$
**Two Pointer** | Use two pointers at each end of the array, and increase or decrease the pointers according to some condition until we find the solution | $O(n)$ | $O(1)$
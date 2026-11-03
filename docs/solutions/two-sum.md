# Two Sum Problem (LC1) `Easy`

You are given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

**Example 1:**

Input: `nums = [2,7,11,15], target = 9`

Output: `[0,1]`

**Explanation:**

The sum of `nums[0]` and `nums[1]` is `2 + 7 = 9`, which equals the target. Therefore, the indices `[0, 1]` are returned.

**Example 2:**

Input: **nums = [3,2,4], target = 6**

Output: **[1,2]**

**Explanation:**

The sum of `nums[1]` and `nums[2]` is `2 + 4 = 6`, which equals the target. Therefore, the indices `[1, 2]` are returned.

**Example 3:**

Input: `nums = [3,3], target = 6`

Output: `[0,1]`

**Explanation:**

The sum of `nums[0]` and `nums[1]` is `3 + 3 = 6`, which equals the target. Therefore, the indices `[0, 1]` are returned.

**Constraints:**

- 2 <= nums.length <= 104
- -109 <= nums[i] <= 109
- -109 <= target <= 109
- **Only one valid answer exists.**

**Follow-up:** Can you come up with an algorithm that is less than `O(n2)` time complexity?

## Brute Force Approach

Looking through the question the first solution was pretty obivious with a `brute force` approach to try and add each numbers with the others to see if it matches the target and if does then return the indices.

```python
def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(len(nums)):
            if nums[i]+nums[j] == target:
                return [i, j]
    
    return []
```

With the brute force approach we can see the time complexity of the algorithm is $O(n^2)$ since we need two loops one for the first number and the inner loop for the second number, thus in worst case we might have to run the algorithm $n*n$ times.

### Visualization

<video controls width="100%" style="border-radius: 8px;">
  <source src="/videos/twosumbrute.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Hash Map Approach

Looking at the question we have a follow-up question in the leetcode problem that asks if we can solve the problem with a time complexity of less than $O(n^2)$. 

For that we need to first remove the inner loop that is looking through the array for the second number. **How can we do that?**, if we are to remove the inner loop and only use a single loop to get both the numbers of the solution in single loop then we need some sort of mechanism to get the other number.

Comes the **`Hash Map`** or simply a **`Map`** which is a simple object based storage mechanism that lets us store and retrieve information within $O(n)$ **time complexity in average**.

In this approach we keep track of the already visited numbers in a **`Hash Map`** and instead of adding up the numbers together, we subtract the current number in the loop with `target` to get the needed complement number and check if we have already found the number in the **`Map`** or not.

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

Here, we can see we have eliminated the inner loop and instead used the `dict` in python that acts as a `Hash Map` to store the numbers and check it with the current number on the loop to find the indices, dropping the time complexity from $O(n^2)$ to $O(n)$.

### Visualization

<video controls width="100%" style="border-radius: 8px;">
  <source src="/videos/twosumhash.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

::: info
Although the time complexity of the algorithm drop from $O(n^2)$ to $O(n)$, we have introducted addition to the memory side of the problem with the **`brute force approach`** having a constant $O(1)$ space complexity while the **`Hash Map approach`** needs $O(n)$ space complexity to store the `Map data`.

So we sacrified memory for speed in this case. If we had constraints on memory than brute force might have been better than Hash map approach.
:::

## Time complexity comparisons

**Algorithm** | **Approach** | **Time Complexity** | **Space Complexity**
--|--|--|--
**Brute Force** | Simply loop through each number and an inner loop to find the complement second number | $O(n^2)$ | $O(1)$
**Hash Map** | Use a Hash Map to store the visited numbers and to find the complement second number | $O(n)$ | $O(n)$


## Continuation

Now, comes an interesting question, **Can we have such an algorithm that has $O(n)$ time complexity and uses constant $O(1)$ space complexity to solve the problem?**

For this one I will be documenting a method called **`Two Pointer`** in coming sections. Or jump directly to the method [here](/docs/solutions/two-sum-ii)
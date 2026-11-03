# Palindrom Number (LC9) `Easy`

Given an integer `x`, return true if `x` is a **palindrome**, and false otherwise.

**Example 1:**

Input: `x = 121`

Output: `true`

Explanation: `121 reads as 121 from left to right and from right to left.`

**Example 2:**

Input: `x = -121`

Output: `false`

Explanation: `From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.`

**Example 3:**

Input: `x = 10`

Output: `false`

Explanation: `Reads 01 from right to left. Therefore it is not a palindrome.`
 
**Constraints:**

- $-2^{31} <= x <= 2^{31} - 1$
 
**Follow up:** Could you solve it without converting the integer to a string?

## String conversion

This one is pretty easy if we can use the **string conversion method**. We just follow the following steps:

1. Convert the integer to string
2. Reverse the string
3. Convert the string to integer
4. Check if the new integer is same as the given input integer

```python
def palindrome_num(x):
    # If the given input integer is already less than 0 we return false
    if x < 0:
        return False

    y = str(x)[::-1]

    return x == int(y)
```

Here we just used the built-in python function `str()` to convert the integer to string than used the slicing method `[::-1]` to reverse the string. And finally we return the boolean result of checking equality between the original integer `x` and the reversed integer `y`.

The only thing is to save us from trying to convert negative string such as `123-` reverse of `-321` which will be false anyway we add a simple check if `x` is a negative number than we return `False`.

### Visualizaton

<video controls width="100%" style="border-radius: 8px;">
  <source src="/videos/palindromenumberstring.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Half reversed

That was easy but, we have a **follow up** in the leetcode problem. `Could you solve it without converting the integer to a string?`.

So, how do we go about this?

Lets go to the beginning, what is a **palindrome**? In our case what is a **palindrome number**? An integer that has the same value even when we reverse each digits of the number which means the first digit of the integer must be equal to the last digit, the 2nd digit must be equal to the 2nd last digit and so on until no numbers or single number is left in the middle.

If all digit pairs are equal then we have a palindrome, if even a single pair of digit doesnot match than we have no palindrome.

While getting the last digit of a number will be easy with **Modulus division by 10 method**, getting the first digit of the number will be difficult since we don't know how big the input will be.

Thus, why not try to reverse the integer without converting to string via the modulus division. If we use this equation `reversed_num = (reversed_num * 10) + (x % 10)` initializing `reversed_num as 0` we can get the reversed number.

```python
def palindrome_number(x):
  # We still return false for all negative numbers
  if x < 0:
    return False
  
  # We add another check if the number is a single digit then we return true directly
  if x >= 0 and x < 10:
    return True
  
  # Here we check if the number is not 0 and perfectly divisible by 10 then we know
  # for sure the number cannot be palindrome, e.g. 10 != 01, 250 != 052, etc
  if x % 10 == 0 and x != 0:
    return False

  reversed_num = 0
  y = x
  while y > 0:
    reversed_num = (reversed_num * 10) + (y % 10)
    y = y // 10
  
  return x == reversed_num
```

Here we are using `y` as placeholder for `x` since we need the value in `x` at the end to check palindrome.

But if we look at the property of palindrome, then we don't even have to reverse whole number. For example: if we have a number given as `45054` then if we start reversing the number and stop in the middle we get `450` and don't use `y` then we will be left with `x = 45` which means the `reversed_half // 10` is equal to `x` as the middle number will be in the same position anyway.

If we take a number with even number of digits, e.g. `3663` then we will have `x = 36` and `reversed_half = 36`. So instead of looping through the whole number we can stop in middle and check for the remaining `x` and the `reversed_half`

```python
def palindrome_number(x):
  # We still return false for all negative numbers
  if x < 0:
    return False
  
  # We add another check if the number is a single digit then we return true directly
  if x >= 0 and x < 10:
    return True
  
  # Here we check if the number is not 0 and perfectly divisible by 10 then we know
  # for sure the number cannot be palindrome, e.g. 10 != 01, 250 != 052, etc
  if x % 10 == 0 and x != 0:
    return False

  reversed_half = 0
  
  # instead of looping through whole digits of the number
  # we stop as soon as the reversed_half is greater than x which is after the middle number
  while x > reversed_half:
    reversed_half = (reversed_half * 10) + (x % 10)
    x = x // 10
  
  # We are checking for both cases when the given integer has even number of digits and odd
  return x == reversed_half or x == reversed_half // 10
```

### Visualizaton

<video controls width="100%" style="border-radius: 8px;">
  <source src="/videos/palindromenumbernostring.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Time complexity comparisons

**Algorithm** | **Explanation** | **Time complexity** | **Space complexity**
--|--|--|--
**String conversion approach** | Convert the integer to string, reverse and convert back to integer to match for palindrome | $O(log_{10}(x))$ | $O(log_{10}(x))$
**Half reversed approach** | Use mathematical equation to reverse half the integer and check with the remaining half for palindrome | $O(log_{10}(x))$ | $O(1)$
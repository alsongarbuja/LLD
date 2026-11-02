# Add Two Numbers (LC2) `Medium`

You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Example 1:**

Input: `l1 = [2,4,3], l2 = [5,6,4]`

Output: `[7,0,8]`

Explanation: `342 + 465 = 807.`

**Example 2:**

Input: `l1 = [0], l2 = [0]`

Output: `[0]`

**Example 3:**

Input: l1 = `[9,9,9,9,9,9,9], l2 = [9,9,9,9]`

Output: `[8,9,9,9,0,0,0,1]`
 

**Constraints:**

- The number of nodes in each linked list is in the range `[1, 100]`.
- `0 <= Node.val <= 9`
- It is guaranteed that the list represents a number that does not have leading zeros.

## Solutions

### Straight forward approach

From the question itself we can easily guess what we need to do in order to solve the problem.

1. We first create the number from the linkedlist by reversing the numbers.
2. Add the two numbers together
3. Get each digit of the result with **Modulus division by 10** method
4. Reverse the digits and add to linked list

```python
def add_two_number(l1, l2):
    head = l1
    num1 = 0
    num2 = 0
    multiplier = 1

    # Traversing the first linked list to get the first number
    while head is not None:
        # Since the number is reversed, we can simply multiply the value with current multiplier and add to the num1
        num1 = num1 + (head.val) * multiplier

        # Increase the multiplier by 10 fold as we are moving from one's place to ten's then 100's
        multiplier = multiplier * 10 
        head = head.next
    
    multiplier = 1
    head = l2

    # Traversing the first linked list to get the second number
    while head is not None:
        num2 = num2 + (head.val) * multiplier
        multiplier = multiplier * 10
        head = head.next
    
    # Adding the two number together
    result = num1 + num2

    if result == 0:
        return ListNode(0) # if the result is 0 return a ListNode with 0 as the value

    # Create a new linked list for the result
    dummy = ListNode()
    current = dummy
    
    while result > 0:
        digit = result % 10
        result = result // 10

        current.next = ListNode(digit)
        current = current.next
    
    return dummy.next
```

As we can see, it is a pretty straight forward solution to the problem. The time complexity for this algorithm will be `O(max(N, M))` where **N and M** represents the length of 1st and 2nd linked list respectively.

The time complexity doesnot look that bad considering, it will for sure take **N or M** iteration to construct the output linked list but the way we reached there is the problem.

1. There are actually 3 loops we are doing in the algorithm, 1st loop to construct the 1st number `(O(N))`, then the 2nd loop to construct the 2nd number `(O(M))` and finally the 3rd loop to construct the output linked list `O(max(N, M) + 1)`. It is just we simplify the term `O(N) + O(M) + O(max(N, M) + 1)` to `O(max(N, M))`
2. If say our input linked list has **100 nodes** than in some programs we have fixed size of bits allocated to an integer which means if we construct the number we will hit **an overflow error**
3. And finally there is the cost of doing huge mathematical calculations in our case the `num1 = num1 + (head.val * multiplier)` which will need a better performing CPU based on the number of nodes to be calculated.

#### Visualization

<video controls width="100%" style="border-radius: 8px;">
  <source src="/videos/addtwonumberssimple.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

### Clever approach

But of course we can do better than this, or a matter of fact we have to do it better than this. How do we do it?

First thing we have to somehow decrease the numbers of loop we need in our algorithm, currently we have **3 loops** running which makes the algorithm error prone. 

If we think for a second then we can see the linked list host single digit and in reverse order, which means in a single loop we can have **access to both the last digit** (digits in the one's place) of the numbers so if we can add those two together than we already get our **last digit of the result** (or the **first value of our output linked list**) plus a **carry out** which we can feed to the next loop.

Similar to how we do addition of **large number in pen and paper.**

```python
def add_two_numbers(l1, l2):
    p1 = l1 # pointer for 1st linked list
    p2 = l2 # pointer for 2nd linked list
    l3 = ListNode() # Initialize the result linked list
    dummy = l3 # dummy head for the output linked list
    carry = 0 # Initialize a variable to store the carry

    # Run the loop while we have element either linked list or the carry is not equal to zero
    while p1 or p2 or carry:
        currentSum = carry

        if p1 is not None:
            currentSum = currentSum + p1.val
            p1 = p1.next

        if p2 is not None:
            currentSum = currentSum + p2.val
            p2 = p2.next

        # Find the carry of current sum
        carry = currentSum // 10

        # Add the modulus result of current sum as the next node of the result
        dummy.next = new ListNode(currentSum % 10)
        dummy = dummy.next

    return l3.next
```

Here we have reduced the number of loops from **3 down to 1** by taking `advantage of the constraints` **(very important the constraints)**, we were able to use the simple pen and paper addition method to add the single digits together and create a new linked list in reverse order as well in the single loop.

The time complexity of this algorithm will be same as the previous approach `O(max(N, M))` since we are at worst case going to iterate over **N or M** times to build the final linked list.

But the true advantage of solving this problem is:

1. There **won't be any interger overflow error** since the most addition we are doing at a time is `(9+9+1) = 19` (1 from carry if any).
2. Mathematical calculation will also be faster as we don't have to construct any huge numbers.
3. Also the code itself has single pass/loop instead of the 3 loops before.

#### Visualization

<video controls width="100%" style="border-radius: 8px;">
  <source src="/videos/addtwonumbersclever.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Time complexity comparisons

**Algorithm** | **Approach** | **Time Complexity** | **Storage Complexity**
--|--|--|--
**Straight forward** | Construct each numbers, add them together and create the output linked list | $O(max(N, M))$ | $O(max(N, M))$
**Clever** | In a single loop add each digit together to get the output digit with carry that can be passed to next iteration, similar to pen and paper method | $O(max(N, M))$ | $O(max(N, M))$

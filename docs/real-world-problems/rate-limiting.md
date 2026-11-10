# Rate Limiting

While database scaling was the process of handling the growth in our system, `Rate Limiting` is the process of handling the survival from the sudden spikes to the system.

In simple terms, rate limiting is the way of limiting the requests a user can make to our system in a smooth and fail-safe way such that we don't punish everyone for mistake/intention of one bad actor.

<img src="/imgs/ratelimiting.png" alt="Rate limiting layer" />

## Question

**`"You have a weather API application that provides the 7 day weather forecast of any city around the world. How can you protect your system such that you keep your system up and running for good users while blocking the bad intention requests?"`**

## Answer

The one line answer for this is using `rate limiting` with centralized in-memory datastore `redis` and the `Token Bucket algorithm`. 

But as an system architecture, we need to consider the constraints of the system we are working on and the cost as well as risk associated with implementing the rate limiting.

The first step in any system design interview, (if they haven't provided with ample system constraints) `ask interviewer questions about the constraints of the system.`

- Is the application for developers who will use API Key to access the API or anonymous users on a website?
- What is the business model? Do we have pricing tiers?
- Is the system deployed on a single server? or is available globally via distributed systems?
- What is the tolerance for the latency?

## Identifying the key for rate limiting

The first step we need to think about is the key that will be used to determine the rate limiting for each users. Think of it as an ID for students in a university used to determine how many books they can borrow from library and how many they have already taken.

Based on the answer to our first question we can say the following points:

1. If the application uses an API key (most probably in modern systems), we can use that to determine the users and define rate limiting on that.
2. If the application doesnot have any API key and anyone on the internet can use it then it gets tricky.

In case we don't have any API key to use, first we see if our users needs to be authenticated to recieve our services or not? If yes, we can use the user Id to generate tokens and session IDs which can be used as the key.

If anonymous user can also use the application, then we can first use `IP address to set the rate limit.` But using IP address to set hard limitations can block legitimate users for example, students connected to campus Wi-Fi all will have same public IP address (NAT) thus we need to add high request per user.

Though adding high request per user as rate limit will allow bad intention developer through the system too so we add more layer of rate limiting. We can add a more strict limitation with IP + endpoint (for example: 5 request per second for the /login endpoint).

And finally we can use the authenticated user id, sessions and tokens to set rate limit for authenticated endpoints.

<img src="/imgs/ratelimitforanomusers.png" alt="Rate limiting for anonymous users" />

## Algorithm of choice

Next step is to determine the algorithm of choice for rate limiting. Below are the most commonly used algorithms.

1. **Fixed window counter** 
    - It is a simple alogrithm with fixed number of limits per user per some time (e.g. 100 request per minute per user, meaning a user can do 100 request from say 1:00 PM to 1:01 PM). 
    - But, this algorithm has a flaw `Brust attacks`. If a malicious user send 100 request at 1:00:59 then they can send another 100 request at 1:01:00 which means our server has to handle 200 request in 2 seconds.
2. **Sliding window log**
    - This algorithm is a modified version of the fixed window counter. Instead of using rigid time windows, it logs every request timestamp in a cache (e.g., Redis). Before logging a new request, it checks the logs for the preceding 60 seconds. If the token limit has already been reached within that rolling window, the request is rejected.
    - It also has a disadvantage, which is it consumes **massive amount of memory**. For example for premium users say we want to give 5000 requests per minute then we need to store 5000 timestamps for each single users. 
3. **Token Bucket**
    - This standard rate-limiting algorithm uses a fixed-capacity bucket to hold tokens. Each incoming request consumes a token and is forwarded to the server; if the bucket is empty, the request is rejected. 
    - The bucket is dynamically refilled over time based on the elapsed time between the current request and the last refill timestamp.
4. **Leaky Bucket**
    - The leaky bucket algorithm uses the same concept of bucket holding tokens, but instead of allowing for burst request and setting hard limit to the number of tokens, here we add a background process that pulls requests at fixed steady rate.
    - This means even during massive traffic flow into the system they are added to a <Tooltip text="First In First Out Queue is the type of queue where the process/data that enters the queue first is the first one to be processed">`FIFO Queue`</Tooltip> and a background worker will pull requests in steady rate, while the queue might reject or drop certain requests.

## Distributed architecture

Now the question remains, what if the system doesnot live on a single server, instead accross multiple servers.

Then we have a problem where a user can send the request until the token limit in one server then switch to another server where they will get another batch of tokens. Thus we will need a `centralized fast in-memory datastore` <Tooltip text="A blazig fast in-memory based datastore/database">(Redis)</Tooltip> that will hold the information about the token and the related user. 

Our rate limiting algorithm that sits in the API Gateway will use the centralized datastore to read and decrement the number of tokens/request each user get.

<img src="/imgs/ratelimitdistributed.png" alt="Distributed rate limiting setup" />

## Graceful rejection

When implementing rate limit, we also need to think for `handling rejections`. Instead of simply throwing/sending back general `500 server error` to users, we need to gracefully reject the request and inform users so that they can improve their application to better handle the API calls.

Here are some things we can do to make the rejection more smoother:
- Return `429 Too many request` status instead of 500 server error
- Include headers so genuine developers know how to fix their code, such as `X-RateLimit-Limit`, `X-RateLimit-Remaining` and `Retry-After` to tell them after how much they can retry.
- We can also configure our system to have `"fail-open"`, for edge cases such as Redis rate-limiting cluster going down. We can temporarily let the traffic to the application server while we fix the cache layer.

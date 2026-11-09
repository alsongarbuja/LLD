# Database Scaling

`Database` refers to the storage where we store the data, whereas the methods provided by the system to manipulate those data is called as `Database Management System (DBMS)`

Some of the prominent database/dbms are `SQL`, `Postgresql`, `MongoDB`, `VectorDB`, `Redis`, etc.

Each database have their own advantage and disadvantages, but here we are interested in the process of scaling the database. Also, most modern gaint applications use the **mixture of more than two databases** to handle their data.

## Question

**`"Say you have an application with 10k users, but now it is gaining traction and have 1 million users. How can you scale your database?"`**

## Answer

While it seems natural to state the answer with a complex distributed scalling setup and fancy techniques like `sharding` and the first thing you must do, is **`ask your interviewer`** these questions.

- Is the system `read-heavy` such as social media apps or `write-heavy` like logging systems?
- What is the current bottelneck of the database, **CPU**, **RAM** or **Storage**?
- Does our system require **strict consistency or eventual consistency is acceptable**?

These questions will show the interviewer, we know scaling a database requires the understanding of the current workload or system needs.

::: tip
Database scaling can be costly and take a lot of time and can introduce various problems while implementing scaling system. Thus, there is no simple and straight forward answer to database scaling needs.
:::

Now let's look at the techniques we can use to scale the database.

## Query Optimization / Code updates

While asking the questions, you can clarify some of the cheap techniques that can be used to try and scale the database **(or rather optimize the system to reduce the load and not having to scale the database)**.

Here are some optimizations one can do:
1. Audit slow queries and optimize them.
2. Adding indexes for preventing full table scans.
3. Fixing the <Tooltip text="N+1 query problem is a common mistake developers often fall into by blindly trusting ORM's when querying related tables in a loop.">**N+1**</Tooltip> problems.

## Caching

Another method we can use to reduce the load of the system without having to scale the database is `caching`.

We can introduce a caching layer between the database server and the application server using distributed cache services like `Redis` or `Memcached`. Any data that are frequently read and is updated very rarely (such as user profiles, site configurations, etc) can be added to the cache which will handle the network loads from the users and can reduce database load by 30% to 80% depending on the read heaviness of the system.

::: warning
While caching can help to reduce load to the database, it also introduces problems from different prespective such as handling `eventual consistency`, `cache lags` and more, thus adding caching needs to be well thought out before implementation.
:::

## Vertical Scaling

One of the most easy way to scale a database system is **Vertical Scaling**. It is simply the process of adding more power to the current system, i.e. adding more `RAM` or `Storage` to the currently running Database.

We don't have to update any code or underlying hardware, simply add more processing power to the system, and it is often cheaper to pay cloud service providers for a bigger processor than to hire enigneers to create a sharded database layer (which we will talk later about.)

<img src="/imgs/verticalscalingDB.png" alt="Database vertical scaling" />

## Read Replication

If the system is a read-heavy application such as social media applications where most of the traffic to the database comes from read operations `(SELECT)` then we can spin up replicas `(called as read replicas)` such that the Primary database will handle the write operations `(INSERT, UPDATE, DELETE)` and all the replications will be used with load balanacer to handle the read operations.

<img src="/imgs/readreplicas.png" alt="Read replication data flow" />

::: warning
While spinning up replicas of the database and using load balancer to handle the read operations sounds easy to implement, it does have its own gotach such as `consistency issues to the replicas where someone writes to the primary data and some of the replicas might not have the updated data from where other users will read the data`
:::

## Asynchronous processing for writes

What if the system is write-heavy and users require heavy operations such as uploading, proessing-intensive files or sending batch emails? we can introduce an async layer that will act as a messaging queue and update the database in controlled and safe way.

<img src="/imgs/asyncprocesswritelayer.png" alt="Async processing write layer" />

::: warning
Of course, this method also comes with things to consider while implementing like the `importance of each message/process if they are all important to be processed or not and if they the order of the operations matter or not`.
:::

## <Tooltip text="Process of dividing the data into multiple databases based on some logical and unique key">Sharding</Tooltip> / Horizontal Scaling

The final technique we can implement if the **`primary database even with massive server computing power, caching layers and message queue layers`** fails to handle the incoming massive traffic is `Horizontal scaling` or `Sharding`.

In this method we will use more than one database and share the data among those databases to minimize the load each database will handle.

We can use **logical and unique keys** to determine which database the data will go into, and later use that key to direct the request by user to the correct database too.

<img src="/imgs/shardingflow.png" alt="Sharding of database" />

::: tip
If the database is SQL-based and we must stick to it, then we can use logical keys like `Geographic region` or `hash of unique ids` to shard the data.

While if the data doesnot need to be strict ACID transactions and is well suited for sharding then, we can migrate that part of the data to a horizontally scalable NoSQL database like `DynamoDB, Cassandra or MongoDB`. 
:::

::: warning
As stated earlier, sharding needs to be done very carefully and costs alot to implement in any existing system. 

SQL based databases nutoriously are difficult to shard and they will eventually lose the `JOIN` operation advantage as the sharding becomes complex and also becomes difficult to maintain ACID transactions.
:::


Here you go, the answer interviewer are looking for and what you must prepare yourself with when someone asks about database scaling. Instead of simply throwing big buzz words like sharding and distributed databases we need to make sure we know the cost and risk involved when scaling a database, and answer the question according to the situation of the system.
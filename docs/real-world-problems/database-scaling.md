# Database Scaling

`Database` refers to the storage where we store the data, whereas the methods provided by the system to manipulate those data is called as `Database Management System (DBMS)`

Some of the prominent database/dbms are `SQL`, `Postgresql`, `MongoDB`, `VectorDB`, `Redis`, etc.

Each database have their own advantage and disadvantages, but here we are interested in the process of scaling the database. Also, most modern gaint applications use the **mixture of more than two databases** to handle their data.

## Question

Say you have an application which is starting to gain popularity and all of a sudden you have more than 10 million active users, but you have been using the simple database setup capable of handling around 100k users.

How can you scale your database? Such that you can easily handle the new **10 million** active users, or in future **100 million** users or **1 billion** users.

## Answer

The first thing you must do, is **`ask your interviewer`** these questions.

- Is the database `SQL based` or `No-SQL based` or mixture of both?
- Is the new **10 million** active users, daily users or overall active users?
- Will the addition of users has upper limit or it can grow to massive numbers?

The purpose of asking this questions, is to first gain some more hidden knowledge about the supposed system. Cause when scaling database all of those things matter and blindly telling the answer will only show you have read the solution but not understood it.

Now the answer to the question.

## Vertical Scaling

One of the most easy way to scale a database system is **Vertical Scaling**. It is simply the process of adding more power to the current system, i.e. adding more `RAM` or `Storage` to the currently running Database.

If the question was your system could handle 10k users but now you have 100k users in the system. And in your follow up question 3, if the answer is no the upper limit is set to `100k` users. Then simply doing a vertical scaling can do the trick.

We don't have to update any code or underlying hardware, simply add more processing power to the system.

<img src="/imgs/verticalscalingDB.png" alt="Database vertical scaling" />

## Horizontal Scaling

Say, the answer to the 3rd follow up question was no the users could grow from **100k to 10 million to 100 billion**, then we can't do **vertical scaling** forever. Since there is a physical limit to how much we can increase a database processing power we can't apply vertical scaling for more growing users.

Thus, instead of going up/adding up we need to think side by side. `Horizontal scaling` is the process of adding more databases to the overall system to accomodate for the growing users.

It is one of the most used method of scaling in cloud based services such as `AWS`, `GCP`, `AZURE` and more.

# Kaley built the TimeBlocker productivity app

## Tagline

TimeBlocker improves productivity by automating the time blocking productivity method.

## Introduction

As a student, I am always struggling with productivity and keeping myself from becoming overwhelmed. The TimeBlocker app is intended to help with that, by automating the "time blocking" productivity method for users. In this method, each task is allocated a certain amount, or block, of time to do. The user ends up with a concrete schedule for the day, instead of an open-ended to-do list. TimeBlocker would make it easy for the user to remember when a task's block of time starts and ends, by sending the user a text message notification.

## About Me

My name is Kaley Kwan. I'm a senior in high school from the Bay Area. I am a swimmer and student journalist intending on majoring in computer science in college. I'm passionate about using technology to improve the environment and my community.

## Behind the Scenes

![Serverless Camp Project](https://user-images.githubusercontent.com/67166728/132080128-01f299b7-6c22-4ffe-9655-568dfe108e84.jpg)

### The Form

First, you fill out a form with your name, the start time for your task, the end time, and your phone number. 

### Text Notifications

When the current time matches the time you input for the start and end of your task, you will receive a text message notifying you.

## Technologies

### Cosmos DB:
![tb-database](https://user-images.githubusercontent.com/67166728/132080373-56469526-be34-4625-82dc-01aa7a8d9ced.PNG)

Cosmos DB is a database to store user information from the form.

### Azure Functions:

* HTTP-Trigger Function: stores form data in Cosmos DB
* Timer-Trigger Function: sends text notifications to users whenever their task starts or ends

### Twilio API

![twilio](https://user-images.githubusercontent.com/67166728/132080517-dd97a6c1-0a0a-4d65-a787-f584b43e3c6d.PNG)

This API was used to send text notifications to users.

## Moving Forward

There are a lot of features that can be added to expand the web app, including a field in the form for a task description, and a history of a user's tasks. Additionally, there are a lot of other potential uses for this web app outside of the time blocking productivity method!

## Thanks and Acknowledgements
Thank you to BitProject for hosting such a fun and educational camp, to my instructors for being patient and helpful whenever my code deigned not to work, and especially to my mentor for readily helping me debug every problem. Most of these tools were entirely new to me, so building this web app was a really fun challenge and a really great opportunity to learn more about Serverless and Azure functions!
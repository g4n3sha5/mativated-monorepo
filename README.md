<div align="center">
  <a href="https://github.com/g4n3sha5/MatiVAted">
    <img src="apps/client/src/assets/images/logo-removebg.png" alt="Logo" width="80" height="80">
  </a>
</div>

# Mativated: Rebuild

I'm excited to introduce the newest release of [Mativated](https://github.com/g4n3sha5/MatiVAted) rebuild - now powered by React (Vite), TypeScript, tRPC, and Express.js as the core technologies. It also utilizes Prisma as its ORM, MySQL as its database, and Clerk as its authentication solution.  
Thanks to this stack, the app is fully typesafe. This rebuild marks a significant leap forward, ensuring a seamless and reliable experience for users.

By capitalizing on this technology stack, I've been able to focus on what truly matters: refining the app's core features and performance. Building upon the existing layout has allowed me to dive straight into coding, prioritizing code quality, avoiding unnecessary design iterations, and enabling a more efficient development process.

Backend is deployed on AWS.
Working on the app in my spare time. Contributors welcome.

## Concept

As numerous studies have shown, monitoring your progress and tracking your habits make us significantly more prone to improve our behaviour and progress faster. Small wins are massive motivators, but we need to recognize them. This project provides utilities for people who love sport - especially grappling Martial Arts.

## About

I created the project inspired by literature about habits, as Jiu-Jitsu is my passion and I didn't know any app for this martial art - I decided to create one - primarily to keep a record of my trainings. Following this idea I did:

- Concept
- Logo
- Name
- Colors and Typography
- Landing page and general UI & UX design

Sessions

- Dashboard (Statistics)
- Add Session (Save Session type, length, techniques learned etc.)

And much more to come soon as I progress with the code.

## Screenshots

[![image.png](https://i.postimg.cc/8PbTY5tC/image.png)](https://postimg.cc/1ffxn9xx)

[![matjournal.png](https://i.postimg.cc/mZS6JsmV/matjournal.png)](https://postimg.cc/vDczxpF6)

## Tech Stack

**Client:** React, Vite, React-hook-form, shadcn, TailwindCSS, React Router, React Query, Clerk, tRPC, tailwind-animate

**Server:** Node, Express, TypeScript, Prisma, tRPC

![logo](https://user-images.githubusercontent.com/116462435/227205699-fc9fae9f-02a4-4240-b9c3-9eccc002573f.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/g4n3sha5/mativated-monorepo
```

Go to the project directory

```bash
  cd mativated-monorepo
```

Install dependencies

Clone the repo, install dependencies with
pnpm install
pnpm install turbo --global

run client and server with  
 

```bash
  pnpm install
```

Generate models in apps/server path

```bash
  pnpm prisma generate
```

Setup the environment variables in apps/client and apps/server

```bash
  cp .env.example .env
```

Start the app

```bash
  turbo run dev
```

## 🚀 About Me

I'm a front-end oriented full-stack developer with great passion for programming.
I want to become Jiu Jitsu national champion, and I am everyday closer to my goal. Mativated is supporting me in this journey since 2023, but I'm not fully satisfied with the previous version and its technology stack, that's why I remake it.
This rebuild is so far my best Developer Experience leveraging the power of React + TypeScript combined with tRPC + Prisma + Zod.

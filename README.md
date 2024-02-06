This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Creating a electron app
For create a electron app of this run:
```bash
npm run dist
# or
yarn dist
# or
bun dist
```
## About
It is a simple project for collecting data for research purpose.
This app generates random code combining the 4 first letters of the alphabet.
So for each code, the user must memorize the sequence and after a short time
they have to write the shown code correctly, for each letter has a validation, in that way, the user cannot finish the current task whether the wrote sequence is not correct, for all session a time will be set, and after this time runs out
the data will be available for export in YAML format.

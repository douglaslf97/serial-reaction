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

## Creating an electron app
For create an electron app of this run:
```bash
npm run dist
# or
yarn dist
# or
bun dist
```
## About
It is a simple project for collecting data for research purpose. <br >
This app generates random code combining the 4 first letters of the alphabet.<br>
So for each code, the user must memorize the sequence and after a short time <br>
they have to write the shown code correctly, for each letter has a validation, in that way,<br>the user cannot finish the current task whether the wrote sequence is not correct, for all session a time will be set,<br> and after this time runs out
the data will be available for export in YAML format.

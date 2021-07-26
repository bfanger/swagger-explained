# Svelte Project Template

Svelte project preconfigured with:

- Sveltekit (Vite)
- Typescript
- Sass
- Eslint & Prettier

## Setup

```sh
npx degit "github.com/bfanger/svelte-project-template#main" my-svelte-project
cd my-svelte-project
npm install   # or  yarn install
npm run dev   # or  yarn dev
```

## Linting

```sh
npm run lint  # or  yarn lint
```

To automaticly run linting before a git commit:

```sh
touch .git/hooks/pre-commit
chmod a+x .git/hooks/pre-commit
```

Creates the `.git/hooks/pre-commit` and makes it executable.

Edit the `pre-commit` file and replace the contents with:

```sh
#!/bin/sh
npm run precommit
```

## Build

```sh
npm run build  # or  yarn build
npx serve -s build
```

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version >= 20
- Install [PNPM](https://pnpm.io/installation#using-corepack) version >= 9

# Getting started

#### Clone the repository
```bash
git clone https://github.com/nonamich/test-task-one
```
#### Install dependencies
```bash
cd test-task-one
pnpm install

```
#### Prepare Infrastructure
```bash
docker compose -f compose.infra.yml up -d
```

## Environment
```bash
cp .env.example .env
```
> Generate secret `openssl rand -hex 32` for **JWT_ACCESS_SECRET** and **JWT_REFRESH_SECRET**

#### Running
```bash
pnpm run dev
```

#### Navigate
```bash
open http://localhost:3000
```

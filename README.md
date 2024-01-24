# Human Livestocks

Not your usual starboard bot.

## Develop

This is a [Turborepo](https://turbo.build/repo).

### Environment Variables

There are `.env.example` files located in the root and apps/packages folders. These files contain the environment variables required to run the project. Copy the contents of the `.env.example` file to a new `.env` file and fill in the values.

- /.env.example
- /apps/web/.env.example
- /apps/bot/.env.example
- /packages/db/.env.example

### Get Started

To develop all apps and packages, run the following commands:

```bash
pnpm install # install dependencies
docker compose -f docker-compose.local.yml up -d # start redis server
pnpm dev # start apps
```

## Build

The entire project can be dockerised and run with the following command:

```bash
docker compose up
```

If you encounter any issues with the web dashboard, especially if changing the output environment variable, delete the `.next` folder and rebuild.

### Remote Caching

To speed up Docker build times, complete the `.env` file in the root. More information can be found [here](https://turbo.build/repo/docs/handbook/deploying-with-docker#remote-caching).

## Deployment

Currently, the web application is deployed on [Netlify](https://www.netlify.com/) and the bot is dockerised and deployed on a VPS.

## Useful Commands

```bash
docker compose -f docker-compose.local.yml up -d
pnpm [command] --filter package_name
```

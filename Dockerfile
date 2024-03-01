FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app

RUN apt-get update -y

# The node image does not come with ca-certificates installed but is required for requests made by Sentry.
RUN apt-get install -y ca-certificates

FROM base AS build
WORKDIR /app

#<editor-fold desc="Build Args and Environment setup">

# When using private packages, you need to provide the NPM_TOKEN
#ARG NPM_TOKEN
#ENV NPM_TOKEN=$NPM_TOKEN

# When using Sentry, you need to provide the SENTRY_AUTH_TOKEN
#ARG SENTRY_AUTH_TOKEN
#ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN

# Private API_URL, if you want access to the URL in client components you must prefix it with
# NEXT_PUBLIC_, e.g. NEXT_PUBLIC_API_URL
ARG API_URL
ENV API_URL=$API_URL

# When creating a Docker image for NextJS you must set the output in `next.config.mjs` to "standalone"
# Defining it here will make sure that for docker builds the output is set to "standalone"
# so that local development can continue to use `npm run build` and `npm run start`
ARG NEXT_OUTPUT="standalone"
ENV NEXT_OUTPUT=$NEXT_OUTPUT
#</editor-fold>

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Disable telemetry during build time
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM base
WORKDIR /app
COPY --from=build /app/node_modules /app/node_modules

# Disable telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED 1

# Add nextjs user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
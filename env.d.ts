namespace NodeJS {
  interface ProcessEnv {
    API_URL: string;
    SENTRY_AUTH_TOKEN: string;
    NEXT_OUTPUT: undefined | 'standalone' | 'export';
  }
}

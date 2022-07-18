export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PG_HOST: string;
      PG_USER: string;
      PG_PASSWORD: string;
      PG_DATABASE: string;
      PG_PORT: number;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
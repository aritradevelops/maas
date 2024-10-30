namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    JWT_SECRET: string
    UNKEY_ROOT_KEY: string
    NEXT_PUBLIC_HANKO_API_URL: string
    AWS_S3_ACCESS_KEY
    AWS_S3_SECRET_KEY
    BUCKET_REGION
    BUCKET_NAME
  }
}
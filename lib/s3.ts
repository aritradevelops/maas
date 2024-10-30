import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
export class S3 {
  private client: S3Client
  constructor() {
    this.client = new S3Client({
      region: process.env.BUCKET_REGION as string,
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY as string
      }
    })
  }
  async upload(name: string, data: Buffer, contentType: string) {
    return await this.client.send(new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: name,
      Body: data,
      ContentType: contentType,
      ContentLength: data.byteLength,
    }))
  }
  getUrl(key: string) {
    return `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${key}`
  }
}

declare const globalThis: {
  S3: S3;
} & typeof global;

const Storage = globalThis.S3 ?? new S3()

export default Storage

if (process.env.NODE_ENV !== 'production') globalThis.S3 = Storage

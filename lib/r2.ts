import { S3Client, GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

// Lazy initialization to avoid build-time errors
let _r2Client: S3Client | null = null

function getR2Client(): S3Client {
  if (!_r2Client) {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
    const accessKeyId = process.env.R2_ACCESS_KEY_ID
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY

    if (!accountId || !accessKeyId || !secretAccessKey) {
      throw new Error("R2 credentials not configured")
    }

    _r2Client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })
  }

  return _r2Client
}

function getBucketName(): string {
  const bucketName = process.env.R2_BUCKET_NAME
  if (!bucketName) {
    throw new Error("R2_BUCKET_NAME not configured")
  }
  return bucketName
}

export type PresignedUrlOptions = {
  expiresIn?: number // seconds, default 24 hours
}

/**
 * Generate a presigned URL for downloading a file from R2
 */
export async function generatePresignedDownloadUrl(
  r2Key: string,
  fileName: string,
  options: PresignedUrlOptions = {}
): Promise<string> {
  const { expiresIn = 86400 } = options // 24 hours default

  const client = getR2Client()
  const bucketName = getBucketName()

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: r2Key,
    ResponseContentDisposition: `attachment; filename="${fileName}"`,
  })

  return getSignedUrl(client, command, { expiresIn })
}

/**
 * Check if a resource exists in R2
 */
export async function checkResourceExists(r2Key: string): Promise<boolean> {
  try {
    const client = getR2Client()
    const bucketName = getBucketName()

    const command = new HeadObjectCommand({
      Bucket: bucketName,
      Key: r2Key,
    })

    await client.send(command)
    return true
  } catch {
    return false
  }
}

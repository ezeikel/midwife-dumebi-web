import crypto from "crypto"

function getSecret(): string {
  const secret = process.env.DOWNLOAD_TOKEN_SECRET
  if (!secret) {
    throw new Error("DOWNLOAD_TOKEN_SECRET not configured")
  }
  return secret
}

export type TokenPayload = {
  resourceId: string
  email: string
  expiresAt: number // Unix timestamp in milliseconds
}

/**
 * Generate a secure download token with HMAC signature
 * Token expires after the specified time (default: 7 days)
 */
export function generateDownloadToken(payload: TokenPayload): string {
  const secret = getSecret()
  const data = JSON.stringify(payload)

  const signature = crypto.createHmac("sha256", secret).update(data).digest("hex")

  // Combine data and signature, then base64url encode
  return Buffer.from(`${data}|${signature}`).toString("base64url")
}

/**
 * Validate a download token
 * Returns the payload if valid, null if invalid or expired
 */
export function validateDownloadToken(
  token: string,
  expectedResourceId: string
): TokenPayload | null {
  try {
    const secret = getSecret()

    // Decode the token
    const decoded = Buffer.from(token, "base64url").toString()
    const separatorIndex = decoded.lastIndexOf("|")

    if (separatorIndex === -1) {
      return null
    }

    const data = decoded.substring(0, separatorIndex)
    const signature = decoded.substring(separatorIndex + 1)

    // Verify signature
    const expectedSignature = crypto.createHmac("sha256", secret).update(data).digest("hex")

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null
    }

    // Parse and validate payload
    const payload: TokenPayload = JSON.parse(data)

    // Check resource ID matches
    if (payload.resourceId !== expectedResourceId) {
      return null
    }

    // Check expiration
    if (Date.now() > payload.expiresAt) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

/**
 * Create a token payload with default expiration (7 days)
 */
export function createTokenPayload(
  resourceId: string,
  email: string,
  expiresInDays: number = 7
): TokenPayload {
  return {
    resourceId,
    email,
    expiresAt: Date.now() + expiresInDays * 24 * 60 * 60 * 1000,
  }
}

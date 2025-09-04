import AWS from "aws-sdk";
import { env } from "../config/env";
import { logger } from "./logger";

// Configure AWS
if (env.AWS_ACCESS_KEY_ID && env.AWS_SECRET_ACCESS_KEY) {
  AWS.config.update({
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region: env.AWS_REGION,
  });
}

const s3 = new AWS.S3();

export class S3Service {
  private bucketName: string;

  constructor() {
    this.bucketName = env.S3_BUCKET_NAME || "fantasy-cards-images";
  }

  /**
   * Generate a pre-signed URL for uploading files to S3
   */
  async getPresignedUploadUrl(
    fileName: string,
    fileType: string,
    expiresIn: number = 300 // 5 minutes
  ): Promise<{ uploadUrl: string; fileUrl: string }> {
    try {
      const key = `players/${Date.now()}-${fileName}`;

      const uploadUrl = await s3.getSignedUrlPromise("putObject", {
        Bucket: this.bucketName,
        Key: key,
        ContentType: fileType,
        Expires: expiresIn,
        ACL: "public-read",
      });

      const fileUrl = `https://${this.bucketName}.s3.${env.AWS_REGION}.amazonaws.com/${key}`;

      logger.info("Generated presigned upload URL", { key, fileType });

      return { uploadUrl, fileUrl };
    } catch (error) {
      logger.error("Failed to generate presigned URL", error);
      throw new Error("Failed to generate upload URL");
    }
  }

  /**
   * Upload file directly to S3 (for server-side uploads)
   */
  async uploadFile(
    buffer: Buffer,
    fileName: string,
    mimeType: string
  ): Promise<string> {
    try {
      const key = `players/${Date.now()}-${fileName}`;

      const result = await s3
        .upload({
          Bucket: this.bucketName,
          Key: key,
          Body: buffer,
          ContentType: mimeType,
          ACL: "public-read",
        })
        .promise();

      logger.info("File uploaded to S3", { key, location: result.Location });

      return result.Location;
    } catch (error) {
      logger.error("Failed to upload file to S3", error);
      throw new Error("Failed to upload file");
    }
  }

  /**
   * Delete file from S3
   */
  async deleteFile(fileUrl: string): Promise<void> {
    try {
      // Extract key from URL
      const urlParts = fileUrl.split("/");
      const key = urlParts.slice(-2).join("/"); // Get last two parts (folder/filename)

      await s3
        .deleteObject({
          Bucket: this.bucketName,
          Key: key,
        })
        .promise();

      logger.info("File deleted from S3", { key });
    } catch (error) {
      logger.error("Failed to delete file from S3", error);
      throw new Error("Failed to delete file");
    }
  }

  /**
   * Check if S3 is properly configured
   */
  async isConfigured(): Promise<boolean> {
    try {
      await s3.headBucket({ Bucket: this.bucketName }).promise();
      return true;
    } catch (error) {
      logger.warn("S3 not configured or bucket not accessible", {
        bucketName: this.bucketName,
      });
      return false;
    }
  }
}

export const s3Service = new S3Service();

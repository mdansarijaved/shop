import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";
export const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_URL,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_ID!,
    secretAccessKey: process.env.CLOUDFLARE_ACCESS_KEY!,
  },
});

export async function deleteAllImagesFromBucket(bucketName: string) {
  try {
    // List all objects in the bucket
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
    });

    let isTruncated = true;
    let totalDeleted = 0;

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } = await r2.send(
        listCommand
      );

      if (!Contents || Contents.length === 0) {
        console.log("No objects found in bucket");
        break;
      }

      // Prepare objects for deletion
      const objectsToDelete = Contents.map((object) => ({
        Key: object.Key!,
      }));

      // Delete objects in batches of 1000 (S3 API limit)
      const deleteCommand = new DeleteObjectsCommand({
        Bucket: bucketName,
        Delete: {
          Objects: objectsToDelete,
          Quiet: false,
        },
      });

      const deleteResult = await r2.send(deleteCommand);
      totalDeleted += deleteResult.Deleted?.length || 0;

      if (deleteResult.Errors?.length) {
        console.error(
          "Errors during deletion:",
          JSON.stringify(deleteResult.Errors, null, 2)
        );
      }

      isTruncated = IsTruncated || false;
      if (isTruncated && NextContinuationToken) {
        listCommand.input.ContinuationToken = NextContinuationToken;
      }
    }

    return {
      success: true,
      message: `Successfully deleted ${totalDeleted} objects from bucket`,
    };
  } catch (error) {
    console.error("Error deleting objects:", error);
    return {
      success: false,
      message: "Failed to delete objects",
      error,
    };
  }
}

import fs from "fs/promises";
import path from "path";
import { s3, BUCKET_NAME } from "../config/s3.js";

export  default async function pullRepo() {
  const repoPath = path.resolve(process.cwd(), ".codeLab");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const data = await s3.listObjectsV2({
      Bucket: BUCKET_NAME,
      Prefix: "commits/",
    }).promise();

    const objects = data.Contents || [];

    for (const object of objects) {
      const key = object.Key;
      const commitDir = path.join(commitsPath, path.dirname(key).split("/").pop());

      await fs.mkdir(commitDir, { recursive: true });

      const params = {
        Bucket: BUCKET_NAME,
        Key: key,
      };

      const fileContent = await s3.getObject(params).promise();
      await fs.writeFile(path.join(repoPath, key), fileContent.Body);

      console.log(`Pulled: ${key}`);
    }

    console.log("All commits pulled from S3.");
  } catch (err) {
    console.error(" Unable to pull:", err);
  }
}

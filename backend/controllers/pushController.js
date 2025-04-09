import fs from "fs/promises";
import path from "path";
import { s3, BUCKET_NAME } from "../config/s3.js";
console.log(BUCKET_NAME);

/**
 * Uploads a single file to S3
 * @param {string} filePath 
 * @param {string} commitDir 
 * @param {string} file 
 */
async function uploadFile(filePath, commitDir, file) {
    try {
        const fileContent = await fs.readFile(filePath);
        const params = {
            Bucket: BUCKET_NAME,
            Key: `commits/${commitDir}/${file}`,
            Body: fileContent,
        };
        await s3.upload(params).promise();
        console.log(`Uploaded: ${commitDir}/${file}`);
    } catch (err) {
        console.error(`Failed to upload ${file}:`, err);
    }
}

//Pushes all commits

async function pushRepo() {
    const repoPath = path.resolve(process.cwd(), ".codeLab");
    const commitsPath = path.join(repoPath, "commits");

    try {
        const commitDirs = await fs.readdir(commitsPath);
        for (const commitDir of commitDirs) {
            const commitPath = path.join(commitsPath, commitDir);
            const files = await fs.readdir(commitPath);

            for (const file of files) {
                const filePath = path.join(commitPath, file);
                await uploadFile(filePath, commitDir, file);
            }
        }

        console.log(" All commits pushed to S3.");
    } catch (err) {
        console.error("Error pushing to S3:", err);
    }
}

export default pushRepo;

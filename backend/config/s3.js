import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();


// Initialize AWS SDK for Backblaze B2
const s3 = new AWS.S3({
    endpoint: process.env.B2_ENDPOINT,
    accessKeyId: process.env.B2_ACCESS_KEY, 
    secretAccessKey: process.env.B2_SECRET_KEY, 
    signatureVersion: "v4",
});


// Extract bucket name from env

const BUCKET_NAME = process.env.B2_BUCKET;
console.log(BUCKET_NAME);

// Export S3 instance and bucket name
export { s3, BUCKET_NAME };

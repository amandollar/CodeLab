import { promises as fs } from 'fs';
import path from 'path';

const initRepo = async () => {
    const repoPath = path.resolve(process.cwd(), ".codeLab");
    const commitsPath = path.join(repoPath, "commits");

    try {
        await fs.mkdir(repoPath, { recursive: true });
        await fs.mkdir(commitsPath, { recursive: true });

        await fs.writeFile(
            path.join(repoPath, "config.json"), 
            JSON.stringify({ bucket: process.env.S3_BUCKET })
        );

        console.log("Repository Initialized");

    } catch (err) {
        console.error("Error initializing repository:", err);
    }
};

export default initRepo;

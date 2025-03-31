import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';



const commitRepo = async(message)=>{
    const repoPath = path.resolve(process.cwd(),".codeLab");
    const stagePath = path.join(repoPath,"staging");
    const commitPath = path.join(repoPath,"commits");

    try{
        const commitId = uuidv4();
        const commitDir = path.join(commitPath,commitId);
        await fs.mkdir(commitDir,{recursive:true});

        const files = await fs.readdir(stagePath);
        for(const file of files){
            await fs.copyFile(
            path.join(stagePath,file),
            path.join(commitDir,file));
        }

        await fs.writeFile(path.join(commitDir,"commit.json"),JSON.stringify({message,date:new Date().toISOString}));

        console.log(`Commit ${commitId} created with message: ${message}`);

    }catch(error){
        console.error("Error commiting file", err);
    }
}

export default commitRepo;
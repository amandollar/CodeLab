import mongoose, { Schema } from "mongoose";

const RepoSchema = new Schema({
    
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    },
    content:[
        {
        type:String
        }
    ],
    visibilty:{
        type:Boolean
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    issues:[
        {
            type:Schema.Types.ObjectId,
            ref:"Issue"
        }
    ]
})


const Repository = mongoose.model('Repository',RepoSchema);

export default Repository;
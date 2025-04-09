import mongoose, { Schema } from "mongoose";

const RepoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  content: [
    {
      type: String,
    },
  ],
  visibility : {
    type: Boolean,
    default: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: "Issue",
    },
  ],
});

RepoSchema.index({ name: 1, owner: 1 }, { unique: true });
const Repository = mongoose.model("Repository", RepoSchema);

export default Repository;

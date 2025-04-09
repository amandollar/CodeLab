import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";

const createRepository = async (req, res) => {
  try {
    const { name, description, visibilty } = req.body;
    const owner = req.user.id;
    if (!name) {
      return res.status(400).json({ error: "Repository Name required" });
    }
    const newRepository = new Repository({
      name,
      description,
      visibilty,
      owner,
    });

    await newRepository.save();

    return res.status(200).json({
      message: "Repository Created",
      repository: newRepository,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllRepository = async (req, res) => {
  try {
    const repositories = await Repository.find({})
      .populate("owner")
      .populate("issues");

    res.status(200).json({ repositories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const fetchRepoById = async (req, res) => {
  try {
    const { id } = req.params;

    const repository = await Repository.findById(id)
      .populate("owner")
      .populate("issues");

    res.status(200).json({ repository });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

async function fetchRepoForCurrentUser(req, res) {
  const { userId } = req.params;

  try {
    const repositories = await Repository.find({ owner: userId });

    if (!repositories || repositories.length == 0) {
      return res.status(404).json({ error: "User Repositories not found!" });
    }
    console.log(repositories);
    res.json({ message: "Repositories found!", repositories });
  } catch (err) {
    console.error("Error during fetching user repositories : ", err.message);
    res.status(500).send("Server error");
  }
}

async function updateRepoById(req, res) {
  const { id } = req.params;
  const { content, description } = req.body;

  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ error: "Repository not found!" });
    }

    repository.content.push(content);
    repository.description = description;

    const updatedRepository = await repository.save();

    res.json({
      message: "Repository updated successfully!",
      repository: updatedRepository,
    });
  } catch (err) {
    console.error("Error during updating repository : ", err.message);
    res.status(500).send("Server error");
  }
}

async function toggleVisibiltyRepo(req, res) {
  const { id } = req.params;
  console.log(id)
  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ error: "Repository not found!" });
    }
    console.log(repository)

    repository.visibility = !repository.visibility;

    const updatedRepository = await repository.save();

    res.json({
      message: "Repository visibility toggled successfully!",
      repository: updatedRepository,
    });
  } catch (err) {
    console.error("Error during toggling visibility : ", err.message);
    res.status(500).send("Server error");
  }
}

async function deleteRepoById(req, res) {
  const { id } = req.params;
  try {
    const repository = await Repository.findByIdAndDelete(id);
    if (!repository) {
      return res.status(404).json({ error: "Repository not found!" });
    }

    res.json({ message: "Repository deleted successfully!" });
  } catch (err) {
    console.error("Error during deleting repository : ", err.message);
    res.status(500).send("Server error");
  }
}

export {
  createRepository,
  getAllRepository,
  fetchRepoById,
  fetchRepoForCurrentUser,
  updateRepoById,
  deleteRepoById,
  toggleVisibiltyRepo,
};

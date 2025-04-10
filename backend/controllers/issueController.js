import Issue from "../models/issueModel.js";

const createIssue = async (req, res) => {
  const { title, description, repository } = req.body;
  try {
    const issue = new Issue({
      title,
      description,
      repository: repository,
    });

    await issue.save();

    res.status(201).json(issue);
  } catch (err) {
    console.error("Error during issue creation : ", err.message);
    res.status(500).send("Server error");
  }
};

const updateIssueById = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found!" });
    }

    issue.title = title;
    issue.description = description;
    issue.status = status;

    await issue.save();

    res.json(issue, { message: "Issue updated" });
  } catch (err) {
    console.error("Error during issue updation : ", err.message);
    res.status(500).send("Server error");
  }
};

const deleteIssueById = async (req, res) => {
  const { id } = req.params;
    console.log("delete called")
  try {
    const issue = Issue.findByIdAndDelete(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found!" });
    }
    res.json({ message: "Issue deleted" });
  } catch (err) {
    console.error("Error during issue deletion : ", err.message);
    res.status(500).send("Server error");
  }
};

const getIssueById = async (req, res) => {
  const { id } = req.params;
  try {
    const issue = await Issue.find({ _id: id });

    if (!issue) {
      return res.status(404).json({ error: "Issues not found!" });
    }
    res.status(200).json({ issue });
  } catch (err) {
    console.error("Error during issue fetching : ", err.message);
    res.status(500).send("Server error");
  }
};

const getIssuesByRepositoryId = async (req, res) => {
  const { id } = req.params;
  try {
    const issues = await Issue.find({ repository: id });

    if (!issues) {
      return res.status(404).json({ error: "Issues not found!" });
    }
    res.status(200).json(issues);
  } catch (err) {
    console.error("Error during issue fetching : ", err.message);
    res.status(500).send("Server error");
  }
};

// const getAllIssue = async (req, res) => {
//   try {
//     const issues = await Issue.find({});

//     if (!issues) {
//       return res.status(200).json({ message: "No issues found" });
//     }

//     return res.status(200).json({ issues });
//   } catch (error) {
//     console.error("Error during issue fetching : ", err.message);
//     res.status(500).send("Server error");
//   }
// };

export {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getIssueById,
//   getAllIssue,
  getIssuesByRepositoryId,
};

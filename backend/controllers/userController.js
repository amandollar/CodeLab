import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select(["-password"]);
    return res.json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all the details" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(12);
    const hasedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hasedPassword,
      email,
      repositories: [],
      followedUsers: [],
      starRepos: [],
    });

    await newUser.save();
    res.status(200).json({ message: "Registration Successfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide all the details" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Wrong Crendtials" });
  }

  const pass = await bcrypt.compare(password, user.password);

  if (!pass) {
    return res.status(401).json({ message: "Wrong Credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "6hr",
  });
  return res.status(200).json({ token });
};

const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = await User.findById(id).select(["-password"]);
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All the fileds are required" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const udpdatedUser = await User.findByIdAndUpdate(
      id,
      {
        email: email,
        password: hashedPassword,
      },
      { new: true }
    ).select(["-password"]);

    return res.status(200).json({
      message: "Details Update Successfully",
      user: udpdatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(400).json({ message: "Couldn't find your details" });
    }

    return res.status(200).json({ message: "User deleted Succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  getAllUsers,
  signUp,
  login,
  getUserProfile,
  updateProfile,
  deleteProfile,
};

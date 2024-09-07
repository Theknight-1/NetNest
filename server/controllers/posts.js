import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Post from "../models/Posts.js";

//CREATE
export const createPost = asyncHandler(async (req, res) => {
  try {
    const { userId, description } = req.body;
    if (!userId || !description) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath: req.file ? req.file.path : null,
      likes: {},
      comments: {},
    });
    await newPost.save();
    const posts = await Post.find().sort({ createPost: 1 });
    res.status(201).json(posts);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

//READ
export const getFeedPosts = asyncHandler(async (req, res) => {
  try {
    const post = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getUserPosts = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.log("GET_USER_POSTS", error.message);
    res.status(404).json({ message: error.message });
  }
});

//UPDATE
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//DELETE
export const DeleteUserPost = asyncHandler(async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      res.status(401).json({ message: "Missing Post Id" });
    }
    await Post.findByIdAndDelete(postId);
    const post = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (error) {
    console.log("POST_DELETE", error.message);
    res.status(404).json({ message: error.message });
  }
});

import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Post from "../models/Posts.js";

//CREATE
export const createPost = asyncHandler(async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: {},
    });
    await newPost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

//READ
export const getFeedPosts = asyncHandler(async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getUserPosts = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//UPDATE
export const likePost = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId);
        if(isLiked){
            post.like.delete(userId);
        }else{
            post.likes.set(userId,true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes : postlike}
        )
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
});

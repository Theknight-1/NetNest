import asyncHandler from "express-async-handler";
import User from "../models/User.js";

//READ
export const getUser = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    if (!user) return res.status(404).json("User information does not exits");
    res.send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export const getUserFriends = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = User.findById(id);
    if (!user) return res.status(400).json("User information does not exits");
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//UPDATE
export const addRemoveFriend = asyncHandler(async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json({formattedFriends, message : "Added"})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

//READ
export const getUser = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    if (!user) return res.status(404).json("User information does not exits");
    res.send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export const getUserFriends = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((_id) => User.findById(_id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//UPDATE USER'S DETAILS
export const updateUserDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET);
    res.status(201).json({ updatedUser, token });
  } catch (error) {
    console.log("UPDATE_USER", { message: err.message });
    res.status(404).json({ message: err.message });
  }
};

//UPDATE USER'S FRIENDLIST
export const addRemoveFriend = async (req, res) => {
  try {
    const id = req.params.id;
    const { friendId } = req.params;
    // console.log(id, " User ki id");
    // console.log(friendId , " Friend bnne wale ki id");
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

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

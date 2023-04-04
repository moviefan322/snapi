const router = require("express").Router();
const db = require("../../config/connection.js");
const { User, Thought } = require("../../models/index");

//route to get all users

router.get("/", async (req, res) => {
  await User.find({})
    .populate({
      path: "thoughts",
      select: "-__v",
    })
    .populate({
      path: "friends",
      select: "-__v",
    })
    .select("-__v")
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//route to get a single user by its _id and populated thought and friend data

//post a new user

//put to update a user by its _id

//delete to remove user by its _id

//post to add a new friend to a user's friend list
///api/users/:userId/friends/:friendId

//delete to remove a friend from a user's friend list

module.exports = router;

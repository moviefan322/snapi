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

router.get("/:id", async (req, res) => {
  await User.findById({ _id: req.params.id })
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

//post a new user

router.post("/", async (req, res) => {
  await User.create(req.body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//put to update a user by its _id

router.put("/:id", async (req, res) => {
  await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//delete to remove user by its _id

router.delete("/:id", async (req, res) => {
  await User.deleteOne({ _id: req.params.id })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//post to add a new friend to a user's friend list
///api/users/:userId/friends/:friendId
router.post("/:userId/friends/:friendId", async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.params.userId },
    { $push: { friends: req.params.friendId } },
    { new: true }
  )
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.json(err));
});

//delete to remove a friend from a user's friend list
router.delete("/:userId/friends/:friendId", async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { new: true }
  )
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.json(err));
});

module.exports = router;

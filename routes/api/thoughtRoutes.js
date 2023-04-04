const router = require("express").Router();
const { User, Thought } = require("../../models");

//route to get all thoughts

router.get("/", async (req, res) => {
  await Thought.find({})
    .populate({
      path: "reactions",
      select: "-__v",
    })
    .select("-__v")
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//get a single thought by it's _id

router.get("/:id", async (req, res) => {
  await Thought.findById(req.params.id)
    .populate({
      path: "reactions",
      select: "-__v",
    })
    .select("-__v")
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
/* example data
{
    "thoughtText": "Here's a cool thought...",
    "username": "lernantino",
    "userId": "5edff358a0fcb779aa7b118b"
  } */
router.post("/", async (req, res) => {
  await Thought.create(req.body)
    .then((dbThoughtData) => {
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );
    })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.json(err));
});

// PUT to update a thought by its _id

// DELETE to remove a thought by its _id

///api/thoughts/:thoughtId/reactions
// post to create a reaction stored in a single thought's reactions array field

// delete to pull and remove a reaction by the reaction's reactionId value

module.exports = router;

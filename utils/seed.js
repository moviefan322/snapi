const connection = require("../config/connection");
const { User, Thought } = require("../models/index");
const {
  generateRandomUsers,
  generateRandomReactions,
  generateRandomThoughts,
  getRandomArrItem,
} = require("../utils/data");

console.time("seedTime");

connection.once("open", async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = await User.create(generateRandomUsers(10)); // create users first
    const thoughts = await Thought.create(
      generateRandomThoughts(users.length * 10)
    ); // create thoughts using the generated users

    // assign thoughts to each user
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const thoughtsToAssign = [];
      for (let j = 0; j < 3; j++) {
        const thought = getRandomArrItem(thoughts);
        if (!thoughtsToAssign.includes(thought._id)) {
          thoughtsToAssign.push(thought._id);
        }
      }
      await User.findByIdAndUpdate(user._id, { thoughts: thoughtsToAssign });
    }

    // generate random reactions for each thought
    const reactions = generateRandomReactions(thoughts.length * 5, users);
    try {
      for (let i = 0; i < reactions.length; i++) {
        const reaction = reactions[i];
        const thought = await Thought.find(reactions.thoughtId);
        thought.reactions.push(reaction);
        await thought.save();
      }
    } catch (err) {
      console.log(err);
    }

    // assign friends to each user
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const friends = [];
      for (let j = 0; j < 3; j++) {
        const friend = getRandomArrItem(users);
        if (
          friend._id.toString() !== user._id.toString() &&
          !friends.includes(friend._id)
        ) {
          friends.push(friend._id);
        }
      }
      await User.findByIdAndUpdate(user._id, { friends });
    }

    console.log("users", users.length);
    console.log("thoughts", thoughts.length);
    console.log("reactions", reactions.length);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
});

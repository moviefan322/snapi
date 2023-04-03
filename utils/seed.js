const connection = require("../config/connection");
const { User, Thought } = require("../models/index");
const {
  generateRandomUsers,
  generateRandomReactions,
  generateRandomThoughts,
} = require("../utils/data");

console.time("seedTime");

connection.once("open", async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});
    const users = await User.create(generateRandomUsers(10));
    const thoughts = await Thought.create(generateRandomThoughts(users, 10));
    const reactions = await Thought.create(
      generateRandomReactions(users, thoughts, 10)
    );
    console.log("users", users.length);
    console.log("thoughts", thoughts.length);
    console.log("reactions", reactions.length);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
});

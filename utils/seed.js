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
    // delete all users and thoughts
    await User.deleteMany({});
    await Thought.deleteMany({});

    //create users
    const users = await User.create(generateRandomUsers(10));
    // create thoughts
    const thoughts = await Thought.create(
      generateRandomThoughts(users.length * 10)
    );
    // assign thoughts to each user
    for (let i = 0; i < users.length; i++) {
      //loop through users
      const user = users[i];
      const thoughtsToAssign = [];
      //for each user, loop through thoughts
      for (let j = 0; j < 3; j++) {
        //for each user, assign 3 thoughts
        const thought = getRandomArrItem(thoughts);
        //if the thought is not already assigned to the user, add it to the array
        if (!thoughtsToAssign.includes(thought._id)) {
          thoughtsToAssign.push(thought._id);
        }
      }
      //update the user with the new thoughts
      await User.findByIdAndUpdate(user._id, { thoughts: thoughtsToAssign });
    }

    // generate random reactions for each thought
    const reactions = generateRandomReactions(thoughts.length * 5, users);
    try {
      // loop through reactions and assign to thoughts
      for (let i = 0; i < reactions.length; i++) {
        const reaction = reactions[i];
        const thoughtz = await Thought.find();
        const thought = getRandomArrItem(thoughtz);
        thought.reactions.push(reaction);
        await thought.save();
      }
    } catch (err) {
      console.log(err);
    }

    // assign friends to each user
    //loop through users
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const friends = [];
      //for each user, loop through users again
      for (let j = 0; j < 3; j++) {
        //randomly assign 3 friends to each user
        const friend = getRandomArrItem(users);
        //check if the friend is not the user and is not already in the friends array
        if (
          friend._id.toString() !== user._id.toString() &&
          !friends.includes(friend._id)
        ) {
          friends.push(friend._id);
        }
      }
      //update the user with the new friends
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

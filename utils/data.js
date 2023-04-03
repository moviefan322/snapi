const names = [
  "Aaran",
  "Aaren",
  "Aarez",
  "Aarman",
  "Aaron",
  "Aaron-James",
  "Aarron",
  "Aaryan",
  "Aaryn",
  "Aayan",
  "Aazaan",
  "Abaan",
  "Abbas",
  "Abdallah",
  "Abdalroof",
  "Abdihakim",
  "Abdirahman",
  "Abdisalam",
  "Abdul",
  "Abdul-Aziz",
  "Abdulbasir",
  "Abdulkadir",
  "Abdulkarem",
  "Ze",
  "Zechariah",
  "Zeek",
  "Zeeshan",
  "Zeid",
  "Zein",
  "Zen",
  "Zendel",
  "Zenith",
  "Zennon",
  "Zeph",
  "Zerah",
  "Zhen",
  "Zhi",
  "Zhong",
  "Zhuo",
  "Zi",
  "Zidane",
  "Zijie",
  "Zinedine",
  "Zion",
  "Zishan",
  "Ziya",
  "Ziyaan",
  "Zohaib",
  "Zohair",
  "Zoubaeir",
  "Zubair",
  "Zubayr",
  "Zuriel",
  ``,
];

const emailEndings = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
];

const descriptionsBodies = [
  "How to disagree with someone",
  "iPhone review",
  "how-to video",
  "video essay on the history of video games",
  "How to make money on the App Store",
  "Learn NextJS in five minutes (Not clickbate)",
  "Movie trailer",
  "Hello world",
  "Another possible solution to the algorithm",
  "Apology video",
  "Submission for startup pitch",
];

const possibleResponses = [
  "I disagree!",
  "I tried your algorithm, here were the results",
  "This was awesome",
  "Thank you for the great content",
  "Please check out my video response",
  "Like and subscribe to my channel please",
  "Reply: The side effects of in app purchases on digital marketplaces",
];

let users = [];
let thoughts = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomUserName = () => {
  return (users = `${getRandomArrItem(names)}${getRandomArrItem(names)}`);
};

// Gets a random email
const getRandomEmail = () =>
  `$${getRandomArrItem(names)}@${getRandomArrItem(emailEndings)}`;

const generateRandomUsers = (num) => {
  let users = [];
  for (let i = 0; i < num; i++) {
    users.push({
      username: getRandomUserName(),
      email: getRandomEmail(),
    });
  }
  return users;
};

// Gets a random reaction body
const getRandomReactionBody = () => getRandomArrItem(possibleResponses);

// Gets a random thought text
const getRandomThoughtText = () => getRandomArrItem(descriptionsBodies);

//generate random reactions
const generateRandomReactions = (num) => {
  const reactions = [];
  for (let i = 0; i < num; i++) {
    reactions.push({
      reactionBody: getRandomReactionBody(),
      username: getRandomArrItem(users).username,
    });
  }
  return reactions;
};

//generate random thoughts
const generateRandomThoughts = (num) => {
  let thoughts = [];
  for (let i = 0; i < num; i++) {
    thoughts.push({
      thoughtText: getRandomThoughtText(),
      username: getRandomArrItem(users).username,
      reactions: generateRandomReactions(),
    });
  }
  return thoughts;
};

module.exports = {
  generateRandomUsers,
  generateRandomReactions,
  generateRandomThoughts,
};

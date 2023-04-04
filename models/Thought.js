const { model, Schema } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: { type: [reactionSchema], default: [] },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

thoughtSchema.virtual("CreatedAt").get(function () {
  return (
    this.createdAt.toLocaleTimeString() +
    " on " +
    this.createdAt.toLocaleDateString()
  );
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;

const { model, Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

reactionSchema.virtual("CreatedAt").get(function () {
  return (
    this.createdAt.toLocaleTimeString() +
    " on " +
    this.createdAt.toLocaleDateString()
  );
});

module.exports = reactionSchema;

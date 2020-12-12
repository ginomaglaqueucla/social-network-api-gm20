const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
          getters: true
        }
      }
);
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'A Thought is required!',
            minLength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
      }
);

ThoughtSchema.virtual('reactionSchema').get(function() {
    return this.reactions.length;
});
  
const Thought = model('Thought', ThoughtSchema);
  
module.exports = Thought;
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

//Schema for Reactions 
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
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
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true 
        }
    }
);

// Schema for Thoughts
const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh: mm a')
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
)

// Reactions total count
ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Thoughts model
const Thoughts = model('Thoughts', ThoughtsSchema);

// Exports Thoughts Module
module.exports = Thoughts;
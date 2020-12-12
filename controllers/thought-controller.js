const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThought(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // add a thought to user
    addThought({ params, body }, res){
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: "No user found with this ID!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // add reaction to thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: "No User fpimd with this ID!"});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // remove Thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deleteThought => {
                if(!deleteThought) {
                    return res.status(404).json({ message: "No Thought with this ID!"});
                }
                return User.findOneAndUpdate(
                    { _id: params.UserId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true}
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this ID!' });
                    return;
                  }
                  res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // remove reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            {$pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;
const { Thought, User } = require('../models');


const thoughtController = {
    // get all thoughts
    getAllThought(req, res) {
        Thought.find({})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // get one pizza by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
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
                    console.log(_id);
                    res.status(404).json({ message: "No user found with this ID!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({_id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: "No Thought found with this ID!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err)
        );
    },

    // add reaction to thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $push: { reactions: body } },
            { new: true, runValidators: true })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: "No User found with this ID!"});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    // remove and delete thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(deleteThought => {
                if(!deleteThought) {
                    return res.status(404).json({ message: "No Thought with this ID!"});
                }
                return User.findOneAndUpdate(
                    { username: deleteThought.username },
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
            { _id: params.id },
            {$pull: { reactions: {reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;
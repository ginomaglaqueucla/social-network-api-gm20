const { json } = require('body-parser');
const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUser(req, res){
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            }
        );
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({_id: params.id})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            }
        );
    },

    // create User
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err)
        );
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({_id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: "No User found with this ID!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err)
        );
    },

    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id})
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user with this id!' });
                  }
                  // delete associated thoughts
                  return Thought.deleteMany(
                    { username: dbUserData.username },
                  );
            })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: "No thought found" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err)
        );
    },

    // add a friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id}, 
            {$push: { friends: params.friendsId}}, 
            { new: true, runValidators: true })
            .then(dbUserData => {
                if(!dbUserData) {
                   return res.status(404).json({ message: "No User found with this ID!" });
                }
                // add friend for other user
                return User.findOneAndUpdate(
                    { _id: params.friendsId}, 
                    {$push: { friends: params.id}}, 
                    { new: true, runValidators: true }
                )
                .then(dbFriendData => {
                    if (!dbFriendData) {
                      res.status(404).json({ message: 'No User (friend) found with this ID!' });
                      return;
                    }
                    res.json(dbFriendData);
                });
            })
            .catch(err => res.json(err)
        );
    },

    // delete a friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id}, 
            {$pull: { friends: params.friendsId}}, 
            { new: true, runValidators: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    return res.status(404).json({ message: "No User found with this ID!" });
                }
                // delete friend for other user
                return User.findOneAndUpdate(
                    { _id: params.friendsId}, 
                    {$pull: { friends: params.id}}, 
                    { new: true, runValidators: true }
                )
                .then(dbFriendData => {
                    if (!dbFriendData) {
                      res.status(404).json({ message: 'No User (friend) found with this ID!' });
                      return;
                    }
                    res.json(dbFriendData);
                });
            })
            .catch(err => res.json(err)
        );
    }
}

module.exports = userController;
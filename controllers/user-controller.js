const { json } = require('body-parser');
const {User} = require('../models');

const userController = {
    // get all users
    getAllUser(req, res){
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({_id: params.id})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create User
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // update user by id
    updatePizza({ params, body }, res) {
        User.findOneAndUpdate({_id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: "No User found with this ID!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
}

module.exports = userController;
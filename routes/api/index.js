const router = require('express').Router();
// const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes.js');

// router.use('/comments', commentRoutes);
router.use('/user', userRoutes);

module.exports = router;
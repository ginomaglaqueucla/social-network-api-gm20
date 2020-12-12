const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    addThought,
    removeThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thought-controller');

  // /api/thoughts
  router
    .route('/')
    .get(getAllThought);

  // /api/thoughts/<thoughtId>/reactions/<reactionId>
  router.route('/:id/reactions/:reactionId').delete(removeReaction);

  // /api/thoughts/<thoughtsId>/reactions
  router
    .route('/:id/reactions')
    .put(addReaction)
  
  // /api/thoughts/:id
  router
    .route('/:id')
    .get(getThoughtById)
    // .put(addReaction)
    .delete(removeThought);

  // /api/thoughts/<userId>
  router.route('/:userId').post(addThought);    

  
  module.exports = router;
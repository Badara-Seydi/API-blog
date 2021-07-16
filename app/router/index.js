const express = require('express');

const router = express.Router();

// Un router aura besoin de middleware de réponse, ces middleware on les à écrit sous forme de controller, on doit donc les récupérer.
const postController = require('../controllers/post');
const categoryController = require('../controllers/category');

// Ensuite chaque route appelera le controller destiné à repondre sur cette route.
router.get('/posts', postController.list);
router.get('/categories', categoryController.list);

module.exports = router;
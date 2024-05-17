var express = require('express');
var router = express.Router();
const choiceController = require('../controllers/choiceController');
const commentController = require("../controllers/commentController");
const userController = require('../controllers/userController')
const ensureUserAuthenticated = require('../middleware/ensureUserAuthenticated');
const userHasRole = require('../middleware/userHasRole');

router.get('/', function(req, res, next) {
  res.redirect('/choice');
});
router.get('/choice/add', ensureUserAuthenticated, userHasRole('author'), choiceController.renderAddForm);
router.post('/choice/add', ensureUserAuthenticated, userHasRole('author'), choiceController.addChoice);

router.get('/choice/:choiceId', choiceController.displayChoice);
router.get('/choice/:choiceId', choiceController.displayChoice);
router.get('/choice/', choiceController.displayAll);
router.get('/choice/:choiceId/edit', ensureUserAuthenticated, userHasRole('author'), choiceController.renderEditForm);
router.post('/choice/:choiceId/edit', ensureUserAuthenticated, userHasRole('author'), choiceController.updateChoice);
router.get('/choice/:choiceId/delete', ensureUserAuthenticated, choiceController.deleteChoice);

router.post('/choice/:choiceId/comment/create', commentController.createComment);
router.post('/comment/:commentId/reply/create', commentController.addReply);

router.get('/register', userController.renderRegistrationForm);
router.post('/register', userController.register);

router.get('/login', userController.renderLogin);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

router.get('/comment/:commentId/delete', ensureUserAuthenticated, userHasRole('admin'), commentController.deleteComment);
router.get('/comment/:commentId/reply/:replyId/delete', ensureUserAuthenticated, userHasRole('admin'), commentController.deleteReply);
module.exports = router;

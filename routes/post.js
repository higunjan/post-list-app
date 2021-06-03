const postController = require("../controllers/postController");
const middleware = require("../middleware/middleware");

module.exports = (app, upload) => {
    app.post('/api/post', middleware.isLoggedIn, upload.any(), postController.createPost);
    app.get('/api/post', middleware.isLoggedIn, postController.getPosts);
    app.put('/api/post/:id', middleware.isLoggedIn, upload.any(), postController.updatePost);
    app.delete('/api/post/:id', middleware.isLoggedIn, postController.deletePosts);
    // app.get('/api/post/search', middleware.isLoggedIn, postController.searchPosts);
}
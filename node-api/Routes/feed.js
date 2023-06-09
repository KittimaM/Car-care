const express = require("express");
const feedController = require("../Controllers/feed");
const router = express.Router();

// GET /feed/
router.get("/", feedController.getPosts);


// POST /feed
router.post('/',feedController.postPosts)

module.exports = router;

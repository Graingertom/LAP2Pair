const express = require('express');
const router = express.Router();

const Post = require('../models/post')

router.get('/', async (req, res) => {
    try {
    const blog =  await Post.All;
    res.status(200).json(blog);
    } catch (err) {
        res.status(404).json(err)
    }
});

router.get('/:url', async (req, res) => {
    try {
        const url = req.params.url;
        const selectedPost = await Post.getByUrl(url);
        res.send(selectedPost);
        res.status(200)
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
});

router.post('/', async (req, res) => {
    const data = req.body;
    const newPost = await Post.addPost(data);
    res.status(201).send(newPost)
});

module.exports = router;

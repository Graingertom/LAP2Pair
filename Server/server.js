const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const postRoutes = require('./controllers/posts')
server.use('/posts', postRoutes)

server.get('/', (req, res) => {
    res.send('Hello World!')
})
server.post('/',(req,res) => {
    console.log('Successfully posted')
    res.send(req.body)
})

module.exports = server

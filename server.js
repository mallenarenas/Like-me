const { addPost, getPosts } = require('./post')
const express = require('express');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.listen(3000, console.log("SERVIDOR ENCENDIDO"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
    })

app.get("/posts", async (req, res) => {
const posts = await getPosts()
res.json(posts)
})

app.post("/posts", async (req, res) => {
    const {title, url, description, likes } = req.body
    await addPost(title, url, description, likes)
    res.send("Post agregado con éxito")
    })
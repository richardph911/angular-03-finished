const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const Post = require('./models/post');

app.use(bodyParser.json());
app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST,PATCH, DELETE, OPTIONS");
  next();
});
app.post("/api/posts",(req, res, next)=>{
   //const post = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully',

  });
});
/*create path /api/posts and return a response in form of json*/
app.get("/api/posts",(req,res,next) => {
  const posts = [
    {
      id: 'fafss2233',
      title: 'First post',
      content: 'Content of the first post'
    }
  ];
  res.status(200).json(
    {
      message: 'Post successfully',
      posts: posts
    }
)
});

module.exports = app;


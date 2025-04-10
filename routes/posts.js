const express = require("express");
const router = express.Router();

const posts = require("../data/posts");
const error = require("../utilities/error");
const comments = require("../data/comments");
//users


router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "posts/:id",
        rel: ":id",
        type: "GET",
      },
    ];
    let updatedData = posts;
    const userId = req.query.userId;
    if(userId){
      updatedData = [];
      for(let i = 0; i < posts.length;i++){
        if(parseInt(userId) == posts[i].userId){
          updatedData.push(posts[i]);
        }else{
          continue;
        }
      }
      res.json({ posts: updatedData});
    }else{
      res.json({ posts: updatedData, links });
    }
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.title && req.body.content) {
      const post = {
        id: posts[posts.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      };

      posts.push(post);
      res.json(posts[posts.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);

    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

    if (post) res.json({ post, links });
    else next();
  })
  .patch((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          posts[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  })
  .delete((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        posts.splice(i, 1);
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  });

  router.route("/:id/comments").get((req,res)=>{
    let postComments = comments.filter(comment => parseInt(req.params.id) === comment.postId);
    if(req.query.userId){
      postComments = postComments.filter(comment =>parseInt(req.query.userId) === comment.userId);
    }
    res.json(postComments);
  })


  

module.exports = router;

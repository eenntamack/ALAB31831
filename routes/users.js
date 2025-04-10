const express = require("express");
const router = express.Router();

const users = require("../data/users");
const comments = require("../data/comments");
const error = require("../utilities/error");


//Had to import the module to users routes to handle the get request for
///api/users/:id/posts,

const posts = require("../data/posts");

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "users/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ users, links });
  })
  .post((req, res, next) => {
    if (req.body.name && req.body.username && req.body.email) {
      if (users.find((u) => u.username == req.body.username)) {
        next(error(409, "Username Already Taken"));
      }

      const user = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

      users.push(user);
      res.json(users[users.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const user = users.find((u) => u.id == req.params.id);

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

    if (user) res.json({ user, links });
    else next();
  })
  .patch((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  })
  .delete((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        users.splice(i, 1);
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  });

  router
    .route("/:id/posts")
    .get((req,res,next)=>{ 
      console.log(req.params.id + ". user is being retrieved")
      const post = [];
      for(let i = 0; i < posts.length; i++){
        if(req.params.id == posts[i].id){
          post.push(posts[i]);
          console.log(posts[i].userId);
        }else{
          continue;
        }
      }  
      res.json(post)
    })

   //below filtered all the comments by userId
  router
  .route("/:id/comments")
  .get((req,res)=>{
    const userComments = comments.filter(comment => parseInt(req.params.id) === comment.userId);
    res.json(userComments);
  })

module.exports = router;

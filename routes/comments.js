const express = require("express");
const router = express.Router();

const comments = require("../data/comments");
const error = require("../utilities/error");

router
.route("/")
.get((req,res)=>{
    res.json(comments);
}).post((req,res,next)=>{
    console.log("starting")
    if(req.query.body && req.query.userId && req.query.postId){

        const comment = {
            id : comments.length + 1,
            userId : req.query.userId,
            postId : req.query.postId,
            body: req.query.body
        }
        console.log("adding data")
        comments.push(comment);
        res.json("HEllo"); 
    }else{
        next(err(400,"Could not add data"))
    }
    
})



module.exports = router;
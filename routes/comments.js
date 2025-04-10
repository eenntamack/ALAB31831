const express = require("express");
const router = express.Router();

const comments = require("../data/comments");

const error = require("../utilities/error");

router
.route("/")
.get((req,res,next)=>{
    if(req.query.userId && !req.query.postId){
        const comment =[];

        for(let i = 0; i < comments.length; i++){
            if(parseInt(req.query.userId) === comments[i].userId){
                comment.push(comments[i])
            }
        }
        res.json(comment);
    }else if(req.query.postId && !req.query.userId){
        const comment =[];

        for(let i = 0; i < comments.length; i++){
            if(parseInt(req.query.postId) === comments[i].postId){
                comment.push(comments[i])
            }
        }
        res.json(comment);
    }else{
        if(req.query.addComment === "yes"){
            next()
        }else{
        res.json(comments);
        }
    }
})
/**This is the main issue i've been comming across, probably due to arrays not 
 * saving its state every web refresh, mainly for forms, and with help of databases
 */
router.route("/").post((req,res,next)=>{
    console.log("starting")
    if(req.query.add ==="yes"){
        const comment = {
            id : comments.length + 1,
            userId : req.query.userId,
            postId : req.query.postId,
            body: "Aut rerum rerum non quia fugit eos molestias dolor qui quisquam tempore sit ipsa rerum non quia autem. Qui corporis quisquam sit mollitia repellendus eum asperiores nihil qui libero praesentium et fuga unde aut quis porro et quidem fugit."
        }
    }
    
    console.log("adding data")
    newComments.push(comment);
    res.json(comments); 
})





module.exports = router;
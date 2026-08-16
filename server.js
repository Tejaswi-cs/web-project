const express = require('express')

const app = express()

app.use(express.json())

const port = process.env.PORT || 8080

const users = [
    {
        "id" : 1,
        "name" : "Henry Skretting",
        "gender" : "Male",
        "image" : "https://randomuser.me/api/portraits/men/97.jpg"
    },
    {
        "id" : 2,
        "name" : "Sophia Leroy",
        "gender" : "Female",
        "image" : "https://randomuser.me/api/portraits/women/63.jpg"
    },
    {
        "id" : 3,
        "name" : "Arvin Van der Scheer",
        "gender" : "Male",
        "image" : "https://randomuser.me/api/portraits/men/97.jpg"
    },
        {
        "id" : 4,
        "name" : "Kenzo Francois",
        "gender" : "Male",
        "image" : "https://randomuser.me/api/portraits/men/40.jpg"
    },
        {
        "id" : 5,
        "name" : "Rose Hicks",
        "gender" : "Female",
        "image" : "https://randomuser.me/api/portraits/women/6.jpg"
    }
]

// api server

// get all users
app.get("/api/users",function(req, res){
    res.status(200).json(users);
})

function getUserById(uid){
    for(var i=0;i<users.length;i++)
    {
        if(uid == users[i].id)
            return i;
    }
    return -1;
}
// get user by id
app.get("/api/users/:id", function(req, res)
{
    var uid = req.params.id;
    var userid = getUserById(uid);

    if(userid == -1)
    {
        res.status(404).json({"message" : "User not found"})
    }
    res.status(200).json(users[userid])
})

// get random user
app.get("/api/randomuser",function(req, res){
    var n = users.length;
    const randomid = Math.floor(Math.random() * n);
    res.status(200).json(users[randomid])
})

var newuserid = users.length + 1;

// post: add a new user
app.post("/api/users",function(req, res){
    if(!req.body.name || !req.body.gender || !req.body.image)
       return res.json({"message" : "name,gender and image is required"})
    let user = req.body;
    user.id = newuserid;
    newuserid++;
    users.push(users)
    res.status(200).json({"message" : "added successful"});
})

// put : update user details of given id
app.put("/api/users/:id", function(req, res){
    var userid = getUserById(req.params.id);
    if(userid == -1)
        return res.json({"message" : "user not found"})

        if(req.body.name)
            users[userid].name = req.body.name

        if(req.body.gender)
            users[userid].gender = req.body.gender

        if(req.body.image)
            users[userid].image = req.body.image

        return res.status(200).json({"message" : "user details updated", "user" : users[userid]})
})

// delete
app.delete("/api/users/:id", function(req, res){
    var userid = getUserById(req.params.id);
    if(userid == -1)
        return res.json({"message" : "user not found"})
    users.splice(userid, 1);
    res.status(200).json({"message" : "user deleted successfully"})
})


app.use(express.static("frontend"))  // web server

app.listen(port, function (){
    console.log("My app is running at http://localhost:"+port)
})
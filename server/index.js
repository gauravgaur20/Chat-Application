const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const port = process.env.PORT || 8000
const { get_Current_User, user_Disconnect, join_User } = require('./join.js');
// Add to the top of the index.js file with the other requires
const db = require('./db/query.js')
// Add to the bottom




const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (req, res) => {
  res.json({ info: 'Our app is up and running' })
})



// new 

const socketPort = 8001;
const { emit } = require("process");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
   cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
   },
});
app.use(cors());






app.get("/messages", db.getMessages); 
app.post("/messages", db.createMessage);



// socket part  
const emitMostRecentMessges = () => {
    db.getSocketMessages()
       .then((result) => io.emit("chat message", result))
       .catch(console.log);
 };
 




 io.on("connection", (socket) => {
    
    socket.on("joinRoom", ({ username}) => {
  
      const p_user = join_User(socket.id, username);
      console.log(socket.id, "=id");
   
      console.log(username);
  
      
      socket.emit("message", {
        userId: p_user.id,
        username: p_user.username,
        text: `Welcome ${p_user.username}`,
      });
  
      //displays a joined room message to all other room users except that particular user
      socket.broadcast.emit("message", {
        userId: p_user.id,
        username: p_user.username,
        text: `${p_user.username} has joined the chat`,
      });
    });
  
  
    socket.on("chat", (text) => {
     
      const p_user = get_Current_User(socket.id);
  
      io.emit("message", {
        userId: p_user.id,
        username: p_user.username,
        text: text,
      });
    });


    socket.on("disconnect", () => {
      
      const p_user = user_Disconnect(socket.id);
  
      if (p_user) {
        io.emit("message", {
          userId: p_user.id,
          username: p_user.username,
          text: `${p_user.username} has left the room`,
        });
      }
    });
 });





 // Displays in terminal which port the socketPort is running on
 server.listen(socketPort, () => {
    console.log(`listening on *:${socketPort}`);
 });

app.listen(port, () => {
  console.log(`App running on ${port}.`)
})
 
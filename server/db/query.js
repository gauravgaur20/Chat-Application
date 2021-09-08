const Pool = require("pg").Pool;

const pool = new Pool({
     user: "postgres",
     host: "localhost",
     database: "users",
     password: "12345",
     port: 5432,
});

pool.connect().then(()=> console.log("connected"))
.catch((e)=>console.log("error"));


const getMessages = (req, res) => {
    pool.query(
       "SELECT * FROM user_messages ORDER BY id DESC LIMIT 10",
       (error, results) => {
          if (error) {
             throw error;
          }
          res.status(200).json(results.rows);
       }
    );
 };




 const createMessage = (req, res) => {
    const {username,messages} = req.body;
    pool.query(
    "INSERT INTO messages (username,messages) VALUES ($1, $2,$gigi) RETURNING",
    username,messages,
       [id,messages, username],
       (error, results) => {
          if (error) {
             throw error;
          }
          response.status(201).send(results.rows);
          }
    );
 };



 /* SOCKET DB */

const getSocketMessages = () => {
    return new Promise((resolve) => {
       pool.query(
          "SELECT * FROM user_messages ORDER BY id DESC LIMIT 10",
          (error, results) => {
             if (error) {
                throw error;
             }
             resolve(results.rows);
           }
       );
    });
 };


 const createSocketMessage = (message) => {
    return new Promise((resolve) => {
       pool.query(
        "INSERT INTO messages (username,messages) VALUES ($1, $2,$gigi) RETURNING",
          username, messages,
          [user_message.message, usr_message.username],
          (error, results) => {
             if (error) {
                throw error;
             }
             resolve(results.rows);
          }
       );
    });
 };


 module.exports = {
    getMessages,
    createMessage,

    getSocketMessages,
    createSocketMessage,
 };




// Requiring dependencies
const express = require("express");
const path = require("path");
const app = express();
const server = require("http").Server(app);
var session = require('express-session');
const io = require("socket.io")(server);
const {
  ExpressPeerServer
} = require("peer");
const shortid = require("shortid");
var bodyParser = require('body-parser');

const {
  userJoin,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

// Creating peer server
const peerServer = ExpressPeerServer(server, {
  debug: process.env.NODE_ENV === "development",
});


var mysql = require('mysql');

var con = mysql.createConnection({
  host: "sql11.freemysqlhosting.net",
  user: "sql11495163",
  password: "GPEwJXjcHr",
  database: 'sql11495163',
  port: '3306'
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/', function(request, response) {
  var email = request.body.email;
  var username = request.body.username;
  var password = request.body.password;
  if ((email || username) && password) {

    con.query('SELECT * FROM STUDENT WHERE (email = ? OR username = ?) AND pass = ?', [email, username, password], function(error, results) {
      console.log(error)
      console.log(results)
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.username = username;
        request.session.email = results[0]['email'];
        request.session.firstname = results[0]['firstname'];

        response.redirect('/index');
      } else {

        response.redirect('/');
      }
      response.end();
    });
  } else {
    response.redirect('/');
    response.end();
  }
});


// Middlewares
app.use("/peerjs", peerServer);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));

// Index route
app.get("/", (req, res) => {
  // res.redirect(`/${shortid.generate()}`);
  res.render("login");
});


app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/login.html'));
});
// register register register
app.get("/register", (req, res) => {
  // res.redirect(`/${shortid.generate()}`);
  res.render("Register");

});
app.post('/register', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  var email = request.body.email;
  var firstName = request.body.FirstName;
  var conf_password = request.body.conf_password;
  var secretAnswer = request.body.securityQuestion;
  if ((conf_password == password) && (username != '') && (secretAnswer != '') &&(email != '') && (firstName != '') && (password != '')) {
    con.query(`CREATE TABLE IF NOT EXISTS STUDENT (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      pass VARCHAR(255) NOT NULL,
      securityQuestion VARCHAR(255) NOT NULL,
      firstname VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) `)
    con.query('INSERT INTO STUDENT (username,pass,securityQuestion,firstname,email) VALUES (?,?,?,?,?)', [username, password, secretAnswer, firstName, email], function(error, results) {
      console.log(error)
      console.log(results)
      response.redirect('/');
      response.end();
    });
  } else {

    response.redirect('/register');
    response.end();
  }
});

app.post('/room', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  var email = request.body.email;
  var firstName = request.body.FirstName;
  var conf_password = request.body.conf_password;
  var secretAnswer = request.body.securityQuestion;
  if ((conf_password == password) && (username != '') && (secretAnswer != '') &&(email != '') && (firstName != '') && (password != '')) {
    con.query(`SET FOREIGN_KEY_CHECKS = 0;
    DROP TABLE IF EXISTS ROOM;
    DROP TABLE IF EXISTS STUDENT;
    CREATE TABLE ROOM(
    room_id INT NOT NULL,
    room_pass INT,
    PRIMARY KEY(room_id)
    ALTER TABLE STUDENT_ROOM ADD CONSTRAiNT FK_student_id FOREiGN KEY (student_id) REFERENCES STUDENT(student_id) ON DELETE CASCADE;
    ALTER TABLE STUDENT_ROOM ADD CONSTRAiNT FK_room_id FOREiGN KEY (room_id) REFERENCES ROOM(room_id) ON DELETE CASCADE;
    );
    
    ) `)
    con.query('INSERT INTO STUDENT (username,pass,securityQuestion,firstname,email) VALUES (?,?,?,?,?)', [username, password, secretAnswer, firstName, email], function(error, results) {
      console.log(error)
      console.log(results)
      response.redirect('/');
      response.end();
    });
  } else {

    response.redirect('/register');
    response.end();
  }
});
app.get("/reset", (req, res) => {
  // res.redirect(`/${shortid.generate()}`);
  res.render("ResetPassword");

});
app.post('/reset', function(request, response) {
  var email = request.body.email;
  var security_answer = request.body.secretAnswer;
  var new_password = request.body.new_password;
  var new_conf_password = request.body.new_conf_password;

  if(email != '' && security_answer != '' && (new_password == new_conf_password )){
    con.query('SELECT *  FROM STUDENT WHERE email = ? AND securityQuestion = ?', [email, security_answer], function(error, results) {
      if(results.length > 0){
        con.query('UPDATE STUDENT SET pass = ? WHERE email = ?', [new_password, email], function(error, results) {
          response.redirect('/');
          response.end();
        });
      }
      else{
        response.redirect('/reset');
        response.end();
      }
    });
  }
  else{
    // If password are incorrect
    response.redirect('/reset');
    response.end();
  }

});

app.get("/index", (req, res) => {
  // res.redirect(`/${shortid.generate()}`);
  res.render("index", {
    roomId: shortid.generate(),
    username: req.session.username,
    firstname: req.session.firstname,
    email: req.session.email
  });

});

// Exit route
app.get("/log_out", (req, res) => {
  req.session.destroy();
  res.render("login");
  

});
app.post('/log_out', function(request, response){
  response.redirect('/');

});
// Specific room route
app.get("/:room", (req, res) => {
  res.render("room", {
    username: req.session.username,
    firstname: req.session.firstname,
    email: req.session.email,
    roomId: req.params.room,
    port: process.env.NODE_ENV === "production" ? 443 : 5000, // Setting peerjs port dynamically

  });
});

// Socket conenction
io.on("connection", (socket) => {
  // Join room event
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    // Message event
    socket.on("message", (messageObj) => {
      // console.log(roomId);
      io.to(roomId).emit("createMessage", messageObj);
    });

    // Disconnect event
    socket.on("disconnect", () => {
      const user = userLeave(socket.id);
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
      io.to(user.room).emit("roomUsers", getRoomUsers(user.room));
    });
  });

  // Add user to chat list
  socket.on("addUserToList", (username, roomId) => {
    const user = userJoin(socket.id, username, roomId);
    io.to(roomId).emit("roomUsers", getRoomUsers(user.room));
    socket.emit("roomUsers", getRoomUsers(user.room));
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}\n http://127.0.0.1:${PORT}/`));

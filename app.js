const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');

// any files in the 'content' directory can be requested by clients (browsers) and will be served by the Express server
app.use(express.static('content'));
// get the inputs from the forms
app.use(express.urlencoded({extends: false}));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './content/mainpage.html'));
});

app.get('/loginpage', (req, res) => {
  res.sendFile(path.join(__dirname, './content/loginpage.html'));
});

app.get('/creationpage', (req, res) => {
  res.sendFile(path.join(__dirname, './content/creationpage.html'));
});

app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, './content/404.html'));
});


app.post('/sentsubmission', (req, res) => {
  console.log(req.body);
  // get today's date (DD-MM-YY)
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear() % 100}`;
  // TODO: add new submission to DataBase
  res.sendFile(path.join(__dirname, './content/mainpage.html'));
});

app.post('/sentregister', (req, res) => {
  console.log(req.body);
  // TODO: add new user to DataBase
  // TODO: open new session
  req.session.username = req.body.registerNickname;
  res.sendFile(path.join(__dirname, './content/mainpage.html'));
});

app.post('/sentlogin', (req, res) => {
  console.log(req.body);
  if (true) { // TODO: verify user in DataBase
    // TODO: open new session
    res.sendFile(path.join(__dirname, './content/mainpage.html'));
  } else {
    // TODO: sent "invalid user" error
  }
});
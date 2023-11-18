const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', 'template');

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
  const username = req.session.username || "Se connecter";
  res.render('mainpage.ejs', {username: username});
});


app.get('/creationpage.html', (req, res) => {
  const username = req.session.username || "Se connecter";
  res.render('creationpage.ejs', {username: username});
});

app.post('/creationpage.html', (req, res) => {
  console.log(req.body);
  // get today's date (DD-MM-YY)
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  // TODO: add new submission to DataBase
  const username = req.session.username || "Se connecter";
  res.render('mainpage.ejs', {username: username});
});


app.get('/loginpage.html', (req, res) => {
  const username = req.session.username || "Se connecter";
  res.render('loginpage.ejs', {username: username, error: false});
});

app.post('/loginpage.html', (req, res) => {
  // user wants to login
  if (!req.body.registerName) {
    console.log(req.body);
    if (false) { // TODO: verify user in DataBase
      // TODO: open new session
      const username = req.session.username || "Se connecter";
      res.render('mainpage.ejs', {username: username});
    } else {
      username = req.session.username || "Se connecter";
      res.render('loginpage.ejs', {username: username, error: true});
    } 
  } 
  // user wants to register
  else {
    console.log(req.body);
    // TODO: add new user to DataBase
    // TODO: open new session
    req.session.username = req.body.registerNickname;
  res.render('mainpage.ejs', {username: req.session.username});
  }
});

app.get('*', (req, res) => {
  res.status(404).redirect('404.html');
});

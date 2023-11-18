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
app.use(express.urlencoded({extended: false}));
// secure encrypted data
const crypto = require('crypto');
app.use(session({
    secret: crypto.randomBytes(20).toString('hex'),
    resave: false,
    saveUninitialized: false
}));
const MongoClient = require("mongodb").MongoClient;

var url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

const dbName = "fix";

client
      .connect()
      .then(
        client =>
          client
            .db(dbName)
            .listCollections()
            .toArray() // Returns a promise that will resolve to the list of the collections
      )
      .then(cols => console.log("Collections", cols))


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

});

const User = client.db(dbName).collection('User');
const Submission = client.db(dbName).collection('Submission');


app.get('/', async (req, res) => {
  const username = req.session.username || "Se connecter";
  let submissionData = await Submission.find().toArray();
  res.render('mainpage.ejs', { username: username, data: submissionData });
});


app.get('/creationpage.html', (req, res) => {
  const username = req.session.username || "Se connecter";
  res.render('creationpage.ejs', {username: username});
});

app.post('/creationpage.html', async (req, res) => {
  console.log(req.body);
  if (req.session.username) { // verify user connected
    // get today's date (DD-MM-YY)
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()%100}`;
    // add new submission to DataBase
    let new_submission = {
      description: req.body.description,
      address: req.body.address,
      from: req.session.username,
      date: formattedDate
    };
    await Submission.insertOne(new_submission);
    let submissionData = await Submission.find().toArray();
    res.render('mainpage.ejs', { username: req.session.username, data: submissionData });
  } else {
    res.render('loginpage.ejs', {username: "Se connecter", error: false});
  }
});


app.get('/loginpage.html', (req, res) => {
  const username = req.session.username || "Se connecter";
  res.render('loginpage.ejs', {username: username, error: false});
});

app.post('/loginpage.html', async (req, res) => {
  console.log(req.body);
  
  if (!req.body.registerName) { // user wants to login
    let user = await User.findOne({ email: req.body.loginEmail, password: req.body.loginPassword });
    if (user) { // verify user in DataBase
      req.session.username = user.username;
      let submissionData = await Submission.find().toArray();
      res.render('mainpage.ejs', { username: req.session.username, data: submissionData });
    } else {
      const username = req.session.username || "Se connecter";
      res.render('loginpage.ejs', { username: username, error: true });
    }
  }
  
  else { // user wants to register
    let new_user = {
      username: req.body.registerNickname,
      email: req.body.registerEmail,
      fullname: req.body.registerName,
      password: req.body.registerPassword
    };
    await User.insertOne(new_user);
    req.session.username = req.body.registerNickname;
    let submissionData = await Submission.find().toArray();
    res.render('mainpage.ejs', { username: req.session.username, data: submissionData });
  }
});


app.get('*', (req, res) => {
  res.status(404).redirect('404.html');
});

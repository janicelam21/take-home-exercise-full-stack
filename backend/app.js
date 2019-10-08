const express = require('express');
const { TeamMember } = require('./model');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/team', async (req, res, next) => {
  const team = await TeamMember.findAll();
  return res.json(team);
});

app.post('/team', (req, res) => {
  console.log('why')
  TeamMember.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    title: req.body.title, 
    story: req.body.story,
    favoriteColor: req.body.favoriteColor,
    photoUrl: req.body.photoUrl
  })
  .then(() => res.status(200).send('success'))
  .catch((err) => res.status(400).send(err))
});

module.exports = app;

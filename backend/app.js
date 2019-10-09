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

app.put('/team/:id', (req, res) => {
  TeamMember.update(
    {[req.body.field]: req.body.message},
    {where: {id: req.params.id}}
  )
  .then(() => res.status(200).send('success'))
  .catch((err) => res.status(400).send(err))
});

app.delete('/team/:id', (req, res) => {
  TeamMember.destroy({
    where: {id: req.params.id}
  })
  .then(() => res.status(200).send('deleted'))
  .catch((err) => res.status(500).send(err))
});

module.exports = app;

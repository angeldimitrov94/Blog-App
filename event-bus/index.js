const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const postsPort = 4000;
const commentsPort = 4001;
const queryPort = 4002;
const moderationPort = 4003;
const eventBusPort = 4005;

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event); //most recent event at n, oldest at 0

  axios.post(`http://localhost:${postsPort}/events`, event).catch((err) => {
    console.log(`${postsPort} offline : `, err.message);
  });
  axios.post(`http://localhost:${commentsPort}/events`, event).catch((err) => {
    console.log(`${commentsPort} offline : `, err.message);
  });
  axios.post(`http://localhost:${queryPort}/events`, event).catch((err) => {
    console.log(`${queryPort} offline : `, err.message);
  });
  axios
    .post(`http://localhost:${moderationPort}/events`, event)
    .catch((err) => {
      console.log(`${moderationPort} offline : `, err.message);
    });

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(eventBusPort, () => {
  console.log(`"Event-bus" listening on port ${eventBusPort}`);
});

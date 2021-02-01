const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const moderationPort = 4003;
const eventBusPort = 4005;

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post(`http://event-bus-srv:${eventBusPort}/events`, {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }

  res.send();
});

app.listen(moderationPort, () => {
  console.log(`Moderation service listening on port ${moderationPort}`);
});

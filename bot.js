import express from 'express';
import fetch from 'node-fetch'; 
import bodyParser from 'body-parser';

const app = express();

const botToken = '7904155026:AAGaDitemTVa9vsClOny4lQ_qQ-WhCpQ2d8'; 
const chatId = '7344038324'; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
  const { name, email, phoneNumber, gender } = req.body;

  const message = `New registration:\nName: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nGender: ${gender}`;

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Message sent to Telegram bot:', data);
      if (data.ok) {
        res.status(200).send('Registration successful');
      } else {
        res.status(400).send('Failed to send message');
      }
    })
    .catch((error) => {
      console.error('Error sending message:', error);
      res.status(500).send('Error occurred while sending message');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

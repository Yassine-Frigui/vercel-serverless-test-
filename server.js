const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(cors({ origin: process.env.netlify_url }));
app.use(express.json());


var date = new Date();

app.get('/', (req, res) => {


  res.send('auto deploy at :  ' + date.toISOString());
});

app.post('/emailer', async (req, res) => {
  const { name, date_time } = req.body;
  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.brevo_api_key,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Node Server', email: process.env.target_email },
        to: [{ email: process.env.target_email }],
        subject: `Email for ${name}`,
        htmlContent: `<html><body><h1>Hello ${name}!</h1><p>This is a formatted test email sent at ${date_time}.</p></body></html>`,
      }),
    });

    if (response.ok) {
      res.json({ message: 'Email sent successfully!' });
    } else {
      const error = await response.text();
      res.status(500).json({ message: 'Error sending email: ' + error });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error: ' + error.message });
  }
});

app.get('/health', (req, res) => {
  res.send('Server is healthy');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();


var date = new Date();

app.get('/', (req, res) => {


  res.send('auto deploy at :  ' + date.toISOString());
});

app.get('/emailer', async (req, res) => {
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
        subject: 'Test Email from Node.js Server',
        htmlContent: `<html><body><h1>Hello!</h1><p>This is a formatted test email sent at ${new Date().toISOString()}.</p></body></html>`,
      }),
    });

    if (response.ok) {
      res.send('Email sent successfully!');
    } else {
      const error = await response.text();
      res.status(500).send('Error sending email: ' + error);
    }
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});

app.get('/health', (req, res) => {
  res.send('Server is healthy');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
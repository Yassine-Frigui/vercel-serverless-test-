const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

const Brevo = require('@getbrevo/brevo');


var date = new Date();

app.get('/', (req, res) => {


  res.send('auto deploy at :  ' + date.toISOString());
});

app.get('/emailer', async (req, res) => {
  let defaultClient = Brevo.ApiClient.instance;
  let apiKey = defaultClient.authentications['apiKey'];
  apiKey.apiKey = process.env.brevo_api_key;

  let apiInstance = new Brevo.TransactionalEmailsApi();
  let sendSmtpEmail = new Brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "Test Email from Node.js Server";
  sendSmtpEmail.htmlContent = `<html><body><h1>Hello!</h1><p>This is a formatted test email sent at ${new Date().toISOString()}.</p></body></html>`;
  sendSmtpEmail.sender = {"name": "Node Server", "email": process.env.target_email};
  sendSmtpEmail.to = [{"email": process.env.target_email}];

  try {
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    res.send("Email sent successfully!");
  } catch (error) {
    res.status(500).send("Error sending email: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
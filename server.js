const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


var date = new Date();

app.get('/', (req, res) => {


  res.send('auto deploy at :  ' + date.toISOString());
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
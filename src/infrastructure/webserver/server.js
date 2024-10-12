const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { paymentRouter } = require('./route');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../public')));
app.use('/api', paymentRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
const express = require('express');
const connectDB = require('./config/db.js');

const app = express();

//connecting the database
connectDB();

//middleware body parser
app.use(express.json({ extended: false }));

app.get('/', (request, response) => {
  response.send('API IS RUNNING');
});

//handling the routes be requiring the specific router configuration for the specific routes
app.use('/profile/mypeasants', require('./routes/profile/mypeasants'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

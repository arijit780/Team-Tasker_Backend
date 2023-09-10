const express = require('express');
const dotenv = require('dotenv')
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000; 

const whitelist = ['http://localhost:3000',"https://teamtasker.netlify.app"]
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error())
    }
  }
}

// Enable CORS with credentials
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://teamtasker.netlify.app'); // Replace with your client-side application's URL
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies)
//   next();
// });


app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
dotenv.config({ path: './.env' })


//Database of Mongoose
require('./db/connection.js')

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/v1", require('./router/main.js'))



app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`);
});
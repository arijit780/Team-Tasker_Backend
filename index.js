const express = require('express');
const dotenv = require('dotenv')//secured rakhunga data ...git wagera main upload nhi hoga
const app = express();//creation of server
const cors = require("cors");//cross origin resource sharing...galat FE agara request response karta hain toh error dega
const cookieParser = require('cookie-parser');//sends cookies securely from BE to FE
const port = process.env.PORT || 5000; //port is like somewhere where we would deploy our BE

const whitelist = ['http://localhost:3000',"https://teamtasker.netlify.app"]//only this 2 will send you requests i.e FE to secure data
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

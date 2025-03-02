const express = require("express");
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const userRouter = require('./Router/userRouter')
const loginRouter = require('./Router/loginRouter')


mongoose.connect(process.env.Mongourl).then(() => {
  console.log("Connected to DB successfully");
}).catch((err) => {
  console.log(err.message);
})


app.use(express.json());
app.use(cors());


app.use('/api',userRouter);
app.use('/api',loginRouter)




app.listen(3000, () => {
  console.log("Server is running on port 3000");
})
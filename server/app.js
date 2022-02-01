const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./db/conn');
const cors = require("cors");

const app = express();
app.use(cors())
dotenv.config({path:'./config.env'});
const PORT = process.env.PORT || 5000;

connectDB();
 
app.listen(PORT, () => {
    console.log('server running in http://localhost:'+ PORT+'/api');
})

app.use(express.json())
app.use('/api',require('./router/router'));

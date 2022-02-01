const mongoose = require('mongoose');

const connectDB = ()=>{
    const DB = process.env.DATABASE;
    mongoose.connect(DB).then(()=>{
        console.log('connection successful');
    }).catch((err)=>{console.log(err.message)});
}

module.exports = connectDB;
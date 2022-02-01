const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },age: {
        type:Number,
        required:true
    },gender:{
        type:Number,
        required:true
    },scholarship: {
        type:Number,
        required:true
    },work: {
        type:Number,
        required:true
    },partner:{
        type:Number,
        required:true
    },salary:{
        type:Number,
        required:true
    }
});

const model = mongoose.model('users',modelSchema);

module.exports = model;
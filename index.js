const Joi = require('joi');
const users = require('./routes/users');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testo').then(()=>{
    console.log("Hmmmmmmm connected to database")
});
const express = require('express');
const app = express();
app.listen(3000,()=>{
console.log("Hmmmm Listining");
})
app.use('/api/users',users)
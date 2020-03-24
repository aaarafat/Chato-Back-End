const users = require('./routes/users');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chato').then(()=>{
    console.log("connected to database")
});
const PORT = process.env.PORT|| 3000;
const express = require('express');
const app = express();
app.listen(PORT,()=>{
    console.log(`Listining on ${PORT}`);
})
app.use(express.json())
app.use('/api/users',users)
app.use('/api/auth',auth)
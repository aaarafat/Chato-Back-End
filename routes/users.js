const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
let users = [{name:"darkin" , email:"da@db.com"},{name:"lido22" , email:"aw@db.com"},{name:"boz" , email:"az@db.com"}]

router.get('/',(req,res)=>{
    res.send(users);
})

module.exports = router;
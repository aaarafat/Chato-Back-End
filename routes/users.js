const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {User,validate} = require('../models/user');
const bcrypt = require('bcrypt');


router.get('/',async (req,res)=>{
    const users = await User.find();
    res.send(users);
})

router.post('/',async (req,res)=>{
    
    const {error} = validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email:req.body.email});
    if(user)
        return res.status(400).send("This email is already registered ");
    user = User(_.pick(req.body,['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password ,salt);
    user = await user.save();
    res.send(_.pick(user,['_id','name','email']));
   
})

module.exports = router;
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const fs = require('fs');

router.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email:req.body.email});
    if(!user)
        return res.status(400).send("Invalid Email or Password");
     let valid = await bcrypt.compare(req.body.password, user.password);
     if(!valid)
        return res.status(400).send("Invalid Email or Password");
    const private = await fs.readFileSync(__dirname + '/../config/private.key','utf8')
    console.log(private);
    res.send(jwt.sign({_id:user._id},private));
})

function validate(user){
    const schema = Joi.object({
        email:Joi.string().min(6).max(255).required().email(),
        password:Joi.string().min(5).max(255).required(),
    })
    return schema.validate(user);
}
module.exports = router;
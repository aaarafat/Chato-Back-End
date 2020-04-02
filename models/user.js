const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const express = require('express');
const User = mongoose.model('USer', new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    } ,
    email:{
        type:String,
        required:true,
        minlength:6,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:1024
    }
    }
    ));
function validateUser(user){
    const schema = Joi.object({
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(6).max(255).required().email(),
        password:Joi.string().min(5).max(255).required(),
    })
    return schema.validate(user);
}
function getToken(){

}


exports.User = User;
exports.validate = validateUser;
exports.getToken = getToken

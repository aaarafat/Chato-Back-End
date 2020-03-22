const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const User = mongoose.model('USer', new mongoose.Schema({
name:{
    type:String,
    required:true,
    minlength:6,
    maxlength:20
}

}));
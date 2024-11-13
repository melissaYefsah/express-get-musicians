const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection");
const musicianRouter = require("../routes/musicians");
const bandRouter = require("../routes/bands");

const port = 3000;
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use('/musicians',musicianRouter);
app.use('/bands',bandRouter);

//TODO: Create a GET /musicians route to return all musicians 



module.exports = app;
const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;
app.use(express.json())
app.use(express.urlencoded({extended:true}));


//TODO: Create a GET /musicians route to return all musicians 

app.get('/musicians',async (req,res) =>{
    const musicians = await Musician.findAll();
    res.json(musicians);
})
app.get('/musicians/:id',async (req,res) =>{
    const param = req.params.id
    const musicians = await Musician.findByPk(param);
    res.json(musicians);
})
app.post('/musicians',async (req,res)=>{
    const musician = await Musician.create(req.body);
    res.json(musician);
})
app.put('/musicians/:id', async(req,res)=>{
    const param = req.params.id;
    const updatedMusician = await Musician.update(req.body,{where:{id : param}})
    res.json(updatedMusician);
})
app.delete('/musicians/:id', async(req,res)=>{
    const param = req.params.id;
    const deletedMusician = await Musician.destroy({where:{id : param}})
    res.json(deletedMusician);
})



module.exports = app;
const express = require("express");
const { Router } = require("express");
const app = require('../src/app');
const musicianRouter = Router();
const {Musician,Band} = require ("../models/index")
const {check,validationResult} = require('express-validator')


musicianRouter.get('/',async (req,res) =>{
    const musicians = await Musician.findAll();
    res.json(musicians);
})
musicianRouter.get('/:id',async (req,res) =>{
    const param = req.params.id
    const musicians = await Musician.findByPk(param);
    res.json(musicians);
})
musicianRouter.post('/',[check("name").not().isEmpty().trim()],[check("instrument").not().isEmpty().trim()],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }
    else {
        const musician = await Musician.create(req.body);
        res.json(musician);
    }

})
musicianRouter.put('/:id', async(req,res)=>{
    const param = req.params.id;
    const updatedMusician = await Musician.update(req.body,{where:{id : param}})
    res.json(updatedMusician);
})
musicianRouter.delete('/:id', async(req,res)=>{
    const param = req.params.id;
    const deletedMusician = await Musician.destroy({where:{id : param}})
    res.json(deletedMusician);
})



module.exports = musicianRouter;

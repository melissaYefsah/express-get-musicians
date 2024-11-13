const express = require("express");
const { Router } = require("express");
const app = require('../src/app');
const bandRouter = Router();
const {Musician,Band} = require ("../models/index")

bandRouter.get('/', async (req, res) => {

    try {
        // Fetch all bands including associated musicians
        const bands = await Band.findAll({
            include: [{ model: Musician }]
        });

        res.json(bands);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching bands.' });
    }
});
bandRouter.get('/:id', async (req, res) => {
    try {
        const bandId = req.params.id;
        const band = await Band.findByPk(bandId, {
            include: [{ model: Musician }]
        });
        console.log(band);
        if (band) {
            res.json(band);
        } else {
            res.status(404).json({ error: 'Band not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the band.' });
    }
});
bandRouter.post('/',async (req,res)=>{
    const band = await Band.create(req.body);
    res.json(band);
})
bandRouter.put('/:id', async(req,res)=>{
    const param = req.params.id;
    const updatedBand = await Band.update(req.body,{where:{id : param}})
    res.json(updatedBand);
})
bandRouter.delete('/:id', async(req,res)=>{
    const param = req.params.id;
    const deletedBand = await Band.destroy({where:{id : param}})
    res.json(deletedBand);
})

module.exports = bandRouter;
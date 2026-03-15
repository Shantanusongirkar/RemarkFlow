import express from 'express';
import Template from '../models/template.model.js';
const router = express.Router();

router.get("/all", async(req, res)=>{
try{
const allTemplates = await Template.find();
res.status(200).json(allTemplates)
} catch (error){
    res.status(500).json({message: "server broke", error: error.message});
}   
});

router.post("/create", async (req, res)=>{
    try {
    const newtemplate = new Template(req.body);
    const savedtemplate= await newtemplate.save();
    res.status(201).json({message: "template saved!", data: savedtemplate});
    } catch (error) {
        res.status(500).json({message: "failed to saved!", error: error.message});
    }
});
export default router;
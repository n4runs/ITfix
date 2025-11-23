
import express from 'express';
import multer from 'multer';
import auth from '../middleware/auth.js';
import requireStaff from '../middleware/requireStaff.js';
import Report from '../models/Report.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/', auth, upload.single('image'), async(req,res)=>{
  let imageUrl="";
  if(req.file){
    const uploaded = await cloudinary.uploader.upload(req.file.path);
    imageUrl=uploaded.secure_url;
    fs.unlinkSync(req.file.path);
  }
  const report=await Report.create({
    title:req.body.title,
    description:req.body.description,
    imageUrl,
    createdBy:req.user.id
  });
  res.json(report);
});

router.get('/', auth, async(req,res)=>{
  const reports=await Report.find();
  res.json(reports);
});

router.put('/:id', auth, async(req,res)=>{
  const updated=await Report.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(updated);
});

router.delete('/:id', auth, async(req,res)=>{
  await Report.findByIdAndDelete(req.params.id);
  res.json({msg:"Deleted"});
});

router.put('/:id/status', auth, requireStaff, async(req,res)=>{
  const updated=await Report.findByIdAndUpdate(req.params.id, {status:req.body.status}, {new:true});
  res.json(updated);
});

export default router;


export default function(req,res,next){
  if(req.user.role !== 'staff') return res.status(403).json({msg:"Staff only"});
  next();
}

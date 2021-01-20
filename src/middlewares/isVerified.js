const isVerified = (req,res,next)=> {
     
    console.log(req.user.isVerified)
    if(!req.user.isVerified) 
    return res.status(403).send('Access denied')
    
    next()
}


export default isVerified
import validator from "validator";

export const validateEmail=(req,res,next)=>{

    const{email}=req.body
    if(!email){
      return res.status(400).send({error: res.__("Email is required")});
  }
  if(!validator.isEmail(email)){
      return res.status(400).send({error: "This is not an email"}); 
   }
    return next()
}


export const validatePassword=(req,res,next)=>{

    const{password,confirmPassword}=req.body
    if(!password){
      return res.status(400).send({error: res.__("Password is required")});
    }
    if(password.length <=5 || password.length >=16){
      return res.status(400).send({error: res.__("Password must be in the range of 6 to 15 characters")});
    }
    if(!confirmPassword){
      return res.status(400).send({error: res.__("confirmPassword is required")});
    }
    return next()

}

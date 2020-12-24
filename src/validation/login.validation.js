
import validator from "validator";

export default async (req, res, next) => {
    const { fullname, email, role, username, password} = req.body;
   
    if(!email){
        return res.status(400).send({error: res.__("Email is required")});
    }
    if(!validator.isEmail(email)){
        return res.status(400).send({error: "this is not a valid email address format "}); 
     }
    if(!password){
        return res.status(400).send({error: res.__("Password is required")});
    }

    if(password.length <=5 || password.length >=16){
        return res.status(400).send({error: res.__("Password must be in the range of 6 to 15 characters")});
    }
    return next();
    }



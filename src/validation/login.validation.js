import { Users } from "../database/models";
import validator from "validator";
validator.isEmail('foo@bar.com');
export default async (req, res, next) => {
    const { fullname, email, role, username, password} = req.body;
    /*if(!validator.isEmail){
        return res.status(400).send({error: "Incorrect Email"}); 
    } */
    if(!email){
        return res.status(400).send({error: res.__("Email is required")});
    }
    
    if(!password){
        return res.status(400).send({error: res.__("Password is required")});
    }

    if(password.length <=5 || password.length >=16){
        return res.status(400).send({error: res.__("Password must be in the range of 6 to 15 characters")});
    }
    return next();
    }



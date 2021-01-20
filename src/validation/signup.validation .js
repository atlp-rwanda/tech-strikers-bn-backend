import validator from "validator";

export default async (req, res, next) => {
    const { fullname, email,username, password} = req.body;
 
    if(!fullname){
        return res.status(400).send({error: res.__("fullname is required")});
    }
    if(!username){
        return res.status(400).send({error: res.__("username is required")});
    }

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
    if(fullname.length <=5 ){
        return res.status(400).send({error: res.__("fullname must be more than 6characters")});
    }
    if(username.length <=5 || username.length >=16){
        return res.status(400).send({error: res.__("username must be in the range of 6 to 15 characters")});
    }
    return next();
    }

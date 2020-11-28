import models from "../database/models/index.js";
const {Users} = models;
export default async (req, res, next) => {
    const { fullname, email, role, username, password} = req.body;
    if(!email){
        return res.status(400).send({error: "Email is required"});
    }
    if(!password){
        return res.status(400).send({error: "Password is required"});
    }

    next();
    }


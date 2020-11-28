import models from "../database/models/index.js";
const {Users} = models;
import helper from "../utils/jwtHelper.js";
const { comparePassword } = require("../utils");

    const login = async (req, res, next) =>{
        try{
        const { email, password} = req.body;
        const user = await Users.findOne({where:{email}});
        if(!user){
        return res.status(400).send({error: "Email not found"}); 
        }
        if(user && comparePassword(password, user.password)){
            const userInfo = { 
            id: user.id, 
            fullname: user.fullname,
            username: user.username,
            role: user.role,
            email:user.email 
            } 
        console.log(userInfo);
        const token = helper(userInfo);
        return res.status(200).send({ message: "successfully logged in", token})
        }
        return res.status(400).send({error: "Wrong password"});
        }catch(err){
         return next(new Error(err));
        }
     }




export default login;

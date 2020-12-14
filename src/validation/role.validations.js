class RoleValidation {
    static roleAssignValidation (req, res, next){
        const { userRole, email} = req.body;
        /*if(!validator.isEmail){
            return res.status(400).send({error: "Incorrect Email"}); 
        } */
        if(!email){
            return res.status(400).send({error: res.__("Enter the email")});
        }
        
        if(!userRole){
            return res.status(400).send({error: res.__("Select the role")});
        }
        return next();
        }

        static roleCreateValidation(req, res, next){
            const { name, description} = req.body;
            /*if(!validator.isEmail){
                return res.status(400).send({error: "Incorrect Email"}); 
            } */
            if(!name){
                return res.status(400).send({error: res.__("Enter the name of role")});
            }
            
            if(!description){
                return res.status(400).send({error: res.__("Describe the role please")});
            }
            return next();
        }
}


export default RoleValidation;
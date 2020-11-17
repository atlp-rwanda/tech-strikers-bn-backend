
import Joi from 'joi';

const validator = (identifier, data) => {
    let schema = false;
    const options = {
        allowUnknown: true,
        abortEarly: false,
    };
    switch (identifier) {
        case 'signup': {
            schema = {
                fullname: Joi.string().trim().min(3).required(),
                email: Joi.string().trim().email({
                    minDomainAtoms: 2,
                }).required(),
                password: Joi.string().trim().min(8).max(15).required(),
                
                username: Joi.string().trim().min(5).required(),
            };
            break;
        }
        default: {
            schema = false;
        }
    }
    return Joi.validate(data, schema, options);
};

const validationErrors = (error) => {
    return  error.details[0].message
    
};

export {
    validator,
    validationErrors
};

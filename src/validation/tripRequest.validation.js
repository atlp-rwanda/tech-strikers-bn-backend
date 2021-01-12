import Joi from "joi";

const multiCityRequestValidation = Joi.object({
    "tripType": Joi.string().required(),
    "tripData": Joi.object(),
    "departureDate": Joi.date().iso().required(),
    "returnDate": Joi.date().iso().greater(Joi.ref("departureDate")),
    "reason": Joi.string().min(8)
})

export default { multiCityRequestValidation }

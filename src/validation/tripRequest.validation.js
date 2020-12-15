import Joi from "joi";

const tripRequestValidation = Joi.object({
  originId: Joi.number(),
  destinationId: Joi.number(),
  tripType: Joi.string(),
  departureDate: Joi.date().required(),
  returnDate: Joi.date(),
  reason: Joi.string().min(8),
});

export default { tripRequestValidation };

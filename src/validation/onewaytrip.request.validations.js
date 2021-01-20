import Joi from "joi";

const oneWayTripSchema = Joi.object().keys({
  tripType: Joi.string().required(),
  departureDate: Joi.date().required(),
  originId: Joi.number().required(),
  destinationId: Joi.number().required(),
  reason: Joi.string().min(5).max(100).required()
});

export default oneWayTripSchema;

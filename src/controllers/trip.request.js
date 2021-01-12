import tripRequestService from "../services/tripRequest.service"
import tripService from "../services/trip.service"
import requestValidation from "../validation/tripRequest.validation"
import responses from "../utils/responses.js";
import statusCode from "../utils/statusCode.js";

const { createTrip } = tripService;
const { createTripRequest, getTripRequestByUserId } = tripRequestService
const { multiCityRequestValidation } = requestValidation
const { nonTokenSuccessResponse, errorResponse } = responses;
const { created, unprocessableEntity, forbidden } = statusCode;

export default class tripRequestControllers { 
    static async sendTripRequest (req, res) {
            if(await getTripRequestByUserId (req.user.id) ) {
                return errorResponse(res, forbidden, res.__("tripRequestDeniedWhenAnotherOpenRequest"))
            } else {
                const { error } = multiCityRequestValidation.validate(req.body)
                if (error) {
                    errorResponse(res, unprocessableEntity, error.details[0].message)
                } else {
                    const tripRequestData = {
                        tripType: req.body.tripType,
                        departureDate: req.body.departureDate,
                        returnDate: req.body.returnDate,
                        reason: req.body.reason,
                        userId: req.user.id
                    };
                    
                    const requestId = await createTripRequest(tripRequestData)
                    if (requestId && requestId != null) {
                        for(let property in req.body.tripData) {
                            if (req.body.tripData) {
                                const tripDetails = req.body.tripData[property];
                                tripDetails.tripRequestId = requestId;
                                await createTrip(tripDetails);
                            } 
                        }
                        return nonTokenSuccessResponse(res, created, res.__("tripRequestSubmitted"))
                    }
                }

            }

    }
}

import tripRequestService from "../services/tripRequest.service"
import tripService from "../services/trip.service"
import locationService from "../services/locations.service"
import requestValidation from "../validation/multiCityTripRequest.validation"
import responses from "../utils/responses.js";
import statusCode from "../utils/statusCode.js";

const { createTrip } = tripService;
const { createTripRequest, getTripRequestByUserId, findById } = tripRequestService
const { getLocationById } = locationService
const { multiCityRequestValidation } = requestValidation
const { successResponseWithData, errorResponse } = responses;
const { created, unprocessableEntity, badRequest, ok } = statusCode;

export default class tripRequestControllers { 
    static async sendTripRequest (req, res) {
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
                    const valDisplayed = await findById(requestId)
                    return successResponseWithData(res, created, res.__("tripRequestSubmitted"), valDisplayed)
                }
        }

            
    };
    static async getUserTripRequests (req, res) {
        const retrievedRequests = await getTripRequestByUserId (req.user.id);
 
        if (retrievedRequests.length == 0) {
            errorResponse(res, badRequest, res.__("You've not made any requests!"))
        } else {
            let tripRequests = retrievedRequests;
            for (let i = 0; i < tripRequests.length; i++) {
                for (let j = 0; j < tripRequests[i].Trips.length; j ++) {
                    const originData = await getLocationById (tripRequests[i].Trips[j].originId)
                    const destinationData = await getLocationById (tripRequests[i].Trips[j].destinationId)
                    tripRequests[i].Trips[j].originId = {
                        id: originData.dataValues.id,
                        city: originData.dataValues.city, 
                        country: originData.dataValues.country
                    }
                    tripRequests[i].Trips[j].destinationId = {
                        id: destinationData.dataValues.id, 
                        city: destinationData.dataValues.city, 
                        country: destinationData.dataValues.country
                    }
                }
                
            }
            return successResponseWithData(res, ok, null, tripRequests)
        }
             
    }
}

import RequestServices from "../services/request.service";
import responses from "../utils/responses";
import statusCode from "../utils/statusCode";

const { createRequest, createTrip, getAllTripRequest, getAllRequest } = RequestServices;
const { successResponse } = responses;
const { created } = statusCode;
/**
 * @description this controller deals with user services
 */
export default class RequestController {
  /**
   * @description this controller saves/signup a user in database
   * @param {object} req request
   * @param {object} res response
   * @return {object} return json object with signup message
   */
  static async makeRequest(req, res) {
    const { id } = req.user;
    const { originId,
      destinationId,
      departureDate,
      returnDate,
      tripType,
      reason,
    } = req.body;
    const requestData = { userId: id,
      departureDate,
      returnDate,
      tripType,
      reason,
    };
    requestData.status = "pending";
    const request = await createRequest(requestData);
    const tripData = { tripRequestId: request.id,
      originId,
      destinationId
    };
    const trip = await createTrip(tripData);
    const mergeTripAndRequestData = await getAllTripRequest(trip.id);
    const { dataValues } = await getAllRequest(mergeTripAndRequestData.TripRequest.userId);
    return successResponse(res, created, undefined, res.__("tripRequestSubmitted"), dataValues);
  }
}

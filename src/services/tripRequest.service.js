import { response } from "express";
import models from "../database/models/index.js";

const { TripRequest } = models;

export default class tripRequestService {
  static async findById(modelId) {
    let response;
    await TripRequest.findOne({ where: { id: modelId } })
      .then(data => response = data);
    return response;
  }
}

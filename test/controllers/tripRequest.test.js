import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import { jwtToken } from "../../src/utils/util.jwt";
import userMock from "../data/user.mock";

chai.use(chaiHttp);

const { user1 } = userMock;
const testUser = { id: 1,
  fullname: "user one",
  email: "user1@example.com",
  username: "user1" };

describe("Trip request route suporting return trip", () => {
  it("Should create a trip request", (done) => {
    chai.request(server)
      .post("/api/v1/return_trip")
      .set("Authorization", `Bearer ${jwtToken.generateToken(testUser)}`)
      .set("Accept-Language", "en")
      .send(
        {
          originId: 1,
          destinationId: 1,
          departureDate: "2021-07-01",
          returnDate: "2021-10-29",
          tripType: "return trip",
          reason: "life is short, just chill"
        }
      )
      .end((err, res) => {
        // rror);
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal("Trip request submitted");
        done();
      });
  });
  it("Should not create a trip request", (done) => {
    chai.request(server)
      .post("/api/v1/return_trip")
      .set("Authorization", `Bearer ${jwtToken.generateToken(testUser)}`)
      .set("Accept-Language", "en")
      .send(
        {
          originId: 1,
          destinationId: 1,
          returnDate: "2021-10-29",
          tripType: "return trip",
        }
      )
      .end((err, res) => {
        expect(res.status).to.equal(422);
        done();
      });
  });
  it("It should validate Departure Date not behind today's Date", (done) => {
    chai.request(server)
      .post("/api/v1/return_trip")
      .set("Authorization", `Bearer ${jwtToken.generateToken(testUser)}`)
      .set("Accept-Language", "en")
      .send(
        {
          originId: 1,
          destinationId: 1,
          departureDate: "2020-01-01",
          returnDate: "2021-10-29",
          tripType: "return trip",
        }
      )
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal("Departure date must be greater than today's date");
        done();
      });
  });
  it("It should validate Departure Date not choose today's Date", (done) => {
    chai.request(server)
      .post("/api/v1/return_trip")
      .set("Authorization", `Bearer ${jwtToken.generateToken(testUser)}`)
      .set("Accept-Language", "en")
      .send(
        {
          originId: 1,
          destinationId: 1,
          departureDate: "2020-01-11",
          returnDate: "2021-10-29",
          tripType: "return trip",
        }
      )
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal("Departure date must be greater than today's date");
        done();
      });
  });
  it("It should validate Return Date not behind today's Date", (done) => {
    chai.request(server)
      .post("/api/v1/return_trip")
      .set("Authorization", `Bearer ${jwtToken.generateToken(testUser)}`)
      .set("Accept-Language", "en")
      .send(
        {
          originId: 1,
          destinationId: 1,
          departureDate: "2021-03-05",
          returnDate: "2020-10-29",
          tripType: "return trip",
        }
      )
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal("Return date must be greater than departure date");
        done();
      });
  });
  it("It should validate return Date not behind today's Date", (done) => {
    chai.request(server)
      .post("/api/v1/return_trip")
      .set("Authorization", `Bearer ${jwtToken.generateToken(testUser)}`)
      .set("Accept-Language", "en")
      .send(
        {
          originId: 1,
          destinationId: 1,
          departureDate: "2021-02-31",
          returnDate: new Date(),
          tripType: "return trip",
        }
      )
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal("Return date must be greater than departure date");
        done();
      });
  });
});
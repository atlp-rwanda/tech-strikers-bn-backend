import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import service from "../../src/services/oneWayTrip.service";
import getResponse from "../../src/utils/oneWayTripRequestResponses/response";
import tokenUtil from "../../src/utils/util.jwt";

chai.use(chaiHttp);
chai.should();

const { generateToken } = tokenUtil;

const testUser1 = generateToken({
  id: 4,
  fullname: "user four",
  email: "user4@example.com",
});

describe("One Way Trip Requests", () => {
  describe("POST api/v1/trip/one-way", () => {
    it("Should not post one way trip request due to validation error", (done) => {
      chai
        .request(server)
        .post("/api/v1/trip/one-way")
        .set("Authorization", `Bearer ${testUser1.token}`)
        .set("Content-Type", "application/json")
        .send({
          departureDate: "",
          originId: 1,
          destinationId: 2,
          reason: "vocation",
          tripType: "one-way",
        })
        .end((err, res) => {
          expect(res.status).to.eq(422);
          done();
        });
    });
    it("Should post one way trip request ", (done) => {
      chai
        .request(server)
        .post("/api/v1/trip/one-way")
        .set("Authorization", `Bearer ${testUser1.token}`)
        .set("Content-Type", "application/json")
        .send({
          tripType: "one-way",
          departureDate: "2021-04-20",
          originId: 1,
          destinationId: 2,
          reason: "vocation",
        })
        .end((err, res) => {
          expect(res.body.message).to.eq("Request submitted");
          expect(res.status).to.eq(201);
          done();
        });
    });
  });
  describe("GET api/v1/trip/one-way", () => {
    it("Should get all one way trip requests", (done) => {
      chai
        .request(server)
        .get("/api/v1/trip/one-way")
        .set("Authorization", `Bearer ${testUser1.token}`)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  describe("PUT api/v1/trip/one-way", () => {
    it("Should edit one way trip request", (done) => {
      chai
        .request(server)
        .put("/api/v1/trip/one-way/1")
        .set("Authorization", `Bearer ${testUser1.token}`)
        .send({
          tripType: "one-way",
          departureDate: "2020-01-06",
          originId: 2,
          destinationId: 3,
          reason: "vocation",
        })
        .end((err, res) => {
          console.log(res.body);
          expect(res.body).to.be.a("object");
          expect(res.status).to.eq(200);
          done();
        });
    });
    it("Should not edit unavailable one way trip request", (done) => {
      chai
        .request(server)
        .put("/api/v1/trip/one-way/9")
        .set("Authorization", `Bearer ${testUser1.token}`)
        .send({
          tripType: "one-way",
          departureDate: "2020-01-06",
          originId: 2,
          destinationId: 3,
          reason: "vocation",
        })
        .end((err, res) => {
          expect(res.body).to.be.a("object");
          expect(res.status).to.eq(400);
          done();
        });
    });
  });
  describe("DELETE api/v1/trip/one-way", () => {
    it("Should delete one way trip request by id", (done) => {
      chai
        .request(server)
        .delete("/api/v1/trip/one-way/1")
        .set("Authorization", `Bearer ${testUser1.token}`)
        .end((err, res) => {
          expect(res.status).to.eq(200);
          done();
        });
    });
    it("Should not delete unavailable one way trip request by id", (done) => {
      chai
        .request(server)
        .delete("/api/v1/trip/one-way/9")
        .set("Authorization", `Bearer ${testUser1.token}`)
        .end((err, res) => {
          expect(res.body.message).to.eq("There is no such request!");
          expect(res.status).to.eq(400);
          done();
        });
    });
  });
});

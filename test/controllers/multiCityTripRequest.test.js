import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import { jwtToken } from "../../src/utils/util.jwt";

chai.use(chaiHttp);
chai.should();

const { generateToken } = jwtToken

const testUser1 = generateToken({id:4, fullname: "user four", email: "user4@example.com"})
const testUser2 = generateToken({id:5, fullname: "user five", email: "user5@example.com"})

describe("Trip request route supoorting multi city trip", () => {
    it("Should not retrieve trip requests if non has been made", (done) => {
        chai.request(server)
        .get("/api/v1/tripRequests")
        .set("Authorization", `Bearer ${testUser1}`)
        .set("Accept-Language", "en")
        .end((err, res) => {
            expect(res.status).to.equal(400)
            expect(res.body.error).to.eq("You've not made any requests!")
            done();
        })
    });
    it("Should create a trip request", (done) => {
        chai.request(server)
        .post("/api/v1/multiCityRequest")
        .set("Authorization", `Bearer ${testUser1}`)
        .set("Accept-Language", "en")
        .send(
            {
                "tripType": "multicity",
                "tripData": {
                    "trip1": {"originId": 2, "destinationId": 3},
                    "trip2": {"originId": 3, "destinationId": 4}
                },
                "departureDate": "2020-12-17",
                "returnDate": "2020-12-30",
                "reason": "Christmass holidays "
            }
        ).end((err, res) => {
            expect(res.status).to.equal(201)
            expect(res.body.message).to.equal("Trip request submitted")
            done();
        })
    });
    it("Should retrieve trip requests", (done) => {
        chai.request(server)
        .get("/api/v1/tripRequests")
        .set("Authorization", `Bearer ${testUser1}`)
        .set("Accept-Language", "en")
        .end((err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.data).to.be.a("array")
            done();
        })
    });
    it("Should not create a trip request when there is validation errors", (done) => {
        chai.request(server)
        .post("/api/v1/multiCityRequest")
        .set("Authorization", `Bearer ${testUser2}`)
        .set("Accept-Language", "fr")
        .send(
            {
                "tripType": 1,
                "tripData": {
                    "trip1": {"originId": 2, "destinationId": 3},
                    "trip2": {"originId": 3, "destinationId": 4}
                },
                "departureDate": "2021-02-01",
                "returnDate": "2021-02-27",
                "reason": "Saint Valentine's Day vacation"
            }
        ).end((err, res) => {
            expect(res.status).to.equal(422)
            expect(res.body.error).to.equal('"tripType" must be a string')
            done();
        })
    });
    it("Should not create a trip request when departureDate is less than returnDate", (done) => {
        chai.request(server)
        .post("/api/v1/multiCityRequest")
        .set("Authorization", `Bearer ${testUser2}`)
        .set("Accept-Language", "fr")
        .send(
            {
                "tripType": "multicity",
                "tripData": {
                    "trip1": {"originId": 2, "destinationId": 3},
                    "trip2": {"originId": 3, "destinationId": 4}
                },
                "departureDate": "2021-02-01",
                "returnDate": "2020-12-29",
                "reason": "Saint Valentine's Day vacation"
            }
        ).end((err, res) => {
            expect(res.status).to.equal(422)
            expect(res.body.error).to.equal('\"returnDate\" must be greater than\ "ref:departureDate\"')
            done();
        })
    });
});

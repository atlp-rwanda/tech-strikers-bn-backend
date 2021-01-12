import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import tokenUtil from "../../src/utils/util.jwt"

chai.use(chaiHttp);
chai.should();

const { generateToken } = tokenUtil

const testUser1 = generateToken({id:4, fullname: "user four", email: "user4@example.com"})
const testUser2 = generateToken({id:5, fullname: "user five", email: "user5@example.com"})

describe("Trip request route supoorting multi city trip", () => {
    it("Should create a trip request", (done) => {
        chai.request(server)
        .post("/api/v1/multiCityRequest")
        .set("Authorization", `Bearer ${testUser1.token}`)
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
            expect(res.body.message).to.equal("Trip request has been submitted.")
            done();
        })
    });
    it("Should not create more than one trip request for one user", (done) => {
        chai.request(server)
        .post("/api/v1/multiCityRequest")
        .set("Authorization", `Bearer ${testUser1.token}`)
        .set("Accept-Language", "fr")
        .send(
            {
                "tripType": "multicity",
                "tripData": {
                    "trip1": {"originId": 2, "destinationId": 3},
                    "trip2": {"originId": 3, "destinationId": 4}
                },
                "departureDate": "2021-02-01",
                "returnDate": "2021-02-27",
                "reason": "Saint Valentine's Day vacation"
            }
        ).end((err, res) => {
            expect(res.status).to.equal(403)
            expect(res.body.error).to.equal("Demande refusée, vous avez une autre demande ouverte.")
            done();
        })
    });
    it("Should not create a trip request when there is validation errors", (done) => {
        chai.request(server)
        .post("/api/v1/multiCityRequest")
        .set("Authorization", `Bearer ${testUser2.token}`)
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
        .set("Authorization", `Bearer ${testUser2.token}`)
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

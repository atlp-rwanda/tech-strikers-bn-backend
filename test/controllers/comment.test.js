import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import { jwtToken } from "../../src/utils/util.jwt";
import userMock from "../data/user.mock";

chai.should();
chai.use(chaiHttp);

const { user4 } = userMock;

describe("POST Comments", () => {
  it("Should not create a comment with invalid request id", (done) => {
    chai.request(server)
      .post("/api/v1/request/comment/76")
      .set("Authorization", `Bearer ${jwtToken.generateToken(user4)}`)
      .send({ comment: "Commenting" })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it("Should comment on a request with valid id", (done) => {
    chai.request(server)
      .post("/api/v1/request/comment/1")
      .set("Authorization", `Bearer ${jwtToken.generateToken(user4)}`)
      .send({ comment: "Commenting" })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it("Should get all comments on request", (done) => {
    chai.request(server)
      .get("/api/v1/request/comment/1")
      .set("Authorization", `Bearer ${jwtToken.generateToken(user4)}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("Should not get comments with invalid request id", (done) => {
    chai.request(server)
      .get("/api/v1/request/comment/U")
      .set("Authorization", `Bearer ${jwtToken.generateToken(user4)}`)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
  it("Should not get comments of a request which does not exist", (done) => {
    chai.request(server)
      .get("/api/v1/request/comment/76")
      .set("Authorization", `Bearer ${jwtToken.generateToken(user4)}`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

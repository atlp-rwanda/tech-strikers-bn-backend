import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";

chai.use(chaiHttp);

describe("Welcome to endPoints Testing", () => {
  it("Should return a message confirming api connection", (done) => {
    chai
      .request(server)
      .get("/api")
      .end((err, res) => {
        if (err) done(err);
        const { message } = res.body;
        expect(res.status).to.equal(200);
        expect(message);
        expect(message).to.equal("Well Connected api");
        done();
      });
  });
  it("Should return error: not found when the route doesn't exist", (done) => {
    chai
      .request(server)
      .get("/api/v1/user/oneway")
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a("object");
        expect(res.body.errors.message).to.eq("Not Found");
        done();
      });
  });
});

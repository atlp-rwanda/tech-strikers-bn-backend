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
});

import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import tokenlist from "../../src/services/index";
import server from "../../src/index";
import tokenMock from "./data/token.data";

require("dotenv").config();

chai.use(chaiHttp);
chai.should();
const { token } = tokenMock;

describe("logout Test", () => {
  it("Should user loged out", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/logout")
      .set("Authorization", `Bearer ${token}`)
      .end((req, res) => {
        const { message } = res.body;
        expect(res.status).to.eql(200);
        expect(message);
        expect(message).to.be.equal("Logout success fully");
        done();
      });
  });
  it("Should  user not loged out once done", (done) => {
    const listtoken = tokenlist.AddToList(token);
    chai
      .request(server)
      .post("/api/v1/user/logout")
      .set("Authorization", `Bearer ${token}`)

      .end((req, res) => {
        const { message } = res.body;
        expect(res.status).to.eql(403);
        expect(message);
        expect(message).to.be.equal("you loged out");
        done();
      });
  });
});

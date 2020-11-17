import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import userMock from "../data/user.mock";
import statusCode from "../../src/utils/statusCode";
import customMessage from "../../src/utils/customMessage";

chai.use(chaiHttp);
chai.should();

const { user1 } = userMock;
const { created, ok } = statusCode;
const { signedup } = customMessage;

describe("User Test", () => {
  it("Should create a user", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/signup")
      .send(user1)
      .end((err, res) => {
        const { data, message } = res.body;
        expect(res.status).to.equal(created);
        expect(data);
        expect(message);
        expect(message).to.equal(signedup);
        expect(data).to.a("object");
        done();
      });
  });
  it("Should update User", (done) => {
    chai
      .request(server)
      .put("/api/v1/user")
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(message).to.equal("successfully sent");
        expect(message).to.be.a("string");
        done();
      });
  });
  it("Should Delete User", (done) => {
    chai
      .request(server)
      .delete("/api/v1/user")
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(message).to.equal("successfully sent");
        expect(message).to.be.a("string");
        done();
      });
  });
  it("Should get all User", (done) => {
    chai
      .request(server)
      .get("/api/v1/user")
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(message).to.equal("successfully sent");
        expect(message).to.be.a("string");
        done();
      });
  });
});

import chai from "chai";
import jwt from "jwt-simple";
import chaiHttp from "chai-http";
import generateToken from "../../src/utils/util.jwt.js";
import verifyToken from "../../src/middlewares/tokenAuthentication";
const { expect } = chai;
chai.use(chaiHttp);
import server from "../../src/index.js";
const should = chai.should();
chai.use(chaiHttp);
describe("Testing behaviour of verifyToken and generateToken functions", () => {
  it("It should generate a token", (done) => {
    const token = generateToken({ username: "this", email: "this@gmail.com" });
    expect(token).to.a("object");
    expect(token).to.have.property("token");
    token.should.not.have.property("message");
    done();
  });
  it("It should not generate a token", (done) => {
    const token = generateToken();
    expect(token).to.a("object");
    token.should.have.property("message");
    done();
  });
  it("It should verify a token", (done) => {
    const payload = {},
      next = () => true,
      token = jwt.encode(payload, process.env.ACCESS_TOKEN_SECRET);
    const auth = `Bearer ${token}`;
    const status = verifyToken(
      {
        headers: {
          authorization: auth,
        },
      },
      // eslint-disable-next-line no-shadow
      { sendStatus: (status) => status },
      next
    );
    expect(status).to.equal(202);
    done();
  });
  it("It should not verify a token with authorization equal to null", (done) => {
    const next = () => true;
    const status = verifyToken(
      {
        headers: {
          authorization: null
        },
      },
      // eslint-disable-next-line no-shadow
      { sendStatus: (status) => status },
      next
    );
    expect(status).to.equal(403);
    done();
  });
  it("It should not verify a token with authorization equal to false token ", (done) => {
    const next = () => true,
      token = jwt.encode({}, process.env.ACCESS_TOKEN_SECRET);
    const status = verifyToken(
      {
        headers: {
          authorization: token
        },
      },
      // eslint-disable-next-line no-shadow
      { sendStatus: (status) => status },
      next
    );
    expect(status).to.equal(401);
    done();
  });
  it("It should verify a token", (done) => {
    const payload = { username: "this", email: "this@gmail.com" },
      next = () => true,
      token = jwt.encode(payload, process.env.ACCESS_TOKEN_SECRET);
    const auth = `Bearer ${token}`;
    const status = verifyToken(
      {
        headers: {
          authorization: auth,
        },
      },
      // eslint-disable-next-line no-shadow
      { sendStatus: (status) => status },
      next
    );
    expect(status).to.equal(202);
    done();
  });
});
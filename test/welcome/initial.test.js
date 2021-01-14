import chai from "chai";
import jwt from "jwt-simple";
import chaiHttp from "chai-http";
import {jwtToken} from "../../src/utils/token.utils"
import verifyToken from "../../src/middlewares/tokenAuthentication";
import server from "../../src/index.js";

let token2;

chai.use(chaiHttp);
const { expect } = chai;
const should = chai.should();


describe("Testing behaviour of verifyToken and create Token functions", () => {
  it("It should create  a token", (done) => {
    const token = jwtToken.createToken({email: "this@gmail.com" });
    expect(token).to.a("string");
  

    done();
  });
 
  it("It should verify a token", (done) => {
    const payload = {},
      next = () => true,
    token = jwt.verify(payload, process.env.ACCESS_TOKEN_SECRET);
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
      token = jwt.verify({}, process.env.ACCESS_TOKEN_SECRET);
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
      token = jwt.verify(payload, process.env.ACCESS_TOKEN_SECRET);
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
    done();
  });
});
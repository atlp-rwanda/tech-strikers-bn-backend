import chai from "chai";
import jwt from "jsonwebtoken";
import chaiHttp from "chai-http";
import { jwtToken } from "../../src/utils/util.jwt";
import verifyToken from "../../src/middlewares/tokenAuthentication";
import server from "../../src/index.js";

let token2;

chai.use(chaiHttp);
const { expect } = chai;
const should = chai.should();
const { generateToken } = jwtToken;

describe("Testing behaviour of verifyToken and create Token functions", () => {
  it("It should create  a token", (done) => {
    const token = generateToken({ email: "this@gmail.com" });
    expect(token).to.a("string");
    done();
  });

  it("It should not verify a token with authorization equal to null", (done) => {
    const next = () => true;
    const status = verifyToken(
      {
        headers: {
          authorization: null,
        },
      },
      // eslint-disable-next-line no-shadow
      { sendStatus: (code) => code },
      next
    );
    expect(status).to.eq(403);
    done();
  });
  it("It should not verify a token with authorization equal to false token ", (done) => {
    const next = () => true,
      token = jwt.sign({}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
    const status = verifyToken(
      {
        headers: {
          authorization: token,
        },
      },
      // eslint-disable-next-line no-shadow
      { sendStatus: (code) => code },
      next
    );
    expect(status).to.equal(401);
    done();
  });
  it("It should verify a token", (done) => {
    const payload = { username: "this", email: "this@gmail.com" },
      next = () => true,
      token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
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
    expect(status).to.equal(true);
    done();
  });
});

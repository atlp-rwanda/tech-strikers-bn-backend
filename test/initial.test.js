import chai from "chai";
import jwt from "jwt-simple";
import chaiHttp from "chai-http";
import server from "../src/index.js";
import generateToken from "../src/utils/util.jwt.js";
import verifyToken from "../src/middleWares/auth.js";

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);

describe("Testing behaviour of verifyToken and generateToken functions", () => {
  it("It should generate a token", (done) => {
    const token = generateToken({ username: "this", email: "this@gmail.com" });
    expect(token).to.a("object");
    expect(token).to.have.property("token");
    token.should.not.have.property("message");

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

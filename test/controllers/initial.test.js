// import chai from "chai";
// import jwt from "jsonwebtoken"
// import chaiHttp from "chai-http";
// import {jwtToken} from "../../src/utils/util.jwt";
// import verifyToken from "../../src/middlewares/tokenAuthentication";

// const { expect, should } = chai;

// chai.use(chaiHttp);

// describe("Testing behaviour of verifyToken and generateToken functions", () => {
//   it("It should generate a token", (done) => {
//     const token = jwtToken.generateToken({ username: "this", email: "this@gmail.com" });
//     expect(token).to.a("object");
//     expect(token).to.have.property("token");
//     token.should.not.have.property("message");
//     done();
//   });
//   it("It should verify a token", (done) => {
//     const payload = { username: "this", email: "this@gmail.com" },
//       next = () => true,
//       token = jwt.encode(payload, process.env.ACCESS_TOKEN_SECRET);
//     const auth = `Bearer ${token}`;
//     const status = verifyToken(
//       {
//         headers: {
//           authorization: auth,
//         },
//       },
//       { sendStatus: (status) => status },
//       next
//     );
//     done();
//   });

// });

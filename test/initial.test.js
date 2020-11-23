import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/index.js";

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);

it("throw error if it returns first argument", (done) => {
  const result = server.funcToTest(1, 2);
  if (result === 1) throw new Error(`expected 2 but got ${result}`);
  done();
});

import bcrypt from "bcrypt";

const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, 15);
  return hash;
};
export default {
  hashPassword
};

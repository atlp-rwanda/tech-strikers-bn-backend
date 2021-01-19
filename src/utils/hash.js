const bcrypt=require("bcrypt");


const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  //  deepcode ignore WrongNumberOfArgs: <comment the reason here>
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};


module.exports = { hashPassword};

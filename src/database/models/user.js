
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    username: DataTypes.STRING
  }, {});
  return Users;
};

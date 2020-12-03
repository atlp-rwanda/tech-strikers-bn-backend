module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {});
  return Users;
};

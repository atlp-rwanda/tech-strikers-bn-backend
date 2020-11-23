// eslint-disable-next-line import/prefer-default-export
export const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  return User;
};

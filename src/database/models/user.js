export default(sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      isVerified:DataTypes.BOOLEAN,
      provider: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN
    },{}
  );
  return Users;
  } 

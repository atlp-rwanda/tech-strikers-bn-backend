export default (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      provider: DataTypes.STRING,
    },
    {}
  );
  Users.associate = (models) => {
    Users.hasMany(models.Notifications, {
      as: "notification",
      foreignKey: "userId",
    });
  };
  return Users;
};

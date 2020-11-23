export default (sequelize, DataTypes) => {
  const Notifications = sequelize.define(
    "Notifications",
    {
      Title: DataTypes.STRING,
      Content: DataTypes.STRING,
    },
    {}
  );
  return Notifications;
};

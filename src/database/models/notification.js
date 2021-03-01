export default (sequelize, DataTypes) => {
  const Notifications = sequelize.define(
    "Notifications",
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      seen: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  Notifications.associate = (models) => {
    Notifications.belongsTo(models.Users, {
      as: "user",
      foreignKey: "userId",
    });
  };
  return Notifications;
};

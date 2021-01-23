export default (sequelize, DataTypes) => {
  const comment = sequelize.define("Comment", 
  {
      userId: DataTypes.INTEGER,
      tripRequestId: DataTypes.INTEGER,
      comment: DataTypes.STRING
  },
  {});

  comment.associate = models => {
    comment.belongsTo(models.TripRequest, { 
      foreignKey: "tripRequestId"
    });
  };
  return comment;
};

export default(sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      provider: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN
    },{}
  );
  Users.associate = models =>{
    Users.belongsTo(models.userRoles, {
      as: 'role',
      foreignKey: 'roleId'
    });

    Users.hasOne(models.TripRequest, {
      foreignKey: "userId",
      onDelete: "cascade",
      onUpdate: "cascade"
    })
  }

  Users.associate = models => {
    Users.hasOne(models.TripRequest, {
      foreignKey: "userId"
    })
  };
  return Users;
};

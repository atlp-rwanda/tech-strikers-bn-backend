export default (sequelize, DataTypes) => {
  const userRoles = sequelize.define(
    "userRoles",
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {}
  );

  userRoles.associate = models =>{
    userRoles.hasMany(models.Users, {
      foreignKey: 'roleId',
      onDelete: 'CASCADE'
    });
  }
  return userRoles;
};

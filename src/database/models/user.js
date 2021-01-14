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
      isVerified:DataTypes.BOOLEAN,
      provider: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN
    },{}
  );
  Users.associate = models =>{
    Users.belongsTo(models.userRoles, {
      as: 'role',
      foreignKey: 'roleId'
    });
  }

  return Users;
};

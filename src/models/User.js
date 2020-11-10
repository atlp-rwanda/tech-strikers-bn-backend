'use strict';
import sequelize from 'sequelize'
const {Model}=sequelize
export default(sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    image: DataTypes.STRING,
    favorites: DataTypes.STRING,
    following: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

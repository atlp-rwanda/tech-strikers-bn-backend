export default (sequelize, DataTypes) => {
    const Accommodation = sequelize.define(
      "Accommodation",
      {
        fullname: DataTypes.STRING,
        type: DataTypes.STRING,
        lacation: DataTypes.STRING,
        photo: DataTypes.STRING,
        address: DataTypes.STRING,
        facilities: DataTypes.STRING,
      },
      {}
    );
    return Accommodation;
  };
  
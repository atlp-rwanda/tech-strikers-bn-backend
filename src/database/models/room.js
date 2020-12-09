'use strict';
export default (sequelize,DataTypes)=>{

  const Room =sequelize.define('Room',{

    booked:{
      type:DataTypes.BOOLEAN,
      default:false
    },
    roomNumber:{
      type:DataTypes.INTEGER
    },
    cost:{
      type:DataTypes.DECIMAL,
      allowNull:false
    },
    totalBedroom:{
      type:DataTypes.INTEGER
    },
    type:{
      type:DataTypes.STRING
    },
    amenities:{
      type:DataTypes.ARRAY(DataTypes.STRING)
    },
    image:{
      type:DataTypes.ARRAY(DataTypes.STRING)
    },
    
  },{})
  Room.associate = models=>{
    Room.belongsTo(models.Accommodations,{foreignKey:"accommodation_id"})
  }
  return Room
}
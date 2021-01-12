'use strict';
export default (sequelize,DataTypes)=>{

  const Rooms =sequelize.define('Rooms',{

    accommodationId: DataTypes.INTEGER,

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
  Rooms.associate = models=>{
    Rooms.belongsTo(models.Accommodations,{foreignKey:"accommodationId"})
  }
  return Rooms
}
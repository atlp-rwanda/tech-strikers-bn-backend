'use strict';

export default(sequelize,DataTypes)=>{
  const Booking = sequelize.define("Booking",{

    checkin:DataTypes.DATE,
    checkout:DataTypes.DATE,
    userId: { type: DataTypes.INTEGER,
      references: { model: "Users", key: "id", onDelete: "CASCADE" }
    },
    accommodationId: { type: DataTypes.INTEGER,
      references: { model: "Accommodations", key: "id", onDelete: "CASCADE" }
    },
    roomId: { type: DataTypes.INTEGER,
      references: { model: "Rooms", key: "id", onDelete: "CASCADE" }
    },
    tripId: { type: DataTypes.INTEGER,
      references: { model: "Trips", key: "id", onDelete: "CASCADE" }
    },
    status:{
      type:DataTypes.ENUM("approved","pending","rejected"),
      defaultValue:"pending"
    },

  },{})
  Booking.associate=models=>{
    Booking.belongsTo(models.Users,{foreignKey:"userId"})
    Booking.belongsTo(models.Accommodations,{foreignKey:"accommodationId"})
    Booking.belongsTo(models.Rooms,{foreignKey:"roomId"})
    Booking.belongsTo(models.Trips,{foreignKey:"tripId"})
  }

  return Booking;
}


import models from "../database/models/index"
import RoleService from "../services/role.service";
const { Accommodation, Rooms } = models

class CrudRooms {
    static async addRoom (req, res){
        const { id } = req.params;
        const { roomType, roomNumber, price ,facilities } = req.body;
        const accommodation = await Accommodation.findByPk(id);
        if(!accommodation){
            return res.status(404)
            .json({
                message: res.__("This accommodation doesn't exist")
            })
        }
    
        const room = await Rooms.create({
            accommodationId: id,
            roomType,
            facilities,
            roomNumber,
            price
        })

        if(!room){
            return res.status(400)
            .json({
                message: "Didn't create room"
            })
        }

        return res.status(201)
        .json({
            message: `[${roomType}] is created in [${accommodation.accommodationName}]`
        })
    }

static async getRooms(req, res){
  const {id } = req.params;
  const rooms = await Rooms.findAll({where: {accommodationId:id}});
  const accommodation = await Accommodation.findByPk(id);
  if(!accommodation){
    return res.status(404)
    .json({
        message: res.__("This accommodation doesn't exist")
    })
}

  if(!rooms || rooms.length === 0 ){
      return res.status(404).json({message: res.__(`No rooms available in [${accommodation.accommodationName}]`)})
  }

  return res.status(200).json({
      rooms
  })
    }

    static async deleteRooms(req, res){
const { id } = req.body;
const accommodationToDeleteIn= await Accommodation.findByPk(req.params.id);
if(!accommodationToDeleteIn){
    return res.status(404).json({
        message: res.__("This accommodation doesn't exist")
    })
}

const deletedRoom = await Rooms.destroy({where: { id }});

if(!deletedRoom){
    return res.status(404).json({
        message: res.__("Room you need to delete doesn't exist")
    })
}

return res.status(200).json({
    message: res.__("Room deleted successfully")
})
    }


    static async updateRooms(req, res){
        const { id } = req.params;
        const accommodationToDeleteIn= await Accommodation.findByPk(req.params.id);
        if(!accommodationToDeleteIn){
            return res.status(404).json({
                message: res.__("This accommodation doesn't exist")
            })
        }
        const updatedRoom = await Rooms.update(
        
            {
                roomType: req.body.roomType,
                facilities: req.body.facilities,
                roomNumber: req.body.roomNumber,
                price: req.body.price
            },
            {
                where: {
                  id 
                }
              }
            );
        
        return res.status(200).json({
            message: res.__("Room updated successfully"), updatedRoom
        })
            }
         
        }

        
    

export default CrudRooms
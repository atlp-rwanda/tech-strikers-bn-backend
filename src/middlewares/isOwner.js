import models from "../database/models/index"
const { Trips } = models


const isOwner = async (req, res, next) => {
    const trip = await Trips.findOne({ where: { id: req.body.id } })
    console.log(trip)
    if (!(trip.userId === req.user.id)) {
        return res.send(401, 'you can not book the accommodation');
    }

   return next();
}

export default isOwner
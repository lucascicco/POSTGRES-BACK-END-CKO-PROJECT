import Location from '../models/location';
import User from '../models/user';

class LocationController{
    async store(req, res){
        const user = await User.findByPk(req.userId)

        const FirstLocation = await Location.create(req.body)

        await user.update({
            location: FirstLocation.id
        })

        return res.json(FirstLocation)
    }

    async purchase_store(req, res){
        const location = await Location.create(req.body);
        
        return res.json(location);
    }

    async update(req, res){
        console.log('It has been called' + req.body)
        const { dataValues } = await User.findByPk(req.userId) //auth
            
        const locationItem = await Location.findByPk(dataValues.location); //locationItem

        await locationItem.update(req.body);

        return res.json(locationItem);
    }
}

export default new LocationController()
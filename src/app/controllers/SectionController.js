import jwt from 'jsonwebtoken';
import AvatarFile from '../models/avatarpictures';
import PersonalData  from '../models/information';
import Location from '../models/location';
import FavoriteItem from '../models/favoriteitems';

import User from '../models/user';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, res){
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
            include: [
                {
                    model: AvatarFile,
                    as: 'avatar',
                    attributes: ['id', 'path', 'url']
                },
                {
                    model: Location,
                    as: 'user_location',
                    attributes: ['postcode', 'country','state', 'city', 'neighborhood', 'street','street_number']
                },
                {
                    model: PersonalData,
                    as: 'user_personal_info',
                    attributes: ['birthday', 'gender', 'identification', 'profession', 'cellphone']
                },
                {
                    model: FavoriteItem,
                    as: 'user_favorite_items',
                    attributes: ['favorite_array']
                }
            ]
        })

        if(!user){
            return res.status(401).json({ error: 'User not found.'})
        }

        if(!(await user.checkPassword(password))){
            return res.status(401).json({ error: 'Password does not match.'})
        }

        const { id, name, avatar , user_location, user_personal_info, favorite_items} =  user;

        return res.json({
            user: {
                id,
                name,
                email,
                avatar,
                user_location,
                user_personal_info,
                favorite_items
            },
            token: jwt.sign({ id }, authConfig.secret , {
                    expiresIn: authConfig.expiresIn,
            })
        })
    }
}

export default new SessionController()

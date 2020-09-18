import User from '../models/user';
import {
    DeleteItem,
    AddItemIntoArray
} from '../../utils/ArrayFunctions';

class FavoriteItemsController{
    async AddItem(req, res){
        console.log('ADD item was ' + req.body.item)
        const user = await User.findByPk(req.userId)

        if(user.dataValues.favorite_items === null){
            await user.update({
                favorite_items: [req.body.item]
            })

            return res.json([req.body.item]);
        }else{

            const arrayOfItems = AddItemIntoArray(user.dataValues.favorite_items, req.body.item)

            await user.update({
                favorite_items: arrayOfItems
            })

            return res.json(arrayOfItems);
        }
    }

    async RemoveItem(req, res){
        console.log('REMOVE item was ' + req.body.item)
        const user = await User.findByPk(req.userId)

        const arrayOfItems = DeleteItem(user.dataValues.favorite_items, req.body.item)
        
        await user.update({
            favorite_items: arrayOfItems
        })

        return res.json(arrayOfItems);
    }
}

export default new FavoriteItemsController()
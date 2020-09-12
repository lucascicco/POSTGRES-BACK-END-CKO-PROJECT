import FavoriteItem from '../models/favoriteitems';
import User from '../models/user';
import {
    DeleteItem,
    AddItemIntoArray
} from '../../utils/ArrayFunctions';

class FavoriteItemsController{
    async AddItem(req, res){
        const user = await User.findByPk(req.userId)
        
        const favoriteID = user.dataValues.favorite_id

        if(favoriteID === null){
            const FirstFavoriteItem = await FavoriteItem.create({
                favoriteArray: [req.body.item]
            })
            
            await user.update({
                favorite_id: FirstFavoriteItem.id
            })

            return res.json(FirstFavoriteItem);
        }else{
            const favoriteItem = await FavoriteItem.findByPk(favoriteID)
            const arrayOfItems = AddItemIntoArray(favoriteItem.dataValues.favoriteArray, req.body.item)

            await favoriteItem.update({
                favoriteArray: arrayOfItems
            })

            return res.json(favoriteItem);
        }
    }

    async RemoveItem(req, res){
        const user = await User.findByPk(req.userId)
        const favoriteID = user.dataValues.favorite_id

        const favoriteItem = await FavoriteItem.findByPk(favoriteID)
        const arrayOfItems = DeleteItem(favoriteItem.dataValues.favoriteArray, req.body.item)
        
        await favoriteItem.update({
            favoriteArray: arrayOfItems
        })

        return res.json(favoriteItem);
    }
}

export default new FavoriteItemsController()
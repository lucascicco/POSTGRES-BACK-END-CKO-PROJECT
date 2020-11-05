import User from '../models/user';
import { DeleteItem, AddItemIntoArray } from '../../utils/ArrayFunctions';

class FavoriteItemsController {
  async AddItem(req, res) {
    const user = await User.findByPk(req.userId);

    if (user.dataValues.favorite_items === null) {
      await user.update({
        favorite_items: [req.body.item],
      });

      return res.json([req.body.item]);
    }

    if ([...user.dataValues.favorite_items].includes(req.body.item)) {
      return res.json(user.dataValues.favorite_items);
    }

    const arrayOfItems = AddItemIntoArray(
      user.dataValues.favorite_items,
      req.body.item
    );

    await user.update({
      favorite_items: arrayOfItems,
    });

    return res.json(arrayOfItems);
  }

  async RemoveItem(req, res) {
    const user = await User.findByPk(req.userId);

    const arrayOfItems = DeleteItem(
      user.dataValues.favorite_items,
      req.body.item
    );

    await user.update({
      favorite_items: arrayOfItems,
    });

    return res.json(arrayOfItems);
  }

  async GetArray(req, res) {
    const user = await User.findByPk(req.userId);

    return res.json(user.dataValues.favorite_items);
  }
}

export default new FavoriteItemsController();

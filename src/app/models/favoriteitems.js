import Sequelize, { Model } from 'sequelize';

class FavoriteItems extends Model {
    static init(sequelize){
        super.init(
        {
            favoriteArray: {
                type: Sequelize.ARRAY(Sequelize.INTEGER)
            }
        },
        {
            sequelize
        })

            return this;
    }


}

export default FavoriteItems;

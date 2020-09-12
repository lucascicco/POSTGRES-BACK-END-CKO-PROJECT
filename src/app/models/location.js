import Sequelize, { Model } from 'sequelize';

class Location extends Model {

    static init(sequelize){
        super.init(
        {
            country: Sequelize.STRING,
            state: Sequelize.STRING,
            city: Sequelize.STRING,
            neighborhood: Sequelize.STRING,
            street: Sequelize.STRING,
            street_number: Sequelize.STRING,
            postcode: Sequelize.STRING
        },
            {
                sequelize
            })

            return this;
    }


}

export default Location;

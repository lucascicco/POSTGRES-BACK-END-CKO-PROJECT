import Sequelize, { Model } from 'sequelize';

class Features extends Model{
    static init(sequelize){
        super.init(
        {
            weight: Sequelize.DECIMAL,
            format: Sequelize.STRING,
            length: Sequelize.DECIMAL,
            width: Sequelize.DECIMAL,
            diameter: Sequelize.DECIMAL,
        },
        {
            sequelize,
        });

        return this;
    }
}

export default Features;

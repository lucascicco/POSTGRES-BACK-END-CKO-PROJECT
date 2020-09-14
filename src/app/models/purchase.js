import Sequelize, { Model } from 'sequelize';

class Purchase extends Model{
    static init(sequelize){
        super.init(
        {
            purchase_code: Sequelize.STRING,
            purchase_quantity: Sequelize.INTEGER,
            canceled_at: Sequelize.DATE,
            payment_form: Sequelize.STRING,
            frete_price: Sequelize.DECIMAL,
            purchase_total: {
                type: Sequelize.VIRTUAL,
                get() { 
                    return this.total_price - this.frete_price
                }
            },
            total_price: Sequelize.DECIMAL,
        },
        {
            sequelize,
        });

        return this;
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'seller', as: 'user_seller' });
        this.belongsTo(models.Location, { foreignKey: 'purchase_location', as: 'location' });
        this.belongsTo(models.User, { foreignKey: 'buyer', as: 'user_buyer' });
    }
}

export default Purchase;

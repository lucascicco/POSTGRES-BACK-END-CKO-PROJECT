import Sequelize, { Model } from 'sequelize';

class Product extends Model{
    static init(sequelize){
        super.init(
        {
            product_name: Sequelize.STRING,
            category: Sequelize.STRING,
            price: Sequelize.DECIMAL,
            quantity: Sequelize.INTEGER,
            description: Sequelize.STRING,
            status: Sequelize.STRING,
            paused_at: Sequelize.DATE,
            purchasable: {
                type: Sequelize.VIRTUAL,
                get() {
                    return this.quantity !== 0
                }
            }
        },
        {
            sequelize,
        });

        return this;
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'seller', as: 'user_seller' })
        this.belongsTo(models.ProductFile, { foreignKey: 'image_id', as: 'product_image' })
        this.belongsTo(models.ProductFeatures, { foreignKey: 'features', as: 'features_product' })
    }
}

export default Product;

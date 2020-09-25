import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
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
            return this.quantity !== 0;
          },
        },
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'seller', as: 'user_seller' });
    this.belongsTo(models.ProductFeatures, {
      foreignKey: 'features',
      as: 'features_product',
    });

    this.belongsToMany(models.Order, {
      through: 'order_items',
      as: 'orders',
      foreignKey: 'ProductId',
    });
  }
}

export default Product;

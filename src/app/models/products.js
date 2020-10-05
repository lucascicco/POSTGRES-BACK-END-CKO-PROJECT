import Sequelize, { Model } from 'sequelize';
import StatusIdGenerator from '../../utils/status_id';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        product_name: Sequelize.STRING,
        category: Sequelize.STRING,
        price: {
          type: Sequelize.DECIMAL,
          get() {
            return parseFloat(this.getDataValue('price'));
          },
        },
        quantity: Sequelize.INTEGER,
        description: Sequelize.STRING,
        status: Sequelize.STRING,
        status_id: {
          type: Sequelize.VIRTUAL,
          get() {
            return StatusIdGenerator(this.status);
          },
        },
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
  }
}

export default Product;

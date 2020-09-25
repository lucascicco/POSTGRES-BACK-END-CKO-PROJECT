import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        price_total: Sequelize.DECIMAL,
        form_payment: Sequelize.STRING,
        frete_price: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'seller', as: 'user_seller' });
    this.belongsTo(models.User, { foreignKey: 'buyer', as: 'user_buyer' });

    this.belongsToMany(models.Product, {
      through: 'order_items',
      as: 'products',
      foreignKey: 'OrderId',
    });
  }
}

export default Order;

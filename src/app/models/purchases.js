import Sequelize, { Model } from 'sequelize';

class Purchase extends Model {
  static init(sequelize) {
    super.init(
      {
        purchase_code: Sequelize.STRING,
        purchase_quantity: Sequelize.INTEGER,
        canceled_at: Sequelize.DATE,
        payment_form: Sequelize.STRING,
        deliver_date: Sequelize.DATE,
        total_price: {
          type: Sequelize.DECIMAL,
          get() {
            return parseFloat(this.getDataValue('total_price'));
          },
        },
        frete_price: {
          type: Sequelize.DECIMAL,
          get() {
            return parseFloat(this.getDataValue('frete_price'));
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
    this.belongsTo(models.Location, {
      foreignKey: 'purchase_location',
      as: 'location',
    });
    this.belongsTo(models.User, { foreignKey: 'buyer', as: 'user_buyer' });
    this.belongsTo(models.Product, {
      foreignKey: 'product',
      as: 'purchase_product',
    });
  }
}

export default Purchase;

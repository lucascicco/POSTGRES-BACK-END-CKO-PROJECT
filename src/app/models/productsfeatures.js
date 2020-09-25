import Sequelize, { Model } from 'sequelize';

class ProductFeatures extends Model {
  static init(sequelize) {
    super.init(
      {
        weight: Sequelize.STRING,
        format: Sequelize.INTEGER,
        length: Sequelize.INTEGER,
        width: Sequelize.INTEGER,
        height: Sequelize.INTEGER,
        diameter: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default ProductFeatures;

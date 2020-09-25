import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import AvatarFile from '../app/models/avatarpictures';
import PersonalData from '../app/models/information';
import Product from '../app/models/products';
import User from '../app/models/user';
import Location from '../app/models/location';
import Purchases from '../app/models/purchases';
import ProductFeatures from '../app/models/productsfeatures';
import Order from '../app/models/order';

const models = [
  Product,
  User,
  Location,
  AvatarFile,
  PersonalData,
  Purchases,
  ProductFeatures,
  Order,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();

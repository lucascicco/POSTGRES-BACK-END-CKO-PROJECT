import Sequelize, { Model } from 'sequelize';

class PersonalData extends Model {
  static init(sequelize) {
    super.init(
      {
        birthday: Sequelize.DATE,
        gender: Sequelize.STRING,
        identification: Sequelize.STRING,
        profession: Sequelize.STRING,
        cellphone: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default PersonalData;

import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        favorite_items: Sequelize.ARRAY(Sequelize.NUMBER),
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.AvatarFile, {
      foreignKey: 'avatar_id',
      as: 'avatar',
    });
    this.belongsTo(models.Location, {
      foreignKey: 'location',
      as: 'user_location',
    });
    this.belongsTo(models.PersonalData, {
      foreignKey: 'personal_info',
      as: 'user_personal_info',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;

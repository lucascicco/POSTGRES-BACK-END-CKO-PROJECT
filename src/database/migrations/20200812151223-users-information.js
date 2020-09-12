module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('personal_data', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        birthday:{
            type: Sequelize.DATE,
            allowNull: false
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false
        },
        identification: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cellphone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        profession: {
            type: Sequelize.STRING,
            allowNull: false
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updated_at:{
            type: Sequelize.DATE,
            allowNull: false
        }
    });
  },

  down: (queryInterface) => {
     return queryInterface.dropTable('personal_data');
  }
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_features', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      weight: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      format: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      length: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      width: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      height: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      diameter: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('product_features');
  },
};

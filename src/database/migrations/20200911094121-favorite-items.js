module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('favorite_items', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        favorite_array: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
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
     return queryInterface.dropTable('favorite_items');
  }
};

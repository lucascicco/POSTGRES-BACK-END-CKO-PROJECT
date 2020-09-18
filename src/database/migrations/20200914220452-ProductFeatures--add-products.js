module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('products', 'features', {
        type: Sequelize.INTEGER,
        references: { model: 'product_features', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      });
    },
  
    down: queryInterface => {
      return queryInterface.removeColumn('products', 'features');
    }
};
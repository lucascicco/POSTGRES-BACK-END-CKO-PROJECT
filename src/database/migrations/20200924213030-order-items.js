module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('order_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      OrderId: {
        type: Sequelize.INTEGER,
        references: { model: 'orders', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      quantitybought: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('order_items');
  },
};

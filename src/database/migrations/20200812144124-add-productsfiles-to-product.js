module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'image_id', {
      type: Sequelize.INTEGER,
      references: { model: 'product_files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('products', 'image_id');
  }
};

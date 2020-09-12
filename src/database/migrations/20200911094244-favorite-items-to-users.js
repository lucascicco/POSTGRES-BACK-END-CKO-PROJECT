module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'favorite_id', {
      type: Sequelize.INTEGER,
      references: { model: 'favorite_items', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'favorite_id');
  }
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'location', {
      type: Sequelize.INTEGER,
      references: { model: 'locations', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'location');
  }
};

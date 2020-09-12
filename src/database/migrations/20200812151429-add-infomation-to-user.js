module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'personal_info', {
      type: Sequelize.INTEGER,
      references: { model: 'personal_data', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'personal_info');
  }
};

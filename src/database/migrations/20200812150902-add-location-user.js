export function up(queryInterface, Sequelize) {
  return queryInterface.addColumn('users', 'location', {
    type: Sequelize.INTEGER,
    references: { model: 'locations', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    allowNull: true,
  });
}
export function down(queryInterface) {
  return queryInterface.removeColumn('users', 'location');
}

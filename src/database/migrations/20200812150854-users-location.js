module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('locations', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        country:{
            type: Sequelize.STRING,
            allowNull: false
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        neighborhood: {
            type: Sequelize.STRING,
            allowNull: false
        },
        street: {
            type: Sequelize.STRING,
            allowNull: false
        },
        street_number: { 
            type: Sequelize.STRING,
            allowNull: false,
        },
        postcode:{
          type: Sequelize.STRING,
          allowNull: false,
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
     return queryInterface.dropTable('locations');
  }
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_features', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        weight: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        format: {
            type: Sequelize.STRING,
            allowNull: false
        },
        length:{
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        width: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },        
        height: {
          type: Sequelize.DECIMAL,
          allowNull: true
        },  
        diameter : {
            type: Sequelize.DECIMAL,
            allowNull: true
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
     return queryInterface.dropTable('product_features');
  }
};

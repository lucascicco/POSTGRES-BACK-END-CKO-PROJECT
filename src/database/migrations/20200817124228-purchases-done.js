module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('purchases', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        purchase_code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        product: {
            type: Sequelize.INTEGER,
            references: { model: 'products', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: false
          },
        buyer: {
            type: Sequelize.INTEGER,
            references: { model: 'users', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: false
        }, 
        seller: {
            type: Sequelize.INTEGER,
            references: { model: 'users', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: false
        },
        purchase_location: {
            type: Sequelize.INTEGER,
            references: { model: 'locations', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true
        },
        purchase_quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        total_price: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        payment_form: { 
            type: Sequelize.STRING,
            allowNull: false
        },
        frete_price: { 
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        canceled_at:{
            type: Sequelize.DATE,
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
     return queryInterface.dropTable('purchases');
  }
};

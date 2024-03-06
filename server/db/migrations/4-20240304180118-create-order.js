/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderPetId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Pets',
          },
          key: 'id',
        },
      },
      orderRoomId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Rooms',
          },
          key: 'id',
        },
      },
      orderDateIn: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      orderDateOut: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      addInfo: {
        type: Sequelize.TEXT,
      },
      paymentStatus: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Orders');
  },
};

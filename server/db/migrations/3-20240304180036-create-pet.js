/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      petUserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
      },
      petType: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      petName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      petBreed: {
        type: Sequelize.STRING,
      },
      petGender: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      petAge: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      petIsSprayed: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      petAbout: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('Pets');
  },
};

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roomAbout: {
        type: Sequelize.TEXT
      },
      roomPhoto: {
        type: Sequelize.STRING
      },
      roomCapacity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      roomPetType: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      roomPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Rooms');
  }
};
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: '123',
          lastName: '123',
          email: '123@123.ru',
          password: '123',
          phone: '123',
          isWorker: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'qwe',
          lastName: 'qwe',
          email: 'qwe@qwe.ru',
          password: 'qwe',
          phone: 'qwe',
          isWorker: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

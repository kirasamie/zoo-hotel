'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'PetImages',
      [
        {
          petId: 3,
          link: 'matilda4(avatar).jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          petId: 4,
          link: 'pusya1(avatar).jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PetImages', null, {});
  },
};

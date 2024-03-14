'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Comments',
      [
        {
          body: 'Что за крыса?',
          userId: 1,
          postId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: 'Это купание редкой породы Скандинавского Огненного Лиса',
          userId: 5,
          postId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: 'Никогда о такой не слышал',
          userId: 1,
          postId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: 'крыса и крыса',
          userId: 1,
          postId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: 'Но это же ваша Матильда!!!',
          userId: 4,
          postId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  },
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Pets', [
      {
        petUserId: 1,
        petType: 2,
        petName: 'Кайл',
        petBreed: 'Злыдня',
        petGender: 'М',
        petAge: 4,
        petIsSprayed: false,
        petAbout: 'Мой пусечка, очень ласковый и миролюбивый песик!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        petUserId: 1,
        petType: 1,
        petName: 'Булочка',
        petBreed: 'британская вислоухая',
        petGender: 'Ж',
        petAge: 2,
        petIsSprayed: true,
        petAbout: 'Лучшая кошечка в мире',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Pets', null);
  },
};

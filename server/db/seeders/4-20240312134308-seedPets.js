'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Pets', [
      {
        petUserId: 3,
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
        petUserId: 3,
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
      {
        petUserId: 1,
        petType: 2,
        petName: 'Матильда',
        petBreed: 'Скандинавский огненный лис',
        petGender: 'Ж',
        petAge: 2,
        petIsSprayed: true,
        petAbout: 'Лучшая собака в мире',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        petUserId: 2,
        petType: 1,
        petName: 'Пуся',
        petBreed: 'Фиг его знает',
        petGender: 'Ж',
        petAge: 3,
        petIsSprayed: true,
        petAbout: 'Лучшая пуся в мире',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Pets', null);
  },
};

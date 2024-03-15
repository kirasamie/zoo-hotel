'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Posts',
      [
        {
          title: 'Отдыхаем',
          body: 'Соблюдаем режим сна',
          postPhotoLink: 'matilda1.jpg',
          workerId: 5,
          orderId: 1,
          createdAt: new Date('03.03.2024'),
          updatedAt: new Date(),
        },
        {
          title: 'Погуляли с Матильдой',
          body: 'Матильда очень дружелюбна к лошадкам',
          postPhotoLink: 'matilda3.jpg',
          workerId: 5,
          orderId: 1,
          createdAt: new Date('03.04.2024'),
          updatedAt: new Date(),
        },
        {
          title: 'Покушали',
          body: 'Скоро пойдем мыться',
          postPhotoLink: 'matilda2.jpg',
          workerId: 5,
          orderId: 1,
          createdAt: new Date('03.05.2024'),
          updatedAt: new Date(),
        },
        {
          title: 'Водные процедуры с Матильдой',
          body: 'Раньше, она казалась больше',
          postPhotoLink: 'matilda5.jpg',
          workerId: 5,
          orderId: 1,
          createdAt: new Date('03.06.2024'),
          updatedAt: new Date(),
        },
        {
          title: 'Только проснулись',
          body: 'И даже не улыбнулись',
          postPhotoLink: 'pusya2.jpg',
          workerId: 5,
          orderId: 3,
          createdAt: new Date('03.11.2024'),
          updatedAt: new Date(),
        },
        {
          title: 'Спим',
          body: 'Топ 10 неожиданных поз для сна',
          postPhotoLink: 'pusya4.jpg',
          workerId: 5,
          orderId: 3,
          createdAt: new Date('03.13.2024'),
          updatedAt: new Date(),
        },
        {
          title: 'Фотогенично умываемся',
          body: 'В ожидании начала процедур',
          postPhotoLink: 'pusya3(post).jpg',
          workerId: 5,
          orderId: 3,
          createdAt: new Date('03.14.2024'),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};

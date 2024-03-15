'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Евгений',
        lastName: 'Белан',
        email: 'evgeniy.belan@mail.ru',
        password: await bcrypt.hash('123', 10),
        avatar: 'avatarJenya.jpg',
        phone: '88001523457',
        isWorker: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Кирилл',
        lastName: 'Шавыкин',
        email: 'kirill.shavykin@mail.ru',
        password: await bcrypt.hash('123', 10),
        phone: '88002357124',
        isWorker: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Пользователь',
        lastName: 'Пользователев',
        email: '123',
        password: await bcrypt.hash('123', 10),
        phone: '123',
        isWorker: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Работник',
        lastName: 'Работников',
        email: 'qwe',
        password: await bcrypt.hash('qwe', 10),
        phone: '123',
        isWorker: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Кирилл',
        lastName: 'Будаев',
        email: 'kirill.budaev@mail.ru',
        password: await bcrypt.hash('123', 10),
        phone: '88005556565',
        isWorker: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

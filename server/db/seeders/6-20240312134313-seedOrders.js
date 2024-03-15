'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Orders', [
      {
        orderUserId: 1,
        orderPetId: 3,
        orderRoomId: 9,
        orderDateIn: 'Mon Mar 4 2024',
        orderDateOut: 'Sun Mar 10 2024',
        addInfo: 'Уезжаю в командировку, позаботьтесь о моем песике!',
        addServices: '1234567',
        paymentStatus: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderUserId: 3,
        orderPetId: 1,
        orderRoomId: 9,
        orderDateIn: 'Wed Apr 10 2024',
        orderDateOut: 'Wed Apr 17 2024',
        addInfo: 'Уезжаю в армию (надеюсь, что нет), позаботьтесь о моей кошечке!',
        addServices: '12356',
        paymentStatus: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderUserId: 2,
        orderPetId: 4,
        orderRoomId: 5,
        orderDateIn: 'Sun Mar 10 2024',
        orderDateOut: 'Sun Mar 24 2024',
        addInfo: 'Уезжаю в командировку, позаботьтесь о моем добром песике!',
        addServices: '2456',
        paymentStatus: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Orders', null);
  },
};

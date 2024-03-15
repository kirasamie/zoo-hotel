/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'RoomImages',
      [
        {
          id: 1,
          roomId: 1,
          link: '/img/rooms/roomId1.jpg',
        },
        {
          id: 2,
          roomId: 1,
          link: '/img/rooms/roomId1two.jpg',
        },
        {
          id: 3,
          roomId: 1,
          link: '/img/rooms/roomId1three.jpg',
        },
        {
          id: 4,
          roomId: 1,
          link: '/img/rooms/roomId1four.jpg',
        },
        {
          id: 5,
          roomId: 2,
          link: '/img/rooms/roomId23one.jpg',
        },
        {
          id: 6,
          roomId: 2,
          link: '/img/rooms/roomId23two.jpg',
        },
        {
          id: 7,
          roomId: 2,
          link: '/img/rooms/roomId23three.jpg',
        },
        {
          id: 8,
          roomId: 3,
          link: '/img/rooms/roomId23one.jpg',
        },
        {
          id: 9,
          roomId: 3,
          link: '/img/rooms/roomId23two.jpg',
        },
        {
          id: 10,
          roomId: 3,
          link: '/img/rooms/roomId23three.jpg',
        },
        {
          id: 11,
          roomId: 4,
          link: '/img/rooms/roomId4.jpg',
        },
        {
          id: 12,
          roomId: 4,
          link: '/img/rooms/roomId4two.jpg',
        },
        {
          id: 13,
          roomId: 5,
          link: '/img/rooms/roomId56.jpg',
        },
        {
          id: 14,
          roomId: 5,
          link: '/img/rooms/roomId56two.jpg',
        },
        {
          id: 15,
          roomId: 6,
          link: '/img/rooms/roomId56.jpg',
        },
        {
          id: 16,
          roomId: 6,
          link: '/img/rooms/roomId56two.jpg',
        },
        {
          id: 17,
          roomId: 7,
          link: '/img/rooms/roomId7one.jpg',
        },
        {
          id: 18,
          roomId: 7,
          link: '/img/rooms/roomId7two.jpg',
        },
        {
          id: 19,
          roomId: 8,
          link: '/img/rooms/roomId8one.jpg',
        },
        {
          id: 20,
          roomId: 8,
          link: '/img/rooms/roomId8two.jpg',
        },
        {
          id: 21,
          roomId: 8,
          link: '/img/rooms/roomId8three.jpg',
        },
        {
          id: 22,
          roomId: 9,
          link: '/img/rooms/roomId9one.jpg',
        },
        {
          id: 23,
          roomId: 9,
          link: '/img/rooms/roomId9two.jpg',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RoomImages', null, {});
  },
};

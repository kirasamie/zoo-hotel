/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Rooms',
      [
        {
          id: 1,
          roomAbout:
            'В уголке нашего дома, среди теплого и мягкого света лампы, расположилась уютная комната для вашего любимого питомца. Это место, где он может чувствовать себя как дома, находясь в окружении заботы и уюта.',
          roomCapacity: 1,
          roomPetType: 1,
          roomPrice: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          roomAbout:
            'Милая и уютная комната для вашего любимого питомца. В углу комнаты находится специальное место для отдыха – небольшой кошачий домик с мягким одеялом внутри, где Ваш питомец может расслабиться и наслаждаться своим собственным пространством. ',
          roomCapacity: 2,
          roomPetType: 1,
          roomPrice: 600,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          roomAbout:
            'Милая и уютная комната для вашего любимого питомца. В углу комнаты находится специальное место для отдыха – небольшой кошачий домик с мягким одеялом внутри, где Ваш питомец может расслабиться и наслаждаться своим собственным пространством. ',
          roomCapacity: 2,
          roomPetType: 1,
          roomPrice: 600,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          roomAbout:
            'Идеальный вариант для вашего хвостатого друга. Специально для него мы предлагаем большой просторный номер, где можно делать все, что пожелает ваш питомец. Он сможет подолгу наблюдать из панорамного окна, где открывается вид на лес со второго этажа нашей гостиницы, уютно устроившись в своей лежанке. ',
          roomCapacity: 2,
          roomPetType: 2,
          roomPrice: 700,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          roomAbout:
            'Как только ваш питомец сделает первые шаги в свою новую комнату, он окажется в атмосфере уюта и комфорта. Просторный номер с окном ждёт вашего любимца!',
          roomCapacity: 2,
          roomPetType: 12,
          roomPrice: 750,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          roomAbout:
            'Идеальный вариант для вашего хвостатого друга. Специально для него мы предлагаем большой просторный номер, где можно делать все, что пожелает ваш питомец. Он сможет подолгу наблюдать из панорамного окна, где открывается вид на лес со второго этажа нашей гостиницы, уютно устроившись в своей лежанке. ',
          roomCapacity: 2,
          roomPetType: 12,
          roomPrice: 750,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          roomAbout:
            'Если ваш питомец приемлет только VIP-обслуживание, то апартаменты с мягкой кроваткой, домиком и когтеточкой — именно то, что вы искали.',
          roomCapacity: 1,
          roomPetType: 1,
          roomPrice: 800,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          roomAbout:
            'Наш большой просторный номер с теплым полом и окнами. Наши апартаменты в приятных и теплых тонах понравятся даже самым требовательным клиентам.',
          roomCapacity: 2,
          roomPetType: 12,
          roomPrice: 1600,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          roomAbout:
            'Самая большая комната, площадью 12м², с просторными панорамными окнами подойдет абсолютно для любого вашего питомца!',
          roomCapacity: 2,
          roomPetType: 12,
          roomPrice: 1700,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Rooms', null, {});
  },
};

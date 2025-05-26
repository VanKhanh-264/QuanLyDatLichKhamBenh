'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        email: 'vk@example.com',
        password:'123456',
        firstName: 'Khanh',
        lastName: 'Nguyen',
        address: '92 Quang Nam',
        phonenumber: '0123456789',
        gender:1,
        image:'ROLE',
        roleId:'R1',
        positionId:'01',       
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

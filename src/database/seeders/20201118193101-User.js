'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'tytyne',
        email: 'tytyne@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'fofo',
        email: 'fofo@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};

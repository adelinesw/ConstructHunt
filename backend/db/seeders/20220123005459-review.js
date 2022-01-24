'use strict';
// const { commerce } = require("faker");
const loremIpsum = require("lorem-ipsum").loremIpsum;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews',
      [
        {
          userId: 1,
          productId: 1,
          review: /*commerce.productDescription()*/ loremIpsum(),
        },
        {
          userId: 2,
          productId: 2,
          review: /*commerce.productDescription()*/ loremIpsum(),
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Reviews', null, {});
  }
};
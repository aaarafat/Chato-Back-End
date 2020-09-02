const { User } = require('../../../src/models');
const faker = require('faker');

/**
 * Create Fake User to use it with tests
 * 
 * @author Abdelrahman Tarek
 * @function
 * @public
 * @summary Create Fake User to use it with tests
 * @returns {Document} user
 */
const createFakeUser = () => {
    const user = new User({
        name: faker.name.findName(),
        email: faker.internet.email()
    });

    return user;
};

module.exports = { createFakeUser };

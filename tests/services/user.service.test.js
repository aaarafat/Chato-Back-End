const mockingoose = require('mockingoose').default;
const { User } = require('../../src/models');
const { userMock } = require('../mocks/models');
const { userService } = require('../../src/services');

describe('User Service', () => {
    let user;
    beforeEach(() => {
        user = userMock.createFakeUser();
        mockingoose(User)
            .toReturn(user, 'findOne');
    });

    it('should return user', async () => {
        const result = await userService.getUserById('1');
        expect(result).toBe(user);
    });

});
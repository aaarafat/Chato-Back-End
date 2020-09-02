const mockingoose = require('mockingoose').default;
const { User } = require('../../src/models');
const { userMock } = require('../mocks/models');
const { userService } = require('../../src/services');

describe('User Service', () => {
    let user;
    beforeEach(() => {
        user = userMock.createFakeUser();
        mockingoose(User)
            .toReturn(user, 'findOne')
            .toReturn([user], 'find');
    });

    describe('getUserById', () => {
        it('should return user', async () => {
            const result = await userService.getUserById('1');
            expect(result).toBe(user);
        });
    });

    describe('getUserByName', () => {
        it('should return users', async () => {
            const result = await userService.getUsersByName('1', 20, 10);
            expect(result.length).toBeGreaterThan(0);
        });
    });
});
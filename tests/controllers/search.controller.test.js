const mockingoose = require('mockingoose').default;
const { userService } = require('../../src/services');
const { searchController } = require('../../src/controllers');
const { userMock } = require('../mocks/models');
const { requestMock } = require('../mocks');

describe('Search Controller', () => {
    let user, req, res;

    describe('userSearch', () => {
        beforeEach(() => {
            user = userMock.createFakeUser();
            userService.getUsersByName = jest.fn().mockImplementationOnce(() => [user]);
            res = requestMock.mockResponse();
            req = { query: { q: 'f', limit: 10, offset: 1 } };
        });

        it('should call getUsersByName service', async () => {
            await searchController.userSearch(req, res);
            expect(userService.getUsersByName).toHaveBeenCalled();
        });

        it('should call getUsersByName service with q limit offset', async () => {
            await searchController.userSearch(req, res);
            expect(userService.getUsersByName).toHaveBeenCalledWith(req.query.q, req.query.limit, req.query.offset);
        });

        it('should return 200 if valid', async () => {
            await searchController.userSearch(req, res);
            expect(res.status.mock.calls[0][0]).toBe(200);
        });

        it('should return users if valid', async () => {
            await searchController.userSearch(req, res);
            expect(res.json.mock.calls[0][0].users[0]).toEqual(user);
        });
    });
});

const mockingoose = require('mockingoose').default;
const { userService } = require('../../src/services');
const { userController } = require('../../src/controllers');
const { userMock } = require('../mocks/models');
const { requestMock } = require('../mocks');

describe('User Controller', () => {
    let user, req, res;
    beforeEach(() => {
        user = userMock.createFakeUser();
        userService.getUserById = jest.fn().mockImplementationOnce(() => user);
        res = requestMock.mockResponse();
        req = { params: { id: '1' } };
    });

    it('should call getUserById service', async () => {
        await userController.getUserById(req, res);
        expect(userService.getUserById).toHaveBeenCalled();
    });

    it('should call getUserById service with id', async () => {
        await userController.getUserById(req, res);
        expect(userService.getUserById).toHaveBeenCalledWith(req.params.id);
    });

    it('should return 404 if no user is found', async () => {
        userService.getUserById = jest.fn().mockImplementationOnce(() => null);
        await userController.getUserById(req, res);
        expect(res.status.mock.calls[0][0]).toBe(404);
    });

    it('should return 200 if valid', async () => {
        await userController.getUserById(req, res);
        expect(res.status.mock.calls[0][0]).toBe(200);
    });

    it('should return user if valid', async () => {
        await userController.getUserById(req, res);
        expect(res.json.mock.calls[0][0].user).toEqual(user);
    });
});
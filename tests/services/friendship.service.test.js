const mockingoose = require('mockingoose').default;
const { FriendRequest } = require('../../src/models');
let { friendshipService } = require('../../src/services');

describe('Friendship Service', () => {
    describe('sendFriendRequest service', () => {
        beforeEach(() => {
            friendshipService = require('../../src/services').friendshipService;
            FriendRequest.create = jest.fn().mockImplementationOnce(() => 'request');

            jest.resetModules();
        });

        it('should create friendRequst', async () => {
            await friendshipService.sendFriendRequest('to', 'from');

            expect(FriendRequest.create).toHaveBeenCalledWith({ to: 'to', from: 'from', status: 1 });
        });
    });
});
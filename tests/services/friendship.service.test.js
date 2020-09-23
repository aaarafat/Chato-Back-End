const mockingoose = require('mockingoose').default;
const {FriendRequest} = require('../../src/models');
const {friendshipService} = require('../../src/services');
const AppError = require('../../src/utils/AppError');

describe('Friendship Service', () => {
  describe('sendFriendRequest service', () => {
    beforeEach(() => {
      mockingoose(FriendRequest)
        .toReturn(null, 'findOne')
        .toReturn(null, 'save');
    });

    /*  it('should create friendReqeust', async () => {
      await friendshipService.sendFriendRequest('to', 'from');

      expect(FriendRequest.create)
        .toHaveBeenCalledWith({to: 'to', from: 'from'});
    });
 */
    it('should throw error if request is found', async () => {
      mockingoose(FriendRequest).toReturn({}, 'findOne');

      try {
        await friendshipService.sendFriendRequest('to', 'from');

        // if no error - test will fail
        expect(true).toBeFalsy();
      } catch (err) {
        const isExpectedErr = err instanceof AppError;
        expect(isExpectedErr).toBeTruthy();
        expect(err.message).toBe('Cannot send a friend request');
        expect(err.statusCode).toBe(400);
      }
    });
  });
});

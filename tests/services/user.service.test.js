const mockingoose = require('mockingoose').default;
const {User} = require('../../src/models');
const {userMock} = require('../mocks/models');
const {userService, authService} = require('../../src/services');

describe('User Service', () => {
  let user;
  beforeEach(() => {
    user = userMock.createFakeUser();
    user.save = jest.fn().mockResolvedValue(user);
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

  describe('changePassword', () => {
    beforeEach(() => {
      authService.hashPassword = jest.fn()
        .mockImplementationOnce(() => 'hashedPassword');
    });

    it('should call authService hashPassword', async () => {
      await userService.changePassword(user, 'newPassword');
      expect(authService.hashPassword).toHaveBeenCalled();
    });

    it('should call authService hashPassword with newPassword', async () => {
      const newPassword = 'newPassword';
      await userService.changePassword(user, newPassword);
      expect(authService.hashPassword).toHaveBeenCalledWith(newPassword);
    });

    it('should save the user', async () => {
      await userService.changePassword(user, 'newPassword');
      expect(user.save).toHaveBeenCalled();
    });

    it('should return user with hashedPassword', async () => {
      const result = await userService.changePassword(user, 'newPassword');
      expect(result.password).toBe('hashedPassword');
    });
  });
});

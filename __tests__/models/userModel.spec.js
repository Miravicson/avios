/**
 * @jest-environment node
 */
import User from '@models/userModel';
import testDB from '@tests/tests-utils/testDB';
import bcrypt from 'bcryptjs';

// mocks

jest.mock('@utils/email');

const user = {
  firstName: 'Test',
  lastName: 'User',
  username: 'testUser',
  email: 'test@user.com',
  password: 'password',
  passwordConfirm: 'password',
};

let createdUser;

describe('The User Model', () => {
  beforeAll(async () => {
    await testDB.connect();
    await User.deleteMany({});
  });

  beforeEach(async () => {
    await User.deleteMany({});
    createdUser = await User.create(user);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should hash the user password before saving to the database', async () => {
    expect(bcrypt.compareSync(user.password, createdUser.password)).toBe(true);
  });

  describe('The User.forgotPassword method', () => {
    it('should call .createAccountManagementToken, sendPasswordResetToken, set the .passwordResetToken property of the user', async () => {
      // setup spies

      const createACMTokenSpy = jest.spyOn(
        createdUser,
        'createAccountManagementToken'
      );

      const sendPasswordResetTokenSpy = jest.spyOn(
        createdUser,
        'sendPasswordResetToken'
      );

      await createdUser.forgotPassword();

      expect(createACMTokenSpy).toHaveBeenCalledWith('passwordResetToken');
      expect(createdUser.passwordResetToken).toEqual(expect.any(String));
      expect(sendPasswordResetTokenSpy).toHaveBeenCalled();

      // assert that the passwordResetToken was actually saved to the db

      const freshUser = await User.findOne({ email: createdUser.email });
      expect(freshUser.passwordResetToken).toBeDefined();
    });
  });

  describe('Testing the User.confirmPassword', () => {});

  afterAll(async () => {
    await User.deleteMany({});
    await testDB.disconnect();
  });
});

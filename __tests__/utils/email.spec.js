/**
 * @jest-environment node
 */

import Email from '../server/utils/email';
import config from '../server/config';

jest.mock('nodemailer');

const user = {
  firstName: 'Test',
  lastName: 'User',
  username: 'testUser',
  email: 'test@user.com',
  password: 'password',
  passwordConfirm: 'password',
};

let emailInstance;

describe('Testing the email feature', () => {
  beforeEach(() => {
    emailInstance = new Email(user);
  });

  it('should call send with email data having a url property when sendWelcome is called', async () => {
    const emailSendSpy = jest.spyOn(emailInstance, 'send');

    const welcomeUrl = new URL(
      config.mairmoireClient.welcomeUrl,
      config.mairmoireClient.baseUrl
    );

    await emailInstance.sendWelcome(); // send email

    expect(emailSendSpy).toHaveBeenCalledWith(
      'welcome',
      'Welcome to Maimoire; where your memories are kept verdant.'
    );
    expect(emailSendSpy).toHaveBeenCalledTimes(1);
    expect(emailInstance.emailData).toEqual({ url: welcomeUrl.href });
  });

  it('should sendPasswordReset successfully', async () => {
    const emailSendSpy = jest.spyOn(emailInstance, 'send');

    const passwordResetUrl = new URL(
      config.mairmoireClient.resetPasswordUrl,
      config.mairmoireClient.baseUrl
    );

    const token = 'hello';
    await emailInstance.sendPasswordReset(token); // send email
    passwordResetUrl.searchParams.append('token', token);

    expect(emailSendSpy).toHaveBeenCalledWith(
      'forgotPassword',
      'Your password reset token (valid for only 10 minutes)'
    );
    expect(emailSendSpy).toHaveBeenCalledTimes(1);
    expect(emailInstance.emailData).toEqual({ url: passwordResetUrl.href });
  });
});

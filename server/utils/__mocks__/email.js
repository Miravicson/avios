import logger from '../server/utils/logger';

export default class Email {
  async sendWelcome() {
    logger.info('<Mock> Sending Welcome Email');
    return this;
  }

  async sendPasswordReset() {
    logger.info('<Mock> Sending Reset Email');
    return this;
  }

  async sendConfirmationEmail() {
    logger.info('<Mock> Sending Confirmation Email');
    return this;
  }

  async sendResetPasswordSuccessEmail() {
    logger.info('<Mock> Sending Reset Password Success Email');
    return this;
  }
}

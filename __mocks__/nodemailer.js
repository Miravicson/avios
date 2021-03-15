class NodeMailer {
  createTransport() {
    return this;
  }

  async sendMail(options) {}
}

export default new NodeMailer();

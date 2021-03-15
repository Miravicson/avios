class Request {
  bodyData = {};

  get body() {
    return this.bodyData;
  }

  set body(value) {
    this.bodyData = value;
  }

  get params() {
    return {};
  }

  get query() {
    return {};
  }
}

export default Request;

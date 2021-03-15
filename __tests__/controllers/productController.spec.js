/**
 * @jest-environment node
 */

import Response from '@tests/tests-utils/response';
import Request from '@tests/tests-utils/request';
import * as productController from '@controllers/productController';

let res;
let req;
describe('Testing the View Controller', () => {
  beforeEach(() => {
    res = new Response();
    req = new Request();
  });
  describe('The createProduct Controller', () => {
    it('should return a status of 201', async () => {
      const statusSpy = jest.spyOn(res, 'status');

      await productController.createProduct(req, res);

      expect(statusSpy).toHaveBeenCalledWith(201);
    });
  });
});

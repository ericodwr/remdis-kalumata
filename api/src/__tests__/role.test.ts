import request from 'supertest';
import { mockNextFunction, mockRequest, mockResponse } from '../__mocks__';
import { web } from '../application/web';
import { getAllRole } from '../controllers/roleController';

describe('get all role', () => {
  // test('should return array of role', async () => {
  //   const response = await getAllRole(
  //     mockRequest,
  //     mockResponse,
  //     mockNextFunction,
  //   );
  //   console.log(mockResponse.json);

  //   expect(response).toBe(200);
  // });

  it('responds', async () => {
    const response = await request(web).get('/role');
    console.log(response);
    expect(response.status).toBe(200);
  });
});

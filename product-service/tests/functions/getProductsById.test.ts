import { awsParamsMock } from '../mocks/mockParams';
import {getProductsById} from '../../src/functions/getProductsById/handler';


describe('getProductsById tests', () => { 
  test('should return a product by id', async() => { 
    const {event} = awsParamsMock

    const eventMod = {
      ...event,
      pathParameters: {
        productId: '1'
      }
    }

    const res = await getProductsById(eventMod)

    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.body).data.id).toBeGreaterThan(0)
   })

   test('should return not found when id not exists', async() => { 
    const {event} = awsParamsMock

    const eventMod = {
      ...event,
      pathParameters: {
        productId: 'testparam'
      }
    }

    const res = await getProductsById(eventMod)
    
    expect(res.statusCode).toBe(400)
    expect(res.body).toBe('Product not found')
   })
 })
import { Request, Response } from 'express'

import { catchAllController, Message } from '..'
import { Subscription } from '../../subscribeController'

let getSubscriptionByRouteReturnValue: () => Subscription

jest.mock('../../mysql', () => ({
  connection: jest.fn(),
  getSubscriptionByRoute: jest.fn(() => getSubscriptionByRouteReturnValue()),
  getMessagesForSubscription: jest.fn((): Message[] => [
    {
      messages_id: 1,
      subscriptions_id: 1,
      message: 'Test 1',
      created_at: 'Date 1',
    },
  ]),
}))

describe('controller()', () => {
  it('should return a 404 resposne if the subscription is not found', async () => {
    const request: Partial<Request> = { params: { '0': '' } }
    const response: Partial<Response> = {}
    response.status = jest.fn().mockReturnValue(response)
    response.send = jest.fn().mockReturnValue(response)

    getSubscriptionByRouteReturnValue = () => (undefined as unknown) as Subscription

    await catchAllController(request as Request, response as Response)
    expect(response.status).toHaveBeenCalledWith(404)
    expect(response.send).toHaveBeenCalledWith({ error: 'Not found' })
  })

  it('should return an API response with the messages in a topic', async () => {
    const request: Partial<Request> = { params: { '0': '' } }
    const response: Partial<Response> = {}
    response.send = jest.fn().mockReturnValue(response)

    getSubscriptionByRouteReturnValue = () => ({ subscriptions_id: 1, topic: 'Topic 1', url: '' })

    await catchAllController(request as Request, response as Response)

    expect(response.send).toHaveBeenCalledWith([{ date: 'Date 1', message: 'Test 1' }])
  })

  it('should catch an error and return a 500 server error', () => {
    expect.assertions(2)

    const request: Partial<Request> = { params: { '0': '' } }
    const response: Partial<Response> = {}
    response.status = jest.fn().mockReturnValue(response)
    response.send = jest.fn().mockReturnValue(response)

    getSubscriptionByRouteReturnValue = () => {
      throw new Error('Test Error')
    }

    console.error = jest.fn()

    catchAllController(request as Request, response as Response).then(() => {
      expect(response.status).toHaveBeenCalledWith(500)
      expect(response.send).toHaveBeenCalledWith({ error: 'Server error' })
    })
  })
})

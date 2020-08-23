import { Request, Response } from 'express'

import { publishController } from '..'
import { Subscription } from '../../subscribeController'

let getSubscriptionByTopicReturnValue: () => Subscription

jest.mock('../../mysql', () => ({
  connection: jest.fn(),
  getSubscriptionByTopic: jest.fn(() => getSubscriptionByTopicReturnValue()),
  createSubscription: jest.fn(() => undefined),
}))

describe('controller()', () => {
  it('should return a 400 resposne if the message is an empty string', async () => {
    const request: Partial<Request> = { body: { message: '' }, params: {} }
    const response: Partial<Response> = {}
    response.status = jest.fn().mockReturnValue(response)
    response.send = jest.fn().mockReturnValue(response)

    publishController(request as Request, response as Response)

    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.send).toHaveBeenCalledWith({ error: 'Invalid message supplied' })
  })

  it('should return a 400 resposne if the message is undefined', async () => {
    const request: Partial<Request> = { body: {}, params: {} }
    const response: Partial<Response> = {}
    response.status = jest.fn().mockReturnValue(response)
    response.send = jest.fn().mockReturnValue(response)

    publishController(request as Request, response as Response)

    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.send).toHaveBeenCalledWith({ error: 'Invalid message supplied' })
  })

  it('should return a 404 resposne if the topic is not found', async () => {
    const request: Partial<Request> = { body: { message: 'A message' }, params: { topic: 'A topic' } }
    const response: Partial<Response> = {}
    response.status = jest.fn().mockReturnValue(response)
    response.send = jest.fn().mockReturnValue(response)

    getSubscriptionByTopicReturnValue = () => (undefined as unknown) as Subscription

    await publishController(request as Request, response as Response)
    expect(response.status).toHaveBeenCalledWith(404)
    expect(response.send).toHaveBeenCalledWith({ error: 'Topic not found' })
  })

  it('should create a message and return a successful API response', async () => {
    const request: Partial<Request> = { body: { message: 'A message' }, params: { topic: 'A topic' } }
    const response: Partial<Response> = {}
    response.status = jest.fn().mockReturnValue(response)
    response.send = jest.fn().mockReturnValue(response)

    getSubscriptionByTopicReturnValue = () => ({ subscriptions_id: 1, topic: 'Topic 1', url: '' })

    await publishController(request as Request, response as Response)

    expect(response.status).toHaveBeenCalledWith(201)
    expect(response.send).toHaveBeenCalledWith({ message: 'Message published' })
  })

  it('should catch an error and return a 500 server error', () => {
    expect.assertions(2)

    const request: Partial<Request> = { params: { '0': '' } }
    const response: Partial<Response> = {}
    response.status = jest.fn().mockReturnValue(response)
    response.send = jest.fn().mockReturnValue(response)

    getSubscriptionByTopicReturnValue = () => {
      throw new Error('Test Error')
    }

    console.error = jest.fn()

    publishController(request as Request, response as Response).then(() => {
      expect(response.status).toHaveBeenCalledWith(500)
      expect(response.send).toHaveBeenCalledWith({ error: 'Server error' })
    })
  })
})

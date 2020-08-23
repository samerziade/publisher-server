import { Request, Response } from 'express'

import { subscribeController } from '..'

let validateHostNameReturn: () => boolean

jest.mock('../../utils', () => ({
  ...(jest.requireActual('../../utils') as object),
  validateHostName: jest.fn(() => validateHostNameReturn()),
}))

jest.mock('../../mysql', () => ({
  connection: jest.fn(),
  upsertSubscription: jest.fn(),
}))

describe.only('controller()', () => {
  it('should return a 400 resposne if the provided URL is invalid', async () => {
    const request: Partial<Request> = { body: { url: 'http://localhost/event1' }, params: { topic: 'Topic 1' } }
    const response: Partial<Response> = {}
    response.status = jest.fn().mockReturnValue(response)
    response.send = jest.fn().mockReturnValue(response)

    validateHostNameReturn = () => false

    await subscribeController(request as Request, response as Response)

    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.send).toHaveBeenCalledWith({ error: 'Invalid URL provided' })
  })

  it('should create a subscription and return a successful API response', async () => {
    const request: Partial<Request> = { body: { url: 'http://localhost:8000/event1' }, params: { topic: 'Topic 1' } }
    const response: Partial<Response> = {}
    response.status = jest.fn().mockReturnValue(response)
    response.send = jest.fn().mockReturnValue(response)

    validateHostNameReturn = () => true

    await subscribeController(request as Request, response as Response)

    expect(response.status).toHaveBeenCalledWith(201)
    expect(response.send).toHaveBeenCalledWith({ message: 'Subscription to "Topic 1" created' })
  })

  it('should catch an error and return a 500 server error', () => {
    expect.assertions(2)

    const request: Partial<Request> = { params: { '0': '' } }
    const response: Partial<Response> = {}
    response.status = jest.fn().mockReturnValue(response)
    response.send = jest.fn().mockReturnValue(response)

    validateHostNameReturn = () => {
      throw new Error('Test Error')
    }

    console.error = jest.fn()

    subscribeController(request as Request, response as Response).then(() => {
      expect(response.status).toHaveBeenCalledWith(500)
      expect(response.send).toHaveBeenCalledWith({ error: 'Server error' })
    })
  })
})

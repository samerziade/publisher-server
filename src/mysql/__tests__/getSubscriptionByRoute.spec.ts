import { Connection } from 'mysql2/promise'

import { getSubscriptionByRoute } from '..'
import { Subscription } from '../../subscribeController'

describe('getSubscriptionByRoute()', () => {
  it('should return undefined if the supplied path is not found', () => {
    const conn = { query: jest.fn(() => [[]]) }

    const result = getSubscriptionByRoute((conn as unknown) as Connection, 'the wrong path')
    expect(result).toBeUndefined()
  })

  it('should return a subscription object if the path is a match', () => {
    const subscription: Subscription = { subscriptions_id: 1, topic: 'Topic 1', url: 'the right path' }
    const conn = { query: jest.fn((): [[Subscription]] => [[subscription]]) }
    const result = getSubscriptionByRoute((conn as unknown) as Connection, 'the right path')
    expect(result).toEqual(subscription)
  })
})

import { Connection } from 'mysql2/promise'

import { getSubscriptionByTopic } from '..'
import { Subscription } from '../../subscribeController'

describe('getSubscriptionByTopic()', () => {
  it('should return undefined if the supplied topic is not found', async () => {
    const conn = { query: jest.fn(() => [[]]) }
    const result = await getSubscriptionByTopic((conn as unknown) as Connection, 'the wrong topic')
    expect(result).toBeUndefined()
  })

  it('should return a subscription object if the path is a match', async () => {
    const subscription: Subscription = { subscriptions_id: 1, topic: 'Topic 1', url: 'the right topic' }
    const conn = { query: jest.fn((): [[Subscription]] => [[subscription]]) }
    const result = await getSubscriptionByTopic((conn as unknown) as Connection, 'the right topic')
    expect(result).toEqual(subscription)
  })
})

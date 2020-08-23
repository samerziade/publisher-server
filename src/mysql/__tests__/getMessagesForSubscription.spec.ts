import { Connection } from 'mysql2/promise'

import { getMessagesForSubscription } from '..'
import { Subscription } from '../../subscribeController'

describe('getMessagesForSubscription()', () => {
  it('should return an empty array', () => {
    const conn = {
      query: jest.fn(() => [[]]),
    }
    const subscription: Partial<Subscription> = { subscriptions_id: 1 }
    const result = getMessagesForSubscription((conn as unknown) as Connection, subscription as Subscription)
    expect(result).toEqual([])
  })

  it('should return an array of Message', () => {
    const conn = {
      query: jest.fn(() => [[{ messages_id: 1, subscriptions_id: 1, message: 'Test 1', created_at: 'Date 1' }]]),
    }
    const subscription: Partial<Subscription> = { subscriptions_id: 1 }
    const result = getMessagesForSubscription((conn as unknown) as Connection, subscription as Subscription)
    expect(result).toEqual([{ messages_id: 1, subscriptions_id: 1, message: 'Test 1', created_at: 'Date 1' }])
  })
})

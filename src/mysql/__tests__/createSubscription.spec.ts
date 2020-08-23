import { Connection } from 'mysql2/promise'

import { createSubscription } from '..'
import { Subscription } from '../../SubscribeController'

describe('createSubscription()', () => {
  it('should insert a new subscription record', () => {
    const query = 'INSERT INTO messages (subscriptions_id, message) VALUES (?, ?)'
    const conn = { query: jest.fn() }

    createSubscription(
      (conn as unknown) as Connection,
      ({ subscriptions_id: 1 } as Partial<Subscription>) as Subscription,
      'message',
    )
    expect(conn.query).toHaveBeenCalledWith(query, [1, 'message'])
  })
})

import { Connection } from 'mysql2/promise'
import { URL } from 'url'

import { upsertSubscription } from '..'

describe('upsertSubscription()', () => {
  it('should insert or update a new subscription record', () => {
    const conn = { query: jest.fn() }
    const query = 'INSERT INTO subscriptions (topic, url) VALUES (?, ?) ON DUPLICATE KEY UPDATE url = ?'
    const url = new URL('http://localhost:8000/event1')

    upsertSubscription((conn as unknown) as Connection, 'Topic 1', url)
    expect(conn.query).toHaveBeenCalledWith(query, ['Topic 1', url.pathname.toString(), url.pathname.toString()])
  })
})

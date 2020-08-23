import { Connection } from 'mysql2/promise'

import { Subscription } from '../subscribeController'

export const getSubscriptionByRoute = (conn: Connection, path: string): Subscription => {
  const query = 'SELECT * FROM subscriptions WHERE url = ?'
  const [[subscription]] = (conn.query(query, [path]) as unknown) as [[Subscription]]
  return subscription
}

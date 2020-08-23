import { Connection } from 'mysql2'

import { Subscription } from '../SubscribeController'

export const getSubscriptionByRoute = (conn: Connection, path: string): Subscription => {
  const query = 'SELECT * FROM subscriptions WHERE url = ?'
  const [[subscription]] = (conn.query(query, [path]) as unknown) as [[Subscription]]
  return subscription
}

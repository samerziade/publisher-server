import { Connection } from 'mysql2/promise'

import { Subscription } from '../subscribeController'

export const getSubscriptionByRoute = async (conn: Connection, path: string): Promise<Subscription> => {
  const query = 'SELECT * FROM subscriptions WHERE url = ?'
  const [[subscription]] = ((await conn.query(query, [path])) as unknown) as [[Subscription]]
  return subscription
}

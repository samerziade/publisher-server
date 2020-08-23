import { Connection } from 'mysql2/promise'

import { Subscription } from '../subscribeController'

export const getSubscriptionByTopic = (conn: Connection, topic: string): Subscription => {
  const query = 'SELECT * FROM subscriptions WHERE topic = ?'
  const [[subscription]] = (conn.query(query, [topic]) as unknown) as [[Subscription]]
  return subscription
}

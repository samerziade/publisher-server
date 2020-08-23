import { Connection } from 'mysql2/promise'

import { Subscription } from '../subscribeController'

export const getSubscriptionByTopic = async (conn: Connection, topic: string): Promise<Subscription> => {
  const query = 'SELECT * FROM subscriptions WHERE topic = ?'
  const [[subscription]] = ((await conn.query(query, [topic])) as unknown) as [[Subscription]]
  return subscription
}

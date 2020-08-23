import { Connection } from 'mysql2/promise'

import { Subscription } from '../subscribeController'

export const createSubscription = (conn: Connection, { subscriptions_id }: Subscription, message: string): void => {
  const query = 'INSERT INTO messages (subscriptions_id, message) VALUES (?, ?)'
  conn.query(query, [subscriptions_id, message])
}

import { Connection } from 'mysql2/promise'

import { Subscription } from '../subscribeController'
import { Message } from '../catchAllController'

export const getMessagesForSubscription = (conn: Connection, subscription: Subscription): Message[] => {
  let query = 'SELECT * FROM messages WHERE subscriptions_id = ?'
  const [messages] = (conn.query(query, [subscription.subscriptions_id]) as unknown) as [Message[]]
  return messages
}

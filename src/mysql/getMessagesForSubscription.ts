import { Connection } from 'mysql2/promise'

import { Subscription } from '../subscribeController'
import { Message } from '../catchAllController'

export const getMessagesForSubscription = async (conn: Connection, subscription: Subscription): Promise<Message[]> => {
  let query = 'SELECT * FROM messages WHERE subscriptions_id = ?'
  const [messages] = ((await conn.query(query, [subscription.subscriptions_id])) as unknown) as [Message[]]
  return messages
}

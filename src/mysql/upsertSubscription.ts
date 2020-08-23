import { Connection } from 'mysql2/promise'

import { URL } from 'url'

export const upsertSubscription = (conn: Connection, topic: string, url: URL): void => {
  conn.query('INSERT INTO subscriptions (topic, url) VALUES (?, ?) ON DUPLICATE KEY UPDATE url = ?', [
    topic,
    url.pathname.toString(),
    url.pathname.toString(),
  ])
}

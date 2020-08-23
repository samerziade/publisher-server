import { Request, Response } from 'express'

import { connection, getSubscriptionByRoute, getMessagesForSubscription } from '../mysql'
import { mapMessagesToResponse } from './mapMessagesToResponse'

export const controller = async (req: Request, res: Response) => {
  try {
    const conn = await connection()
    const subscription = getSubscriptionByRoute(conn, req.params[0])
    if (subscription === undefined) {
      return res.status(404).send({ error: 'Not found' })
    }

    res.send(mapMessagesToResponse(getMessagesForSubscription(conn, subscription)))
  } catch (err) {
    console.error('ERROR', err)
    return res.status(500).send({ error: 'Server error' })
  }
}

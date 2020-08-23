import { Request, Response } from 'express'

import { connection, getSubscriptionByTopic } from '../mysql'
import { createSubscription } from '../mysql'

export const controller = async (req: Request, res: Response) => {
  try {
    const { topic } = req.params
    const { message } = req.body

    if (message === undefined || message === '') {
      return res.status(400).send({ error: 'Invalid message supplied' })
    }

    const conn = await connection()
    const subscription = await getSubscriptionByTopic(conn, topic)

    if (subscription === undefined) {
      return res.status(404).send({ error: 'Topic not found' })
    }

    createSubscription(conn, subscription, message)
    return res.status(201).send({ message: 'Message published' })
  } catch (err) {
    console.error('ERROR', err)
    return res.status(500).send({ error: 'Server error' })
  }
}

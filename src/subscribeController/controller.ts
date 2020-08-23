import { Request, Response } from 'express'
import { URL } from 'url'

import { connection, upsertSubscription } from '../mysql'
import { validateHostName } from '../utils'

export const controller = async (req: Request, res: Response) => {
  try {
    const { topic } = req.params
    const url = new URL(req.body.url)
    const conn = await connection()

    if (!validateHostName(url)) {
      return res.status(400).send({ error: 'Invalid URL provided' })
    }

    upsertSubscription(conn, topic, url)

    return res.status(201).send({ message: `Subscription to "${topic}" created` })
  } catch (err) {
    console.error('ERROR', err)
    return res.status(500).send({ error: 'Server error' })
  }
}

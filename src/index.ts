import express from 'express'
import bodyParser from 'body-parser'

import { subscribeController } from './subscribeController'
import { publishController } from './publishController'
import { catchAllController } from './catchAllController'
import { getHostname, getPort } from './utils'

const app = express()
app.listen(getPort(), () => console.info(`Server running on http://${getHostname()}:${getPort()}`))
app.use(bodyParser.json())
app.post('/subscribe/:topic', subscribeController)
app.post('/publish/:topic', publishController)
app.get('*', catchAllController)

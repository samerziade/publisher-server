import { URL } from 'url'
import { getHostname, getPort } from '.'

export const validateHostName = ({ protocol, host }: URL): boolean =>
  `${protocol}//${host}` === `http://${getHostname()}:${getPort()}`

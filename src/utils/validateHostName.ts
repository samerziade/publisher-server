import { URL } from 'url'
import { getHostname, getPort } from '.'

export const validateHostName = ({ protocol, hostname, port }: URL): boolean =>
  `${protocol}//${hostname}:${port}` === `http://${getHostname()}:${getPort()}`

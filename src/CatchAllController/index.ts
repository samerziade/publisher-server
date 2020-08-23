export { controller as catchAllController } from './controller'

export interface Message {
  messages_id: number
  subscriptions_id: number
  message: string
  created_at: string
}

export interface MessageResponse {
  message: string
  date: string
}

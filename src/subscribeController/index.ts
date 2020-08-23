export { controller as subscribeController } from './controller'

export interface Subscription {
  subscriptions_id: number
  topic: string
  url: string
}
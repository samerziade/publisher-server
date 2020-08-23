import { Message, MessageResponse } from '.'

export const mapMessagesToResponse = (messages: Message[]) =>
  messages.map<MessageResponse>(({ message, created_at: date }: Message) => ({ message, date }))

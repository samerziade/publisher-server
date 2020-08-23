import { mapMessagesToResponse } from '../mapMessagesToResponse'
import { Message, MessageResponse } from '..'

describe('mapMessagesToResponse()', () => {
  it('should return an empty array when the provided input is empty', () => {
    expect(mapMessagesToResponse([])).toEqual([])
  })

  it('should return an array with one mapped item', () => {
    const messages: Message[] = [{ messages_id: 1, subscriptions_id: 1, message: 'Test 1', created_at: 'Date 1' }]
    const expected: MessageResponse[] = [{ message: 'Test 1', date: 'Date 1' }]
    expect(mapMessagesToResponse(messages)).toEqual(expected)
  })

  it('should return an array with two mapped item', () => {
    const messages: Message[] = [
      { messages_id: 1, subscriptions_id: 1, message: 'Test 1', created_at: 'Date 1' },
      { messages_id: 1, subscriptions_id: 1, message: 'Test 2', created_at: 'Date 2' },
    ]
    const expected: MessageResponse[] = [
      { message: 'Test 1', date: 'Date 1' },
      { message: 'Test 2', date: 'Date 2' },
    ]
    expect(mapMessagesToResponse(messages)).toEqual(expected)
  })
})

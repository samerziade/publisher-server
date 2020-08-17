import { hello } from '../'

it('should print hello', () => {
  console.log = jest.fn()
  hello()
  expect(console.log).toHaveBeenCalledWith('hello')
  jest.resetAllMocks()
})

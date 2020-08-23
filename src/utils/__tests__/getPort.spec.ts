import { getPort } from '..'

describe('getPort()', () => {
  it('should return the port from the environment variable', () => {
    process.env = { ...process.env, PORT: '1234' }
    expect(getPort()).toEqual('1234')
  })

  it('should return "8000" if the environment variable is not set', () => {
    process.env = { ...process.env, PORT: undefined }
    expect(getPort()).toEqual('8000')
  })
})

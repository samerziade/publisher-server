import { getHostname } from '..'

describe('getHostname()', () => {
  it('should return the hostname from the environment variable', () => {
    process.env = { ...process.env, HOSTNAME: 'testhost' }
    expect(getHostname()).toEqual('testhost')
  })

  it('should return "localhost" if the environment variable is not set', () => {
    process.env = { ...process.env, HOSTNAME: undefined }
    expect(getHostname()).toEqual('localhost')
  })
})

import { getPort } from '..'
import { validateHostName } from '../validateHostName'
import { URL } from 'url'

describe('getPort()', () => {
  it('should return true if the hostname matches', () => {
    expect(validateHostName(new URL('http://localhost:8000'))).toEqual(true)
  })

  it('should return false if the hostname does not match', () => {
    expect(validateHostName(new URL('http://wronghost:8888/'))).toEqual(false)
  })
})

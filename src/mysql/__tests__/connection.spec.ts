import mysql from 'mysql2/promise'

import { connection } from '..'

jest.mock('mysql2/promise', () => ({
  createConnection: jest.fn().mockReturnValue({
    connect: jest.fn(),
  }),
}))

describe('connection()', () => {
  it('create a new connection to the database', async () => {
    const conn = await connection()
    expect(mysql.createConnection).toHaveBeenCalledTimes(1)
    expect(conn.connect).toHaveBeenCalledTimes(1)
  })

  it('should reuse the existing database connection', async () => {
    await connection()
    const conn = await connection()
    expect(mysql.createConnection).toHaveBeenCalledTimes(1)
    expect(conn.connect).toHaveBeenCalledTimes(1)
  })
})

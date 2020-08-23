import mysql, { Connection } from 'mysql2/promise'

let conn: Connection

export const connection = async (): Promise<Connection> => {
  if (conn === undefined) {
    const opts = {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'publisher',
    }
    conn = (mysql.createConnection(opts) as unknown) as Connection
    conn.connect()
  }

  return conn
}

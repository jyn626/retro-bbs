import { DatabaseSync } from 'node:sqlite'

export interface User {
  id: number,
  username: string,
  password: string,
}

export const db = new DatabaseSync('./app.db')
db.exec(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)`)
console.log('DB users created.')

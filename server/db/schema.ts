//import { timestamp } from 'drizzle-orm/mysql-core'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { string } from 'zod'

export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey(),
  userId: integer('user_id').notNull(), // GitHub Id
  title: text('title').notNull(),
  completed: integer('completed').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
})

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull()
})

export const timbrature = sqliteTable('timbrature', {
  ID_Timbratura: integer('ID_Timbratura').primaryKey(),
  CodDipendente: integer('CodDipendente'),
  Data: integer('Data').notNull(),
  Ora: integer('Ora').notNull(),
  CodTerminale: text('CodTerminale'),
  Causale: text('Causale'),
  CodUsr: integer('CodUsr'),
  OpID: integer('OpID').notNull(),
  OpWhen: text('OpWhen').notNull().default('CURRENT_TIMESTAMP')
})

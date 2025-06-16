import { pgTable, uuid, numeric, timestamp } from 'drizzle-orm/pg-core';

export const items = pgTable('items', {
  uuid: uuid('uuid').primaryKey().defaultRandom(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;

import { SQLDatabase } from 'encore.dev/storage/sqldb';

export const cardsDB = new SQLDatabase("cards", {
  migrations: "./migrations",
});

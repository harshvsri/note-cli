import fs from "node:fs/promises";
import path from "node:path";

const DB_PATH = path.resolve("notes.json");

export const getDB = async () => {
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
};

export const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};

export const insertNote = async (note) => {
  const db = await getDB();
  db.notes.push(note);
  await saveDB(db);
  return note;
};

// const { notes } = await getDB();
// notes.push(note);
// await saveDB({ notes });
// return note;

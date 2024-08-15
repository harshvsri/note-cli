import { getDB, saveDB, insertNote } from "./db.js";

export const newNote = async (content, tags) => {
  const note = {
    id: Date.now(),
    content,
    tags,
  };
  await insertNote(note);
  return note;
};

export const findNote = async (text) => {
  const { notes } = await getDB();
  return notes.filter((note) =>
    note.content.toLowerCase().includes(text.toLowerCase())
  );
};

export const findAllNotes = async () => {
  const db = await getDB();
  return db.notes;
};

export const deleteNote = async (id) => {
  const db = await getDB();
  // We need to find a match
  const match = db.notes.find((note) => note.id === id);
  if (!match) {
    return `Note with id(${id}) not found`;
  }
  // We need to remove the note from the array
  const newNotes = db.notes.filter((note) => note.id !== id);
  db.notes = newNotes;
  await saveDB(db);
  return `Note with id(${id}) deleted successfully`;
};

export const deleteAllNotes = async () => {
  await saveDB({ notes: [] });
};

import { newNote } from "../src/notes.js";

test("Takes a param and tries to make a note", async () => {
  const note = await newNote("This is a test");
  expect(note).toBeDefined();
});

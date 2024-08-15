import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  deleteAllNotes,
  deleteNote,
  findAllNotes,
  findNote,
  newNote,
} from "./notes.js";
import { start } from "./server.js";

yargs(hideBin(process.argv))
  .scriptName("note")
  .command(
    "new <note>",
    "create a new note",
    (yargs) => {
      return yargs.positional("note", {
        describe: "The content of the note you want to create",
        type: "string",
      });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(", ") : [];
      const note = await newNote(argv.note, tags);
      console.log("✅ Note added", note);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags to add to the note",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async () => {
      const notes = await findAllNotes();
      console.log(notes);
    }
  )
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter notes by, will be applied to note.content",
        type: "string",
      });
    },
    async (argv) => {
      const note = await findNote(argv.filter);
      if (note.length === 0) {
        console.log("❌ No such note found");
        return;
      }
      console.log(note);
    }
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      const res = await deleteNote(argv.id);
      console.log(res);
    }
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async (argv) => {
      await deleteAllNotes();
      console.log("✅ All notes deleted successfully");
    }
  )
  .command(
    "web [port]",
    "launch website to see notes",
    (yargs) => {
      return yargs.positional("port", {
        describe: "port to bind on",
        default: 5000,
        type: "number",
      });
    },
    async (argv) => {
      const notes = await findAllNotes();
      start(notes, argv.port);
    }
  )
  .demandCommand(1)
  .parse();

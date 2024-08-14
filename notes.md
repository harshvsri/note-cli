# NodeJS

## NodeJS VS Browser

- Syntactically both are same coz they are indeed runtime for JavaScript

- They both are runtime for JS, allowing JS to run(execute) and provide some set of
  global objects/variables and modules/packages

- The main difference is that while browser has to do things regarding rendering content on screen
  hence it provide global objects like document and all
  where as node runs on a system hence providing things like fileIO and networking(http)

- Like when we log the console is browser console is case of Browser(V8) while in case of
  NodeJS its system console

## process.argv

- It's an array that contains the command line arguments passed to the program

- First element is node executable path, second is the path of the file being executed
  and rest are the arguments passed to the file

## Note Script

This is a simple script that takes a note as an argument and logs it to the console.

### How does this work?

1. The first line is a shebang (hashbang) that tells the operating system to run the script with Node.js.
2. We need to have `bin` in `package.json` to make the script globally available.
3. Link the script to the global npm folder with the command `npm link`.
4. We can run the script from the command line with the command `note <your-note>`.

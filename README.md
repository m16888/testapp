# NodeJS File system
 
## Introduction
 
The `file-system.js` file contains stubs of some functions that deal with files and directories. Your goal is to implement them, including error handling.
 
## Setup for local environment
 
Follow the below steps if you are using zip/git mode (i.e., not available inside DevSkiller’s in-browser IDE):
 
1. `npm install` to get dependencies.
2. Use `npm test` or `npm run test:watch` to see tests failing.
3. Fix issues so that tests pass.
4. Solve all the issues mentioned here.
5. Submit your code on the DevSkiller platform to verify that the task is completed.
 
## Problem Statement
 
Add implementation to functions defined in the `file-system.js`. Please find below the requirements:
 
* `readJsonSync(filePath)`:
   * read JSON content from the file under the `filePath` path,
   * parse the JSON content,
   * return the JSON content,
   * do this **synchronously**,
   * make sure an error is thrown, if JSON content is invalid.
* `appendToFileSync(filePath, text)`:
   * append the `text` content, starting with a **single new line**,
   * to a file under the `filePath` path,
   * do this **synchronously**,
   * make sure an error is thrown, if the file does not exist (do not create an empty file).
* `readJsonAsync(filePath, text)`:
   * read JSON content from the file under the `filePath` path,
   * parse the JSON content,
   * return a promise which is resolved with the parsed JSON,
   * do this **asynchronously**,
   * make sure the promise gets rejected if I/O or JSON parsing errors occur.
* `listDirectoryRecursiveSync(path)`:
   * recursively read lists of files and directories under `path`,
   * return an array containing a recursive structure of objects representing files and directories,
   * directory objects have the `children` array, which should contain their files and directories,
   * array entries should be listed alphabetically, but files should be grouped before directories,
   * do this **synchronously**,
   * make sure an error is thrown if the path does not exist.
  
A file object looks like this:
 
```json
{
   "type": "file",
   "path": "path/to/file.png"
}
```
 
A directory object has the following structure:
 
```json
{
   "type": "directory",
   "path": "path/to/directory",
   "children": [
       {
           "type": "file",
           "path": "path/to/directory/some-file.txt"
       },
       {
           "type": "file",
           "path": "path/to/directory/subdirectory",
           "children": [...]
       },
   ]
}
```
 
**Meet all the above requirements** and make sure unit tests pass.
 
### Good Luck!

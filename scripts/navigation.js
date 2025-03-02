const directory = {
   "/": {
      "home": {
         "you": {
            "file1.txt": "hai!",
            "file2.txt": "testing, testing"
         }
      },
      "etc": {
         "terminal": {
            "config.txt": "# nothing here yet"
         }
      }
   }
}
let pwd = "/home/you";

/* what a file would look like
{
   type: text/graphic/markdown,
   contents: "file contents",
   name: "file name",
   directory: "/home/x"
}

- add tab completion!
- add vi style editor
- implement man pages
   - may need to make each command a class, and they could have man page method (inherited of course)
   - allow a way to load in external commands with classes (like url to text file)
- could consider classes for each type of file as well
- add saving
- fix input scrolling with too many characters
*/

function listDirectory(keywords) {
   // allow listing of other directories
   // should error if no directory founds
   let current = getCurrentDirectory();
   let output = "";
   for (let key in current) {
      output += (key.includes(".txt") ? `<span style="color: #1cb0ff">${key}</span>` : key) + " &nbsp; ";
   }
   newLine(output);
}

function readFile(file) {
   let current = getCurrentDirectory();
   let output = current[file];
   if (output) {
      newLine(output);
   } else {
      newLine("could not find file <b>" + file + "</b>");
   }
}


function changeDirectory(keywords) {
   let current = getCurrentDirectory();
   let newDir = keywords[1];
   if (!newDir || newDir == "~") {
      pwd = "/home/you";
   }
   else if (newDir == "..") {
      let dirs = pwd.split("/");
      dirs.pop();
      pwd = dirs.join("/");
      if (pwd == "") pwd = "/";
   }
   else if (newDir[0] == "/") {
      pwd = newDir;
   }
   else {
      newDir = (pwd == "/" ? "" : pwd) + "/" + newDir;
      if (directoryExists(newDir)) {
         pwd = newDir;
      } else {
         newLine("could not find directory <b>" + newDir + "</b>");
      }
   }
   updateDirectoryVisual();
}

function makeDirectory(keywords) {
   let current = getCurrentDirectory();
   let newDir = keywords[1];
   current[newDir] = {};
}

function createFile(keywords) {
   newLine("not implemented yet", "error-text");
}

function removeItem(keywords) {
   // should remove directories and mkdir
   newLine("not implemented yet", "error-text");
}






// helpers
function getCurrentDirectory() {
   if (pwd == "/") return directory["/"];
   let currentDirectory = pwd.split("/").filter((x) => x);
   let current = directory["/"][currentDirectory[0]];
   for (let i = 1; i < currentDirectory.length; i++) {
      current = current[currentDirectory[i]];
   }
   return current;
}

function directoryExists(dir) {
   let dirs = dir.split("/");
   let currentPosition = directory["/"];
   for (let i = 1; i < dirs.length; i++) { // at position 1 because first element is empty
      if (currentPosition[dirs[i]] == undefined) {
         return false;
      }
      currentPosition = currentPosition[dirs[i]];
   }
   return true;
}

function updateDirectoryVisual() {
   document.querySelector(".dir").textContent = getDirectoryVisual();
}

function getDirectoryVisual() {
   console.log(pwd)
   if (pwd[0] == "/" && pwd.includes("/home/you")) {
      return pwd.replace("/home/you", "~");
   }
   return pwd;
}
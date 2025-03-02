const commands = {
   clear: () => {
      clearTerminal();
   },
   about: () => {
      newLine(
         "This is a web terminal, have 'fun'"
      );
   },
   help: () => {
      // should generate this automatically
      newLine("List of commands:");
      newLine("clear: clears the terminal");
      newLine("about: shows info about the website");
      newLine("time: shows the current time");
      newLine("sudo rm -rf /: gives free cookies");
      newLine("fetch: shows system info");
      newLine("echo &lt;text&gt;: echos arguments");
      newLine("ls: lists files in the current directory");
      newLine("cd &lt;dir&gt;: changes directory");
      newLine("mkdir &lt;dir&gt;: creates directory");
      newLine("cat &lt;file&gt;: reads a file");
      newLine("background <valid css color>: changes the background color");
      newLine(
         "color <valid css color>: changes the color of the terminal text"
      );
   },
   time: () => {
      newLine(new Date());
   },
   echo: (keywords) => {
      newLine(keywords.slice(1).join(" "));
   },
   fetch: () => {
      printNeofetch();
   },
   color: (keywords) => {
      document.documentElement.style.setProperty(
         "--terminal-text-color",
         keywords[1]
      );
   },
   background: (keywords) => {
      document.documentElement.style.setProperty(
         "--background-color",
         keywords[1]
      );
   },
   nevergonna: () => {
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
   },
   sudo: (keywords) => {
      if (keywords[1] == "rm" && keywords[2] == "-rf" && keywords[3] == "/") {
         document.body.remove();
      }
   },
   pwd: () => {
      newLine(pwd);
   },
   ls: (keywords) => {
      listDirectory(keywords);
   },
   cat: (keywords) => {
      readFile(keywords[1]);
   },
   cd: (keywords) => {
      changeDirectory(keywords);
   },
   mkdir: (keywords) => {
      makeDirectory(keywords);
   },
   touch: (keywords) => {
      createFile(keywords);
   },
   rm: (keywords) => {
      removeItem(keywords);
   }
};
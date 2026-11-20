import * as blessed from 'blessed'


const screen = blessed.screen({
  smartCSR: true,
  title: "BBS Client"
});

// Welcome title
const title = blessed.box({
  parent: screen,
  top: "25%",
  left: "center",
  width: "60%",
  height: 3,
  content: "WELCOME TO MY BBS",
  align: "center",
  style: {
    fg: "cyan",
    bold: true
  }
});

// Main menu
const menu = blessed.list({
  parent: screen,
  top: "40%",
  left: "center",
  width: 30,
  height: 7,
  items: ["Login", "Register", "Exit"],
  keys: true,
  border: {
    type: "line"
  },
  style: {
    border: { fg: "cyan" },
    selected: {
      fg: "black",
      bg: "cyan",
      bold: true
    }
  }
});

// Status message
const status = blessed.box({
  parent: screen,
  bottom: 1,
  left: 0,
  width: "100%",
  height: 1,
  content: "Use arrow keys to navigate",
  align: "center"
});

// Handle selection
menu.on("select", (_item, index) => {
  switch (index) {
    case 0:
      status.setContent("Login selected");
      break;
    case 1:
      status.setContent("Register selected");
      break;
    case 2:
      shutdown();
      return;
  }

  screen.render();
});

function shutdown() {
  screen.destroy();
  process.exit(0);
}

screen.key(["escape", "C-c"], shutdown);

menu.focus();
screen.render();

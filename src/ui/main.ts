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

const loginScreen = blessed.box({
    parent: screen,
    width: '100%',
    height: '100%',
    content: 'Welcome to the LOGIN SCREEN. Press key 1 to go back to menu.',
    border: 'line',
    hidden: true
})


const loginForm = blessed.form({
    parent: loginScreen,
    keys: true,
    height: 15,
    left: 'center',
    top: 'center',
    label: 'Login',
    border: 'line',
    style: {
        border: { fg: 'cyan' }
    }
})
// --- text inputs ---
// username input
const usernameInput = blessed.textbox({
    parent: loginForm,
    label: "Username",
    name: 'username',
    top: 2,
    left: 3,
    width: '90%',
    height: 3,
    border: 'line',
    inputOnFocus: true,
    style: {
        border: { fg: 'cyan' },
        focus: { border: { fg: 'green' } }
    },

    mouse: true,
    keys: true,
    input: true
})


const passwordInput = blessed.textbox({
  parent: loginForm,
  label: 'Password',
  name: 'password',
  top: 6,
  left: 2,
    height: 3,
  width: '90%',
  censor: true, // Masks characters with '*'
  inputOnFocus: true,
  border: { type: 'line' },
    style: {
        border: { fg: 'cyan' },
        focus: { border: { fg: 'green' } }
  }
});

// Handle selection
menu.on("select", (_item, index) => {
  switch (index) {
    case 0:
      // status.setContent("Login selected");
          loginScreen.show();
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
screen.key(['1'], () => {
    loginScreen.hide()
    menu.show()

    screen.render()
})


menu.focus();
screen.render();

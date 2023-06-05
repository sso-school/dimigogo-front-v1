let prev = [];
let prevTime = 0;

export const render = (message) => {
  const renderLog = false;
  if (!renderLog) {
    return;
  }

  const url = message.split(" > ");
  const time = `${new Date().getFullYear().toString().padStart(2, "0")}${(new Date().getMonth() + 1).toString().padStart(2, "0")}${new Date().getDate().toString().padStart(2, "0")}${new Date().getHours().toString().padStart(2, "0")}${new Date().getMinutes().toString().padStart(2, "0")}${new Date().getSeconds().toString().padStart(2, "0")}`;
  const delay = time - prevTime > 1;

  if (delay) {
    console.log(" ");
  }

  for (let i = 0; i < url.length; i++) {
    if (url[i] === prev[i] && !delay) {
      continue;
    }
    let space = "";
    for (let j = 0; j < i; j++) {
      space += "  ";
    }
    // console.log(space);
    console.log(space, ">", url[i], time);
  }

  prev = url;
  prevTime = time;
};

export const log = (message) => {
  console.log(message);
};

export const error = (message) => {
  console.error(message);
};

const { exec } = require('child_process');

module.exports.execCommand = async (commandList = []) => {
  let command;

  if (!(commandList instanceof Array)) commandList = [];

  for (const item of commandList) {
    command = !command ? item : (command + ' && ' + item);
  }

  if (command) {
    return await new Promise((resolve, rejects) => {
      exec(command, (error, stdout, stderr) => {
        if (error) rejects(error);
        resolve(stdout || stderr);
      });
    });
  }

  return null;
}

module.exports.execLiveCommand = (commandList = []) => {
  if (!(commandList instanceof Array)) commandList = [];
  let command;
  for (const item of commandList) {
    command = !command ? item : (command + ' && ' + item);
  }

  if (command) {
    console.log(command);
    const coffeeProcess = exec(command);
    coffeeProcess.stdout.on('data', function (data) {
      console.log(data);
    });

    return coffeeProcess;
  } else {
    console.error("Command is empty!");
  }
  
  return null;
}
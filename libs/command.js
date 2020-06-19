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
    const childProcess = exec(command);
    childProcess.stdout.on('data', function (data) {
      console.log('Child Process Data: ', data);
    });
    childProcess.stdout.on('error', (err) => {
      console.log('Child Process Error:', err);
    });

    return childProcess;
  } else {
    console.error("Command is empty!");
  }

  return null;
}
'use strict';


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
    const childProcess = exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
    });

    childProcess.stdout.on('data', function (data) {
      if (data) data = data.replace(/\n/g, '');
      console.log('\x1b[44m%s\x1b[0m', 'Child Process Data:', data);
    });

    childProcess.stdout.on('error', (err) => {
      console.log('\x1b[44m%s\x1b[0m', 'Child Process Error:', err);
    });

    childProcess.stdout.on('exit', (code) => {
      console.log('\x1b[41m%s\x1b[0m', `Child Process Exit: Child Process: Child process exit with code ${code}`);
    });

    childProcess.stdout.on('message', (mgs) => {
      console.log('Child Process Message: ', mgs);
    });

    return childProcess;
  } else {
    console.error("Command is empty!");
  }

  return null;
}
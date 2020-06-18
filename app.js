const { execLiveCommand, execCommand } = require('./libs/command');
const dirTree = require('directory-tree');

function callAll() {
    const list = dirTree('./functions');
    const listFunction = [];

    for (const item of list.children) {
        const cmd = [`cd ./functions/${item.name}`, 'npm start'];
        execLiveCommand(cmd);
    }
}

callAll();
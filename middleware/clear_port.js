function resolvePort(process_port) {
    const exec = require('child_process').exec
    const myShellScript = exec('npx kill-port');

    myShellScript.stdout.on(`${process_port}`, (data) => {
        console.log(data);
    });

    myShellScript.stderr.on(`${process_port}`, (data) => {
        console.error(data);
    });
}
module.exports = { resolvePort }
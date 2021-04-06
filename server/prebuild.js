var exec = require('child_process').exec;
var os = require('os');

function puts(error, stdout, stderr) {
   console.log(stdout);
}

if (os.type() === 'Linux') exec('npm run prebuild-unix', puts);
else if (os.type() === 'Darwin') exec('npm run prebuild-unix', puts);
else if (os.type() === 'Windows_NT') exec('npm run prebuild-windows', puts);
else throw new Error('Unsupported OS found: ' + os.type());

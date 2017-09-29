#!/usr/bin/env node

let Liftoff = require('liftoff'),
  interpret = require('interpret'),
  v8flags = require('v8flags'),
  semver = require('semver'),
  cliPackage = require('../package'),
  nopt = require('nopt'),
  format = require('util').format,
  shell = require("shelljs"),
  config = require('../config');  

let knownOptions = {
  'version': Boolean,
  'help': Boolean
};

let shortHands = {
  'T': ['--tasks'],
  'v': ['--version'],
  'h': ['--help']
};

let options = nopt(knownOptions, shortHands, process.argv, 2);

if (options.help) {
  process.stdout.write(
    '\n' +
    '  Usage: spacecraft [options]\n\n' +
    '  Options:\n\n' +
    '    -T, --tasks              output available tasks\n' +
    '    -v, --version            output the version number\n' +
    '    -h, --help               output usage information\n' +
    '\n'
  );
  process.exit(1);
}

if (options.version) {
  process.stdout.write(format('%s\n', cliPackage.version));
  process.exit(1);
}

let cli = new Liftoff({
  name: 'spacecraft',
  processTitle: 'spacecraft',
  configName: 'spacecraft',
  extensions: interpret.jsVariants,
  v8flags: v8flags
});

cli.on('requireFail', function (name) {
  process.stderr.write(format('Error: Unable to load module "%s"\n', name));
  process.exit(1);
});

let invoke = function (env) {

  let instance = require('../index.js');

  if (options.tasks) {
    let getTasks = require('../gulpfile.js/lib/getTasks');

    process.stdout.write(
      'Available tasks:\n' +
      '  ' + getTasks().join('\n  ') + '\n'
    );

    process.exit(0);
  }

  let args = '';
  if(process.argv[2]){
    args = process.argv[2];
  }

  shell.exec('gulp ' + args + ' --color=always') ;  
};

cli.launch({
  configPath: options.spacecraft
}, invoke);
#!/usr/bin/env node

let Liftoff = require('liftoff'),
  interpret = require('interpret'),
  v8flags = require('v8flags'),
  semver = require('semver'),
  cliPackage = require('../package'),
  nopt = require('nopt'),
  format = require('util').format,
  shell = require("shelljs"),
  config = require('../config')

let knownOptions = {
  'version': Boolean,
  'help': Boolean
}

let shortHands = {
  'T': ['--tasks'],
  'v': ['--version'],
  'h': ['--help']
}

let options = nopt(knownOptions, shortHands, process.argv, 2)

// Display help
if (options.help) {
  process.stdout.write(
    '\n' +
    '  Usage: spacecraft [options]\n\n' +
    '  Options:\n\n' +
    '    -T, --tasks              output available tasks\n' +
    '    -v, --version            output the version number\n' +
    '    -h, --help               output usage information\n' +
    '\n'
  )
  process.exit(1)
}

// Display version
if (options.version) {
  process.stdout.write(format('%s\n', cliPackage.version))
  process.exit(1)
}

let cli = new Liftoff({
  name: 'spacecraft',
  processTitle: 'spacecraft',
  configName: 'spacecraft',
  extensions: interpret.jsVariants,
  v8flags: v8flags
})

let invoke = function (env) {

  // Check minimum version
  if (!semver.satisfies(env.modulePackage.version, '>=0.2.5')) {
    process.stderr.write('Error: local spacecraft package version should be >=0.2.5\n')
    process.exit(1)
  }

  let instance = require('../index.js')

  // Display tasks
  if (options.tasks) {
    let getTasks = require('../gulpfile.js/lib/getTasks')

    process.stdout.write(
      'Available tasks:\n' +
      '  ' + getTasks().join('\n  ') + '\n'
    )

    process.exit(0)
  }

  // Run task
  let args = ''
  if (process.argv[2]) {
    args = process.argv[2]
  }

  shell.exec('gulp ' + args + ' --color=always')
}

cli.launch({
  configPath: options.spacecraft
}, invoke)
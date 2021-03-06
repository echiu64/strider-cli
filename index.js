var parser = require('nomnom');

module.exports = function(deps) {
  var start = require('./start')(deps);

  parser
  .option('version', {
    abbr: 'v',
    flag: true,
    help: 'Print version and exit',
    callback: function() {
      return deps.version;
    }
  })
  .option('plugin_path', {
    abbr: 'm',
    help: 'Specify path to plugins (defaults to node_modules)'
  })

  var commands = require('./commands')
  commands.setup(deps, parser)

  parser.nocommand('start')
  .option('no-cluster', {
    help: "Bypass the cluster module when starting Strider. Disables self-restart."
  })
  .callback(function(opts) {
    start(opts.extension_path, opts);
  });

  return {
    parser: parser,
    start: start
  }
}

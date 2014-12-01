var jackrabbit = require('jackrabbit');
var healthServer = require('health-server');

module.exports = function(opts, handle) {
  var broker = jackrabbit(opts.SERVER);
  broker.once('connected', create(opts.QUEUE));
  process.once('uncaughtexception', onError);

  function create(Q) {
    return function() { broker.create(Q, serve(Q)); }
  }

  function serve(Q) {
    return function() {
      broker.handle(Q, handle);
    }
  }

  function onError(err) {
    console.log(err.message);
    process.exit();
  }

};

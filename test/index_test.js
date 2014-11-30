var test = require('tap').test;
var rewire = require('rewire');
var svcCore = rewire('../');

var q = require('jackrabbit')('amqp://admin:jackdogbyte@localhost');

test('svcCore', function(t) {
  svcCore.__set__('jackrabbit', function(conn) {
    return {
      create: function(q, ready) {
        ready();
      },
      once: function(event, handler) {
        process.nextTick(function() {
          handler();
        });
      },
      handle: function(q, onJob) {
        process.nextTick(function() {
          onJob({ name: 'beep'}, function() {
          });
        });
      }
    }
  });

  svcCore({
    SERVER: 'amqp://admin:jackdogbyte@localhost',
    QUEUE: 'foo.bar'
  }, function(job, ack) {
    ack();
    t.equals(job.name, 'beep');
    t.end();
    process.nextTick(function() { process.exit(); });
  });
});


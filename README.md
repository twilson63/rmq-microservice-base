# RMQ-MicroService-Base

[![build status](https://secure.travis-ci.org/twilson63/rmq-microservice-base.png)](http://travis-ci.org/twilson63/rmq-microservice-base)


A base module that removes the boilier-plate from a rabbitmq micro service.

``` js
var svc = require('rmq-microservice-base');

svc({
  SERVER: 'amqp://localhost',
  QUEUE: 'foo.bar'
}, function(job, ack) {
  // ... do stuff with job
  // ... when done call ack
  ack();
});
```

This module abstracts the connection, create and handle methods of the rabbitMQ jackrabbit module, and provides a simple api to pass in the connection and queue info as well as a function to handle each job request.

## Install

``` sh
npm install rmq-microservice-base --save
```

## Run Tests

npm test

## License

MIT

## Contributions

pull requests welcome, please include test coverage



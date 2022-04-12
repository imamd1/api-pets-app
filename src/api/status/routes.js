const routes = (handler) => [
  {
    method: 'POST',
    path: '/status',
    handler: handler.addStatusHandler,
  },
  {
    method: 'GET',
    path: '/status',
    handler: handler.getAllStatusHandler,
  },
  {
    method: 'GET',
    path: '/status/{statusId}',
    handler: handler.getStatusByIdHandler,
  }
];

module.exports = routes;
  
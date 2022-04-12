const routes = (handler) => [
  {
    method: 'POST',
    path: '/pets',
    handler: handler.addPetHandler
  },
  {
    method: 'GET',
    path: '/pets',
    handler: handler.getPetsHandler
  }
]

module.exports = routes;

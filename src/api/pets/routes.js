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
  },
  {
    method: 'GET',
    path: '/pets/{petId}',
    handler: handler.getPetByIdHandler
  },
  {
    method: 'PUT',
    path: '/pets/{petId}',
    handler: handler.editPetByIdHandler
  },
  {
    method: 'DELETE',
    path: '/pets/{petId}',
    handler: handler.deletePetByIdHandler
  }
]

module.exports = routes;

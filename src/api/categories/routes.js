const routes = (handler) => [
  {
    method: 'POST',
    path:'/categories',
    handler: handler.addCategoryHandler
  },
  {
    method: 'GET',
    path: '/categories',
    handler: handler.getAllCategoriesHandler
  },
  {
    method: 'GET',
    path: '/categories/{categoryId}',
    handler: handler.getCategoryByIdHandler
  },
  {
    method: 'PUT',
    path: '/categories/{categoryId}',
    handler: handler.editCategoryByIdHandler
  },
  {
    method: 'DELETE',
    path: '/categories/{categoryId}',
    handler: handler.deleteCategoryByIdHandler
  }
];

module.exports = routes;
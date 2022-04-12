const routes = require('./routes');
const CategoriesHandler = require("./handler");


module.exports = {
  name: 'categories',
  version: '1.0.0',
  register: async(server, {service}) => {
    const categoryHandler = new CategoriesHandler(service);
    server.route(routes(categoryHandler));
  }
}

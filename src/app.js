require('dotenv').config();

const Hapi = require('@hapi/hapi');

const ClientError = require('./exceptions/ClentError');

//status
const status = require('./api/status');
const StatusService = require('./services/postgres/StatusServices');

//categories
const categories = require('./api/categories');
const CategoryServices = require('./services/postgres/CategoryServices');

//pets 
const pets = require('./api/pets');
const PetServices = require('./services/postgres/PetServices');

const init = async () => {
  const statusService = new StatusService();
  const categoriesService = new CategoryServices();
  const petsService = new PetServices();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.NODE_ENV,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });



  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;
    if (response instanceof ClientError) {
      // membuat response baru dari response toolkit sesuai kebutuhan error handling
      const newResponse = h.response({

        status: 'fail',

        message: response.message,

      });

      newResponse.code(response.statusCode);
      return newResponse;

    }
    // jika bukan ClientError, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return response.continue || response;

  });

  
  await server.register([
    {
      plugin: status,
      options: {
        service: statusService,
      }
    },
    {
      plugin: categories,
      options: {
        service: categoriesService,
      }
    },
    {
      plugin: pets,
      options: {
        service: petsService
      }
    }
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
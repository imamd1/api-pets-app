require('dotenv').config();

const Hapi = require('@hapi/hapi');

const init = async () => {
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
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
const ClientError = require("../../exceptions/ClentError");

class PetsHandler {
  constructor(service) {
    this._service = service;
    
    this.addPetHandler = this.addPetHandler.bind(this);
    this.getPetsHandler = this.getPetsHandler.bind(this);
  }

  async addPetHandler(request, h) {
    try {
      // const { statusId } = request.params;
      const { name, latin_name, statusId, category } = request.payload;

      // console.log(request.params);
      const petId = await this._service.addPet({name, latin_name, statusId, category});

      return {
        status: 'created',
        data: {
          petId
        }
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'failed',
          message: error.message
        });
        response.code(error.statusCode);
        return response;
      }


      //Server error

      const response = h.response({
        status: 'error',
        message: 'Server bermasalah'
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getPetsHandler(request, h) {
    try {
      const pet = await this._service.getPets();
      return {
        status: 'success',
        data: {
          pet
        }
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'failed',
          message: error.message
        });
        response.code(error.statusCode);
        return response;
      }


      //Server error

      const response = h.response({
        status: 'error',
        message: 'Server bermasalah'
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getPetByIdHandler(request, h) {
    try {
      
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'failed',
          message: error.message
        });
        response.code(error.statusCode);
        return response;
      }


      //Server error

      const response = h.response({
        status: 'error',
        message: 'Server bermasalah'
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async editPetByIdHandler(request, h) {
    try {
      
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'failed',
          message: error.message
        });
        response.code(error.statusCode);
        return response;
      }


      //Server error

      const response = h.response({
        status: 'error',
        message: 'Server bermasalah'
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deletePetByIdHandler(request, h) {
    try {
      
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'failed',
          message: error.message
        });
        response.code(error.statusCode);
        return response;
      }


      //Server error

      const response = h.response({
        status: 'error',
        message: 'Server bermasalah'
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = PetsHandler;

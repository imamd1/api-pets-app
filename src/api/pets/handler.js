const ClientError = require("../../exceptions/ClentError");

class PetsHandler {
  constructor(service) {
    this._service = service;
    
    this.addPetHandler = this.addPetHandler.bind(this);
    this.getPetsHandler = this.getPetsHandler.bind(this);
    this.getPetByIdHandler = this.getPetByIdHandler.bind(this);
    this.editPetByIdHandler = this.editPetByIdHandler.bind(this);
    this.deletePetByIdHandler = this.deletePetByIdHandler.bind(this);
  }

  async addPetHandler(request, h) {
    try {
      const { name, latin_name, category, status, detail } = request.payload;

      const petId = await this._service.addPet({name, latin_name, category, status, detail});

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
      const { petId } = request.params;
      const pet = await this._service.getDetailPetById(petId);

      const response = h.response({
        status: 'success',
        data: {
          pet
        }
      });
      return response;
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
      const { petId } = request.params;
      const { name, latin_name, category, status, detail } = request.payload;

      const pet = await this._service.editPetById({petId, name, latin_name, category, status, detail});

      const response = h.response({
        status: 'success',
        message: 'Data berhasil diperbarui',
        data: pet
      });
      return response;
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
      const { petId } = request.params;
      
      await this._service.deletePetById(petId);

      const response = h.response({
        status: 'deleted',
        message: 'Data pet berhasil dihapus'
      });

      return response;

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

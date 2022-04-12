
// const autoBind = require('auto-bind');
const ClientError = require('../../exceptions/ClentError');

class StatusHandler {
  constructor(service) {
    this._service = service;

    // autoBind(this);
    this.addStatusHandler = this.addStatusHandler.bind(this);
    this.getAllStatusHandler = this.getAllStatusHandler.bind(this);
    this.getStatusByIdHandler = this.getStatusByIdHandler.bind(this)
  }

  async addStatusHandler(request, h) {
    try {
      const { name } = request.payload;
      const statusId = await this._service.addStatus({name});
      const response = h.response({
        status: 'success',
        message: 'status berhasil ditambahkan',
        data: {
          statusId
        }
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'failed',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      //server error

      const response = h.response({
        status: 'error',
        message: 'Server bermasalah'
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getAllStatusHandler(request, h) {
    try {
      const status = await this._service.getAllStatus();
      return {
        status: 'success',
        data: {
          status
        }
      }
      
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'failed',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      //server error 

      const response = h.response({
        status: 'error',
        message: 'Server bermasalah'
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getStatusByIdHandler(request, h) {
    try {
      const { statusId } = request.params;

      const status = await this._service.getStatusById(statusId);
    
      return {
        status: 'success',
        data: {
          status
        }
      }
    } catch (error) {
      if(error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      //server error

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

module.exports = StatusHandler;

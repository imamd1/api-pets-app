const ClientError = require("../../exceptions/ClentError");


class CategoriesHandler {
  constructor(service) {
    this._service = service;

    this.addCategoryHandler = this.addCategoryHandler.bind(this);
    this.getAllCategoriesHandler = this.getAllCategoriesHandler.bind(this);
    this.getCategoryByIdHandler = this.getCategoryByIdHandler.bind(this);
    this.editCategoryByIdHandler = this.editCategoryByIdHandler.bind(this);
    this.deleteCategoryByIdHandler = this.deleteCategoryByIdHandler.bind(this);
    
  }

  async addCategoryHandler(request, h) {
    try {
      const { name } = request.payload;
      const category = await this._service.addCategory({ name });

      const response = h.response({
        status: 'success',
        data: {
          category
        }
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
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

  async getAllCategoriesHandler(request, h) {
    try {
      const categories = await this._service.getCategories();

      return {
        status: 'success',
        data: {
          categories
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
      console.error(error.message);
      return response;
    }
  }

  async getCategoryByIdHandler(request, h) {
    try {
      const { categoryId } = request.params;
      const category = await this._service.getCategoryById(categoryId);

      return {
        status: 'success',
        data: {
          category
        }
      }
    } catch (error) {
      if(error instanceof ClientError) {
        const response = h.response({
          status: 'failed',
          message: error.message
        });
        response.code(error.statusCode);
        return response;
      }

      //server

      const response = h.response({
        status: 'error',
        message: 'Server bermasalah'
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async editCategoryByIdHandler(request, h) {
    try {
      const { categoryId } = request.params;
      const { name } = request.payload;
      const category = await this._service.editCategoryById(categoryId, name);

      return {
        status: 'modified',
        data: {
          category
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

  async deleteCategoryByIdHandler(request, h) {
    try {
      const { categoryId } = request.params;
      await this._service.deleteCategoryById(categoryId);
      return {
        status: 'success',
        message: 'Kategori berhasil dihapus'
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
        message: 'Server bermasalah',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = CategoriesHandler;
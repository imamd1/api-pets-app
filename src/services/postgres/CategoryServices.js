const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const NotFoundError = require("../../exceptions/NotFoundError");


class CategoryServices {

  constructor() {
    this._pool = new Pool();
  }

  async addCategory({name}) {
    const id = `category-${nanoid(10)}`;

    const query = {
      text: 'INSERT INTO categories VALUES ($1, $2) RETURNING id',
      values: [id, name]
    }

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getCategories() {
    const query = {
      text: 'SELECT * FROM categories'
    }

    const result = await this._pool.query(query);

    return result.rows;

  }

  async getCategoryById(categoryId) {
    const query = {
      text: 'SELECT * FROM categories WHERE id = $1',
      values: [categoryId]
    }

    const result = await this._pool.query(query);

    if(!result.rowCount) {
      throw new NotFoundError('Kategori tidak ditemukan');
    }

    return result.rows;
  }

  async editCategoryById(categoryId, name) {
    const query = {
      text: 'UPDATE categories SET name = $1 WHERE id = $2 RETURNING id',
      values: [name, categoryId]
    }

    const result = await this._pool.query(query);

    if(!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui kategori. Kategori tidak ditemukan');
    }

    return result.rows;
  }

  async deleteCategoryById(categoryId) {
    const query = {
      text: 'DELETE FROM categories WHERE id = $1',
      values: [categoryId]
    }

    const result = await this._pool.query(query);

    if(!result.rowCount) {
      throw new NotFoundError('Gagal menghapus kategori. Kategori tidak ditemukan')
    }
  }

}

module.exports = CategoryServices;

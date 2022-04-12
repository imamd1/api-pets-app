const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const NotFoundError = require("../../exceptions/NotFoundError");


class PetServices {

  constructor() {
    this._pool = new Pool();
  }

  async addPet({name, latin_name, category, status}) {
    const id = `pet-${nanoid(10)}`;
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    const query = {
      text: 'INSERT INTO pets VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, name, latin_name, category, created_at, updated_at, status]
    }

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getPets() {
    const query = {
      text: 'SELECT * FROM pets'
    }

    const result = await this._pool.query(query);

    return result.rows;
  }

  async getDetailPetById(petId) {
    const query = {
      text: 'SELECT * FROM pets WHERE id = $1',
      values: [petId]
    }

    const result = await this._pool.query(query)

    if(!result.rowCount) {
      throw new NotFoundError('Gagal mendapatkan detail hewan. Id tidak ditemukan');
    }
  }

  async deletePetById(petId) {
    const query = {
      text: 'DELETE FROM pets WHERE id = $1',
      values: [petId]
    }

    const result = await this._pool.query(query);

    if(!result.rowCount) {
      throw new NotFoundError('Gagal menghapus data. Id tidak ditemukan');
    }
  }

}

module.exports = PetServices;

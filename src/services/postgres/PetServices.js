const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const NotFoundError = require("../../exceptions/NotFoundError");


class PetServices {

  constructor() {
    this._pool = new Pool();
  }

  async addPet({name, latin_name, category, status, detail}) {
    const id = `pet-${nanoid(10)}`;
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    const query = {
      text: 'INSERT INTO pets VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [id, name, latin_name, category, created_at, updated_at, status, detail]
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
      text: `SELECT pets.name, pets.latin_name, categories.name AS category, status.name AS status, pets.detail
            FROM pets
            JOIN categories ON pets.category = categories.id
            JOIN status ON pets.status = status.id
            WHERE pets.id=$1`,
      values: [petId]
    }

    const result = await this._pool.query(query)

    if(!result.rowCount) {
      throw new NotFoundError('Gagal mendapatkan detail hewan. Id tidak ditemukan');
    }

    return result.rows;
  }

  async editPetById({petId, name, latin_name, category, status, detail}) {
    const updated_at = new Date().toISOString();

    const query = {
      text: `UPDATE pets SET name = $1, latin_name = $2, category = $3, status = $4, update_at = $5, detail = $6
            WHERE id = $7 RETURNING id`,
      values: [name, latin_name, category, status, updated_at, detail, petId],
    }

    const result = await this._pool.query(query);

    if(!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui data. Id tidak ditemukan');
    }

    return result.rows;
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

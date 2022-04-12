const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const NotFoundError = require("../../exceptions/NotFoundError");


class StatusService {

  constructor() {
    this._pool = new Pool();
  }

  async addStatus({name}) {
    const id = `status-${nanoid(10)}`;

    const query = {
      text: 'INSERT INTO status VALUES($1, $2) RETURNING id',
      values: [id, name]
    }

    const result = await this._pool.query(query);

    return result.rows[0].id;
  }

  async getAllStatus() {
    const query = {
      text: 'SELECT * FROM status'
    }

    const result = await this._pool.query(query)

    return result.rows;
  }

  async getStatusById(statusId) {
    const query = {
      text: 'SELECT * FROM status WHERE id = $1',
      values: [statusId]
    }

    const result = await this._pool.query(query)

    if(!result.rowCount) {
      throw new NotFoundError('Status tidak ditemukan')
    }

    return result.rows;
    
  }

}

module.exports = StatusService;

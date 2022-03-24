const { Pool } = require("pg");


class PetServices {

  constructor() {
    this._pool = new Pool();
  }

  async addPet({id, name, latin_name, category}) {

  }

}

module.exports = PetServices;

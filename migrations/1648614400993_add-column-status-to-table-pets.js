/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addColumn('pets', {
    status: {
      type: 'VARCHAR(50)',
    }
  });

  pgm.addConstraint('pets', 'fk_pet.status_status.id', 'FOREIGN KEY(status) REFERENCES status(id) ON DELETE CASCADE')
};

exports.down = pgm => {
  pgm.dropColumn('pets', 'status')
};

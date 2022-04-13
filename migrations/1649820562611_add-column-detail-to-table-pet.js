/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addColumn('pets', {
    detail: {
      type: 'TEXT',
    }
  })
};

exports.down = pgm => {
  pgm.dropColumn('pets', 'detail');
};

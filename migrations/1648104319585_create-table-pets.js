/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('pets', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    latin_name: {
      type: 'TEXT',
      notNull: true
    },
    category: {
      type: 'VARCHAR(50)',
    },
    created_at: {
      type:'TEXT',
      default: pgm.func('current_timestamp')
    },
    update_at:{
      type:'TEXT',
      notNull: true
    }
  })
  pgm.addConstraint('pets', 'fk_pets.category_categories.id', 'FOREIGN KEY(category) REFERENCES categories(id) ON DELETE CASCADE');
};

exports.down = pgm => {
  pgm.dropTable('pets');

};

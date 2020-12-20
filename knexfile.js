// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    useNullAsDefault: true
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    seeds: {
      directory: './knex/seeds/test'
    }
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './knex/game-state.sqlite3'
    }
  }
};
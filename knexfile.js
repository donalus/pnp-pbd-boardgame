// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.sqlite3'
    },
    seeds: {
      directory: './src/knex/seeds'
    },
    migrations: {
      directory: './src/knex/migrations'
    },
    useNullAsDefault: true
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    seeds: {
      directory: './src/knex/seeds'
    },
    migrations: {
      directory: './src/knex/migrations'
    }
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './data/game-state.sqlite3'
    }
  }
};
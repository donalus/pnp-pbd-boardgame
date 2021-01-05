// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/game-state.dev.sqlite3'
    },
    seeds: {
      directory: './src/knex/seeds/dev'
    },
    migrations: {
      directory: './src/knex/migrations/dev'
    },
    useNullAsDefault: true
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    seeds: {
      directory: './src/knex/seeds/test'
    },
    migrations: {
      directory: './src/knex/migrations/test'
    }
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './data/game-state.prod.sqlite3'
    },
    seeds: {
      directory: './src/knex/seeds/prod'
    },
    migrations: {
      directory: './src/knex/migrations/prod'
    }
  }
};
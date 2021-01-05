exports.up = function (knex) {
    return knex.schema
      .createTable("games", function (table) {
        table.increments("id").primary();
        table.string("session_name");
        table.integer("time_score").defaultTo(25);
        table.integer("trust_score").defaultTo(25);
        table.boolean("is_completed").defaultTo(false);
        table.datetime("created_date").defaultTo(knex.fn.now())
      })
      .createTable("actions", function (table) {
        table.increments("id").primary();
        table.integer("game_id").unsigned()
        table.foreign("game_id").references("games.id")
        table.integer("game_piece_id").unsigned()
        table.integer("time_cost")
        table.integer("trust_cost")
        table.string("choice")
        table.string("info_type")
        table.string("action_type")
        table.string("purpose")
        table.boolean("is_active").defaultTo(true)
      })
      .createTable("cards", function (table) {
          table.increments("id").primary();
          table.integer("game_id").unsigned();
          table.foreign("game_id").references("games.id");
          table.string("card_name");
          table.string("card_id");
      });
  };
  
  exports.down = function (knex) {
    return knex.schema  
      .dropTable("actions")
      .dropTable("cards")
      .dropTable("games");
  };

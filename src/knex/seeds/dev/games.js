
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {
          id: 1, 
          session_name: 'Test Game 1', 
          time_score: 19,
          trust_score: 28,
          is_completed: false
        },
        {
          id: 2,
          session_name: 'Test Game 2', 
          time_score: 21,
          trust_score: 12,
          is_completed: true
        }
      ]);
    });
};

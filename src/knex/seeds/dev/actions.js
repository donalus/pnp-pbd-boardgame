
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('actions').del()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {
          id: 1, 
          game_id: 1,
          game_piece_id: 1,
          time_cost: -2,
          trust_cost: 0,
          choice: 'Collect',
          info_type: "demographic",
          action_type: "collect",
          purpose: "service",
          is_active: true
        },
        {
          id: 2, 
          game_id: 1,
          game_piece_id: 2,
          time_cost: -2,
          trust_cost: 1,
          choice: 'Do Not Collect',
          info_type: "demographic",
          action_type: "collect",
          purpose: "marketing",
          is_active: true
        },
        {
          id: 3, 
          game_id: 1,
          game_piece_id: 3,
          time_cost: 2,
          trust_cost: -1,
          choice: 'Collect',
          info_type: "demographic",
          action_type: "collect",
          purpose: "profiling",
          is_active: true
        },
        {
          id: 4, 
          game_id: 1,
          game_piece_id: 4,
          time_cost: -3,
          trust_cost: 3,
          choice: 'Do Not Collect',
          info_type: "demographic",
          action_type: "share",
          purpose: "corporations",
          is_active: true
        },
        {
          id: 5, 
          game_id: 1,
          game_piece_id: 1,
          time_cost: 2,
          trust_cost: 0,
          choice: 'Collect',
          info_type: "demographic",
          action_type: "share",
          purpose: "researchers",
          is_active: true
        },
        {
          id: 6, 
          game_id: 1,
          game_piece_id: 1,
          time_cost: -3,
          trust_cost: 0,
          choice: 'Collect',
          info_type: "demographic",
          action_type: "share",
          purpose: "government",
          is_active: true
        }
      ]);
    });
};

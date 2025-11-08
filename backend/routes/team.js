const express = require('express');
const router = express.Router();
const { db } = require('../database/init');

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM team_members ORDER BY joined_at DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { name, email, role, department } = req.body;
  
  const sql = `
    INSERT INTO team_members (name, email, role, department)
    VALUES (?, ?, ?, ?)
  `;
  
  db.run(sql, [name, email, role, department], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ 
      id: this.lastID, 
      name, 
      email, 
      role, 
      department,
      message: 'Team member added successfully' 
    });
  });
});

module.exports = router;
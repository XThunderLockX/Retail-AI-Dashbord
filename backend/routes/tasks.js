const express = require('express');
const router = express.Router();
const { db } = require('../database/init');

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM tasks ORDER BY created_at DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { title, description, assigned_to, priority, due_date } = req.body;
  
  const sql = `
    INSERT INTO tasks (title, description, assigned_to, priority, due_date)
    VALUES (?, ?, ?, ?, ?)
  `;
  
  db.run(sql, [title, description, assigned_to, priority || 'medium', due_date], 
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ 
        id: this.lastID, 
        title, 
        description, 
        assigned_to, 
        priority, 
        due_date,
        message: 'Task created successfully' 
      });
    }
  );
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, assigned_to, priority, status, due_date } = req.body;
  
  const sql = `
    UPDATE tasks 
    SET title = ?, description = ?, assigned_to = ?, priority = ?, status = ?, due_date = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  
  db.run(sql, [title, description, assigned_to, priority, status, due_date, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json({ message: 'Task updated successfully' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  const sql = 'DELETE FROM tasks WHERE id = ?';
  
  db.run(sql, [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json({ message: 'Task deleted successfully' });
  });
});

module.exports = router;
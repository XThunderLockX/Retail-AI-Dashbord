const express = require('express');
const router = express.Router();
const { db } = require('../database/init');

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM ideas ORDER BY created_at DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { title, description, category, priority, created_by } = req.body;
  
  const sql = `
    INSERT INTO ideas (title, description, category, priority, created_by)
    VALUES (?, ?, ?, ?, ?)
  `;
  
  db.run(sql, [title, description, category || 'general', priority || 'medium', created_by], 
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ 
        id: this.lastID, 
        title, 
        description, 
        category, 
        priority, 
        created_by,
        message: 'Idea created successfully' 
      });
    }
  );
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, category, priority, status } = req.body;
  
  const sql = `
    UPDATE ideas 
    SET title = ?, description = ?, category = ?, priority = ?, status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  
  db.run(sql, [title, description, category, priority, status, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Idea not found' });
      return;
    }
    res.json({ message: 'Idea updated successfully' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  const sql = 'DELETE FROM ideas WHERE id = ?';
  
  db.run(sql, [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Idea not found' });
      return;
    }
    res.json({ message: 'Idea deleted successfully' });
  });
});

module.exports = router;
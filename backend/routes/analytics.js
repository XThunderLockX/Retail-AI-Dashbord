const express = require('express');
const router = express.Router();
const { db } = require('../database/init');

router.get('/', (req, res) => {
  const sql = `
    SELECT 
      COUNT(*) as total_ideas,
      COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_ideas,
      COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_ideas
    FROM ideas
  `;
  
  const taskSql = `
    SELECT 
      COUNT(*) as total_tasks,
      COUNT(CASE WHEN status = 'done' THEN 1 END) as completed_tasks,
      COUNT(CASE WHEN status = 'todo' THEN 1 END) as todo_tasks,
      COUNT(CASE WHEN status = 'in-progress' THEN 1 END) as in_progress_tasks
    FROM tasks
  `;
  
  const teamSql = 'SELECT COUNT(*) as total_team_members FROM team_members';
  
  db.all(sql, [], (err, ideaResults) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    db.all(taskSql, [], (err, taskResults) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      db.all(teamSql, [], (err, teamResults) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        
        const analytics = {
          ideas: ideaResults[0],
          tasks: taskResults[0],
          team: teamResults[0]
        };
        
        res.json(analytics);
      });
    });
  });
});

router.get('/sales-metrics', (req, res) => {
  const sql = 'SELECT * FROM sales_metrics ORDER BY date DESC LIMIT 30';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

router.post('/sales-metrics', (req, res) => {
  const { metric_name, metric_value, date, category } = req.body;
  
  const sql = `
    INSERT INTO sales_metrics (metric_name, metric_value, date, category)
    VALUES (?, ?, ?, ?)
  `;
  
  db.run(sql, [metric_name, metric_value, date, category], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ 
      id: this.lastID, 
      metric_name, 
      metric_value, 
      date, 
      category,
      message: 'Sales metric added successfully' 
    });
  });
});

module.exports = router;
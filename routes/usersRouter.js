const express = require('express');
const router = express.Router();

// "/users"
router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('undefined');
  }
});

module.exports = router;

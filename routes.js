// Example controller structure
const express = require('express');
const router = express.Router();

const detailsController = (req, res) => {
  const { user_id } = req.params;
  User.findByPk(user_id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json({ user_details: user });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    });
};

router.get('/details/:user_id', authenticate, detailsController);

// PUT /update
router.put('/update', authenticate, updateController);

// GET /image
router.get('/image/:user_id', imageController);

// POST /insert
router.post('/insert', authenticate, insertController);

// DELETE /delete
router.delete('/delete/:user_id', authenticate, deleteController);

module.exports = router;

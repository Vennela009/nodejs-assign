// routes.js
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('./models');

const router = express.Router();
const SECRET_KEY = 'your_secret_key_here'; // Replace with the same secret key used in app.js

// Middleware to authenticate requests
const authenticate = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Authentication failed.' });
    }

    req.user = user;
    return next();
  })(req, res, next);
};

// Endpoint 1: Fetch user details
router.get('/details/:user_id', (req, res) => {
  const { user_id } = req.params;

  User.findByPk(user_id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ user_details: user });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Endpoint 2: Update user details
router.put('/update', authenticate, (req, res) => {
  const { user_id } = req.user;
  const newDetails = req.body;

  User.update(newDetails, { where: { user_id } })
    .then(() => {
      res.json({ message: 'User details updated successfully' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Endpoint 3: Get user image
router.get('/image/:user_id', (req, res) => {
  const { user_id } = req.params;

  User.findByPk(user_id, { attributes: ['user_image'] })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ user_image: user.user_image });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Endpoint 4: Insert a new user
router.post('/insert', authenticate, (req, res) => {
  const newUser = req.body;

  User.create(newUser)
    .then(() => {
      res.json({ message: 'User created successfully' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Endpoint 5: Delete a user
router.delete('/delete/:user_id', authenticate, (req, res) => {
  const { user_id } = req.params;

  User.destroy({ where: { user_id } })
    .then(() => {
      res.json({ message: 'User deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = router;

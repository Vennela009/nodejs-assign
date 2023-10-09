// app.js
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'your_secret_key_here'; // Replace with a strong secret key

app.use(bodyParser.json());
app.use(passport.initialize());

// Passport Local Strategy for authentication
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { user_name: username } });

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (!bcrypt.compareSync(password, user.user_password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Define your routes here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

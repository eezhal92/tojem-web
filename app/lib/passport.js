import passport from 'passport';
import FacebookStrategy from 'passport-facebook';

import db from '../models';

const fbStrategyOptions = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'emails', 'name', 'displayName'],
};

const onAuthenticated = (accessToken, refreshToken, profile, cb) => {
  const where = { facebookId: profile.id };
  const name = profile.displayName;
  const email = profile.emails.length ? profile.emails[0].value : '';
  const defaults = { name, email };

  db.User.findOrCreate({ where, defaults })
    .spread((user) => {
      cb(null, user);
    });
};

passport.use(new FacebookStrategy.Strategy(fbStrategyOptions, onAuthenticated));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

export default passport;

const CustomStrategy = require('passport-custom').Strategy,
    User  = require('../models/user')

module.exports = (app, passport) => {
  passport.use(new CustomStrategy(
  async function(req, done) {
    //console.log('publicKey',req.body.publicKey)
    // Note no `await` here
    const cursor = User.find().cursor();

    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      //console.log('dbKey',doc.public_key)
      //console.log(await User.authenticate(req.body.publicKey,doc.public_key))
      if(req.body.verify && await User.authenticate(req.body.publicKey,doc.public_key)){
        //console.log('match')
        req.session.challenge = 1
      }
    }
    if(await req.session.challenge === 1) return await done(null,{public_key: req.body.publicKey})
    return await done(null, false);
  }
  ));
  // passport.use(new CustomStrategy(
  //   function(req, done) {
  //     User.findOne({
  //       username: req.body.username
  //     }, function (err, user) {
  //       done(err, user);
  //     });
  //   }
  // ));
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  app.use(passport.initialize())
  app.use(passport.session())
}

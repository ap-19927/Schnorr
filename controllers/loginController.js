const passport = require('passport');

exports.login_get = (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/')

  res.render('login', { title: 'login', messages: req.session.messages || []  })
};
/**
0x60005815acece6dde1d801be91de805e8ae35f144e7efc4257823ccdb2ae1da46192a391359bbe137e0f4f15eba56d1d44fc2a07a6545cc5fe3364e5efca6295
**/
exports.login_post = [passport.authenticate('custom', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }]
// exports.login_post =  async (req, res, next) => {
//   console.log('publicKey',req.body.publicKey)
//   // Note no `await` here
//   const cursor = User.find().cursor();
//
//   for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
//     console.log('dbKey',doc.public_key)
//     console.log(await User.authenticate(req.body.publicKey,doc.public_key))
//     if(req.body.verify && await User.authenticate(req.body.publicKey,doc.public_key)){
//       console.log('match')
//       req.session.challenge = 1
//     }
//   }
//   if(  req.session.challenge===1) res.redirect('/')
//   else res.redirect('/login')
//   // console.log(User.find({}).exec(function (err, docs) {
//   //   docs.forEach(function (doc) {
//   //     var value = getData(doc);
//   //     var $el = $(...etc...);
//   //     if ($el.length > 0) { ...etc... }
//   //   });
//   // });)
//   // if(User.find({}).exec(async pk => {
//   //   console.log(pk)
//   //   await User.authenticate(req.body.pk,pk)
//   //
//   // }))  {
//   //   req.session.challenge = true
//   //   res.redirect('/')
//   // }
//   // else {
//   //   console.log('no')
//   //   res.redirect('/login')
//   // }
// }

  // // Validate and sanitize fields.
  // authenticate.login(User),
  // authenticate.password,
  // // Process request after validation and sanitization.
  // (req, res, next) => {
  //
  //   // Extract the validation errors from a request.
  //   const errors = authenticate.validation(req);
  //
  //   if (!errors.isEmpty()) {
  //       // There are errors. Render form again with sanitized values/errors messages.
  //       res.render('login', { title: 'Login', user: req.body, errors: errors.array() });
  //       return;
  //   }
  //   else {
  //     // Data from form is valid.
  //     const credentials = authenticate.Ecc(req.body.username + ':'+req.body.password);
  //     const publicKey = authenticate.publicKey(credentials);
  //     console.log(publicKey)
  //     const user = User.findOne( {public_key: publicKey } )
  //
  //     if(!user) res.redirect('/login')
  //     // Successful - redirect to index
  //     req.session.challenge = true;
  //     res.redirect('/');
  //
  //   }
  // }

// authenticate = require('../utilities/authentication-util')
// sjcl = require('sjcl')
// bitArray = require('sjcl/core/bitArray')
// aes = require('sjcl/core/aes')
// sha256 = require('sjcl/core/sha256')
// random = require('sjcl/core/random')
// bn = require('sjcl/core/bn')
// ecc = require('sjcl/core/ecc')

exports.logout_get = (req, res) => {
  req.session.messages = [];
  req.logout()
  res.redirect('/')
};

const passport = require('passport');

exports.login_get = (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/')

  res.render('login', { title: 'login' })
};
/**
0x60005815acece6dde1d801be91de805e8ae35f144e7efc4257823ccdb2ae1da46192a391359bbe137e0f4f15eba56d1d44fc2a07a6545cc5fe3364e5efca6295
**/
exports.login_post = [passport.authenticate('custom', {  failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }]


// authenticate = require('../utilities/authentication-util')
// sjcl = require('sjcl')
// bitArray = require('sjcl/core/bitArray')
// aes = require('sjcl/core/aes')
// sha256 = require('sjcl/core/sha256')
// random = require('sjcl/core/random')
// bn = require('sjcl/core/bn')
// ecc = require('sjcl/core/ecc')

exports.logout_get = (req, res) => {
  req.session.destroy();
  req.logout()
  res.redirect('/')
};

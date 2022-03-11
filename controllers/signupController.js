const User = require('../models/user');

exports.signup_get = (req, res) => {
  if (req.session.challenge) return res.redirect('/')
  res.render('signup', { title: 'Signup' })
};

exports.signup_post = async (req, res, next) => {
  if(req.body.verify===true){
    //console.log(req.body.publicKey.toString())
  // Create an USER object with escaped and trimmed data.
    const user = new User(
      {
        public_key: req.body.publicKey.toString()
      }
    );
    // // Successful - render verify
    // res.redirect('/signup/verify');
    //console.log(user)
    user.save(function (err) {
      if (err) { return next(err); }
      // Successful - redirect to index
      //console.log('yes')
      res.redirect('/login');
    });
  }
  else {
    //console.log('no')
    res.redirect('/signup')
  }
}

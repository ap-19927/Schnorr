const User = require('../models/user'),
      authenticate = require('../utilities/authentication-util')

exports.signup_get = (req, res) => {
  if (req.session.challenge) return res.redirect('/')
  res.render('signup', { title: 'Signup' })
};

exports.signup_post = [

  // Validate and sanitize fields.
  authenticate.username(User),
  authenticate.password,
  authenticate.passwordConfirmation,
  // Process request after validation and sanitization.
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = authenticate.validation(req);

    if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        res.render('signup', { title: 'Signup', user: req.body, errors: errors.array() });
        return;
    }
    else {
      // Data from form is valid.
      const challenge = authenticate.challenge;
      const credentials = authenticate.Ecc(req.body.username + ':'+req.body.password);
      const publicKey = authenticate.publicKey(credentials);
      console.log(publicKey)
      const signed_challenge = authenticate.sign(challenge,credentials);
      console.log(authenticate.verify(signed_challenge, challenge,publicKey))
      if(authenticate.verify(signed_challenge, challenge,publicKey)){
      // Create an USER object with escaped and trimmed data.
        const user = new User(
          {
            public_key: publicKey
          }
        );
        // // Successful - render verify
        // res.redirect('/signup/verify');

        user.save(function (err) {
          if (err) { return next(err); }
          // Successful - redirect to index
          res.redirect('/');
        });
      }
    }
  }
];

const User = require('../models/user'),
      authenticate = require('../utilities/authentication-util')

exports.login_get = (req, res) => {
  if (req.session.challenge) return res.redirect('/')
  res.render('login', { title: 'login', messages: req.session.messages || []  })
};

exports.login_post = [

  // Validate and sanitize fields.
  authenticate.login(User),
  authenticate.password,
  // Process request after validation and sanitization.
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = authenticate.validation(req);

    if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        res.render('login', { title: 'Login', user: req.body, errors: errors.array() });
        return;
    }
    else {
      // Data from form is valid.
      const credentials = authenticate.Ecc(req.body.username + ':'+req.body.password);
      const publicKey = authenticate.publicKey(credentials);
      console.log(publicKey)
      // Create an USER object with escaped and trimmed data.
      const user = User.findOne( {public_key: publicKey } )

      if(!user) res.redirect('/login')
      // Successful - redirect to index
      req.session.challenge = true;
      res.redirect('/');

    }
  }
];


exports.logout_get = (req, res) => {
  req.session.messages = [];
  req.logout()
  res.redirect('/login')
};

const bcrypt = require('bcrypt'),
      saltRounds = 10,
      crypto = require('crypto'),
      { body,validationResult } = require('express-validator'),
      _ecc = require('eosjs-ecc'),
      v4  = require('uuid')

module.exports = {
  /* Validate and sanitize fields. */
  login: (User) => { return body('text').trim().escape()        
  },
  username: (User) => { return body('text').trim().escape()
        .custom(value => {
          return User.findOne({username : value}).then(user => {
            if (user) {
              return Promise.reject('Username already in use');
            }
          });
      })
  },
  password: body('password').trim().isLength({ min: 8 }).escape().withMessage('Password must be at least 8 characters long.'),
    //.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{12,}$/, "i")
    //.withMessage('Password must contain a digit, a lower case letter, an upper case letter, and one of the following !@#$%^&*'),
  passwordConfirmation: body('passwordConfirmation').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      // Indicates the success of this synchronous custom validator
      return true;
  }),
  validation: (req) => {return validationResult(req)},
  //hash
  hashns: (password) => { return crypto.createHash('sha256').update(password).digest('base64'); },
  hash: async (password) => { return await bcrypt.hash(password, saltRounds) },
  compareHash: (plainTextPassword, password)  => {return bcrypt.compare(plainTextPassword, password)},

  //cookie messages
  messages: (req,message) => {
    req.session.messages = [];
    req.session.messages.push(message)},


  Ecc: (secret) => {return _ecc.seedPrivate(_ecc.sha256(secret))},
  publicKey: (privateKey) => {return _ecc.privateToPublic(privateKey)},
  sign: (msg,privateKey) => {
    try {
      return _ecc.sign(String(msg), privateKey);
    } catch (err) {
      return null;
    }
  },
  verify: (signature,msg,publicKey) => {
    try {
      return _ecc.verify(signature, msg,publicKey);
    } catch (err) {
      return null;
    }
  },
  challenge: v4.v4().toString(),
  // Ecc: {
  //
  //   constructor(secret) {
  //     return (async () => {
  //         this.privateKey = await _ecc.seedPrivate(_ecc.sha256(secret));
  //         // this.publicKey = _ecc.privateToPublic(this.privateKey);
  //       return this;
  //     })();
  //   }
  //
  //   sign(msg) {
  //     try {
  //       return _ecc.sign(String(msg), this.privateKey);
  //     } catch (err) {
  //       return null;
  //     }
  //   }
  //
  //   static verify(signature, msg) {
  //     try {
  //       return _ecc.recover(signature, msg);
  //     } catch (err) {
  //       return null;
  //     }
  //   }
  // },




}

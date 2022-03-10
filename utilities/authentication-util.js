const bcrypt = require('bcrypt'),
      saltRounds = 10



module.exports = {
  //hash
  hash: async (password) => { return await bcrypt.hash(password, saltRounds) },
  compareHash: (plainTextPassword, password)  => {return bcrypt.compare(plainTextPassword, password)},

  //cookie messages
  messages: (req,message) => {
    req.session.messages = [];
    req.session.messages.push(message)},




}

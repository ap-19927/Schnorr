const mongoose = require('mongoose'),
      hash = require('../utilities/authentication-util')

// Mongoose Model
const userSchema = new mongoose.Schema({
  public_key: {
    type: String,
    unique: true,
    required: true,
  },
})
userSchema
.virtual('url')
.get(function () {
  return '/' + this._id;
});

// userSchema.pre('save', async function(next){
//   if (this.isNew) {
//     this.password = await hash.hash(this.password)
//   }
//   next()
// });

userSchema.static('authenticate', async function(username, plainTextPassword){
  const user = await this.findOne( {username: username}  )
  if (user && await hash.compareHash(plainTextPassword, user.password)) return user
  return false
});

// Export Mongoose "User" model
module.exports = mongoose.model('User', userSchema)

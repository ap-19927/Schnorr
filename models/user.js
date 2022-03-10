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

userSchema.pre('save', async function(next){
  if (this.isNew) {
    this.public_key = await hash.hash(this.public_key)
  }
  next()
});

userSchema.static('authenticate', async function(pk1,pk2){
  if (await hash.compareHash(pk1,pk2)) return true
  return false
});

// userSchema.static('authenticate', async function(email, plainTextPassword){
//   const user = await this.findOne( {email: email}  )
//   if (user && await hash.compareHash(plainTextPassword, user.password)) return user
//   return false
// });



// Export Mongoose "User" model
module.exports = mongoose.model('User', userSchema)

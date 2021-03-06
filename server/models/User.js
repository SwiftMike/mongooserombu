import mongoose from 'mongoose';
import bcrypt   from 'bcrypt-nodejs';

let userSchema = mongoose.Schema({
  username: {
    type: String,
    min: [1, 'Too few characters'],
    max: 100,
    required: [true, 'Please enter a username.']
  },
  email: {
    type: String,
    unique: true,
    min: [3, 'Your email is too short'],
    required: [true, 'Please enter an email']
  },
  password: {
    type: String,
    min: [8, 'Your password must be at least 8 characters large'],
    required: [true, 'Please enter a password.']
  },
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);

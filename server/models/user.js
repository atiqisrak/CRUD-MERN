const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
      },
      user_type: {
        type: String,
        required: true,
        enum: ['admin', 'user']
      },
      have_access: {
        type: Boolean,
        required: true,
        default: false
      },
      phone_number: {
        type: String,
        required: true,
        match: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/
      }      
});

const User = mongoose.model('users', userSchema);
module.exports = User;

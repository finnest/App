/**
 * Adult.js
 */

var bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    email:{
      type: 'string',
      unique: true,
      required: true
    },
    first_name: {
      type: 'string',
      required: true
    },
    last_name: {
      type: 'string',
      required: true
    },
    encryptedPassword:{
      type: 'string'
    },
    savings_balance:{
      type: 'float',
      defaultsTo: 0.00
    },
    checking_balance:{
      type: 'float',
      defaultsTo: 0.00
    },
    family: {
      model: 'family'
    },
    getKids: function() {
      var family = this.family;
      var kids;

      if (family) {
        kids = family.kids;
      } else {
        kids = [];
      }
      return kids;
    },
    verifyKid: function(kid_email) {
      return true // for debugging purposes
    }
  },

  beforeCreate: function(params, next) {
    if (params['password'] == params['password_confirmation']) {
      bcrypt.hash(params.password, 10, function isEncrypted(err, encryptedPassword) {
        if (err) return next(err);

        params.encryptedPassword = encryptedPassword;

        next();
      });
    }
  }
};

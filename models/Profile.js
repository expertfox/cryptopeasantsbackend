const mongoose = require('mongoose');

//database schema for profile
const ProfileSchema = mongoose.Schema({
  walletID: {
    type: String,
    required: true,
  },
  tokens: [
    {
      tokenID: {
        type: String,
      },
      metadata: {
        type: Object,
      },
    },
  ],
});

module.exports = mongoose.model('profile', ProfileSchema);

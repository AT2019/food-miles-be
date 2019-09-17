const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoppingSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  total_items: {
    type: Number,
    required: true
  },
  total_distance: {
    type: Number,
    required: true
  },
  items: [
    {
      food_category: {
        type: String
      },
      latitude: { type: Number },
      longitude: { type: Number },
      distance: { type: Number }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Shopping = mongoose.model('Shopping', shoppingSchema);

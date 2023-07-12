/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const genreSchema = new Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 3 },
});

// Virtual for genre's URL
genreSchema.virtual('url').get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/genre/${this._id}`;
});

// Export model
module.exports = mongoose.model('Genre', genreSchema);

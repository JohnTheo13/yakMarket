const mongoose = require('mongoose');
const moment = require('moment');

const yakSchema =  mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  sex: {
    type: String,
    enum: ['m', 'f'],
    required: true
  }
});

yakSchema.methods.ageInDays = function(day) {
  return this.age * 100 + day;
};


yakSchema.methods.milkPer = function(day) {
  return 50 - this.ageInDays(day) * 0.03;
}

yakSchema.methods.ageLastShaved = function(day = 0) {  
  console.log(this.age);
  
  return 456
}

yakSchema.set('toObject', {virtuals: true, getters: true})

yakSchema.options.toObject.transform = function (doc, ret, options) {
  // remove the _id of every document before returning the result
  delete ret._id;
  ret.ageLastShaved = doc.ageLastShaved()
  return ret;
}
module.exports = mongoose.model(
  'Yak',
  yakSchema
);
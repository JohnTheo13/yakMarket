const mongoose = require('mongoose');
const moment = require('moment');

/***
 * this.age refers to the starting age
 */

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
  // Note used for stock
  return this.age * 100 + Number(day);
};

yakSchema.methods.milkPer = function(day) {
  return 50 - this.ageInDays(day) * 0.03;
}

yakSchema.methods.ageLastShaved = function(day) {  
  return this.ageInDays(day) - 8
}

yakSchema.statics.getYaks = async function(days)  { // for yaks overview not stock's
  const yaks = await this.find();
  yaks.map(yak => yak.age = (yak.age * 100 + Number(days)) / 100)
  return [...yaks];
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
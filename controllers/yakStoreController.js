const Yak = require('../models/Yak');
const fs = require('fs');
const readline = require('readline');
const { mockYaks, milkStok } = require('./helpers');

exports.upload = (req, res) => {
  const { locals: { userIsAdmin } } = res;
  if(userIsAdmin) {
    res.render('./upload');
  } else {
    res.send('Not found');
  }
};

exports.getYaks = async (req, res) => {
  const { params: { days } } = req;
  let yaks = await Yak.getYaks(days);
  res.render('./yaks', { yaks });
}

exports.getStock = async (req, res) => {
  const { params: { days } } = req;
  const yaks = await Yak.find();
  const milk = milkStok(yaks, days).toFixed(2);
  console.log(milk);
  res.render('./stock', { milk })
}

exports.save = async (req, res) => {
  // const stream = await readline.createInterface({
  //   input: fs.createReadStream(req.file.path)
  // });
  // const yaks = [];
  // stream.on('line', line => {
  //    return yak
  //    yaks.push(yak)
  // })
  // Note: Empty database if exists
  Yak.remove({}, err => {
    if (err) {
      console.error(err)
    }
    console.log('delete and update');
    
    Yak.collection.insert(mockYaks, (err, docs) => {
      if(err) {
        return console.error(err);
      }
      res.redirect('/yaks')
    })
  })
};

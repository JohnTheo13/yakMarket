const Yak = require('../models/Yak');
const fs = require('fs');
const readline = require('readline');
const { mockYaks, milkStok } = require('./helpers');

exports.upload = (req, res) => {
  res.render('./upload');
};

exports.getYaks = async (req, res) => {
  const { params: { days } } = req;
  let yaks = await Yak.getYaks(days);

  console.log(sum);
  console.log(yaks);
  
  res.render('./yaks');
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
  // Note: Empty database is exists
  Yak.remove({}, err => {
    if (err) {
      console.error(err)
    }
    console.log('delete and update');
    
    Yak.collection.insert(mockYaks, (err, docs) => {
      if(err) {
        return console.error(err);
      }
      res.redirect('/stores')
    })
  })
};

const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
  res.render('./register');
}

exports.validatePassword = (req, res, next) => {
  const { body: { password, passwordConfirm } } = req;
  if(password === passwordConfirm) {
    next(null, true);
  } else {
    next({ message: 'password not the same' });
  }
}

exports.saveUser = async (req, res, next) => {
  const { body: {
    username, email, password
  }} = req;
  const user = new User({
    username, email, password
  });
  await user.save();
  req.session.user = user;
  res.redirect('/home')
}

exports.renderLogin = (req, res) => {
  console.log(req.user);
  
  res.render('./login');
}

exports.authorize = async (req, res, next) => {
  const { body: { username, password } } = req;
  const user = await User.collection.findOne({ username: username });
console.log(user, 'auth');

  if (!user) {
    // hadle error
  } else {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        console.log('bcryted');
        req.user = user;
        req.session.user = user;
        res.redirect('/home');
      } else {
        console.log('not');
        // handle wrong pass
      }
    })
  }
}
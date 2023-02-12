const User = require('../models/user.model')
const validResult = require('express-validator').validationResult
//######################################### GET LOG IN #######################################################//
module.exports.get_Login = (req, res) => {
  res.render('login', {
    loginError: req.flash('loginError')[0],
    loginValidError: req.flash('loginValidError'),
    isUser: false,
    isAdmin: false,
  })
}
//######################################### GET SIGN UP #######################################################//
module.exports.get_Signup = (req, res) => {
  res.render('signup', {
    validationError: req.flash('validationError'),
    isUser: false,
    isAdmin: false,
  })
}

//######################################### POST SIGN UP #######################################################//
module.exports.post_Signup = (req, res) => {
  if (validResult(req).isEmpty()) {
    User.register(req.body.username, req.body.email, req.body.password)
      .then(() => {
        res.redirect('/login')
      })
      .catch((err) => {
        res.redirect('/signup')
        console.log(err)
      })
  } else {
    req.flash('validationError', validResult(req).array())
    res.redirect('/signup')
  }
}
//######################################### POST LOGIN  #######################################################//
module.exports.post_Login = (req, res) => {
  if (validResult(req).isEmpty()) {
    User.login(req.body.email, req.body.password)
      .then((result) => {
        req.session.userId = result.id
        req.session.email = result.email
        req.session.isAdmin = result.isAdmin
        res.redirect('/')
      })
      .catch((err) => {
        req.flash('loginError', err)
        res.redirect('/login')
      })
  } else {
    req.flash('loginValidError', validResult(req).array())
    res.redirect('/login')
  }
}
//######################################### LOGOUT  #######################################################//
module.exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
}

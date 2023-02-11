exports.isAdmin = (req, res, next) => {
  if (req.session.isAdmin) next()
  else console.log('You Are Not a Admin')
}

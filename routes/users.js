var express = require('express');
var router = express.Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = 'cnineicencenbcicbeibeicbi';


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
// signup user
router.post('/signup', function (req, res, next) {
  // get user request body
  const { username, password } = req.body;
  // encrypt password using bcrypt
  const encryptedPassword = bcrypt.hashSync(password, 10);
  console.log(encryptedPassword)
  // create new user
  const user = new User({
    username,
    password: encryptedPassword
  });
  // save user to database
  user.save()
    .then((result) => {
      res.json({ message: 'User created successfully', user: result });
    }
    )
    .catch(error => {
      res.json({ error: error.message });
    }
    );
}
);
// login routes
router.post('/login', async function (req, res) {
  const { username, password } = req.body;
  const user = User.findOne({ username: username })
    .then(user => {
      if (!user) {
        return res.json({ message: 'User not found' });
      }
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.json({ message: 'Incorrect password' })
      }
      const token = jwt.sign({ id: user._id }, SECRET);
      return res.json({ message: 'Login successful', token: token, user: user })
    }).catch(error => console.log(error));

  // if(!user){
  //  return res.json({message:'User not found'})
  // }


})

module.exports = router;

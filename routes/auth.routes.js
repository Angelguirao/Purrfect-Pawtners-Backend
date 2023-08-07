const router = require("express").Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const { isAuthenticated } = require('../middlewares/jwt.middleware')
router.get('/', (req, res, next) => {
    res.json('All good in auth')
  })

  router.post('/signup', async (req, res) => {
    const payload = req.body // { email: 'someEmail', password '1234'}
  
    const salt = bcrypt.genSaltSync(13)
    const passwordHash = bcrypt.hashSync(payload.password, salt)
  
    try {
      await User.create({ name: payload.username, email: payload.email, password: passwordHash })
      res.status(201).json({ message: 'User created' })
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  })

  router.post('/login', async (req, res) => {
    const payload = req.body // { email: 'someEmail', password '1234'}
    /* Check if the user exists */
    const potentialUser = await User.findOne({ email: payload.email })
    if (potentialUser) {
      const doPasswordsMatch = bcrypt.compareSync(payload.password, potentialUser.password)
      /* Check if the password is correct */
      if (doPasswordsMatch) {
        /* Sign the JWT */
        //this jwt.sign method is what actually creates the token for us.
        const authToken = jwt.sign({ userId: potentialUser._id }, process.env.TOKEN_SECRET, {
          algorithm: 'HS256',
          expiresIn: '6h',
        })
        // Sending back the token to the front and you can send more data if you want.
        res.status(202).json({ token: authToken})
      } else {
        /* Incorrect password */
        res.status(403).json({errorMessage: 'Password invalid'})
      }
    } else {
      /* No user found */
      res.status(403).json({errorMessage: 'No user found'})
  
    }
  })

  router.get('/verify', isAuthenticated, async(req, res) => {
    console.log('here is after the middleware, what JWT is giving us', req.payload)
    const currentUser = await User.findById(req.payload.userId)
    //never send the password, hashed or not to the front end
    currentUser.password = '****'
    res.status(200).json({message: 'Token is valid', currentUser})
  })
module.exports = router
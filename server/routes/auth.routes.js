const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const UserModel = require('../models/User.model')


const isLoggedIn = (req, res, next) => {
    if (req.session.isLoggedInUser) {
        next()
    }
    else {
        res.status(401).json({
            message: 'Unauthorized',
            code: 401
        })
    }
}


router.get('/user', isLoggedIn, (req, res, next) => {
    res.status(200).json(req.session.isLoggedInUser)
})



router.post('/register', (req, res) => {
    const { username, password, passwordConf} = req.body

    if(!username || !password || !passwordConf ) {
        res.status(500).json({errorMessage: 'Please fill out all fields'})
    }
    if(password !== passwordConf) {
        res.status(500).json({errorMessage: 'Passwords do not match'})
    }

    let salt = bcrypt.genSaltSync(10)
    let hashPw = bcrypt.hashSync(password, salt)

    UserModel.create({ username, password: hashPw })
    .then(user => res.status(200).json(user))
    .catch(err => {
        if (err.code === 11000) {
            res.status(500).json({errorMsg: 'username is already taken'})
        }
        else {
            res.status(500).json({errorMsg: 'Something went wrong'})
        }
    })
})



router.post('/login', (req, res) => {
    const { username, password } = req.body

    UserModel.findOne({ username })
    .then(userData => {
        bcrypt.compare(password, userData.password)
        .then(isMatch => {
            if (isMatch) {
                userData.password = '*****'
                req.session.isLoggedInUser = userData
                res.status(200).json(userData)
            }
            else {
                res.status(500).json({ errorMsg: 'Login details incorrect'})
                return
            }
        })
        .catch(() => {
            res.status(500).json({ errorMsg: 'Invalid format'})
            return
        })
    })
})


router.get('/watchlist/:user', (req, res) => {
    let user = req.params.user
    UserModel.findById({_id: user})
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => console.log(err))
})



router.patch('/add', (req, res) => {

    const { movie, user } = req.body

    UserModel.updateOne({ username: user }, {$push: { watchlist: movie }})
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({
            error: 'Problem occurred',
            message: err
        })
    })
})


router.patch('/remove', (req, res) => {

    const { movie, user } = req.body

    UserModel.updateOne({ username: user }, {$pull: { watchlist: movie }})
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({
            error: 'Problem occurred',
            message: err
        })
    })
})



router.post('/logout', (req, res) => {
    req.session.destroy()
    res.status(204).json({})
})

module.exports = router
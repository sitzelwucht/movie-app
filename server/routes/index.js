const router = require('express').Router()

router.get('/', (req, res, next) => {
    res.json('ok')
})

module.exports = router
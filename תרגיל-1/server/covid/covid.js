const express = require('express')
const router = express.Router();
const members = require('../service')

router.get('/:id', async function (req, res, next) {
    console.log(req.params.id)
    try {
        let data = await members.getSickDetails(req.params.id);
        if (!data) {
            res.send("user does not exist")
        }
        else {
            res.send(data);
        }
    } catch (err) {
        console.error('error while getting users', err.message);
        next(err);
    }
});
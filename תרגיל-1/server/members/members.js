const express = require('express')
const router = express.Router();
const members = require('../service')


router.get('/', async function (req, res, next) {
    try {
        const data = await members.getAllMembers();
        res.send(data);
    } catch (err) {
        console.error('error while getting users', err.message);
        next(err);
    }
});


router.post('/', async function (req, res, next) {
    try {
        console.log("req.body =  " + req.body)
        const data = await members.setNewUser(req.body);
        res.send(data);
    } catch (err) {
        console.error('error while getting users', err.message);
        next(err);
    }
});


router.delete('/:id', async function (req, res, next) {
    try {
        let data = await members.deleteUser(req.params.id);
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

router.put('/:userId', async function (req, res, next) {
    console.log(req.body);
    try {
        let data = await members.updateUser(req.params.userId, req.body);
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

module.exports = router;
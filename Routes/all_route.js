const express = require('express');
const router = express.Router();

router.get('/' ,(req, res)=>{
    res.render('login');
});

router.get('/rooms', (req,res)=>{
    res.render('rooms');
});

router.get('/chat', (req,res)=>{
    res.render('chatroom');
});

router.get('/getsession', (req,res)=>{
    res.send('my favouriet color:'+ req.session.favcolor);
});
router.get('/setsession', (req,res)=>{
    req.session.favcolor = "red";
    res.send('session set');
})

module.exports = router;
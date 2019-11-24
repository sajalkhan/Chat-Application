const express = require('express');
const passport = require('passport');
const isLogin = require('../Auth/auth');
const router = express.Router();

router.get('/' ,(req, res)=>{
    res.render('login');
});

router.get('/rooms', isLogin.isUser, (req,res)=>{
    res.render('rooms',{
        user: req.user
    });
});

router.get('/chat', isLogin.isUser, (req,res)=>{
    res.render('chatroom');
});

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook',{
    successRedirect: '/rooms',
    failureRedirect: '/'
}));

router.get('/logout',(req, res)=>{
    req.logout();
    res.redirect('/');
})

module.exports = router;
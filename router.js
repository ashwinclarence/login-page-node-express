var express = require('express');
var router = express.Router();

const credential = {
    email: 'meashwinclarence@gmail.com',
    password: '12345'
}



router.post('/login', (req, res) => {
    if (req.body.email === credential.email && req.body.password === credential.password) {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
    } else {
        res.render('base',{errorMessage: "Invalid username or password"})
    }
});




router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user })
    } else {
        res.redirect('/')
    }
})





router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;
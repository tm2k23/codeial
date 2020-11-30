module.exports.setFlash = function(req, res, next) {
    // console.log(' ');
    // console.log('Setting the flash message inside middleware');
    // console.log('The Message is : ', req.flash('success'));
    // console.log(' ');
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    next(); // since it is a middleware, we need to use next 
}
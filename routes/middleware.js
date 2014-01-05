var _ = require('underscore'),
    keystone = require('keystone');
 
/**
 *     Initialises the standard view locals.
 *         Include anything that should be initialised before route controllers are executed.
 *         */
exports.initLocals = function(req, res, next) {
    
    var locals = res.locals;

    locals.navLinks = [
        { label: 'Home',      key: 'home',      href: '/',          layout: 'left' },
        { label: 'Demos',   key: 'demos',   href: '/demos',   layout: 'left' },
        { label: 'Recipes',   key: 'recipes',   href: '/recipes',   layout: 'left' },
        { label: 'Travel',     key: 'travel',     href: '/travel',     layout: 'left' },
        { label: 'About',     key: 'about',     href: '/about',     layout: 'right' },
        { label: 'Blog',      key: 'blog',      href: '/blog',      layout: 'right' },
        { label: 'FAQ', key: 'mentoring', href: '/faq', layout: 'right' }
    ];
    
    locals.user = req.user;

// Add your own local variables here
    
    next();
    
};
 
/**
 *     Inits the error handler functions into `req`
 *     */
exports.initErrorHandlers = function(req, res, next) {
    
    res.err = function(err, title, message) {
        res.status(500).render('errors/500', {
            err: err,
            errorTitle: title,
            errorMsg: message
        });
    }
    
    res.notfound = function(title, message) {
        res.status(404).render('errors/404', {
            errorTitle: title,
            errorMsg: message
        });
    }
    
    next();
    
};
 
/**
 *     Fetches and clears the flashMessages before a view is rendered
 *     */
exports.flashMessages = function(req, res, next) {
    
    var flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error')
    };
    
    res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length }) ? flashMessages : false;
    
    next();
    
};

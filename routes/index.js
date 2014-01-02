var keystone = require('keystone'),
    middleware = require('./middleware'),
    importRoutes = keystone.importer(__dirname);
 
keystone.pre('routes', function(req, res, next) {
        
        res.locals.navLinks = [
                { label: 'Home', key: 'home', href: '/' },
                { label: 'Signin', key: 'signin', href: '/keystone' }
        ];
        
        res.locals.user = req.user;
        
        next();
        
});

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);
 
 // Handle 404 errors
keystone.set('404', function(req, res, next) {
	res.notfound();
});

// Handle other errors
keystone.set('500', function(err, req, res, next) {
	var title, message;
	if (err instanceof Error) {
		message = err.message;
		err = err.stack;
	}
	res.err(err, title, message);
});

// Load Routes
var routes = {
	views: importRoutes('./views')
};

// Bind Routes
exports = module.exports = function(app) {

	app.get('/', routes.views.index);

}

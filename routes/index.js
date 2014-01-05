var keystone = require('keystone'),
    middleware = require('./middleware'),
    utils = keystone.utils,
    importRoutes = keystone.importer(__dirname);
 
keystone.pre('routes', function(req, res, next) {
        
        res.locals.navLinks = [
                { label: 'Home', key: 'home', href: '/' },
                { label: 'Demos', key: 'demos', href: '/demos' },
                { label: 'Recipes', key: 'recipes', href: '/recipes' },
                { label: 'Travel', key: 'travel', href: '/travel' },
                { label: 'About Me', key: 'aboutus', href: '/about' },
                { label: 'Blog', key: 'blog', href: '/blog' },
                { label: 'FAQ', key: 'faq', href: '/faq' }
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
	app.get('/demos', routes.views.demos);
        app.get('/recipes/:category?', routes.views.recipes);
	app.get('/travel', routes.views.travel);
	app.get('/about', routes.views.about);
        app.get('/blog/:category?', routes.views.blog);
        app.all('/blog/post/:post', routes.views.post);
	app.get('/faq', routes.views.faq);

        // User
        app.all('/create/recipe', routes.views.createRecipe);
        app.all('/create/post', routes.views.createPost);
        

}

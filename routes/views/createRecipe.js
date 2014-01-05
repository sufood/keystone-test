var keystone = require('keystone'),
        Recipe = keystone.list('Recipe');

exports = module.exports = function(req, res) {
        
        var view = new keystone.View(req, res),
                locals = res.locals;
        
        locals.title = 'Create a Recipe';
        
        view.on('post', { action: 'create-recipe' }, function(next) {

                // handle form
                var newRecipe = new Recipe.model({
                                author: locals.user.id,
                                publishedDate: new Date()
                        }),

                        updater = newRecipe.getUpdateHandler(req, res, {
                                errorMessage: 'There was an error creating your new recipe:'
                        });
                
                // automatically pubish posts by admin users
                if (locals.user.isAdmin) {
                        newRecipe.state = 'published';
                }

                updater.process(req.body, {
                        flashErrors: true,
                        logErrors: true,
                        fields: 'title,description,image,ingredients,recipeInstructions,krandor,vegor,kiddor'
                }, function(err) {
                        if (err) {
                                locals.validationErrors = err.errors;
                        } else {
                                req.flash('success', 'Your recipe has been added' + ((newRecipe.state == 'draft') ? ' and will appear on the site once it\'s been approved' : '') + '.');
                                return res.redirect('/recipe/post/' + newRecipe.slug);
                        }
                        next();
                });

        });
        
        view.render('site/createRecipe');
        
}
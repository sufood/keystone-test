var keystone = require('keystone'),
        Types = keystone.Field.Types;

/**
 * Model
 * =====================
 */

var RecipeCategory = new keystone.List('RecipeCategory', {
        autokey: { from: 'name', path: 'key', unique: true }
});

RecipeCategory.add({
        name: { type: String, required: true }
});


/**
 * Relationships
 * =============
 */

RecipeCategory.relationship({ ref: 'Recipe', refPath: 'categories', path: 'recipes' });


/**
 * Registration
 * ============
 */

RecipeCategory.addPattern('standard meta');
RecipeCategory.register();
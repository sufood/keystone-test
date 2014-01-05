var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
/**
 * Model
 * =============
 */

var Recipe = new keystone.List('Recipe', {
        map: { title: 'name' },
        autokey: { path: 'slug', from: 'name', unique: true }
});
 
Recipe.add({
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Types.Date, index: true },
    title: { type: Types.Text, initial: true, required: true, index: true },
    description: { type: Types.Text, initial: true, required: true, index: true },
    image: { type: Types.CloudinaryImage, initial: true },
    ingredients: { type: Types.Textarea, initial: true, required: true, index: true },
    recipeInstructions: { type: Types.Textarea, initial: true, required: true },
    categories: { type: Types.Relationship, initial: true, ref: 'RecipeCategory', many: true }
});

Recipe.addPattern('standard meta');
Recipe.defaultSort = '-title';
Recipe.register();

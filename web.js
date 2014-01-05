var keystone = require('keystone');
keystone.init({
  
  'name': 'My Project',
  
  'favicon': 'public/favicon.ico',
  'less':'public', 
  'static': 'public',
  
  'views': 'templates/views',
  'view engine': 'jade',
  
  'auto update': true,
  'mongo': process.env.MONGOLAB_URI,
  
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': process.env.COOKIE_SECRET
  
});
 
require('./models');

keystone.set('locals', {
        _: require('underscore'),
        env: keystone.get('env'),
        utils: keystone.utils
});
 
keystone.set('routes', require('./routes'));
 
keystone.start();

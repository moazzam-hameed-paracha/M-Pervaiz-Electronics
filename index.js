const dotenv = require('dotenv').config();
const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = 'M-Pervaiz-Electronics';
const adapterConfig = {
   mongoUri: process.env.MONGO_URI
};

const keystone = new Keystone({
   adapter: new Adapter(adapterConfig),
   cookieSecret: process.env.COOKIE_SECRET,
});

const ProductSchema = require('./lists/Products');
const UserSchema = require('./lists/Users');

keystone.createList('Product', ProductSchema);
keystone.createList('User', UserSchema);

module.exports = {
   keystone,
   apps: [
      new GraphQLApp(),
      new AdminUIApp({ name: PROJECT_NAME, enableDefaultRoute: true }),
      new StaticApp({
         path: '/',
         src: './images',
         fallback: 'index.js',
      }),
   ],
};

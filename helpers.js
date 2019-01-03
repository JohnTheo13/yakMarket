/*
  This is a file of data and helper functions that we can expose and use in our templating function
*/

// FS is a built in module to node that let's us read files from the system we're running on
const fs = require('fs');
const moment = require('moment');

const today = moment(process.env.STARTDATE).fromNow('D').replace(' days', '')

// moment.js is a handy library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
exports.moment = moment;

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// inserting an SVG
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);

// Some details about the site
exports.siteName = `Yak shop`;

exports.menu = [
  { slug: `/stock/${today}`, title: 'Stock', icon: 'store', },
  { slug: `/yaks/${today}`, title: 'Yaks', icon: 'tag', },
  { slug: '/add', title: 'Add', icon: 'add', },
];
